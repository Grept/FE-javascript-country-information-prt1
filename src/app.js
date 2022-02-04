import axios from "axios";

console.log('Hallo daar!');

// De naam van het land
// De vlag van dat land
// De zin: Has a population of [amount] people
// De landen zijn gesorteert op populatie, van laag naar hoog;
// Voeg continent kleur toe

/*
* Maak een asynchrone functie die met axios de GET-link ophaalt. Dit is een lijst.
* */

async function createCountryList() {
    try{
        // GET COUNTRY OBJECT FROM API
        const countryList = await axios.get("https://restcountries.com/v3/all");

        // SORT COUNTRY LIST
        countryList.data.sort((a, b) => {
            return a.population - b.population;
        })

        //CREATE UL IN DOM
        const unorderedListElement = document.getElementById("country-list");

        // FILL NEW ARRAY WITH LIST-ELEMENTS
        const listElementCollection = countryList.data.map((country) => {
            const listElement = document.createElement("li");
            listElement.innerHTML = creatListElementString(country);
            return listElement;
        });

        console.log(listElementCollection);

        // PUT EACH LIST-ELEMENT IN DOM ONE AT A TIME
        for (let i = 0; i < listElementCollection.length; i++) {
            unorderedListElement.appendChild(listElementCollection[i]);
        }

    } catch (e) {
        console.log(e);
    }
}

function creatListElementString(country) {
    // STRING COMPONENTS
    const countryName = country.name.common;
    const countryPopulation = country.population;
    const countryFlagLink = country.flags[1];
    const countryRegionColor = getRegionColor(country);

    // STRING BUILDING
    const listItemString = `
            <div>
                <img class="country-flag" src="${countryFlagLink}" alt="">
                <h3 class="${countryRegionColor}">${countryName}</h3>
            </div>
            <p>Has a population of <strong>${countryPopulation}</strong> people</p>
        `;

    return listItemString;
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



