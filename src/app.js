import axios from 'axios';

// 1ste div countryToDom
const countryToDom = document.getElementById('countries');


/* De createCountryDiv zorgt ervoor dat de landen in rijen van 9 worden weergeven!
Steeds als er een rij van 9 landen is gemaakt wordt er een nieuwe div gecreëerd.
Deze div staat in de hoofd div met id countries.
Als we de display property van deze div op flex zetten geeft hij de createCountryDivs op een rij aan!
 */

let createCountryDiv = [''];

// CountryFlex maakt een div aan die de vlag en de titel bij elkaar in een div zet handig om een flexbox te maken!
let countryFlex = [''];

// De style zorgt ervoor dat de css wordt toegevoegd aan een id die bij iedere functie apart wordt gemaakt. zie uitleg hierbeneden als je wilt weten hoe.
let style = ['']

let countryDivId = []

const flag = [];

const name = [];

const population = [];

const region = [];

const subregion = [];

const populationBox = [];

const populationBoxId = [];


const countryFlexId = [];

let countryArray = [];


const landenKaart = ['Bouvet Island', 'Heard Island and Mcdonald Islands', 'South Georgia and the South Sandwich Islands',
    'Pitcairn', 'French Southern Territories', 'United States Minor Outlying Islands', 'Vatican City',
    'Cocos (Keeling) Islands', 'Antarctica', 'Bhutan', 'Guyana', 'Réunion', 'Comoros', 'Fiji', 'Djibouti',
    'Swaziland', 'Cyprus', 'Mauritius', 'Haiti', 'Belgium', 'Bolivia (Plurinational State of)', 'Tunisia'
    , 'Burundi', 'Benin', 'Rwanda', 'Guinea', 'Zimbabwe'
]


let iModulo9 = 0;


async function getCountry(country) {
    try {

        for (let i = 0; i < landenKaart.length; i++) {
            if (i % 9 === 0) {

                /* maakt een div met een lijst van 9 landen */
                createCountryDiv[i] = document.createElement('div');

                createCountryDiv[i].setAttribute('id', 'uniekeId' + i);

                createCountryDiv[i].setAttribute('style', 'margin-top: 30px; margin-bottom: 30px;')
                countryToDom.appendChild(createCountryDiv[i]);

                countryDivId[i] = document.getElementById('uniekeId' + i);

                iModulo9 = i
            }

            /* Deze if statement zorgt ervoor dat er voor elke vlag en titel een nieuwe div wordt aangemaakt
            * Ook zorgt het ervoor dat deze div steeds een identieke id krijgt.*/

            const result = await axios.get('https://restcountries.com/v2/name/' + country[i] + '?fullText=true');

            /* Het desbetreffende land zal toegevoegd worden aan de countryFlex array.
            * Het if statement zorgt er dan voor dat hij bij de volgende functieaanroep weer een lege array pakt
            * om een nieuw landnaam in te pushen dit zorgt ervoor dat we unieke divs kunnen maken
            * de zal namelijk nooit hetzelfde blijven*/
            countryFlex.push(country[i]);

            /* Hier wordt de div gemaakt en telkens aan een uniek array index toegevoegd
            * */
            countryFlex[i] = document.createElement('div');

            /* De country parameter in de functie kan als argument een lange naam met veel spaties krijgen
            * na lang na te hebben gedacht bedacht ik me dat je ook het eerste deel van de naam kan gebruiken als unieke id
            * Ik heb dus de split methode gebruikt om de country parameter te splitten in een array, en ik pak hiervan het eerste deel
            * met het indexnummer 0. Stel je hebt het land Bouvet Island dan zal Bouvet het nieuwe id worden van het div bestand!*/
            countryArray[i] = country[i].split(' ');
            countryFlex[i].setAttribute('id', countryArray[i][0]);


            /* Om ervoor te zorgen dat de vlag en het land horizontaal op een lijn staan heb ik
            * het style attribuut toegevoegd aan de countryFlex[i] div met als waarde display: flex;*/
            countryFlex[i].setAttribute('style', 'display:flex; ' +
                'padding: 0px; margin-botom: -5px;');


            /* De countryFlex (De naam heb ik gekozen omdat een flexbox maakt) moet natuurlijk wel
            aangeroepen worden als child van de countryDivId div.
             */
            countryDivId[iModulo9].appendChild(countryFlex[i]);

            populationBox[i] = document.createElement('div');
            populationBox[i].setAttribute('id', 'population' + i);
            populationBox[i].setAttribute('style', 'margin-top:-20px;')
            countryDivId[iModulo9].appendChild(populationBox[i])
            populationBoxId[i] = document.getElementById('population' + i)

            /* Wat hieronder staat spreekt voor zicht! */

            countryFlexId[i] = document.getElementById(countryArray[i][0]);

            flag[i] = result.data[0].flag;
            name[i] = result.data[0].name;
            population[i] = result.data[0].population;
            subregion[i] = result.data[0].subregion;
            region[i] = result.data[0].region;


            /* Hieronder wordt er een kleur toegewezen op basis van het continent van het land.*/

            if (region[i] === 'Africa') {
                countryFlex[i].setAttribute('class', region[i]);
            }
            else if (region[i] === 'Asia') {
                countryFlex[i].setAttribute('class', region[i]);
            }
            else if (region[i] === 'Europe') {
                countryFlex[i].setAttribute('class', region[i]);
            }
            else if (region[i].includes('Antarctic') || region[i] === 'Polar') {
                countryFlex[i].setAttribute('class', 'Antarctic');
            }
            else if (region[i] === 'Oceania') {
                countryFlex[i].setAttribute('class', region[i]);
            }
            else if (region[i] === 'Americas') {
                if (subregion[i].includes('South')) {
                    countryFlex[i].setAttribute('class', 'SouthAmerica');
                }
                else if (subregion[i].includes('North') || subregion[i] === 'Caribbean') {
                    countryFlex[i].setAttribute('class', 'NorthAmerica');
                }
            }

            console.log(result.data[0])


            /*De vlag wordt gemaakt en in de countryFlex div gestopt */

            const countryImage = document.createElement('img');
            countryImage.setAttribute('src', flag[i]);
            countryImage.setAttribute('width', '60');
            countryImage.setAttribute('height', '40');
            countryFlexId[i].appendChild(countryImage);

            /*De naam wordt gemaakt en in de countryFlex div gestopt */

            const countryName = document.createElement('h2');
            countryName.setAttribute('class', 'countryFlex');
            countryName.textContent = '' + name[i] + '';
            countryFlexId[i].appendChild(countryName);


            /* De population wordt gemaakt en word in de populationBox div gestopt */

            const countryPopulation = document.createElement('h5');
            countryPopulation.textContent = 'The country has a population of ' + population[i] + ' people';
            populationBoxId[i].appendChild(countryPopulation);

        }
    } catch (e) {
        console.error(e);
    }

}

getCountry(landenKaart)
