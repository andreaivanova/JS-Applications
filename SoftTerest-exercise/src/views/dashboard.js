import { getAll } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const catalogTemplate = (ideas, noIdeas) => html`


<div id="dashboard-holder">
    ${noIdeas ? noItemsTemplate() : ideas.map(x=>itemTemplate(x))}
    </div>
`

const noItemsTemplate = () => html`
<h1>No ideas yet! Be the first one :)</h1>
   
`;

const itemTemplate = (item) => html`
  

    <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
        <div class="card-body">
            <p class="card-text">${item.title}</p>
        </div>
        <img class="card-image" src="${item.img}" alt="Card image cap">
        <a class="btn" href="/details/${item._id}">Details</a>
    </div>
   


`


export async function dashboardPage(ctx) {
    const ideas = await getAll();
    // console.log(ideas);
    let noIdeas = ideas.length === 0;
    ctx.render(catalogTemplate(ideas, noIdeas))

}












