import { getCollection } from "./collection-page.js";

document.addEventListener("DOMContentLoaded", () => {
  updateSidebarCount();
});

function updateSidebarCount() {
  const collection = getCollection(); //get saved albums from the array 
  const countElement = document.getElementById('sidebar-count'); //the html that shows the subtitle
  
  if (countElement) {
    const count = collection.length; 
    countElement.textContent = `${count} Record${count === 1 ? '' : 's'} in Collection`; //update text to this based on array
    countElement.classList.add('loaded'); //the line was glitching when the page was loading, this helps it be less glitchy with css
  }
}