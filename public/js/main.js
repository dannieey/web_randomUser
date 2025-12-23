async function loadUser() {
    const user = await fetch("/api/user").then(r => r.json());
    const country = await fetch(`/api/country/${user.country}`).then(r => r.json());
    const exchange = await fetch(`/api/exchange/${country.currencyCode}`).then(r => r.json());
    const news = await fetch(`/api/news/${user.country}`).then(r => r.json());

    document.getElementById("user").innerHTML = `
        <h2>User Information</h2>
        <img src="${user.picture}" width="140">
        <p><b>Name:</b> ${user.firstName} ${user.lastName}</p>
        <p><b>Gender:</b> ${user.gender}</p>
        <p><b>Age:</b> ${user.age}</p>
        <p><b>Date of Birth:</b> ${user.dob}</p>
        <p><b>Address:</b> ${user.address}, ${user.city}, ${user.country}</p>
    `;

    document.getElementById("country").innerHTML = `
        <h2>Country Information</h2>
        <img src="${country.flag}" width="120">
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Languages:</b> ${country.languages.join(", ")}</p>
        <p><b>Currency:</b> ${country.currencyName} (${country.currencyCode})</p>
    `;

    document.getElementById("exchange").innerHTML = `
        <h2>Exchange Rates</h2>
        <p>1 ${exchange.base} = ${exchange.USD} USD</p>
        <p>1 ${exchange.base} = ${exchange.KZT} KZT</p>
    `;

    document.getElementById("news").innerHTML = `
        ${news.map(n => `
            <div class="news-card">
                <h4>${n.title}</h4>
                ${n.image ? `<img src="${n.image}">` : ""}
                <p>${n.description || ""}</p>
                <a href="${n.url}" target="_blank">Read full article</a>
            </div>
        `).join("")}
    `;
}
