const DISCOGS_TOKEN = "mxbmGqLkbfkPiMJNwJtDZSAYWVWCTGNMYQaPTTTf";

/* Search by genre (used on page load) */
export async function searchByGenre(genre) {
  const response = await fetch(
    `https://api.discogs.com/database/search?genre=${encodeURIComponent(
      genre
    )}&type=release`,
    {
      headers: {
        Authorization: `Discogs token=${DISCOGS_TOKEN}`,
      },
    }
  );

  if (!response.ok) throw new Error("Discogs failed");

  return response.json();
}


/* Search bar */
export async function searchReleases(query) {
  const response = await fetch(
    `https://api.discogs.com/database/search?q=${encodeURIComponent(
      query
    )}&type=release`,
    {
      headers: {
        Authorization: `Discogs token=${DISCOGS_TOKEN}`,
      },
    }
  );

  if (!response.ok) throw new Error("Discogs failed");

  return response.json();
}