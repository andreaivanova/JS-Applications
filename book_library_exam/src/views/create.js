import { createItem } from "../api/data.js";
import { html } from "../lib.js";



const createTemplate = (onSubmit) => html`
<section id="create-page" class="create">
    <form @submit=${onSubmit} id="create-form" action="" method="">
        <fieldset>
            <legend>Add new Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" placeholder="Title">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" placeholder="Image">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type">
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Add Book">
        </fieldset>
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
            const type=data.type;
            const obj = {
                title,
                description,
                imageUrl,
                type
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