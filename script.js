const favoritesBtn = document.getElementById('favorites');
const loadMoreBtn = document.getElementById('load-more');
const dateEl = document.getElementById('date');
const copyrightEl = document.getElementById('copyright')
const imgTitle = document.getElementById('img-title');

const count = 1;
const API_KEY = 'DEMO_KEY'

const apiUrl = `https://api.nasa.gov/planetary/apod?count=${count}&api_key=${API_KEY}`;

let resultsArray = [];

function handleUi() {
  console.log(resultsArray[0][date])
  // dateEl.textContent = resultsArray[date];
}


async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    const resultsArray = await response.json();
    console.log(resultsArray);
    handleUi()
  } catch(err) {
    console.log(err)
  }
}


// on load
getNasaPictures();