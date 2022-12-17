import { editItem, getById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`<section id="edit">


<section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form @submit=${onSubmit} class="edit-form">
        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value="${item.singer}" />
        <input type="text" name="album" id="album-album" placeholder="Album" .value="${item.album}" />
        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value="${item.imageUrl}" />
        <input type="text" name="release" id="album-release" placeholder="Release date" .value="${item.release}"/>
        <input type="text" name="label" id="album-label" placeholder="Label" .value="${item.label}" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" .value="${item.sales}" />

        <button type="submit">post</button>
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
            const result = await editItem(ctx.params.id, obj);
          
            event.target.reset();
            ctx.page.redirect('/details/' + result._id);
        } catch (err) {
            // const message = err.message || err.error.message;
            // update(data, message, err.errors || {})
            alert(err.message)

        }
        

    }


}