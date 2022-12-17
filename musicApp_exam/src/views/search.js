
import { searchItem } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";



const searchTempl = (onSubmit, resultsExist, result, userData) => html`


<section id="searchPage">
    <h1>Search by Name</h1>



    <form @submit=${onSubmit}>
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list">Search</button>
        </div>
    </form>



    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">

        ${resultsExist ?
           result.map(x => itemTemplate(x, userData))
           : noItemsTemplate()}

           

    </div>
</section>


`

const noItemsTemplate = () => html`
<p class="no-result">No result.</p>

`

const itemTemplate = (item, userData) => html`   
    <div class="card-box">
        <img src="${item.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${item.name}</p>
                <p class="artist">Artist: ${item.artist}</p>
                <p class="genre">Genre: ${item.genre}</p>
                <p class="price">Price: $${item.price}</p>
                <p class="date">Release Date: ${item.date}</p>
            </div>
    
    
            <div class="btn-group">
    
                ${userData ? html` <a href="/details/${item._id}" id="details">Details</a>` : null}
    
            </div>
        </div>
    </div>`



export function searchPage(ctx) {

    let resultsExist;
    ctx.render(searchTempl(onSubmit, resultsExist))
    let userData = getUserData();


    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchStr = formData.get('search').trim();

        try {
            if (searchStr === '') {

                throw new Error('Please fill in the input field!');
            }

            const result = await searchItem(searchStr);
      
            resultsExist = result.length > 0;
            ctx.render(searchTempl(onSubmit, resultsExist, result, userData))



        } catch (err) {

            alert(err.message)

        }
    }

}

