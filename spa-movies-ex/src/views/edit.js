import { editItem, getById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`<section id="edit-page" class="auth">
<form @submit=${onSubmit} id="edit">
    <h1 class="title">Edit Post</h1>

    <article class="input-group">
        <label for="title">Post Title</label>
        <input type="title" name="title" id="title" .value="${item.title}">
    </article>

    <article class="input-group">
        <label for="description">Description of the needs </label>
        <input type="text" name="description" id="description" .value="${item.description}">
    </article>

    <article class="input-group">
        <label for="imageUrl"> Needed materials image </label>
        <input type="text" name="imageUrl" id="imageUrl" .value="${item.imageUrl}">
    </article>

    <article class="input-group">
        <label for="address">Address of the orphanage</label>
        <input type="text" name="address" id="address" .value="${item.address}">
    </article>

    <article class="input-group">
        <label for="phone">Phone number of orphanage employee</label>
        <input type="text" name="phone" id="phone" .value="${item.phone}">
    </article>

    <input type="submit" class="btn submit" value="Edit Post">
</form>
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
            const address=data.address;
            const phone=data.phone;
            const obj = {
                title,
                description,
                imageUrl,
                address,
                phone
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