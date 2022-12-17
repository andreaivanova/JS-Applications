import { getAll, getMyItems } from '../api/data.js';
import { getUserData } from '../util.js';
import { html } from '../lib.js';


const catalogTemplate = (shoes, noShoes) => html`

<section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
      <!-- Display a li with information about every post (if any)-->
     
      ${noShoes ? noShoesTemplate() : shoes.map(itemTemplate)}
    </ul>

  </section>

`

const noShoesTemplate = () => html`

<h2>There are no items added yet.</h2>

`;

const itemTemplate = (shoe) => html`
     <li class="card">
        <img src="${shoe.imageUrl}" alt="travis" />
        <p>
          <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
        </p>
        <p>
          <strong>Model: </strong
          ><span class="model">${shoe.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
        <a class="details-btn" href="/details/${shoe._id}">Details</a>
      </li>
`


export async function dashboardPage(ctx) {
    const shoes = await getAll();


    let noShoes = shoes.length === 0;
    ctx.render(catalogTemplate(shoes, noShoes))

}












