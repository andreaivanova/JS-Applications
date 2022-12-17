import { donatePost, deleteItem, getTotalDonations, getDonFromUser } from "../api/data.js";
import { getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";
/*
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
*/
const detailsTemplate = (item, isOwner, onDelete, isUser, onDonate, totalDons) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src="${item.imageUrl}" alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${item.title}</h2>
                <p class="post-description">Description: ${item.description}</p>
                <p class="post-address">Address: ${item.address}</p>
                <p class="post-number">Phone number: ${item.phone}</p>
                <p class="donate-Item">Donate Materials: ${totalDons}</p>

                <!--Edit and Delete are only for creator-->
                <div class="btns">
                    ${isOwner ? html`<a href="${`edit/${item._id}`}" class="edit-btn btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>` : null}


                    ${isUser ? html` <a @click=${onDonate} class="donate-btn btn" href="javascript:void(0)">Donate </a>` : null}
                    <!--Bonus - Only for logged-in users ( not authors )-->
                    
                </div>

            </div>
        </div>
    </div>
</section>`



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
    ;
    // // let [totalLikes, isLikedByCurrUser]=await Promise.all(
    //     [
    //          getTotalLikesOfABook(ctx.params.id),
    //          getMyLikeByBookId(ctx.params.id, userData.id)
    //     ]
    // )

let totalDons = await getTotalDonations(ctx.params.id)


    //   let isLikedByTheUser = await  getMyLikeByBookId(ctx.params.id, userData.id)

    let isDonatedFromCurrUser;

    let isOwner;
    if (userData) {

        isOwner = userData.id === item._ownerId;

        isDonatedFromCurrUser=await getDonFromUser(ctx.params.id, userData.id)
    }
     let isUser = isOwner === false && userData !== null && !isDonatedFromCurrUser;

    ctx.render(detailsTemplate(item, isOwner, onDelete, isUser, onDonate, totalDons))
    // ctx.render(detailsTemplate(item, isOwner, onDelete))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this item?');

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/')
        }
    }

    async function onDonate() {
        // console.log(item._id);
     //   console.log(await totalLikes);
       // console.log(isLikedByCurrUser);
        await donatePost(ctx.params.id);

        //redirektvame kum sushtata stranica za da vidim update ot funkciqta
        ctx.page.redirect(`/details/${ctx.params.id}`)
       
    }
}



/*
export async function donatePost(postId) {
    return api.post(endpoints.donate, { postId });
}
export async function getTotalDonations(postId) {
    return api.get(endpoints.totalDonations(postId));
}

export async function getDonFromUser(postId, userId) {
    return api.get(endpoints.donUser(postId, userId));
}
*/