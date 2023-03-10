import { html } from '../lib.js';


const homeTemplate = () => html`
 <!-- Welcome Page ( Only for guest users ) -->
 <section id="welcome">
    <div id="welcome-container">
        <h1>Welcome To Meme Lounge</h1>
        <img src="/images/welcome-meme.jpg" alt="meme">
        <h2>Login to see our memes right away!</h2>
        <div id="button-div">
            <a href="/login" class="button">Login</a>
            <a href="/register" class="button">Register</a>
        </div>
    </div>
</section>

`


//this is the home view, we can also name it home.js

//the address of the userpage depends on the app
export async function homePage(ctx) {
    ctx.render(homeTemplate())

}

