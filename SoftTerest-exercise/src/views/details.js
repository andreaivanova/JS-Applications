import {  deleteItem} from "../api/data.js";
import { getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const detailsTemplate = (item, isOwner, onDelete) => html`

<div class="container home some">
    <img class="det-img" src="${item.img}" />
    <div class="desc">
        <h2 class="display-5">${item.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${item.description}</p>
    </div>
    <div class="text-center">
${isOwner ? html` <a @click=${onDelete} class="btn detb" href="javascript:void(0)">Delete</a>
` : null}
       
    </div>
</div>

        
        

        `



/*



 ${isOwner ? html`<a href="${`edit/${item._id}`}" class="edit-btn btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>` : null}

*/

export async function detailsPage(ctx) {
  
    //item is an object
    const userData = getUserData();
    const item = await getById(ctx.params.id);
    console.log(item);

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
            ctx.page.redirect('/dashboard')
        }
    }

}



