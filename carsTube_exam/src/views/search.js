
import { searchItem } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";



const searchTempl = (onSubmit, resultsExist, result, userData) => html`
<!-- Search Page -->
<section id="search-cars">
    <h1>Filter by year</h1>


    <form @submit=${onSubmit}>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list">Search</button>
    </div>
    </form>

    <h2>Results:</h2>
    <div class="listings">


        <!-- Display all records -->
${resultsExist ?
           result.map(x => itemTemplate(x, userData))
           : noItemsTemplate()}

      

    </div>
</section>



`

const noItemsTemplate = () => html`
<p class="no-cars"> No results.</p>

`

const itemTemplate = (item) => html`   
   <div class="listing">
            <div class="preview">
                <img src="${item.imageUrl}">
            </div>
            <h2>${item.brand} ${item.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${item.year}</h3>
                    <h3>Price: ${item.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/details/${item._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
    
    `



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

