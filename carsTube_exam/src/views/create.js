import { createItem } from "../api/data.js";
import { html } from "../lib.js";



const createTemplate = (onSubmit) => html`
 
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>

`


export function createPage(ctx) {



    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = Array.from(new FormData(event.target).entries());

        //where a is accumulator and [k,v] or c is the current value which is destructured with key and value (k and v); object.fromEntries can also be used
        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {})


        //it returns a list of all empty fields
        // const missing = formData.filter(([]) => k !== 'material' && v.trim() === '');
        const missing = formData.filter(([k, v]) => v.trim() === '');

        try {
            if (missing.length > 0) {

                throw new Error('Please fill all mandatory fields!')
            }


            //preporychano e  da se izvadqt vsichki input poleta ot datata vmesto da q podavame po toq nachin
            const brand = data.brand;
            const model = data.model;
            const description = data.description;
            const year = Number( data.year);
            const imageUrl = data.imageUrl;
            const price = Number( data.price);
            if (price <= 0  || year <= 0) {

                throw new Error('Price and year must be positive numbers!')
            }




            const obj = {
                brand,
                model,
                description,
                year,
                imageUrl,
                price
            }


            const result = await createItem(obj);
            event.target.reset();
            ctx.page.redirect('/all-listings');
        } catch (err) {

            alert(err.message)
        }


    }


}