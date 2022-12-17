import { donatePet, deleteItem, getTotalDonations, getDonFromUser } from "../api/data.js";
import { getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (item, isOwner, onDelete, isUser, onDonate, totalDons) => html`

<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${item.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${item.name}</h1>
                <h3>Breed: ${item.breed}</h3>
                <h4>Age: ${item.age}</h4>
                <h4>Weight: ${item.weight}</h4>
                <h4 class="donation">Donation: ${Number(totalDons) * 100}$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->
            <div class="actionBtn">


             ${isOwner ? html`<a href="/details/edit/${item._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>` : null}
                

                     ${isUser ? html`<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>` : null}
               
            </div>
        </div>
    </div>
</section>`



/*
html`

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
        console.log('true');
        let res = await donatePet(ctx.params.id);
        // console.log(res);
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




