import { getAll } from '../api/data.js';
import { html } from '../lib.js';


// const catalogTemplate = (furniture) => html`

//     ${furniture.map(itemTemplate)}

//   `

/*
_createdOn: 1615545143015
_id: "53d4dbf5-7f41-47ba-b485-43eccb91cb95"
_ownerId: "35c62d76-8152-4626-8712-eeb96381bea8"
description: "Medium table"
img: "./images/table.png"
make: "Table"
material: "Hardwood"
model: "Swedish"
price: 235
year: 2015
*/



const itemTemplate = (item) => html`
    <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${item.img}" />
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${item._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>

`
export async function dashboardPage(ctx) {
    const furniture = await getAll();
    console.log(furniture);
    ctx.render(furniture.map(itemTemplate))

}












