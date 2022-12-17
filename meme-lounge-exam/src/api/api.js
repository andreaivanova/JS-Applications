import { clearUserData, getUserData, setUserData } from "../util.js";

const host = 'http://localhost:3030';
async function request(url, options) {
    try {
        const response = await fetch(host + url, options);


        if (response.ok !== true) {
            if (response.status === 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }


}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {

        }
    }


    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }


    const userData = getUserData();
    if (userData !== null) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    return options;
}


export async function get(url) {
    return request(url, createOptions());
}


export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}




const links = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout',
}

export async function login(email, password) {
    const result = await post(links.login, { email, password });

    const userData = {
        username: result.username,
        email: result.email,
        id: result._id,
        accessToken: result.accessToken,

    }

    setUserData(userData);
    
}


export async function register(username,email, password,gender) {
    const result = await post(links.register, { username, email, password, gender});

    const userData = {
        username: result.username,
        gender: result.gender,
        email: result.email,
        id: result._id,
        accessToken: result.accessToken,

    }

    setUserData(userData);
}


export async function logout() {
    await get(links.logout);
    clearUserData();

}


