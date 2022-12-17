import { editItem, getById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`

<div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" .value="${item.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model" .value="${item.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year" .value="${item.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" .value="${item.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" .value="${item.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" .value="${item.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" .value="${item.material}">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>


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
        // const missing = formData.filter(([k,v]) => v.trim() === '');
       const missing = formData.filter(([k,v]) => k !== 'material' && v.trim() === '');

        try {
            if (missing.length > 0) {
            
           
                throw new Error('Please fill all mandatory fields!')

            }
            
            const make = data.make;
            const model = data.model;
            const year = Number(data.year);
            const description = data.description;
            const price = Number(data.price);
            const img = data.img;
            const material = data.material;
           
            if(make.length < 4 || model.length < 4){
                throw new Error('Make and Model must be at least 4 symbols long');
            }

            if(year < 1950 || year > 2050){
                throw new Error('Year must be between 1950 and 2050');
            }
            if(description.length <= 10){
                throw new Error('Description must be more than 10 symbols');
            }

            if(price <= 0){
                throw new Error('Price must be a positive number');
            }

            const obj = {
              make,
              model,
              year,
              description,
              price,
              img,
              material,
            }
            
            const result = await editItem(ctx.params.id, obj);
          
            event.target.reset();
            ctx.page.redirect('/details/' + result._id);
        } catch (err) {
            alert(err.message)

        }
        

    }


}