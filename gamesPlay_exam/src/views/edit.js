import { editItem, getById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`
<!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value="${item.title}">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value="${item.category}">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value="${item.maxLevel}">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value="${item.imageUrl}">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" .value="${item.summary}"></textarea>
            <input class="btn submit" type="submit" .value="Edit Game">

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
            const result = await editItem(ctx.params.id, obj);
          
            event.target.reset();
            ctx.page.redirect('/details/' + result._id);
        } catch (err) {
            alert(err.message)

        }
        

    }


}