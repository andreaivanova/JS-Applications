import { getAll } from '../api/data.js';
import { html } from '../lib.js';


const catalogTemplate = (posts, noPosts) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
       ${noPosts ? noPostsTemplate() : posts.map(itemTemplate)} 


        </div>
        
    </div>
</section>

`

const noPostsTemplate = () => html`
<p class="no-memes">No memes in database.</p>
`;

const itemTemplate = (post) => html`
      <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${post.title}</p>
                    <img class="meme-image" alt="meme-img" src="${post.imageUrl}">
                </div>
                <div id="data-buttons">
                    <a class="button" href="/details/${post._id}">Details</a>
                </div>
            </div>
        </div>

`


export async function allMemesPage(ctx) {
    
    const posts = await getAll();
    let noPosts = posts.length === 0;
    ctx.render(catalogTemplate(posts, noPosts))

    
}

