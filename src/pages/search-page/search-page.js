import axios from 'axios';

async function getCountryData(countryName) {
    try {
        const {data: [countryData]} = await axios.get(`https://restcountries.com/v2/name/${countryName}`);
        displayCountryData(countryData);
        console.log(countryData);
    } catch (e) {
        console.log(e);
    }
}

function displayCountryData(country) {
    // GET INFO ELEMENT
    const infoContainer = document.getElementById("infoContainer");

    // CLEAR THE DATA ALREADY ON SCREEN
    infoContainer.innerHTML = "";

    const infoElement = document.createElement("div");
    infoElement.setAttribute("class", "info-element");
    infoElement.innerHTML = createCountryInfoString(country);

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
    const {currencies: [{name: currencyName}]} = country;
    const {languages: [{name : countryLanguage}]} = country;

    // check if country ends with s

    return `
        <div>
            <img src="${flag}" alt="${countryCode}">
            <h3>${countryName}</h3>
        </div>
        <p>
            ${countryName} is situated in ${subregion}. It has a population of <strong>${population}</strong> people.
            The capital is ${capital} and you can pay with ${currencyName}'s. They speak ${countryLanguage}.
        </p>
    `;
}


getCountryData("Italy");