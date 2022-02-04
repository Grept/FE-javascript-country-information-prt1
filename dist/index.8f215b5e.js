console.log('Hallo daar!');
// De naam van het land
// De vlag van dat land
// De zin: Has a population of [amount] people
// De landen zijn gesorteert op populatie, van laag naar hoog;
// Voeg continent kleur toe
/*
* Maak een asynchrone functie die met axios de get ophaald. Dit is een lijst.
* */ async function getCountries() {
    try {
        const countryList = await axios.get("https://restcountries.com/v2/all?fields=name,flags,population");
        console.log(countryList);
    } catch (e) {
        console.log(e);
    }
}
getCountries();

//# sourceMappingURL=index.8f215b5e.js.map
