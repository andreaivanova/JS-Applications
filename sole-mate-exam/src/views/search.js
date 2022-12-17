
import { searchItem } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";



const searchTempl = (onSubmit, resultsExist, result, userData) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${onSubmit} class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>


    <h3>Results:</h3>
    <div id="search-container">

    ${resultsExist ? html` <ul class="card-wrapper">
   ${result.map(x=> itemTemplate(x,userData))}
    </ul>` : html`<h2>There are no results found.</h2>`}

    </div>

</section>

`

const itemTemplate=(item, userData)=>html`    <li class="card">
<img src="${item.imageUrl}" alt="travis" />
<p>
  <strong>Brand: </strong><span class="brand">${item.brand}</span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${item.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${item.value}</span>$</p>


${userData ? html`<a class="details-btn" href="/details/${item._id}">Details</a>` : null}



</li>`



export function searchPage(ctx) {

    let resultsExist;
    ctx.render(searchTempl(onSubmit,resultsExist))
    let userData = getUserData();


    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchStr = formData.get('search').trim();

        try {
            if (searchStr === '') {

                throw new Error('Please fill the input field!');
            }

            const result = await searchItem(searchStr);
            resultsExist = result.length > 0;
            ctx.render(searchTempl(onSubmit,resultsExist,result,userData))

           

        } catch (err) {

            alert(err.message)

        }
    }

}

