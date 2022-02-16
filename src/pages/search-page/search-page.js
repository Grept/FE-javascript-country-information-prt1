import axios from 'axios';

// MAIN FUNCTION
async function getCountryData(countryName) {
    try {
        // GET DATA FROM API
        const {data: [countryData]} = await axios.get(`https://restcountries.com/v2/name/${countryName}`);

        // CALL FUNCTION TO PROCES API-DATA
        displayCountryData(countryData);
        document.getElementById("search-form").reset();
        console.log(countryData);
    } catch (e) {
        console.log(e);
    }
}

function displayCountryData(country) {
    // GET INFO ELEMENT
    const infoContainer = document.getElementById("info-container");

    // CLEAR THE DATA ALREADY ON SCREEN
    infoContainer.innerHTML = "";

    // CREATE INFO ELEMENT
    const infoElement = document.createElement("div");
    infoElement.setAttribute("class", "info-element");
    infoElement.innerHTML = createCountryInfoString(country);

    // ADD INFO ELEMENT TO PAGE
    infoContainer.appendChild(infoElement);
}

function createCountryInfoString(country) {
    // GET STRING COMPONENTS
    const {flag} = country;
    const {name: countryName} = country;
    const {alpha2code: countryCode} = country;
    const {subregion} = country;
    const {population} = country;
    const {capital} = country;
    const currencyString = currencyStringBuilder(country);
    const languageString = languageStringBuilder(country);

    return `
        <div>
            <img src="${flag}" alt="${countryCode}">
            <div class="header-and-info">
                <h3>${countryName}</h3>
                <p class="country-information">
                    ${countryName} is situated in ${subregion}. It has a population of <strong>${population.toLocaleString("nl-NL")}</strong> people.
                    The capital is ${capital} and you can pay with ${currencyString}. They speak ${languageString}.
                </p>
            </div>
        </div>
    `;
}

function currencyStringBuilder(country) {
    let currencyString = "";
    const {currencies} = country;

    for (let i = 0; i < currencies.length; i++) {
        currencyString += currencies[i].name;
        if (i < currencies.length - 2) {
            currencyString += ", ";
        } else if (i < currencies.length - 1) {
            currencyString += " and ";
        }
    }

    return currencyString;
}

function languageStringBuilder(country) {
    let languageString = "";
    const {languages} = country;

    for (let i = 0; i < languages.length; i++) {
        languageString += languages[i].name;
        if (i < languages.length - 2) {
            languageString += ", ";
        } else if (i < languages.length - 1) {
            languageString += " and ";
        }
    }

    return languageString;
}

// EVENT LISTENER
const form = document.getElementById("search-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const {elements: [{value: searchQuery}]} = form;
    getCountryData(searchQuery);
});