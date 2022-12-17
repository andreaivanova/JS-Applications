

import {  getMyItems } from '../api/data.js';
import { getUserData } from '../util.js';
import { html } from '../lib.js';



const myItemsTemplate = (items, noItems,email) => html`


<!--Profile Page-->
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${email}</h2>
    </div>
    <div class="board">

        ${noItems ? noItemsTemplate() : items.map(itemTemplate)} 

     
        
    </div>
</section>
`

const noItemsTemplate = () => html`
<div class="no-events">
            <p>This user has no events yet!</p>
        </div>
`

const itemTemplate = (item) => html`

        <div class="eventBoard">
            <div class="event-info">
                <img src="${item.imageUrl}">
                <h2>${item.title}</h2>
                <h6>${item.date}</h6>
                <a href="/details/${item._id}" class="details-button">Details</a>
            </div>
        </div>
`


export async function profilePage(ctx) {
    const userId=getUserData().id;
    const email=getUserData().email;
    const items = await getMyItems(userId);
   
     let noItems = items.length === 0;
   ctx.render(myItemsTemplate(items, noItems,email))

}

