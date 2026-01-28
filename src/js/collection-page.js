// IMPORT FUNCTIONS
import { getCollection, removeFromCollection } from "./collection-page.js";

// GET COLLECTION
export function getCollection() {
  const savedString = localStorage.getItem('collectalbum'); /* get info from local storage */
  
  if (savedString === null) {
    return []; // if no albums have been saved, return empty array
  }
  
  const albums = JSON.parse(savedString); /* convert it to json so it can be used https://www.w3schools.com/js/js_json_parse.asp */
  
  return albums;
}
// ADD TO COLLECTION
export function addToCollection(album) {
  const collection = getCollection();
  collection.push(album); /* add album to array https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push */
localStorage.setItem('collectalbum', JSON.stringify(collection));
}

// REMOVE FROM COLLECTION
export function removeFromCollection(albumId) {
  const collection = getCollection();
  const newCollection = collection.filter(album => album.id !== albumId);
    localStorage.setItem('collectalbum', JSON.stringify(newCollection));
}

// ALREADY IN COLLECTION 
export function isInCollection(albumId) {
    const collection = getCollection();
    return collection.some(album => String(album.id) === String(albumId)); /* Adding strings here because without it it was failing to match correct albums */
}