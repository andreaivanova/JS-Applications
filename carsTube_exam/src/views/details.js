import {  deleteItem} from "../api/data.js";
import { getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const detailsTemplate = (item, isOwner, onDelete) => html`

<!--Details Page-->
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=">${item.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${item.brand}</li>
            <li><span>Model:</span>${item.model}</li>
            <li><span>Year:</span>${item.year}</li>
            <li><span>Price:</span>${item.price}</li>
        </ul>

        <p class="description-para">${item.description}</p>

            
            <div class="listings-buttons">
            ${isOwner ? html`<a href="/details/edit/${item._id}" class="button-list">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)"  class="button-list">Delete</a>` : null}
            
        </div>
    </div>
</section>
    
    
    `



/*



 ${isOwner ? html`<a href="${`edit/${item._id}`}" class="edit-btn btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>` : null}

*/

export async function detailsPage(ctx) {
  
    //item is an object
    const userData = getUserData();
    const item = await getById(ctx.params.id);
    

    let isOwner;
    if (userData) {

        isOwner = userData.id === item._ownerId;

        
    }
    

    ctx.render(detailsTemplate(item, isOwner, onDelete))
    // ctx.render(detailsTemplate(item, isOwner, onDelete))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this item?');

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/all-listings')
        }
    }

}



