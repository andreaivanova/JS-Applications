import { mostRecent } from '../api/data.js';
import { html } from '../lib.js';


const homeTemplate = (mostRecentGames, noGames) => html`
   <section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="./images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>

    ${noGames ? noGamesTemplate() : mostRecentGames.map(itemTemplate)}

    
    

   
</div>
</section>
`
const noGamesTemplate = ()=>html`
 <p class="no-articles">No games yet</p>

`


const itemTemplate =(item)=>html`

<div class="game">
        <div class="image-wrap">
            <img src="${item.imageUrl}">
        </div>
        <h3>${item.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${item._id}" class="btn details-btn">Details</a>
        </div>
    </div>

`

// category: "Vertical Shooter"
// ​​
// imageUrl: "/images/ZombieLang.png"
// ​​
// maxLevel: "100"
// ​​
// summary




//the address of the userpage depends on the app
export async function homePage(ctx) {
    const mostRecentGames = await mostRecent();
    const noGames = mostRecentGames.length === 0;
    ctx.render(homeTemplate(mostRecentGames, noGames))
   

}

