
import { searchByGenre, searchReleases } from "./discogs.js";

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("results-grid");
  const input = document.querySelector(".search-bar input");

  if (!grid || !input) {
    console.error("Missing grid or input");
    return;
  }

  function render(results) {
    grid.innerHTML = "";

    if (!Array.isArray(results)) return;

    results.slice(0, 20).forEach(item => {
      if (!item.cover_image) return;

      let artist = "Unknown Artist";
      let album = item.title || "Unknown Album";

      if (album.includes(" - ")) {
        const parts = album.split(" - ");
        artist = parts[0];
        album = parts[1];
      }

      grid.innerHTML += `
  <div class="col">
    <div class="collection-card h-100">
      <div class="collection-card__image">
        <img src="${item.cover_image}" alt="${album}" />

        <!-- ADD TO COLLECTION BUTTON -->
        <label class="collection-btn">
          <input type="checkbox" class="collection-btn__checkbox" />

          <span class="collection-btn__icon">
            <span class="icon-plus">+</span>
            <span class="icon-check">✓</span>
          </span>

          <span class="collection-btn__text">
            <span class="text-default">Add to Collection</span>
            <span class="text-active">Added</span>
          </span>
        </label>
      </div>

      <div class="collection-card__meta">
        <h5 class="collection-card__title">${album}</h5>
        <p class="collection-card__artist">${artist}</p>
      </div>
    </div>
  </div>
`;

    });
  }

  async function loadPopular() {
    const rock = await searchByGenre("Rock");
    const pop = await searchByGenre("Pop");
    render([...(rock.results || []), ...(pop.results || [])]);
  }

  input.addEventListener("input", async () => {
    const query = input.value.trim();

    if (query === "") {
      loadPopular();
      return;
    }

    const data = await searchReleases(query);
    render(data.results || []);
  });

  loadPopular();
});
