import {  deleteItem} from "../api/data.js";
import { getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const detailsTemplate = (item, isOwner, onDelete) => html`

<!--Details Page-->
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${item.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${item.name}</h1>
                <h3>Artist: ${item.artist}</h3>
                <h4>Genre: ${item.genre}</h4>
                <h4>Price: $${item.price}</h4>
                <h4>Date: ${item.date}</h4>
                <p>Description: ${item.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            <div class="actionBtn">
              ${isOwner ? html`<a href="/details/edit/${item._id}" class="edit">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>` : null}
                  
            
            </div>
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
            ctx.page.redirect('/catalog')
        }
    }

}



