import { getAll } from '../api/data.js';
import { html } from '../lib.js';


const catalogTemplate = (pets, noPets) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">

        ${noPets ? noPetsTemplate() : pets.map(petTemplate)}

    </div>
</section>
`


const noPetsTemplate = () => html`
<div>
    <p class="no-pets">No pets in dashboard</p>
</div>
`;

const petTemplate = (pet) => html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src="${pet.image}">
    </article>
    <h2 class="name">${pet.name}</h2>
    <h3 class="breed">${pet.breed}</h3>
    <div class="action">
        <a class="btn" href="/details/${pet._id}">Details</a>
    </div>
</div>
`



//the address of the userpage depends on the app
export async function dashboardPage(ctx) {
    const pets = await getAll();

    let noPets = pets.length === 0;
    ctx.render(catalogTemplate(pets, noPets))

}

