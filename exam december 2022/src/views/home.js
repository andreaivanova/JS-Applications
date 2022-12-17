import { html } from '../lib.js';


const homeTemplate = () => html`
  <!-- Home page -->
  <section id="home">
    <img src="./images/landing.png" alt="home" />

    <h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
        here!</span></h2>
  </section>
`






//this is the home view, we can also name it home.js

//the address of the userpage depends on the app
export async function homePage(ctx) {
    ctx.render(homeTemplate())
   

}

