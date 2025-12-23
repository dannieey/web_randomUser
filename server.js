import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

/* RANDOM USER */
app.get("/api/user", async (req, res) => {
    try {
        const response = await axios.get("https://randomuser.me/api/");
        const user = response.data.results[0];

        res.json({
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            age: user.dob.age,
            dob: user.dob.date,
            city: user.location.city,
            country: user.location.country,
            address: `${user.location.street.name} ${user.location.street.number}`,
            picture: user.picture.large
        });
    } catch {
        res.status(500).json({ error: "Random user error" });
    }
});

/* REST COUNTRIES */
app.get("/api/country/:country", async (req, res) => {
    try {
        const response = await axios.get(
            `https://restcountries.com/v3.1/name/${req.params.country}`
        );
        const c = response.data[0];

        res.json({
            name: c.name.common,
            capital: c.capital?.[0] || "N/A",
            languages: c.languages ? Object.values(c.languages) : ["N/A"],
            currencyCode: Object.keys(c.currencies || {})[0],
            currencyName: c.currencies
                ? Object.values(c.currencies)[0].name
                : "N/A",
            flag: c.flags.png
        });
    } catch {
        res.status(500).json({ error: "Country API error" });
    }
});

/* EXCHANGE RATE */
app.get("/api/exchange/:currency", async (req, res) => {
    try {
        const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${req.params.currency}`
        );
        res.json({
            base: req.params.currency,
            USD: response.data.conversion_rates.USD,
            KZT: response.data.conversion_rates.KZT
        });
    } catch {
        res.status(500).json({ error: "Exchange API error" });
    }
});

/* NEWS */
app.get("/api/news/:country", async (req, res) => {
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${req.params.country}&language=en&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
        );
        const articles = response.data.articles.map(a => ({
            title: a.title,
            description: a.description,
            image: a.urlToImage,
            url: a.url
        }));
        res.json(articles);
    } catch {
        res.status(500).json({ error: "News API error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
