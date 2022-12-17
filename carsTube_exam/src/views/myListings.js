import { getMyItems } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const catalogTemplate = (myItems, noCars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

       
        ${noCars ? noItemsTemplate() : myItems.map(itemTemplate)}
    </div>
</section>

   
  `

const noItemsTemplate = () => html`
   <p class="no-cars"> You haven't listed any cars yet.</p>
`;

const itemTemplate = (car) => html`
      <div class="listing">
            <div class="preview">
                <img src="${car.imageUrl}">
            </div>
            <h2>${car.brand} ${car.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${car.year}</h3>
                    <h3>Price: ${car.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/details/${car._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>


`



export async function myListingsPage(ctx) {
    const userData = getUserData();
    let myItems = await getMyItems(userData.id);
    console.log(myItems);
    let noCars = myItems.length === 0;
    ctx.render(catalogTemplate(myItems, noCars))
   

}

