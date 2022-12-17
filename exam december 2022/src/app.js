

//const page  = require('../node_modules/page/page.mjs');
// import { render } from '../src/lib.js';
import { page } from './lib.js'
import { render } from './lib.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { dashboardPage } from './views/dashboard.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/api.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';


//the root  and the logoutbtn and the usernameToDisplay depend on the app
const root = document.querySelector('main');
Array.from(document.querySelector('div.user').children)[1].addEventListener('click', onLogout);
// const usernameToDisplay=document.querySelector('#user span')
//these links depend on the app
page(decorateContext);
page('/', homePage);
page('/dashboard', dashboardPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/details/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);

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
    // console.log(userData);
    if (userData) {

        document.getElementsByClassName('user')[0].style.display = 'inline-block';
        document.getElementsByClassName('guest')[0].style.display = 'none';
        // usernameToDisplay.textContent=`Welcome, ${userData.email}`
    } else {
        document.getElementsByClassName('user')[0].style.display = 'none';
        document.getElementsByClassName('guest')[0].style.display = 'inline-block';
    }
}


async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/dashboard')
}