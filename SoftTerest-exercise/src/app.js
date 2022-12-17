

//const page  = require('../node_modules/page/page.mjs');
// import { render } from '../src/lib.js';
import { page } from './lib.js'
import { render } from './lib.js';
import { createPage } from './views/create.js';

import { detailsPage } from './views/details.js';
import { dashboardPage } from './views/dashboard.js';
import { loginPage } from './views/login.js';

import { registerPage } from './views/register.js';
import { logout } from './api/api.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';


//the root  and the logoutbtn and the usernameToDisplay depend on the app
const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);
//these links depend on the app
page(decorateContext);

page('/', homePage);
page('/dashboard', dashboardPage);
page('/create', createPage);
page('/details/:id', detailsPage);
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
    if (userData) {


        [...document.getElementsByClassName('user')].forEach(x => x.style.display = 'inline-block');
        [...document.getElementsByClassName('guest')].forEach(x => x.style.display = 'none');
    } else {


        [...document.getElementsByClassName('user')].forEach(x => x.style.display = 'none');
        [...document.getElementsByClassName('guest')].forEach(x => x.style.display = 'inline-block');
    }
}


async function onLogout() {

    await logout();
    updateUserNav();
    page.redirect('/')
}