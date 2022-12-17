import { editItem, getById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`
<section id="editPage">
    <form @submit=${onSubmit} class="editForm">
        <img src="./images/editpage-dog.jpg">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" .value="${item.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" .value="${item.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value="${item.age}">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value="${item.weight}">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value="${item.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
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
         
            //preporychano e  da se izvadqt vsichki input poleta ot datata vmesto da q podavame po toq nachin
            const name = data.name;
            const breed = data.breed;
            const age = data.age;
            const weight = data.weight;
            const image = data.image;
            const obj = {
                name,
                breed,
                age,
                weight,
                image
            }
            const result = await editItem(ctx.params.id, obj);
          
            event.target.reset();
            ctx.page.redirect('/details/' + result._id);
        } catch (err) {
            alert(err.message)

        }
        

    }


}