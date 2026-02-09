// NOTE: No longer using Discogs here because access is suspended. The iTunes Search API is a public REST API and does not require a token. But keeping the file name discogs as I have already called it in multiple files 
const DISCOGS_TOKEN = ""; // kept here so the rest of the project structure doesn't break


// SEARCH PAGE LOAD

/*  USED THIS TO LEARN HOW TO USE FETCH: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch */ 
export async function searchByGenre (genre){ /* use export because I'll be using this function in other files */

  try{
    // iTunes doesn't have genre filter like Discogs, so search by term instead
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(genre)}&entity=album&limit=50`
    );

    if (!response.ok) {
      throw new Error(`Sorry! Can't access the record archives right now. STATUS: ${response.status}`);     /* if the albums fail to load display this error message, !response.ok checks if the API request failed */
    }

    const result = await response.json();
    console.log(result);

    /* .map() to normalise API results
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map transforms an array of objects into a new shape*/
    const albums = result.results.map(item => ({
      id: item.collectionId,
      title: item.collectionName,
      artist: item.artistName,
      cover_image: item.artworkUrl100.replace("100x100", "300x300") // replace () get a bigger image https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    }));

    return { results: albums };

  } catch (error) {
    console.error(error.message);
    return { results: [] };
  }
}

// SEARCH BAR 

export async function searchReleases (query){ /* using query this time to search everything */

  try{
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=album&limit=50`
    ); /* URI is for special characters, release only shows albums not artists, as this is what I want the search page to populate with https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent Template literals needed because I was getting errors for '' Template literals (backticks):

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals*/

    if (!response.ok) {
      throw new Error(`Sorry! Can't access the record archives right now. STATUS: ${response.status}`);     /* if the albums fail to load display this error message, !response.ok checks if the API request failed */
    }

    const result = await response.json();
    console.log(result);

    // Normalise the iTunes data so it matches what the rest of the app expects
    const albums = result.results.map(item => ({
      id: item.collectionId,
      title: item.collectionName,
      artist: item.artistName,
      cover_image: item.artworkUrl100.replace("100x100", "300x300")
    }));

    return { results: albums };

  } catch (error) {
    console.error(error.message);
    return { results: [] };
  }
}
