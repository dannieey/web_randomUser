# Random User Dashboard - API Assignment

## Overview
This project is an interactive dashboard that integrates multiple APIs to display:
- Random user information
- Country data based on the user's country
- Exchange rates for the user's currency
- News headlines related to the user's country

The project is built with **Node.js**, **Express**, **Axios**, and vanilla **JavaScript**. All business logic is implemented **on the server side** (in `server.js` / `public/js/main.js`), not in HTML.

## Features
1. **Random User Generator API**  
   - Fetches a random user with:
     - First name, Last name, Gender, Profile picture
     - Age, Date of birth, City, Country, Full address
   - Displayed in a clean, card-style UI.

2. **REST Countries API**  
   - Fetches country details based on the user's country:
     - Country name, Capital city, Languages, Currency, National flag
   - Handles missing or unavailable data gracefully.

3. **Exchange Rate API**  
   - Shows currency conversion rates compared to USD and KZT.
   - Displayed near country information for logical grouping.

4. **News API**  
   - Fetches five latest news headlines in English containing the user's country name.
   - Displays headline, image (if available), short description, and source URL.

## Setup Instructions

1. Clone the repository
2. Install dependencies
3. **Set up .env file
4. Start a server
5. Open in browser

## API Usage

**1. Random User API**

- Endpoint: https://randomuser.me/api/
- Used to fetch random user details.
- Only relevant fields are extracted.

**2. REST Countries API**

- Endpoint: https://restcountries.com/v3.1/name/{country}
- Retrieves country details using the user's country name.

**3. Exchange Rate API**

- Endpoint: https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/{currency}
- Converts user's currency to USD and KZT.

**4. News API**

- Endpoint: https://newsapi.org/v2/everything?q={country}&language=en&pageSize=5&apiKey=YOUR_API_KEY
- Fetches 5 latest news headlines related to the user's country.

## Design Decisions

- Server-side logic only: All API requests are handled in server.js / main.js.
- Card-based UI: Clean separation of user, country, exchange rates, and news sections.
- Modern colors and shadows: Pleasant for the eyes, hover effects on cards and buttons.
- Responsiveness: News cards are in a grid layout that adapts to screen size.
- Error handling: Graceful handling if API data is missing.
- Core logic not in HTML: Ensures separation of concerns and maintainability.


