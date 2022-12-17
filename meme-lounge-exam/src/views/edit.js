 import { editItem, getById } from "../api/data.js";

import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`

<!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${item.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${item.description}>
                  
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${item.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
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
            const title=data.title;
            const description=data.description;
            const imageUrl=data.imageUrl;
            const obj = {
    
                    title,
                    description,
                    imageUrl
         
            }

            
            const result = await editItem(ctx.params.id, obj);
          
            event.target.reset();
            ctx.page.redirect('/details/' + result._id);
        } catch (err) {
            alert(err.message)

        }
        

    }


}