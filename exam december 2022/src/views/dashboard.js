import { getAll } from '../api/data.js';
import { html } from '../lib.js';


const catalogTemplate = (albums, noAlbums) => html`

    <section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
      <!-- Display a li with information about every post (if any)-->
     
  ${noAlbums ? noAlbumsTemplate : albums.map(itemTemplate)}

    </ul>

    
  </section>
`


const noAlbumsTemplate = () => html`
<!-- Display an h2 if there are no posts -->
<h2>There are no albums added yet.</h2>
`;

const itemTemplate = (item) => html`
  <li class="card">
        <img src="${item.imageUrl}" alt="travis" />
        <p>
          <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
        </p>
        <p>
          <strong>Album name: </strong><span class="album">${item.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
        <a class="details-btn" href="/details/${item._id}">Details</a>
      </li>
`


export async function dashboardPage(ctx) {
    const albums = await getAll();
    
    let noAlbums = albums.length === 0;
    ctx.render(catalogTemplate(albums, noAlbums))

}

