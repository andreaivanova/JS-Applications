import {  deleteItem} from "../api/data.js";
import { getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const detailsTemplate = (item, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
      <p id="details-title">Shoe Details</p>
      <div id="img-wrapper">
        <img src="${item.imageUrl}" alt="example1" />
      </div>
      <div id="info-wrapper">
        <p>Brand: <span id="details-brand">${item.brand}</span></p>
        <p>
          Model: <span id="details-model">${item.model}</span>
        </p>
        <p>Release date: <span id="details-release">${item.release}</span></p>
        <p>Designer: <span id="details-designer">${item.designer}</span></p>
        <p>Value: <span id="details-value">${item.value}</span></p>
      </div>

      <!--Edit and Delete are only for creator-->
      <div id="action-buttons">

    ${isOwner ? html`<a href="/details/edit/${item._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
        


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
            ctx.page.redirect('/')
        }
    }

}



