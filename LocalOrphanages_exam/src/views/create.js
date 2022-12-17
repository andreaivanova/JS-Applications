import { createItem } from "../api/data.js";
import { html } from "../lib.js";



const createTemplate = (onSubmit) => html`
  <section id="create-page" class="auth">
            <form @submit=${onSubmit} id="create">
                <h1 class="title">Create Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title">
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description">
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl">
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address">
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone">
                </article>

                <input type="submit" class="btn submit" value="Create Post">
            </form>
        </section>

`
/*
some html
with an event listener on the form - @submit=${onSubmit}
//adding div for error messages at tthe top of the form
<div> ${errorMsg ? html`<div>${errorMsg}</div>` : null}</div>

//svetva v cherveno ako imame invalid input and checks for error message


<input class=${"some already existing class" + (errors.year ? " error-class" : "")}>
*/

export function createPage(ctx) {

    // update(null, {})
    // function update(errorMsg, errors) {

    // }
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
                // const errors = missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), {})
                // throw {
                //     error: new Error('Please fill all mandatory fields!'),
                //     errors,

                // }
                throw new Error('Please fill all mandatory fields!')
            }
            //we must add  validation of all fields with if statements  otherwise an error must be thrown
            // data.year = Number(data.year);
            // data.price = Number(data.price);

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
            const result = await createItem(obj);
            event.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            // const message = err.message || err.error.message;
            // update(message, err.errors || {})
            alert(err.message)
        }


    }


}