/* Importing the search and page load functions from discogs.js */
import { searchByGenre, searchReleases } from "./discogs.js";


/* Don't run any js event listenes waits for the user to types into the search bar so it knows not to run until then */

/* async makes a function return a Promise await makes a function wait for a Promise https://www.w3schools.com/js/js_async.asp */
document.addEventListener("DOMContentLoaded", async () => { // Listen for user typing in search bar
  const grid = document.getElementById("results-grid"); // my bootsrap grid system class name in searchbar.astro
  const input = document.querySelector(".search-bar input"); // my search bar css & html class name from searchbar.astro

  if (!grid || !input) {
    displayError("Sorry! Can't access the record archives right now "); /* error message same as others in discogs.js for when albums wont load */
    return;
  }
 
  /* display albums */   

  function displayAlbums(albumsArray){ 
    grid.innerHTML = '';
    albumsArray.slice(0,30).forEach(album => { /* i only want to show 30 albums because i dont want to overload the oage */



/* easier to use inner html as I couldnt figure out how to import the astro component*/

  grid.innerHTML += ` 
  <div class="col">
    <div class="collection-card h-100">
      <div class="collection-card-image">
        <img src="${album.cover_image}" alt="${album.title}" />

        <!-- ADD TO COLLECTION BUTTON -->
        <label class="collection-btn">
          <input type="checkbox" class="collection-btn-checkbox" />

          <span class="collection-btn-icon">
            <span class="icon-plus">+</span>
            <span class="icon-check">✓</span>
          </span>

          <span class="collection-btn__text">
            <span class="text-default">Add to Collection</span>
            <span class="text-active">Added</span>
          </span>
        </label>
      </div>

      <div class="collection-card-info">
        <h5 class="collection-card-title">${album.title}</h5>
        <p class="collection-card-artist">${album.artist}</p>
      </div>
    </div>
  </div>
`;

    });

  }

/* Load albums for page*/   

  /* need to call the function reminder: async is a promise and then await waits until that promise is loaded and returns results, so here I am calling to preload the albums */  
  async function preloadAlbums() {
    const music = await searchByGenre("Rock"); // displaying rock music for the page load (the rock albums look the best on the page over other genres)
    displayAlbums(music.results); // Use the data to display albums
  }
 
  await preloadAlbums (); /* and here I am loading the albums once the function has loaded so the page isnt empty without search*/   

/* Load albums for search*/   
  input.addEventListener ('input', async (event) => {
  const query = event.target.value;
  const data = await searchReleases(query);
  displayAlbums(data.results); 
});

});