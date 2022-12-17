import { createItem } from "../api/data.js";
import { html } from "../lib.js";



const createTemplate = (onSubmit) => html`
<!-- Create Page ( Only for logged-in users ) -->
<section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
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
            const title = data.title;
            const category = data.category;
            const maxLevel = data.maxLevel;
            const imageUrl = data.imageUrl;
            const summary = data.summary;
            const obj = {
                title,
                category,
                maxLevel,
                imageUrl,
                summary
              }
              

            const result = await createItem(obj);
            event.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            alert(err.message)
        }


    }


}