

//const page  = require('../node_modules/page/page.mjs');
// import { render } from '../src/lib.js';
import { page } from './lib.js'
import { render } from './lib.js';
import { logout } from './api/api.js';
import { getUserData } from './util.js';


import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { allMemesPage } from './views/allMemes.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';




//the root  and the logoutbtn and the usernameToDisplay depend on the app
const root = document.getElementById('main-section');
document.getElementById('logout').addEventListener('click', onLogout);
// const usernameToDisplay=document.querySelector('#user span')
//these links depend on the app
page(decorateContext);

page('/', homePage); //done
page('/login', loginPage); //done
page('/register', registerPage); //done
page('/create', createPage);  //done
page('/all-memes', allMemesPage); //done
page('/details/:id', detailsPage); //done
page('/details/edit/:id', editPage);//done
page('/profile', profilePage);


updateUserNav()
page.start();

//ctx is pretty much like the event object in the event listener callback functions
function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}


function updateUserNav() {
    const userData = getUserData();
    let usernameToDisplay = document.querySelector('div.profile span')
    if (userData) {

        document.getElementsByClassName('user')[0].style.display = 'inline-block';
        [...document.getElementsByClassName('guest')].forEach(x=>x.style.display = 'none');

        usernameToDisplay.textContent=`Welcome, ${userData.email}`
    } else {
        document.getElementsByClassName('user')[0].style.display = 'none';
        [...document.getElementsByClassName('guest')].forEach(x=>x.style.display = 'inline-block');
    }
}

async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/')
}