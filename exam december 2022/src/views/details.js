import { likeAPost, deleteItem, getLikesFromUser, getTotalLikes } from "../api/data.js";
import { getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";



const detailsTemplate = (item, isOwner, onDelete, isUser, onLike, totalLikes) => html`

<section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src="${item.imageUrl}" alt="example1" />
      </div>
      <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
        <p>
          <strong>Album name:</strong><span id="details-album">${item.album}</span>
        </p>
        <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${totalLikes}</span></div>

      <!--Edit and Delete are only for creator-->
      <div id="action-buttons">
     

${isUser ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>` : null}
        ${isOwner ? html`<a href="${`edit/${item._id}`}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}


      </div>
    </div>
  </section>
`

export async function detailsPage(ctx) {

    //item is an object
    const userData = getUserData();
    const item = await getById(ctx.params.id);
    console.log(item);


    let totalLikes = await getTotalLikes(ctx.params.id)



    let hasTheUserLiked;

    let isOwner;
    if (userData) {

        isOwner = userData.id === item._ownerId;

        hasTheUserLiked = await getLikesFromUser(ctx.params.id, userData.id)
    }
    //the user is not the owner of the post
    let isUser = isOwner === false && userData !== null && !hasTheUserLiked;

    ctx.render(detailsTemplate(item, isOwner, onDelete, isUser, onLike, totalLikes))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this item?');

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/dashboard')
        }
    }

    async function onLike() {
        // console.log(hasTheUserApplied);
        await likeAPost(ctx.params.id);

        //redirektvame kum sushtata stranica za da vidim update ot funkciqta
        ctx.page.redirect(`/details/${ctx.params.id}`)

    }
}



