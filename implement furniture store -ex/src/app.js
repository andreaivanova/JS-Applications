

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
import { myPublicationsPage } from './views/myPublications.js';


//the root  and the logoutbtn and the usernameToDisplay depend on the app
const root = document.getElementById('content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);
// let usernameToDisplay = document.getElementById('profile').children[0]
//these links depend on the app
page(decorateContext);

page('/', dashboardPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/details/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-publications', myPublicationsPage);

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


        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        // usernameToDisplay.textContent = `Welcome, ${userData.username}`
    } else {


        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}


async function onLogout() {

    await logout();
    updateUserNav();
    page.redirect('/')
}