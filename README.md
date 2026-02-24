# My Record Shelf | UCD Front End Development Diploma

This is a vinyl collection tracker built for the UCD Professional Academy Diploma in Front-End Web Development. This application allows you to search for albums using the iTunes Search API, build your personal collection, log your listening activity, and see your most played records. 

<img src="/src/assets/Screenshot 2026-02-23 at 13.35.23.png" alt="My Record Hub">

* Live site: https://shanhunf.github.io/
* Figma designs: https://www.figma.com/design/qINYoVgUuRKIfKLE9ni4wY/ucd-project?node-id=0-1&t=bl7fBR64G933d9ow-1

## Features

- <b> Search Albums:</b> Search the iTunes music database for albums
- <b>Collection Management:</b> Add and remove albums from your personal collection
- <b>Search Within Collection:</b> Filter your saved albums by title or artist
- <b>Log Listening Activity:</b> Track when you listen to albums with a single click
- <b>Most Listened:</b> View your top 10 most played records, sorted by listen count
- <b>Responsive Design:</b> Hamburger navigation on mobile, sidebar on desktop, amount of albums displayed changes based on screen size
- <b>Data Persistence:</b> Collection and listen data saved in localStorage across pages
- <b>Keyboard Accessible:</b> Focus states, tab navigation, and keyboard-triggered actions

### Prerequisites

- Node.js (v18 or higher)
- npm
- Astro

Astro Installation Docs https://docs.astro.build/en/install-and-setup/

### Installing

Clone the repository

```
git clone https://github.com/shanhunf/shanhunf.github.io.git
cd shanhunf.github.io
```

Install dependencies

```
npm install
```

Start the development server
```
npm run dev
```
Open your browser and go to
```
http://localhost:4321
```
You should see the Search Records page with rock/pop albums preloaded from the iTunes API. The collection starts empty and the preloaded albums on the Search page are just search results, not saved records. Try searching for an artist, adding albums to your collection, and logging a listen to see the stats page populate.

## Project Structure

```
src
├── assets
│   ├── altrecord.jpeg
│   ├── astro.svg
│   └── background.svg
├── components
│   ├── ActionBTN.astro
│   ├── AlbumCard.astro
│   ├── CollectionCard.astro
│   ├── ListenDropup.astro
│   ├── SearchBar.astro
│   └── Sidenav.astro
├── js
│   ├── collection-page.js
│   ├── discogs.js
│   ├── display-collection.js
│   ├── search-page.js
│   ├── sidenav.js
│   └── stats-page.js
├── layouts
│   └── Layout.astro
├── pages
│   ├── collection.astro
│   ├── index.astro
│   └── stats.astro
└── style
    └── global.css
public
└── favicon.svg
docs
├── Accessibility Report
│   ├── Accessibility Screenshot.png
│   └── Link
├── Archived Code
│   └── ARCHIVEdiscogs.js
├── Lighthouse Report
│   ├── Most Listened Lighthouse.html
│   ├── Most Listened | Desktop.png
│   ├── Most Listened | Mobile.png
│   ├── My Collection Page Lighthouse Report.html
│   ├── My Collection | Desktop.png
│   ├── My Collection | Mobile.png
│   ├── Search Main Page Lighthouse.html
│   ├── Search Main Page | Desktop.png
│   └── Search Main Page | Mobile.png
└── Wireframes
    ├── Figma Link
    └── Layouts.png

```
## The Process

<h3>Figma Wireframes</h3>
The interface was designed in Figma before any code was written. I created wireframes for each page.

<h3>Figma Developer Mode → CSS</h3>
I used Figma's developer mode to extract CSS values directly from my designs including colours, font sizes, spacing, border-radius, and gradients. For example, the card gradient (linear-gradient(#3b3b3b, #242424)), the accent colour (#DEC5FF), and spacing values all came directly from the Figma file.

<h3>Discogs API Access Suspended</h3>
This project uses the <b>iTunes Search API</b> to fetch album data. No API key or authentication is required.

The project originally used the <b>Discogs API</b>, but my access was suspended during development as I exposed my token. I switched to the iTunes Search API which provided the same data I needed (Artist, Album Title, Album Cover) without needing a Token. I used AI to help me understand how to restructure the data using the new API so the rest of my code wouldn't need to change.

<h3>API Rate Limiting</h3>
Without debouncing, every keystroke in the search bar triggered an API call. Typing "Pink Floyd" sent 12 requests in under a second, causing failures. So I added a 500ms debounce function that waits for the user to stop typing before making the API call. I learned about debouncing from FreeCodeCamp.

