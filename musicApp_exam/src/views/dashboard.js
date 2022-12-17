import { getAll } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const catalogTemplate = (albums, noAlbums, userData) => html`

<section id="catalogPage">
    <h1>All Albums</h1>

   
    ${noAlbums ? noItemsTemplate() : albums.map(x=>itemTemplate(x,userData))}
 
</section>


  `

const noItemsTemplate = () => html`
   <!--No albums in catalog-->
   <p>No Albums in Catalog!</p>
`;

const itemTemplate = (album, userData) => html`
     <div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            <div class="btn-group">

    ${userData ? html` <a href="/details/${album._id}" id="details">Details</a>` : null}
               
            </div>
        </div>
    </div>
`


export async function dashboardPage(ctx) {
    let userData = getUserData();
    const albums = await getAll();


    let noAlbums = albums.length === 0;
    ctx.render(catalogTemplate(albums, noAlbums, userData))

}












