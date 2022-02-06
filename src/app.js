import axios from "axios";

async function createCountryList() {
    try{
        // GET DATA ARRAY OF COUNTRY OBJECT FROM API
        const {data: countryData} = await axios.get("https://restcountries.com/v3/all");

        // SORT COUNTRY LIST
        countryData.sort((a, b) => {
            return a.population - b.population;
        })

        //GET UL-ELEMENT FROM DOM
        const unorderedListElement = document.getElementById("country-list");

        // FILL NEW ARRAY WITH LIST-ELEMENTS
        const listElementCollection = countryData.map((country) => {
            const listElement = document.createElement("li");
            listElement.innerHTML = creatListElementString(country);
            return listElement;
        });

        // PUT EACH LIST-ELEMENT IN DOM ONE AT A TIME
        listElementCollection.map((element) => {
           unorderedListElement.appendChild(element);
        });

    } catch (e) {
        console.log(e);
    }
}

function creatListElementString(country) {
    // STRING COMPONENTS
    const {name: {common: countryName}} = country;
    const {population: countryPopulation} = country;
    const {flags: [, countryFlagLink]} = country;
    const countryRegionColor = getRegionColor(country);

    // STRING BUILDING
    return `
            <h3 class="${countryRegionColor}">${countryName}</h3>
            <div>
                <img class="country-flag" src="${countryFlagLink}" alt="">
                <p>Has a population of <strong>${countryPopulation}</strong> people</p>
            </div>
        `;
}

function getRegionColor(country) {
    switch (country.region) {
        case "Africa": return "blue";
        case "Americas": return "green";
        case "Asia": return "red";
        case "Europe": return "yellow";
        case "Oceania": return "purple";
        default: return "white";
    }
}

createCountryList();



