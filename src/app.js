import axios from "axios";

async function createCountryDataList() {
    try{
        // GET DATA ARRAY OF COUNTRY OBJECT FROM API
        const {data: countryData} = await axios.get("https://restcountries.com/v3/all");

        // SORT COUNTRY LIST BY POPULATION
        countryData.sort((a, b) => {
            return a.population - b.population;
        })

        // DISPLAY COUNTRY DATA ON THE PAGE
        displayCountryDataList(countryData);

    } catch (e) {
        console.log(e);
    }
}

function displayCountryDataList(dataList) {
        //GET UL-ELEMENT FROM DOM
        const unorderedListElement = document.getElementById("country-list");

        dataList.map((country) => {
            // CREATE LIST ELEMENT
            const listElement = document.createElement("li");
            listElement.setAttribute('class', getRegionColor(country));

            // BUILD CONTENT FOR LIST ELEMENT
            listElement.innerHTML = creatListElementString(country);

            // PUT ELEMENT ON PAGE
            unorderedListElement.appendChild(listElement);
        });
}

function creatListElementString(country) {
    // GET STRING COMPONENTS
    const {name: {common: countryName}} = country;
    const {population: countryPopulation} = country;
    const {flags: [, countryFlagLink]} = country;
    const countryRegionColor = getRegionColor(country);

    // BUILD STRING AND RETURN
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

createCountryDataList();



