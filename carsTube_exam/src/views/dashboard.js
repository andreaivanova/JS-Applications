import { getAll } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const catalogTemplate = (cars, noCars) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">


        ${noCars ? noItemsTemplate() : cars.map(x=>itemTemplate(x))}

    </div>
</section>
   
  `

const noItemsTemplate = () => html`
    <p class="no-cars">No cars in database.</p>
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


export async function dashboardPage(ctx) {
    const cars = await getAll();

    let noCars = cars.length === 0;
    ctx.render(catalogTemplate(cars, noCars))

}












