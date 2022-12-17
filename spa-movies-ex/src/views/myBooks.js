

import {  getMyItems } from '../api/data.js';
import { getUserData } from '../util.js';
import { html } from '../lib.js';



const catalogTemplate = (items, noItems) => html`
  <section id="my-posts-page">
            <h1 class="title">My Posts</h1>

            <!-- Display a div with information about every post (if any)-->
            <div class="my-posts">


    ${noItems ? noPostsTemplate() : items.map(itemTemplate)}
      
</ul>






`
/*

//if the userpage is true, the text content of h1 will be changed to My furniture  
with ternary operator

<h1>${userpage ? html`<h1>my furniture<h1>` : html`<h1>all furniture<h1>`}</h1>
some html
<!-- Display paragraph: If there are no books in the database -->
<p class="no-books">No books in database!</p>
*/
const noPostsTemplate = () => html`
<h1 class="title no-posts-title">You have no posts yet!</h1>
`

const itemTemplate = (item) => html`
  <div class="post">
                    <h2 class="post-title">${item.title}</h2>
                    <img class="post-image" src=${item.imageUrl} alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="/details/${item._id}" class="details-btn btn">Details</a>
                    </div>
                </div>>
`

//this is the home view, we can also name it home.js

//the address of the userpage depends on the app
export async function myBooksPage(ctx) {
    const userId=getUserData().id;
    const books = await getMyItems(userId);
    // console.log(books);
    // const userpage = ctx.pathname === '/my-furniture';
    // let items = [];
    // if (userpage) {
    //     items = await getMyItems(userId);
    // } else {
    //     items = await getAll();

    // }
    let noItems = books.length === 0;
    ctx.render(catalogTemplate(books, noItems))

}

// async function loadItems(){

//     return
// }