import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`

<section id="register">
    <div class="form">
      <h2>Register</h2>
      <form @submit=${onSubmit} class="login-form">
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`

export function registerPage(ctx) {

    ctx.render(registerTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('re-password').trim();


        try {


            if (email === '' || password === '') {

                throw new Error('All fields are required!');
            }
            if (password !== rePass) {

                throw new Error('Passwords don\'t match!');


            }
            await register(email, password);
            ctx.updateUserNav();
            event.target.reset()

            ctx.page.redirect('/dashboard')
        } catch (err) {

            alert(err.message)
        }
    }
}