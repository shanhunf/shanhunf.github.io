// IMPORT FUNCTIONS
import { getCollection, removeFromCollection, logListen } from "./collection-page.js";

// PAGE LOAD
document.addEventListener("DOMContentLoaded", () => { /* same page load as in search-page.js */ 
  const grid = document.getElementById("results-grid");
  const input = document.querySelector(".search-bar input");

  if (!grid) {
    console.error("Sorry can't access your collection right now!"); /* Instead of preloading the page with genre releases pre load with a message */
    return;
  }

  // DISPLAY SAVED ALBUMS
  function displayCollection() {
    const collection = getCollection();
    const emptyState = document.getElementById('empty-state');
    grid.innerHTML = '';

    if (collection.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    collection.forEach(album => { /* drop up button*/
      grid.innerHTML += ` 
        <div class="col">
          <div class="collection-card h-100">
            <div class="collection-card-image">
              <img src="${album.image}" alt="${album.title}" /> 

              <!-- LOG BUTTON DROPDOWN -->
              <div class="btn-group dropup">
                <button
                  type="button"
                  class="btn log-btn-trigger dropdown-toggle"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-expanded="false"
                >
                  Manage Record
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item log-today" href="#" data-album-id="${album.id}">Log Listen</a></li>
        
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item text-danger remove-album" href="#" data-album-id="${album.id}">Remove from collection</a></li>
                </ul>
              </div>
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

  // SEARCH COLLECTION, using display none to filter the cards that isnt in the search https://www.w3schools.com/howto/howto_js_filter_lists.asp
  if (input) {
    input.addEventListener('input', (event) => {
      const query = event.target.value.trim().toLowerCase(); // makes the search not case sensitive
      const cards = grid.querySelectorAll('.col');

      cards.forEach(card => {
        const title = card.querySelector('.collection-card-title')?.textContent.toLowerCase() || '';
        const artist = card.querySelector('.collection-card-artist')?.textContent.toLowerCase() || '';

        if (!query || title.includes(query) || artist.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // DROPUP BTN ACTIONS
  grid.addEventListener('click', (event) => { // adding event listener here because I am going to assign a count to the album that it is clicked on and then display it 
    event.preventDefault();
    
    // LOG TODAY'S LISTEN
    if (event.target.classList.contains('log-today')) {
      logListen(event.target.dataset.albumId);
      console.log('Logged listen!');
    }

    if (event.target.classList.contains('remove-album')) {
      const albumId = event.target.dataset.albumId;
      removeFromCollection(albumId);
      displayCollection();
    }
  });
  displayCollection();
  });
