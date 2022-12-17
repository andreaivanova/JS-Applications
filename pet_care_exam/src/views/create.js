import { createItem } from "../api/data.js";
import { html } from "../lib.js";



const createTemplate = (onSubmit) => html`
<section id="createPage">
    <form @submit=${onSubmit} class="createForm">
        <img src="./images/cat-create.jpg">
        <div>
            <h2>Create PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" placeholder="Max">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" placeholder="2 years">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" placeholder="5kg">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
            </div>
            <button class="btn" type="submit">Create Pet</button>
        </div>
    </form>
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

            const result = await createItem(obj);
            event.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            alert(err.message)
        }


    }


}