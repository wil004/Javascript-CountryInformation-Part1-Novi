import axios from 'axios';

const countriesDiv = document.getElementById('countries');


const landenKaart = [ 'Heard Island and McDonald Islands', 'South Georgia and the South Sandwich Islands',
    'French Southern Territories', 'United States Minor Outlying Islands',
    'Pitcairn', 'Vatican City',
    'Cocos (Keeling) Islands', 'Antarctica', 'Zimbabwe', 'Bhutan', 'Guyana', 'Réunion', 'Comoros', 'Fiji', 'Djibouti',
    'Swaziland', 'Cyprus', 'Mauritius', 'Haiti', 'Belgium', 'Bolivia (Plurinational State of)', 'Tunisia'
    , 'Burundi', 'Benin', 'Rwanda', 'Guinea','Bouvet Island'
]


const randomCountries = ['Peru', 'Italy', 'Germany', 'Poland', 'Finland', 'China', 'Indonesia', 'Argentina', 'Brazil',
'Belarus', 'Turkey', 'Netherlands', 'France', 'Spain', 'Portugal', 'Switzerland', 'Greece', 'Norway','Ireland',
'Hungary', 'Thailand', 'Vietnam', 'Mongolia', 'Australia', 'Ghana', 'Canada', 'Mexico']

// Een functie om een array met landen te printen!

async function getCountry(countries) {

    try {
        const result = await axios.get('https://restcountries.com/v2/all');

        //de allCountries functie maakt een array met objecten gesorteerd op populatie.

        const allCountries = (result) => {
            const allCountries = [];
            for (let i = 0; i < result.data.length; i++) {
                allCountries.push(result.data[i]);
            }
            return allCountries
        }
        const sortedCountries = allCountries(result).sort(function(a,b) {
            return a.population - b.population;
        })




        //De printInputCountries functie zorgt ervoor dat de data van de array met landen wordt opgeslagen in de countryArrayObjects

        const printInputCountries = (countries) => {
            const countryArrayObjects = [];
            for (let i = 0; i < sortedCountries.length; i++) {
                for (let j = 0; j < countries.length; j++) {
                    if (sortedCountries[i].name === countries[j]) {
                        countryArrayObjects.push(sortedCountries[i])
                    }
                }
            }
            return countryArrayObjects
        }




        const newCountries = printInputCountries(countries);


        //De countryListNumber variabele is het indexnummer van de desbetreffende createCountryList div.
        let countryListNumber = 0;

        //Een functie om een div te maken die een lijst met 9 landen heeft.


        function countryList(i) {
            const createCountryList = [];
            createCountryList[i] = document.createElement('div');
            createCountryList[i].setAttribute('id', 'uniekeId' + i);
            createCountryList[i].setAttribute('style', 'margin-top: 30px; margin-bottom: 30px;')
            countriesDiv.appendChild(createCountryList[i]);

        }

        // Een functie om de vlag en titel in een div te stoppen zodat je er een flexbox van kunt maken.
        function countryFlagAndTitle(i, newCountries) {
            countryFlagAndTitle[i] = document.createElement('div');
            individualCountryIdCreator[i] = newCountries[i].name.split(' ');
            countryFlagAndTitle[i].setAttribute('id', individualCountryIdCreator[i][0] + i);
            countryFlagAndTitle[i].setAttribute('style', 'display:flex; ' +
                'padding: 0px; margin-botom: -5px;');
            countryListId[countryListNumber].appendChild(countryFlagAndTitle[i]);
        }

        //Een functie om een div te maken speciaal om de populatie in weer te geven.
        function populationBox(i, countryListNumber) {
            populationBox[i] = document.createElement('div');
            populationBox[i].setAttribute('id', 'population' + i);
            populationBox[i].setAttribute('style', 'margin-top:-20px;');
            countryListId[countryListNumber].appendChild(populationBox[i]);
        }

        //Een functie om de titel van een land naar continent te kleuren.
        function colorCountriesPerContinent(region, i, subregion) {
            if (region[i] === 'Africa') {
                countryFlagAndTitle[i].setAttribute('class', region[i]);
            } else if (region[i] === 'Asia') {
                countryFlagAndTitle[i].setAttribute('class', region[i]);
            } else if (region[i] === 'Europe') {
                countryFlagAndTitle[i].setAttribute('class', region[i]);
            } else if (region[i].includes('Antarctic') || region[i] === 'Polar') {
                countryFlagAndTitle[i].setAttribute('class', 'Antarctic');
            } else if (region[i] === 'Oceania') {
                countryFlagAndTitle[i].setAttribute('class', region[i]);
            } else if (region[i] === 'Americas') {
                if (subregion[i].includes('South')) {
                    countryFlagAndTitle[i].setAttribute('class', 'SouthAmerica');
                } else if (subregion[i].includes('North') || subregion[i] === 'Caribbean') {
                    countryFlagAndTitle[i].setAttribute('class', 'NorthAmerica');
                }
            }
        }

        // maakt een uniek id per land per div aan
        const individualCountryIdCreator = [];

        // Deze variabelen heb je nodig om data in de div te stoppen.
        const countryListId = [];
        const countryFlagAndTitleId = [];
        const populationBoxId = [];


        //Deze variabelen de benodigde data als vlag titel populatie op.
        const flag = [];
        const name = [];
        const population = [];
        const region = [];
        const subregion = [];

        for (let i = 0; i < newCountries.length; i++) {
            if (i % 9 === 0) {
                /* maakt een div met een lijst van 9 landen */
                countryList(i);
                countryListId[i] = document.getElementById('uniekeId' + i);
                countryListNumber = i;
            }

            //maakt een div waar je het land en titel in stopt.
            countryFlagAndTitle(i, newCountries);
            countryFlagAndTitleId[i] = document.getElementById(individualCountryIdCreator[i][0] + i);


            //maakt een div waar de populatie in komt te staan!
            populationBox(i, countryListNumber);


            populationBoxId[i] = document.getElementById('population' + i);

            flag[i] = newCountries[i].flag;
            name[i] = newCountries[i].name;
            population[i] = newCountries[i].population;
            subregion[i] = newCountries[i].subregion;
            region[i] = newCountries[i].region;


            // Geeft kleur aan landen per continent.
            colorCountriesPerContinent(region, i, subregion);



            const countryImage = document.createElement('img');
            countryImage.setAttribute('src', flag[i]);
            countryImage.setAttribute('width', '60');
            countryImage.setAttribute('height', '40');
            countryFlagAndTitleId[i].appendChild(countryImage);



            const countryName = document.createElement('h2');
            countryName.setAttribute('class', 'countryFlex');
            countryName.textContent = '' + name[i] + '';
            countryFlagAndTitleId[i].appendChild(countryName);



            const countryPopulation = document.createElement('h5');
            countryPopulation.textContent = 'The country has a population of ' + population[i] + ' people';
            populationBoxId[i].appendChild(countryPopulation);
        }

    } catch (e) {
        console.error(e);
    }

}


