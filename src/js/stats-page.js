import { getCollection } from "./collection-page.js";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("stats-grid");

  if (!grid) return;

  const collection = getCollection();

  // Get albums that have been listened to, sorted by most listens
  const listened = collection
    .filter(album => album.listenCount > 0)
    .sort((a, b) => b.listenCount - a.listenCount)
    .slice(0, 10);

  if (listened.length === 0) {
    grid.innerHTML = '<p>No listens logged yet. Go listen to some records!</p>';
    return;
  }

  listened.forEach(album => {  // displaying albums on stats page, show the collection card and the API details
    grid.innerHTML += `
      <div class="col">
        <div class="collection-card h-100">
          <div class="collection-card-image">
            <img src="${album.image}" alt="${album.title}" />
          </div>
          <div class="collection-card-info">
            <h5 class="collection-card-title">${album.title}</h5>
            <p class="collection-card-artist">${album.artist}</p>
            <p class="listen-count">${album.listenCount} listen${album.listenCount === 1 ? '' : 's'}</p>
          </div>
        </div>
      </div>
    `;
  });
});