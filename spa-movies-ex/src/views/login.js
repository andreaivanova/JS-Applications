import { login } from "../api/data.js";
import { html } from "../lib.js";


const loginTemplate = (onSubmit) => html`
<section id="login-page" class="auth">
            <form @submit=${onSubmit} id="login">
                <h1 class="title">Login</h1>

                <article class="input-group">
                    <label for="login-email">Email: </label>
                    <input type="email" id="login-email" name="email">
                </article>

                <article class="input-group">
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password">
                </article>

                <input type="submit" class="btn submit-btn" value="Log In">
            </form>
        </section>

`
export function loginPage(ctx) {
    // update()
    // function update(errorMsg){

    // }
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
       // console.log(formData);
        //await login(email,password)
       
        //suzdavame formdata
        //vadim ot neq email i parola
        // vikame login zaqvkATA DIREKTNO
        try {
            if (email === '' || password === '') {
                //     throw {
                //         error: new Error('All fields are required!'),
                //         errors: {
                //             email: email==='',
                //             password: password==='',
                //             rePass: rePass==='',
                //         }
                // }}
                throw new Error('All fields are required!');
                }
                
            await login(email, password)
            ctx.updateUserNav();
            event.target.reset()
            ctx.page.redirect('/')
            //    s tozi method redirect-vame kum home page
        } catch (err) {
            // ctx.render(loginTemplate(onSubmit), 'My message');
           alert(err.message)

        }
    }
}