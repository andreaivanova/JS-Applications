import { commentPost, deleteItem, getAllComments } from "../api/data.js";
import { getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";



const detailsTemplate = (item, isOwner, onDelete, isUserAndNotOwner, onComment, totalComments, noComments, commentTemplate) => html`
<!--Details Page-->
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="${item.imageUrl}" />
            <h1>${item.title}</h1>
            <span class="levels">MaxLevel: ${item.maxLevel}</span>
            <p class="type">${item.category}</p>
        </div>

        <p class="text">
            ${item.summary}
        </p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>

                ${noComments ? noCommentsTemplate() : totalComments.map(commentTemplate)}
            </ul>


        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        <div class="buttons">

            ${isOwner ? html`<a href="/details/edit/${item._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>` : null}


        </div>
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${isUserAndNotOwner ? html`<article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>` : null}


</section>


`

const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>

`
const noCommentsTemplate = () => html`
<p class="no-comment">No comments.</p>

`

// const createCommentTemplate=()=>html`
// `



/*
html`

             ${isOwner ? html`<a href="/details/edit/${item._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>` : null}
                

                     ${isUser ? html`<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>` : null}
`;
*/

export async function detailsPage(ctx) {
    //item is an object
    const userData = getUserData();
    const item = await getById(ctx.params.id);



    let totalComments = await getAllComments(ctx.params.id)
    let noComments = totalComments.length === 0;

    let isOwner;
    if (userData) {

        isOwner = userData.id === item._ownerId;

        // isDonatedFromCurrUser=await getDonFromUser(ctx.params.id, userData.id)
    }
    let isUserAndNotOwner = isOwner === false && userData !== null;

    ctx.render(detailsTemplate(item, isOwner, onDelete, isUserAndNotOwner, onComment, totalComments, noComments, commentTemplate))
    //  ctx.render(detailsTemplate(item, isOwner, onDelete))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this item?');

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/')
        }
    }

    async function onComment(event) {
        event.preventDefault()
        // let comment = document.querySelector('textarea');
      
        let formData = new FormData(event.target);
        let comment = formData.get('comment');
        event.target.reset()
        let res = await commentPost(ctx.params.id, comment);
        let totalComments = await getAllComments(ctx.params.id)
        // console.log(res);
        //redirektvame kum sushtata stranica za da vidim update ot funkciqta
        // ctx.render(detailsTemplate(item, isOwner, onDelete, isUserAndNotOwner, onComment, totalComments, noComments,commentTemplate))

        ctx.page.redirect(`/details/${ctx.params.id}`)

    }
}



/*
export async function commentPost(gameId) {
    return api.post(endpoints.comment, { gameId });
}
export async function getAllComments(gameId) {
    return api.get(endpoints.allComments(gameId));
}



*/




