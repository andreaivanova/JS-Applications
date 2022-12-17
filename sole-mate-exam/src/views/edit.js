import { editItem, getById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`<section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form @submit=${onSubmit} class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
      .value="${item.brand}"
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
      .value="${item.model}"
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
      .value="${item.imageUrl}"
      
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
      .value="${item.release}"

    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
      .value="${item.designer}"

    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
      .value="${item.value}"

    />

    <button type="submit">post</button>
  </form>
</div>
</section>


`

/*

html`
//for every view we copy only the div container sample html part from the givven sample html files
with an event listener on the form - @submit=${onSubmit}


za da napraim poletata da sa popylneni za da moje da redaktirame trqbva da slojim tochka pred value-to  na vsqko pole
<input class="some class" id="some-id" type="text" name="some-name" .value="${item.something}">

<div> ${errorMsg ? html`<div>${errorMsg}</div>` : null}</div>

//svetva v cherveno ako imame invalid input and checks for error message


<input class=${"some already existing class" + (errors.year ? " error-class" : "")}>
`
`

// const formTemplate=()=>html`
// template used only for the form 
// `
*/

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
              /*
                const errors = missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), {})
                throw {
                    error: new Error('Please fill all mandatory fields!'),
                    errors,

                }
                */
                throw new Error('Please fill all mandatory fields!')

            }
            //we must add  validation of all fields with if statements  otherwise an error must be thrown
          //  data.year = Number(data.year);
            //data.price = Number(data.price);

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