import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
<section id="register-page" class="auth">
            <form @submit=${onSubmit} id="register">
                <h1 class="title">Register</h1>

                <article class="input-group">
                    <label for="register-email">Email: </label>
                    <input type="email" id="register-email" name="email">
                </article>

                <article class="input-group">
                    <label for="register-password">Password: </label>
                    <input type="password" id="register-password" name="password">
                </article>

                <article class="input-group">
                    <label for="repeat-password">Repeat Password: </label>
                    <input type="password" id="repeat-password" name="repeatPassword">
                </article>

                <input type="submit" class="btn submit-btn" value="Register">
            </form>
        </section>



`

export function registerPage(ctx) {
    // update(null,{})
    // function update(errorMsg, errors) {
        
        
    // }
    ctx.render(registerTemplate(onSubmit))

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('repeatPassword').trim();


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
        if (password !== rePass) {
            // throw  {

            //     error: new Error('Passwords don\'t match!'), 
            //     errors: {
                    
            //         password: true,
            //         rePass: true 
            //     }
            // }
            throw new Error('Passwords don\'t match!');
            

        }
        await register(email, password);
       ctx.updateUserNav();
       event.target.reset()

        ctx.page.redirect('/')
    } catch (err) {
        // const message=err.message || err.error.message;
        // update(message,err.errors || {})
        alert(err.message)
    }
}
}