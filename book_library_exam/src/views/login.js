import { login } from "../api/data.js";
import { html } from "../lib.js";


const loginTemplate = (onSubmit) => html`
<section id="login-page" class="login">
    <form @submit=${onSubmit} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
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
        await login(email,password)
        ctx.updateUserNav();
        event.target.reset()
        ctx.page.redirect('/')
        //suzdavame formdata
        //vadim ot neq email i parola
        // vikame login zaqvkATA DIREKTNO
    //     try {
    //       //  await login(email, password)
            
    //         //    s tozi method redirect-vame kum home page
    //     } catch (err) {
    //         // ctx.render(loginTemplate(onSubmit), 'My message');
    //       // alert(err.message)

    //     }
    }
}