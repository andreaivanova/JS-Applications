import { likeItem, deleteItem, getTotalLikes, getLikeFromUser } from "../api/data.js";
import { getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (item, isOwner, onDelete, isUserNotOwner, onLike, totalLikes) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${item.title}</h1>
            <div>
                <img src="${item.imageUrl}" />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${item.description}</p>
            <h4>Date: ${item.date}</h4>
            <h4>Author: ${item.author}</h4>

            
            <div class="buttons">

            ${isOwner ? html`<a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/details/edit/${item._id}">Edit</a>` : null}
                


    ${isUserNotOwner ? html`<a @click=${onLike} class="btn-like" href="javascript:void(0)">Like</a>`: null}
               
            </div>
            <p class="likes">Likes: ${totalLikes}</p>
        </div>
    </div>
</section>`





export async function detailsPage(ctx) {
    //item is an object
    const userData = getUserData();
    const item = await getById(ctx.params.id);
    

let totalLikes = await getTotalLikes(ctx.params.id)


    let isLikedByCurrUser;

    let isOwner;
    if (userData) {

        isOwner = userData.id === item._ownerId;

        isLikedByCurrUser=await getLikeFromUser(ctx.params.id, userData.id)
    }
     let isUserNotOwner = isOwner === false && userData !== null && !isLikedByCurrUser;

    ctx.render(detailsTemplate(item, isOwner, onDelete, isUserNotOwner, onLike, totalLikes))
    // ctx.render(detailsTemplate(item, isOwner, onDelete))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this item?');

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/')
        }
    }

    async function onLike() {
        let res = await likeItem(ctx.params.id);
        //redirektvame kum sushtata stranica za da vidim update ot funkciqta
        ctx.page.redirect(`/details/${ctx.params.id}`)
       
    }



}




/*
export async function likeItem(theaterId) {
    return api.post(endpoints.like, { theaterId });
}
export async function getTotalLikes(theaterId) {
    return api.get(endpoints.totalLikes(theaterId));
}

export async function getLikeFromUser(theaterId, userId) {
    return api.get(endpoints.likeUser(theaterId, userId));
}

*/