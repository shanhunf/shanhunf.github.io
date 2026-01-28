// IMPORT FUNCTIONS
import { getCollection, removeFromCollection } from "./collection-page.js";

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
    grid.innerHTML = '';

    if (collection.length === 0) {
      grid.innerHTML = '<p>No albums in your collection yet. Go add some!</p>';
      return;
    }

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
                  Log Listening Activity
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item log-today" href="#" data-album-id="${album.id}">Log today's listen</a></li>
                  <li><a class="dropdown-item log-previous" href="#" data-album-id="${album.id}">Log previous listen</a></li>
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

  // DROPUP BTN ACTIONS
  grid.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (event.target.classList.contains('remove-album')) {
      const albumId = event.target.dataset.albumId;
      removeFromCollection(albumId);
      displayCollection();
    }
  });

  // When have albums added load albums on page load
  displayCollection();
});