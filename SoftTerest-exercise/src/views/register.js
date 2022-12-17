import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`

  
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
        <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="">
        </div>
        <form @submit=${onSubmit} class="form-user col-md-7" action="" method="">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
            </div>
            <div class="form-label-group">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" class="form-control" placeholder="Email" required=""
                    autofocus="">
            </div>
            <div class="form-label-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" class="form-control"
                    placeholder="Password" required="">
            </div>
            <div class="form-label-group">
                <label for="inputRepeatPassword">Repeat Password</label>
                <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
                    placeholder="Repeat Password" required="">
            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
            <div class="text-center mb-4">
                <p class="alreadyUser"> You alredy have an account? Then just
                    <a href="/login">Sign-In</a>!
                </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>


`

export function registerPage(ctx) {
    
    ctx.render(registerTemplate(onSubmit))

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('repeatPassword').trim();


    try {


        if (email === '' || password === '') {
      
        throw new Error('All fields are required!');
        }

        if(email.length < 3 || password.length < 3){
        throw new Error('Email and password must be at least 3 characters long!');

        }


        if (password !== rePass) {
           
            throw new Error('Passwords don\'t match!');
            

        }
        await register(email, password);
       ctx.updateUserNav();
       event.target.reset()

        ctx.page.redirect('/')
    } catch (err) {
        alert(err.message)
    }
}
}