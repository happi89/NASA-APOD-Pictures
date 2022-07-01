const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');

const count = 5;
const API_KEY = '6fp7smAgUjVlxaxFcVLpRdMYCjI6dIcc4l4V7Y9w'
const apiUrl = `https://api.nasa.gov/planetary/apod?count=${count}&api_key=${API_KEY}`;

let resultsArray = [];
let favorites = {};

function createDOMNodes(page) {
  const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
  console.log(currentArray)

  currentArray.forEach((result) => {
    // card 
    const card = document.createElement('div');
    card.classList.add('card');
    // link to full image
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.target = '_blank';
    link.title = 'View Full Image';
    // img 
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture of the Day';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    //card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // card title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    // favorites button
    const favoritesBtn = document.createElement('p');
    favoritesBtn.classList.add('clickable');
    if(page === 'results') {
      favoritesBtn.textContent = 'Add to Favorites';
      favoritesBtn.setAttribute('onclick', `saveToFavorites('${result.url}')`);
    } else {
      favoritesBtn.textContent = 'Remove From Favorites';
      favoritesBtn.setAttribute('onclick', `removeFromFavorites('${result.url}')`);
    }
    // card text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;
    // copyright and date container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // date
    const picDate = document.createElement('strong');
    picDate.textContent = result.date;
    // copyright
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;
    // layout
    footer.append(picDate, copyright);
    cardBody.append(cardTitle, favoritesBtn, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  })
}

function handleUi(page) {
  if(page === 'results') {
    resultsNav.classList.remove('hidden');
    favoritesNav.classList.add('hidden');
  } else {
    resultsNav.classList.add('hidden');
    favoritesNav.classList.remove('hidden');
    window.scrollTo({top: 0, scroll: 'instant'});
  }

  if(localStorage.getItem('FavoriteNasaPictures')) {
    favorites = JSON.parse(localStorage.getItem('FavoriteNasaPictures'));
  }
  imagesContainer.textContent = '';
  createDOMNodes(page)
}

async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    handleUi('results');
  } catch(err) {
    console.log(err)
  }
}

// add to favorites
function saveToFavorites(itemUrl) {
  resultsArray.forEach((item) => {
    if(item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // show confirmation 
      saveConfirmed.textContent = 'SAVED!'
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // save favorie in local storage
      localStorage.setItem('FavoriteNasaPictures', JSON.stringify(favorites));
    };
  });
};

function removeFromFavorites(itemUrl) {
  if(favorites[itemUrl]) {
    delete favorites[itemUrl];
    // show confirmation 
    saveConfirmed.textContent = 'REMOVED!';
    saveConfirmed.hidden = false;
    setTimeout(() => {
      saveConfirmed.hidden = true;
    }, 2000);
    // save favorie in local storage
    localStorage.setItem('FavoriteNasaPictures', JSON.stringify(favorites));
    handleUi('fav');
  };
};

// on load
getNasaPictures();