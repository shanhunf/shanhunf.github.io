// IMPORT FUNCTIONS
import { searchByGenre, searchReleases } from "./discogs.js";
import { getCollection, addToCollection, removeFromCollection, isInCollection } from "./collection-page.js";

function debounce(fn, delay = 500) {  /* Debounce needed because before it was added the api was being called to many times and overloaded https://www.freecodecamp.org/news/javascript-debounce-example/*/ 
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}


// PAGE LOAD
/* Don't run any js event listenes waits for the user to types into the search bar so it knows not to run until then */
/* async makes a function return a Promise await makes a function wait for a Promise https://www.w3schools.com/js/js_async.asp */
document.addEventListener("DOMContentLoaded", async () => { // Listen for user typing in search bar
  const grid = document.getElementById("results-grid"); // my bootsrap grid system class name in searchbar.astro
  const input = document.querySelector(".search-bar input"); // my search bar css & html class name from searchbar.astro

  if (!grid || !input) {
    console.error("Sorry! Can't access the record archives right now"); /* error message same as others in discogs.js for when albums wont load */
    return;
  }
 
  /* display albums */   
  function displayAlbums(albumsArray) { 
    grid.innerHTML = '';
    albumsArray.slice(0, 30).forEach(album => { /* i only want to show 30 albums because i dont want to overload the page https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice */

      const parts = album.title.split(' - ');
      const artist = parts[0] || 'Unknown Artist'; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split I need to split the artist & album title because without this artist is being returned as undefined & the artist & album are being displayed in the title, I want them to be on different lines
      const albumTitle = parts[1] || album.title;
      const isAlreadySaved = isInCollection(album.id);
      console.log(`Album: ${albumTitle}, ID: ${album.id}, isAlreadySaved: ${isAlreadySaved}`); 

    


      /* easier to use inner html as I couldnt figure out how to import the astro component */
      grid.innerHTML += ` 
        <div class="col">
          <div class="collection-card h-100"> <!-- using Bootstrap -->
            <div class="collection-card-image"> <!-- Album cover image -->
              <img src="${album.cover_image}" alt="${album.title}" /> 

              <!-- ADD TO COLLECTION BUTTON --> 
              <label class="collection-btn" 
                data-album-id="${album.id}" 
                data-album-title="${albumTitle}" 
                data-album-artist="${artist}" 
                data-album-image="${album.cover_image}">
                <input type="checkbox" class="collection-btn-checkbox" ${isAlreadySaved ? 'checked' : ''} />

                <span class="collection-btn-icon">
                  <span class="icon-plus">+</span>
                  <span class="icon-check">✓</span>
                </span>

                <span class="collection-btn-text">
                  <span class="text-default">Add to Collection</span>
                  <span class="text-active">Added to Collection</span>
                </span>
              </label>
            </div>

            <div class="collection-card-info">
              <h5 class="collection-card-title">${albumTitle}</h5>  <!-- h5 for album title because I want it to be visually bigger  -->
              <p class="collection-card-artist">${artist}</p> <!-- artist is a paragraph because visually smaller  -->
            </div>
          </div>
        </div>
      `;
    });
  }

  // LOAD ROCK ALBUMS
  /* need to call the function reminder: async is a promise and then await waits until that promise is loaded and returns results, so here I am calling to preload the albums */  
  async function preloadAlbums() {
    const music = await searchByGenre("Rock"); // displaying rock music for the page load (the rock albums look the best on the page over other genres)
    displayAlbums(music.results); // Use the data to display albums
  }
 
  await preloadAlbums(); /* and here I am loading the albums once the function has loaded so the page isnt empty without search */   

  // LOAD ALBUMS FOR SEARCH  
const debouncedSearch = debounce(async (query) => {  // had to add debounce because without it when I was searching I was reaching an API limit very fast and everything was breaking 
  if (!query || query.length < 2) return;

  const data = await searchReleases(query);
  displayAlbums(data.results);
}, 500);

input.addEventListener('input', (event) => {
  debouncedSearch(event.target.value.trim());
});


  // SAVE ALBUM BTN CLICK
grid.addEventListener('click', (event) => {
  const button = event.target.closest('.collection-btn');
  
  if (button) {
    event.preventDefault(); // overriding default checkbox behaviour, as when I was refreshing it wasnt saving the check 
    event.stopPropagation(); 
    
    const checkbox = button.querySelector('.collection-btn-checkbox');
    const albumData = {
      id: button.dataset.albumId,
      title: button.dataset.albumTitle,
      artist: button.dataset.albumArtist,
      image: button.dataset.albumImage
    };
    
    if (isInCollection(albumData.id)) {
      removeFromCollection(albumData.id);
      checkbox.checked = false; // Manually uncheck
      console.log('Removed:', albumData.id);
    } else {
      addToCollection(albumData);
      checkbox.checked = true; // Manually check
      console.log('Added:', albumData.id);
    }
  }
});
});