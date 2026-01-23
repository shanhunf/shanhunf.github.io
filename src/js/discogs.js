// API access token from Discogs, making it a constant so I don't have to keep re-entering it https://dev.to/amirfakour/tips-to-use-constants-file-in-typescript-27je also placed the token code in an env file for security https://docs.astro.build/en/guides/environment-variables/
const DISCOGS_TOKEN = "mxbmGqLkbfkPiMJNwJtDZSAYWVWCTGNMYQaPTTTf";

/* This is so when the search record page loads, its not empty and is populated with albums */
/* Search by genre USED THIS TO HELP CALL API: https://publicapis.io/discogs-api | USED THIS TO LEARN HOW TO USE FETCH: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch */ 
 export async function searchByGenre (genre){ /* use export because I'll be using this function in other files */

try{
 const response = await fetch(`https://api.discogs.com/database/search?genre=${encodeURIComponent(genre)}&type=release`, {
 /* URI is for special characters, release only shows albums not artists, as this is what I want the search page to populate with https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent */
  headers: {'Authorization': `Discogs token=${DISCOGS_TOKEN}`,'User-Agent': 'MyRecordShelf/1.0 +https://shanhunf.github.io'} /* ${} means that it is taken as a value instead of literally */
})
    if (!response.ok) {
      throw new Error(`Sorry! Can't access the record archives right now. STATUS: ${response.status}`);     /* if the albums fail to load display this error message, !response.ok checks if the API request failed */
    }
    const result = await response.json ()
    console.log (result);
    return result;

  } catch (error) {
    console.error(error.message);
  }
}
    
  

/* This is for Search bar when the user wants to search for specific albums */

export async function searchReleases (query){ /* using query this time to search everything https://www.discogs.com/developers?srsltid=AfmBOoo_o0nuBlMFJ078jVJ7_CJhjSjMBjNsg5pt_WkRvauJOpreEHrm#page:database,header:database-search */

try{
 const response = await fetch(`https://api.discogs.com/database/search?query=${encodeURIComponent(query)}&type=release`, { /* URI is for special characters, release only shows albums not artists, as this is what I want the search page to populate with https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent Template literals needed because I was getting errors for '' Template literals (backticks):

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals*/
  headers: {'Authorization': `Discogs token=${DISCOGS_TOKEN}`,'User-Agent': 'MyRecordShelf/1.0 +https://shanhunf.github.io'} /* ${} means that it is taken as a value instead of literally */
})
    if (!response.ok) {
      throw new Error(`Sorry! Can't access the record archives right now. STATUS: ${response.status}`);     /* if the albums fail to load display this error message, !response.ok checks if the API request failed */
    }
    const result = await response.json ()
    console.log (result);
    return result;

  } catch (error) {
    console.error(error.message);
  }
}