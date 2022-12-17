import { editItem, getById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (item, onSubmit) => html`

<section class="editPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" .value="${item.name}">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value="${item.imgUrl}">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" .value="${item.price}">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value="${item.releaseDate}">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" .value="${item.artist}">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" .value="${item.genre}">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10" .value="${item.description}"></textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
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
            
            const name=data.name;
            const imgUrl=data.imgUrl;
            const price=data.price;
            const releaseDate=data.releaseDate;
            const artist=data.artist;
            const genre=data.genre;
            const description=data.description;
            const obj = {
              name,
              imgUrl,
              price,
              releaseDate,
              artist,
              genre,
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