//Een functie om alle landen mee te printen!

async function getAllCountries() {

    try {
        const result = await axios.get('https://restcountries.com/v2/all');

        const allObjects = result.data;

       const allObjectsSorted = allObjects.sort(function(a,b) {
            return a.population - b.population
        })


        const allCountriesDiv = document.getElementById('allCountries');
        const makeCountryList = () => {
           const list1 = document.createElement('ul');
           list1.setAttribute('id', 'list1');
           allCountriesDiv.appendChild(list1);
            const list2 = document.createElement('ul');
            list2.setAttribute('id', 'list2');
            allCountriesDiv.appendChild(list2);
            const list3 = document.createElement('ul');
            list3.setAttribute('id', 'list3');
            allCountriesDiv.appendChild(list3);
            const list4 = document.createElement('ul');
            list4.setAttribute('id', 'list4');
            allCountriesDiv.appendChild(list4);
            const list5 = document.createElement('ul');
            list5.setAttribute('id', 'list5');
            allCountriesDiv.appendChild(list5);

            const listNameAndFlag = [];
            const listPopulation = [];
            const images = [];
            const names = [];
            const population = [];
            const region = [];
            const subregion = [];


            function colorCountriesPerContinent(region, i, subregion) {
                if (region[i] === 'Africa') {
                    listNameAndFlag[i].setAttribute('class', region[i]);
                } else if (region[i] === 'Asia') {
                    listNameAndFlag[i].setAttribute('class', region[i]);
                } else if (region[i] === 'Europe') {
                    listNameAndFlag[i].setAttribute('class', region[i]);
                } else if (region[i].includes('Antarctic') || region[i] === 'Polar') {
                    listNameAndFlag[i].setAttribute('class', 'Antarctic');
                } else if (region[i] === 'Oceania') {
                    listNameAndFlag[i].setAttribute('class', region[i]);
                } else if (region[i] === 'Americas') {
                    if (subregion[i].includes('South')) {
                        listNameAndFlag[i].setAttribute('class', 'SouthAmerica');
                    } else if (subregion[i].includes('North') || subregion[i] === 'Caribbean') {
                        listNameAndFlag[i].setAttribute('class', 'NorthAmerica');
                    }
                    else {
                        listNameAndFlag[i].setAttribute('class', 'NorthAmerica')
                    }
                }
            }

            for (let i = 0; i < allObjectsSorted.length; i++) {
                if (i < (allObjectsSorted.length / 5)) {
                   images[i] = document.createElement('img');
                   images[i].setAttribute('src', allObjectsSorted[i].flag);
                   images[i].setAttribute('width', '50');
                   images[i].setAttribute('height', '30');
                   names[i] = document.createElement('h4');
                    names[i].textContent = allObjectsSorted[i].name;
                    listNameAndFlag[i] = document.createElement('li');
                    list1.appendChild(listNameAndFlag[i])
                    listNameAndFlag[i].appendChild(images[i])
                    listNameAndFlag[i].appendChild(names[i])
                    listNameAndFlag[i].setAttribute('style', 'display: flex; align-items:center; margin-bottom: -25px;')
                    population[i] = document.createElement('p');
                    population[i].textContent = allObjectsSorted[i].name + ' has a total population of: ' + allObjectsSorted[i].population + ' people!';
                    listPopulation[i] = document.createElement('li');
                    list1.appendChild(listPopulation[i])
                    listPopulation[i].appendChild(population[i]);

                }
                else if (i >= (allObjectsSorted.length / 5) && i < ((allObjectsSorted.length / 5) * 2)) {
                    images[i] = document.createElement('img');
                    images[i].setAttribute('src', allObjectsSorted[i].flag);
                    images[i].setAttribute('width', '50');
                    images[i].setAttribute('height', '30');
                    names[i] = document.createElement('h4');
                    names[i].textContent = allObjectsSorted[i].name;
                    listNameAndFlag[i] = document.createElement('li');
                    list2.appendChild(listNameAndFlag[i])
                    listNameAndFlag[i].appendChild(images[i])
                    listNameAndFlag[i].appendChild(names[i])
                    listNameAndFlag[i].setAttribute('style', 'display: flex; align-items:center; margin-bottom: -25px;')
                    population[i] = document.createElement('p');
                    population[i].textContent = allObjectsSorted[i].name + ' has a total population of: ' + allObjectsSorted[i].population + ' people!';
                    listPopulation[i] = document.createElement('li');
                    list2.appendChild(listPopulation[i])
                    listPopulation[i].appendChild(population[i]);

                }  else if (i >= ((allObjectsSorted.length / 5) * 2) && i < ((allObjectsSorted.length / 5) * 3)) {
                    images[i] = document.createElement('img');
                    images[i].setAttribute('src', allObjectsSorted[i].flag);
                    images[i].setAttribute('width', '50');
                    images[i].setAttribute('height', '30');
                    names[i] = document.createElement('h4');
                    names[i].textContent = allObjectsSorted[i].name;
                    listNameAndFlag[i] = document.createElement('li');
                    list3.appendChild(listNameAndFlag[i])
                    listNameAndFlag[i].appendChild(images[i])
                    listNameAndFlag[i].appendChild(names[i])
                    listNameAndFlag[i].setAttribute('style', 'display: flex; align-items:center; margin-bottom: -25px;')
                    population[i] = document.createElement('p');
                    population[i].textContent = allObjectsSorted[i].name + ' has a total population of: ' + allObjectsSorted[i].population + ' people!';
                    listPopulation[i] = document.createElement('li');
                    list3.appendChild(listPopulation[i])
                    listPopulation[i].appendChild(population[i]);

                }
                else if (i >= ((allObjectsSorted.length / 5) * 3) && i < ((allObjectsSorted.length / 5) * 4)) {
                    images[i] = document.createElement('img');
                    images[i].setAttribute('src', allObjectsSorted[i].flag);
                    images[i].setAttribute('width', '50');
                    images[i].setAttribute('height', '30');
                    names[i] = document.createElement('h4');
                    names[i].textContent = allObjectsSorted[i].name;
                    listNameAndFlag[i] = document.createElement('li');
                    list4.appendChild(listNameAndFlag[i])
                    listNameAndFlag[i].appendChild(images[i])
                    listNameAndFlag[i].appendChild(names[i])
                    listNameAndFlag[i].setAttribute('style', 'display: flex; align-items:center; margin-bottom: -25px;')
                    population[i] = document.createElement('p');
                    population[i].textContent = allObjectsSorted[i].name + ' has a total population of: ' + allObjectsSorted[i].population + ' people!';
                    listPopulation[i] = document.createElement('li');
                    list4.appendChild(listPopulation[i])
                    listPopulation[i].appendChild(population[i]);

                }
                else {
                    images[i] = document.createElement('img');
                    images[i].setAttribute('src', allObjectsSorted[i].flag);
                    images[i].setAttribute('width', '50');
                    images[i].setAttribute('height', '30');
                    names[i] = document.createElement('h4');
                    names[i].textContent = allObjectsSorted[i].name;
                    listNameAndFlag[i] = document.createElement('li');
                    list5.appendChild(listNameAndFlag[i])
                    listNameAndFlag[i].appendChild(images[i])
                    listNameAndFlag[i].appendChild(names[i])
                    listNameAndFlag[i].setAttribute('style', 'display: flex; align-items:center; margin-bottom: -25px;')
                    population[i] = document.createElement('p');
                    population[i].textContent = allObjectsSorted[i].name + ' has a total population of: ' + allObjectsSorted[i].population + ' people!';
                    listPopulation[i] = document.createElement('li');
                    list5.appendChild(listPopulation[i])
                    listPopulation[i].appendChild(population[i]);

                }
                region[i] = allObjectsSorted[i].region
                subregion[i] = allObjectsSorted[i].subregion
                colorCountriesPerContinent(region, i, subregion)


            }
        }
        makeCountryList();

    } catch (e) {
        console.error(e);
    }
}

getCountry(landenKaart)

getAllCountries()
/* Een functie die alle landen uitprint!!! */
