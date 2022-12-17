import { likeBook, deleteItem, getTotalLikesOfABook, getMyLikeByBookId } from "../api/data.js";
import { getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (item, isOwner, onDelete, isUser, onLike, totalLikes) => html`<section id="details-page" class="details">
    <div class="book-information">
        <h3>${item.title}</h3>
        <p class="type">Type: ${item.type}</p>
        <p class="img"><img src=${item.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${isOwner ? html`<div>

                <a href="${`edit/${item._id}`}" class="button">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
            </div>` : null}

            ${isUser ? html` <a @click=${onLike} class="button" href="javascript:void(0)">Like</a>` : null}

            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->


            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${totalLikes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${item.description}</p>
    </div>
</section>

`





/*
html`


//this is how we make the edit and delete buttons of each item

//whcih will be hidden if the current user is not an owner of the current post
${isOwner ? html`<div>

    <a href="${`edit/${item._id}`}">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)">Delete</a>
</div>` : null}

some html template
`;
*/

export async function detailsPage(ctx) {
    //  ctx.render()
    //item is an object
    const userData = getUserData();
    const item = await getById(ctx.params.id);

    // // let [totalLikes, isLikedByCurrUser]=await Promise.all(
    //     [
    //          getTotalLikesOfABook(ctx.params.id),
    //          getMyLikeByBookId(ctx.params.id, userData.id)
    //     ]
    // )
    let totalLikes = await getTotalLikesOfABook(ctx.params.id)


    //   let isLikedByTheUser = await  getMyLikeByBookId(ctx.params.id, userData.id)
    
    let isLikedByCurrUser;
    
    let isOwner;
    if (userData) {
        
        isOwner = userData.id === item._ownerId;

        isLikedByCurrUser=await getMyLikeByBookId(ctx.params.id, userData.id)
    }
    let isUser = isOwner === false && userData !== null && !isLikedByCurrUser;

    ctx.render(detailsTemplate(item, isOwner, onDelete, isUser, onLike, totalLikes))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this item?');

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/')
        }
    }

    async function onLike() {
        // console.log(item._id);
     //   console.log(await totalLikes);
       // console.log(isLikedByCurrUser);
        await likeBook(ctx.params.id);

        //redirektvame kum sushtata stranica za da vidim update ot funkciqta
        ctx.page.redirect(`/details/${ctx.params.id}`)
       // ctx.render(detailsTemplate(item, isOwner, onDelete, isUser, onLike, totalLikes))
     
        //console.log(res.id);
        ///  console.log(isLikedByTheUser);
    }
}

