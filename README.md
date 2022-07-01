# NASA-APOD-Pictures

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Be able to add and remove pictures from favorites
- See a notification that picture was removed or added from favorites
- Be able to load more pictures.
- Be able to see full picture when picture is clicked

### Screenshot

![Screenshot from 2022-07-01 18-39-49](https://user-images.githubusercontent.com/101960666/176974919-1916ec1a-a9da-470e-8c11-e55b25962a4f.png)

### Links

- Live Site URL: [NASA APOD Pictures](happi89.github.io/nasa-apod-pictures/)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Mobile-first workflow

### What I learned

learnt about the small tag
```html
<small></small>
```

functions to add and remove pictures from favorites
```js
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
```

### Continued development

I learnt how to use api's and I will be making a weather app using the mars weather API!

### Useful resources

- [NASA API's](https://api.nasa.gov/) - I will be making a weather app for the weather on mars
