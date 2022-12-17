import { createItem } from "../api/data.js";
import { html } from "../lib.js";



const createTemplate = (onSubmit) => html`
 <section id="create">
    <div class="form">
      <h2>Add Album</h2>
      <form @submit=${onSubmit} class="create-form">
        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
        <input type="text" name="release" id="album-release" placeholder="Release date" />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit">post</button>
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
        const missing = formData.filter(([k,v]) => v.trim() === '');

        try {
            if (missing.length > 0) {
               
                throw new Error('Please fill all mandatory fields!')
            }
            const singer=data.singer;
            const album=data.album;
            const imageUrl=data.imageUrl;
            const release=data.release;
            const label=data.label;
            const sales=data.sales;
            const obj = {
              singer,
              album, 
              imageUrl, 
              release, 
              label, 
              sales
            } 
            
              
            const result = await createItem(obj);
            event.target.reset();
            ctx.page.redirect('/dashboard');
        } catch (err) {
            // const message = err.message || err.error.message;
            // update(message, err.errors || {})
            alert(err.message)
        }


    }


}