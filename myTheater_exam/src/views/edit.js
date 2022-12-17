import { editItem, getById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`
<section id="editPage">
    <form @submit=${onSubmit} class="theater-form">
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" .value="${item.title}">
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" .value="${item.date}">
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author"
                .value="${item.author}">
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description"
                placeholder="Description" .value="${item.description}"></textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                .value="${item.imageUrl}">
        </div>
        <button class="btn" type="submit">Submit</button>
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
         
            //preporychano e  da se izvadqt vsichki input poleta ot datata vmesto da q podavame po toq nachin
            const title = data.title;
            const date = data.date;
            const author = data.author;
            const imageUrl = data.imageUrl;
            const description = data.description;
            const obj = {
                title,
                date,
                author,
                imageUrl,
                description
              
            }
            const result = await editItem(ctx.params.id, obj);
          
            event.target.reset();
            ctx.page.redirect('/details/' + result._id);
        } catch (err) {
            alert(err.message)

        }
        

    }


}