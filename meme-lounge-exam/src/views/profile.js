

import {  getMyItems } from '../api/data.js';
import { getUserData } from '../util.js';
import { html } from '../lib.js';



const myItemsTemplate = (items, noItems,username,email) => html`
<!-- Profile Page ( Only for logged users ) -->
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
        <div class="user-content">
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>My memes count: ${items.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${noItems ? noItemsTemplate() : items.map(itemTemplate)} 

        
    </div>
</section>

`

const noItemsTemplate = () => html`
<p class="no-memes">No memes in database.</p>
`

const itemTemplate = (item) => html`
 <div class="user-meme">
            <p class="user-meme-title">${item.title}</p>
            <img class="userProfileImage" alt="meme-img" src="${item.imageUrl}">
            <a class="button" href="/details/${item._id}">Details</a>
        </div>
`


export async function profilePage(ctx) {
    const userId=getUserData().id;
    const username=getUserData().username;
    const email=getUserData().email;
    const items = await getMyItems(userId);
   
     let noItems = items.length === 0;
   ctx.render(myItemsTemplate(items, noItems,username,email))

}

