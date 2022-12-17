import { editItem, getById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`<section id="edit-page" class="edit">
<form @submit=${onSubmit} id="edit-form" action="#" method="">
    <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" .value="${item.title}">
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description"
                    id="description">${item.description}</textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" .value="${item.imageUrl}">
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type" value="Fiction">
                    <option value="Fiction" selected>Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Mistery">Mistery</option>
                    <option value="Classic">Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Save">
    </fieldset>
</form>
</section>`


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
    // update(item,null, {})



    // function update(item) {

    // }
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
            const title=data.title;
            const description=data.description;
            const imageUrl=data.imageUrl;
            const type=data.type;
            const obj = {
                title,
                description,
                imageUrl,
                type
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