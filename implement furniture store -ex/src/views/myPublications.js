import { getMyItems } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const catalogTemplate = (furniture) => html`
  <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">


            ${furniture.map(itemTemplate)}
        </div>

  `

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


      


`
export async function myPublicationsPage(ctx) {
    const id = getUserData().id;
    const furniture = await getMyItems(id);

    // console.log(furniture);
    ctx.render(catalogTemplate(furniture))

}












