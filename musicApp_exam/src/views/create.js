import { createItem } from "../api/data.js";
import { html } from "../lib.js";



const createTemplate = (onSubmit) => html`
 
 <section class="createPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Add Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" placeholder="Album name">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" placeholder="Price">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" placeholder="Release date">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" placeholder="Artist">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" placeholder="Genre">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" placeholder="Description"></textarea>

                <button class="add-album" type="submit">Add New Album</button>
            </div>
        </fieldset>
    </form>
</section>
`


export function createPage(ctx) {


   
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
              
                throw new Error('Please fill all mandatory fields!')
            }
            

            //preporychano e  da se izvadqt vsichki input poleta ot datata vmesto da q podavame po toq nachin
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
            
             const result = await createItem(obj);
             event.target.reset();
             ctx.page.redirect('/catalog');
        } catch (err) {
         
            alert(err.message)
        }


    }


}