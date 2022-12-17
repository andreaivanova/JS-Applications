import { html } from '../lib.js';


const homeTemplate = () => html`
<section id="home">
    <h1>Welcome to Sole Mates</h1>
    <img src="./images/home.jpg" alt="home" />
    <h2>Browse through the shoe collectibles of our users</h2>
    <h3>Add or manage your items</h3>
  </section>
`






//this is the home view, we can also name it home.js

//the address of the userpage depends on the app
export async function homePage(ctx) {
    ctx.render(homeTemplate())
   

}

