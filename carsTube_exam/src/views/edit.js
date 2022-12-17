import { editItem, getById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value="${item.brand}">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value="${item.model}">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value="${item.description}">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value="${item.year}">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${item.imageUrl}">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value="${item.price}">

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>

`



export async function editPage(ctx) {

    const item = await getById(ctx.params.id);
    
    ctx.render(editTemplate(item, onSubmit));


    async function onSubmit(event) {
        event.preventDefault();
        const formData = Array.from(new FormData(event.target).entries());

        //where a is accumulator and [k,v] or c is the current value which is destructured with key and value (k and v); object.fromEntries can also be used
        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {})


        //it returns a list of all empty fields
        const missing = formData.filter(([k,v]) => v.trim() === '');
     //   const missing = formData.filter(([]) => k !== 'material' && v.trim() === '');

        try {
            if (missing.length > 0) {
            
           
                throw new Error('Please fill all mandatory fields!')

            }
            
            const brand = data.brand;
            const model = data.model;
            const description = data.description;
            const year =Number( data.year);
            const imageUrl = data.imageUrl;
            const price = Number(data.price);
            if ( price <= 0  || year <= 0) {

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
            
            const result = await editItem(ctx.params.id, obj);
          
            event.target.reset();
            ctx.page.redirect('/details/' + result._id);
        } catch (err) {
            alert(err.message)

        }
        

    }


}