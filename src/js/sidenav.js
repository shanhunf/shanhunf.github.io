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
    countElement.classList.add('loaded'); //use debugger the line was glitching when the page was loading, this helps it be less glitchy with css
  }
}


// W3Schools-style hamburger toggle https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_mobile_navbar
function toggleMenu() {
  var x = document.getElementById("mobile-nav-links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

window.toggleMenu = toggleMenu;