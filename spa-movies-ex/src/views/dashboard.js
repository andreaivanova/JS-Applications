import { getAll, getMyItems } from '../api/data.js';
import { getUserData } from '../util.js';
import { html } from '../lib.js';


const catalogTemplate = (items, noPosts) => html`<section id="dashboard-page">
<h1 class="title">All Posts</h1>

<!-- Display a div with information about every post (if any)-->
<div class="all-posts">
    ${noPosts ? noPostsTemplate() : items.map(itemTemplate)}
</div>


</section>`

// address
// : 
// "ul. Manioka Tapioka 25"
// description
// : 
// "We need 20 striped notebooks and 10 squared notebooks, 5 backpacks, and other school supplies, such as pens, pencils, rulers, erasers, etc."
// imageUrl
// : 
// "/images/school-supplies.jpeg"
// phone
// : 
// "0888264871"
// title
// : 
// "School Supplies"


/*

//if the userpage is true, the text content of h1 will be changed to My furniture  
with ternary operator

<h1>${userpage ? html`<h1>my furniture<h1>` : html`<h1>all furniture<h1>`}</h1>
some html
<!-- Display paragraph: If there are no books in the database -->
<p class="no-books">No books in database!</p>
*/
const noPostsTemplate = () => html`
<h1 class="title no-posts-title">>No posts yet!</h1>
`;

const itemTemplate = (post) => html`
    <div class="all-posts">
                <div class="post">
                    <h2 class="post-title">${post.title}</h2>
                    <img class="post-image" src=${post.imageUrl} alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="details/${post._id}" class="details-btn btn">Details</a>
                    </div>
                </div>
`

//this is the home view, we can also name it home.js

//the address of the userpage depends on the app
export async function catalogPage(ctx) {
    const posts = await getAll();
    
    // console.log(posts);
    // const userpage = ctx.pathname === '/my-furniture';
    // let items = [];
    // if (userpage) {
    //     const userId=getUserData().id;
    //     items = await getMyItems(userId);
    // } else {
    //     items = await getAll();

    // }
    let noPosts = posts.length === 0;
    ctx.render(catalogTemplate(posts, noPosts))

}

// async function loadItems(){

//     return
// }