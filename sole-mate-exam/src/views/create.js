import { createItem } from "../api/data.js";
import { html } from "../lib.js";



const createTemplate = (onSubmit) => html`
 <section id="create">
    <div class="form">
      <h2>Add item</h2>
      <form class="create-form">
        <input
          type="text"
          name="brand"
          id="shoe-brand"
          placeholder="Brand"
        />
        <input
          type="text"
          name="model"
          id="shoe-model"
          placeholder="Model"
        />
        <input
          type="text"
          name="imageUrl"
          id="shoe-img"
          placeholder="Image url"
        />
        <input
          type="text"
          name="release"
          id="shoe-release"
          placeholder="Release date"
        />
        <input
          type="text"
          name="designer"
          id="shoe-designer"
          placeholder="Designer"
        />
        <input
          type="text"
          name="value"
          id="shoe-value"
          placeholder="Value"
        />

        <button @click=${onSubmit} type="submit">post</button>
      </form>
    </div>
  </section>

`


export function createPage(ctx) {


   
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = Array.from(new FormData(event.target.parentElement).entries());

        //where a is accumulator and [k,v] or c is the current value which is destructured with key and value (k and v); object.fromEntries can also be used
        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {})
        

        //it returns a list of all empty fields
       // const missing = formData.filter(([]) => k !== 'material' && v.trim() === '');
        const missing = formData.filter(([k,v]) => v.trim() === '');

        try {
            if (missing.length > 0) {
              
                throw new Error('Please fill all mandatory fields!')
            }
            

            //preporychano e  da se izvadqt vsichki input poleta ot datata vmesto da q podavame po toq nachin
            const brand=data.brand;
            const model=data.model;
            const imageUrl=data.imageUrl;
            const release=data.release;
            const designer=data.designer;
            const value=data.value;
            const obj = {
               brand,
               model,
               imageUrl,
               release,
               designer,
               value,
            }
            
             const result = await createItem(obj);
             event.target.parentElement.reset();
             ctx.page.redirect('/dashboard');
        } catch (err) {
         
            alert(err.message)
        }


    }


}