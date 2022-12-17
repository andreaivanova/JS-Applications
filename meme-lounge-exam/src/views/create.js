import { createItem } from "../api/data.js";
import { html } from "../lib.js";



const createTemplate = (onSubmit) => html`
<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`


export function createPage(ctx) {
    console.log(true);

    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = Array.from(new FormData(event.target).entries());

        //where a is accumulator and [k,v] or c is the current value which is destructured with key and value (k and v); object.fromEntries can also be used
        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {})
        

        //it returns a list of all empty fields
       // const missing = formData.filter(([]) => k !== 'material' && v.trim() === '');
        const missing = formData.filter(([k,v]) => v.trim() === '');

        try {
            if (missing.length > 0) {
                
                throw new Error('Please fill all mandatory fields!')
            }
            //we must add  validation of all fields with if statements  otherwise an error must be thrown

            const title=data.title;
            const description=data.description;
            const imageUrl=data.imageUrl;
            const obj = {
            
                    title,
                    description,
                    imageUrl
                
                  
            }
            const result = await createItem(obj);
            event.target.reset();
            ctx.page.redirect('/all-memes');
        } catch (err) {
            alert(err.message)
        }


    }


}