<h3>Overriding Bootstrap Styling</h3>
Bootstrap's default dropdown, button styles and grid/card styles conflicted with my intended design. I couldn't figure out how to fix this and used AI assistance to learn that I needed to override the styles 

```
.card.listenalbum-card,
.card.collection-card {
  background: none;
  border: none;
  padding: 0;
}
```

<h3>Checkbox Toggle State with JavaScript</h3>
The "Add to Collection" button uses a checkbox. But the default checkbox behaviour wasn't syncing with localStorage, the button would visually reset on page refresh even though the data was saved. I sought AI assistance here to understand why the state wasn't persisting once I refreshed the page and learned I had to override the default checkbox behaviour and manually set the checkbox to checked based on the isInCollection() function. I also needed to add tabindex="0" to the label and a keydown event listener for Enter key support.

<h3>Sidebar Count Not Updating in Real Time</h3>
The collection count in the sidebar only updated on page load, not when adding or removing albums. My instructor suggested using addEventListener('click', updateSidebarCount) as a starting point. I realised I was only adding UpdateSidebar function to the display collection page and needed to also add it to the Search Collection page.

## Deployment

Deployed to GitHub Pages with automatic builds on push to main branch.
<h5>To deploy manually </h5>

- npm run build

- npm run deploy
- Live site: https://shanhunf.github.io/

## Built With

* Astro
* Bootstrap 
* iTunes Search API
* Figma 
* GitHub Pages

## What I Learned

I'm a Product Designer by profession, and have built applications using HTML & CSS before, but never JavaScript. 

<b>Key takeaways:</b>

* <b>API security:</b> I originally exposed my Discogs token in the code, which contributed to my access being suspended. I learned tokens should be stored in .env files and never committed to GitHub
* <b>Calling APIs</b> How to use fetch() and async/await, normalise responses with .map(), and why debouncing is essential to avoid rate limiting
* <b>JavaScript fundamentals</b> Event listeners, if statements, arrays, localStorage with JSON.parse()/JSON.stringify()
* <b>Bootstrap + custom CSS</b> How to use Bootstrap's grid alongside my own designs and override its defaults when they conflict
* <b>Astro & deployment</b> Setting up an Astro project, understanding its component architecture, and deploying to GitHub Pages with Git
* <b>Accessibility</b> Making elements keyboard accessible with tabindex, aria-label, and keydown listeners, and running Lighthouse audits
* <b>Chrome Inspect</b> Using the console and snippets panels, testing the responsiveness, updating elements live on site.
* This project changed how I think about design handoff. I now understand why developers push back on certain designs, what error and loading states look like in code, and how much work goes into things like a toggle button or search bar


## Versioning

This project uses Git for version control with regular commits and descriptive messages. For the versions available, see the commits on this repository.



## Acknowledgments

* <b>Note on AI usage:</b> Throughout this project I used AI tools (ChatGPT & Claude) as learning aids alongside documentation and tutorials. Where AI helped me solve a specific problem, I've noted it above. All code was written and adapted by me.
* <b> W3Schools: JSON Parse</b> https://www.w3schools.com/js/js_json_parse.asp
* <b> W3Schools: Async Function </b> https://www.w3schools.com/js/js_async.asp
* <b>W3Schools: How To Mobile Navigation: </b> https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_mobile_navbar
* <b>W3Schools: How To Filter Lists: </b> https://www.w3schools.com/howto/howto_js_filter_lists.asp
* <b>MDN Web Docs</b> JavaScript reference for filter, sort, slice, includes, localStorage, Fetch API, Arrays, encodeURIComponent | https://developer.mozilla.org/en-US/docs/Web/CSS/opacity , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
* <b>FreeCodeCamp</b> JavaScript Debounce [Debounce implementation reference](https://www.freecodecamp.org/news/javascript-debounce-example/)
* <b>Figma Developer Mode</b> — Used to extract CSS values from designs, https://www.figma.com/design/qINYoVgUuRKIfKLE9ni4wY/ucd-project?node-id=0-1&t=bl7fBR64G933d9ow-1
* <b> ITunes Search API</b> https://performance-partners.apple.com/search-api
* <b>My UCD instructor</b> for guidance throughout the course and project. For guidance on debugging the sidebar count and encouraging the use of browser developer tools to debug issues.
