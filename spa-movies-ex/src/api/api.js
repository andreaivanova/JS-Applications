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
        email: result.email,
        id: result._id,
        accessToken: result.accessToken,

    }

    setUserData(userData);
}


export async function register(email, password) {
    const result = await post(links.register, { email, password });

    const userData = {
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




/*
const host = 'http://localhost:3030';



async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    };
 
    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
 
    const userData = JSON.parse(sessionStorage.getItem('userData'));
 
    if (userData !== null) {
        options.headers['X-Authorization'] = userData.accessToken;
    }
 
    try {
        const res = await fetch(host + url, options);
 
        if (res.ok == false) {
            //403 means that we are forbidden of making authorized requests , invalid access token
            if(res.status === 403){
                sessionStorage.removeItem("userData")
            }
            const error = await res.json();
            throw Error(error.message);
        }
//if we have 204 code status this means that the request has no content,usually with get requests
        if (res.status == 204) {
            return res;
        } else {
            return await res.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}
 
export async function get(url) {
    return request('get', url);
}
 
export async function post(url, data) {
    return request('post', url, data);
}
export function put(url, data) {
    return request('put', url, data);
}
export function del(url) {
    return request('delete', url);
}
 
const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout',
}
     
export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
 
    const userData = {
        email: result.email,
        id: result._id,
        accessToken: result.accessToken,
 
    }
 
    setUserData(userData);
}
 
 
export async function register(email, password) {
    const result = await post(endpoints.register, { email, password });
 
    const userData = {
        email: result.email,
        id: result._id,
        accessToken: result.accessToken,
 
    }
 
    setUserData(userData);
}
 
 
export async function logout() {
    await get(endpoints.logout, { email, password });
    clearUserData();
 
}

*/