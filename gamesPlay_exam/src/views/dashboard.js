import {  getAll } from '../api/data.js';
import { html } from '../lib.js';


const catalogTemplate = (games, noGames) => html`
<section id="catalog-page">
    <h1>All Games</h1>
    <!-- Display div: with information about every game (if any) -->
 
  

    <!-- Display paragraph: If there is no games  -->
    
    ${noGames ? noGamesTemplate() : games.map(gameTemplate)}

</section>
`


const noGamesTemplate = () => html`
    <h3 class="no-articles">No articles yet</h3>
`;

const gameTemplate = (game) => html`
   <div class="allGames">
        <div class="allGames-info">
            <img src="${game.imageUrl}">
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/details/${game._id}" class="details-button">Details</a>
        </div>

    </div>
`



//the address of the userpage depends on the app
export async function dashboardPage(ctx) {
    const games = await getAll();

    let noGames = games.length === 0;
    ctx.render(catalogTemplate(games, noGames))

}

