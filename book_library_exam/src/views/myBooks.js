

import {  getMyItems } from '../api/data.js';
import { getUserData } from '../util.js';
import { html } from '../lib.js';



const catalogTemplate = (items, noBooks) => html`
   <section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    <ul class="my-books-list">


    ${noBooks ? noBooksTemplate() : items.map(itemTemplate)}
      
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
const noBooksTemplate = () => html`
<p class="no-books">No books in database!</p>
`

const itemTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
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
    let noBooks = books.length === 0;
    ctx.render(catalogTemplate(books, noBooks))

}

// async function loadItems(){

//     return
// }