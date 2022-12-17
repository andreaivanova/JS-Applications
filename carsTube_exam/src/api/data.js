
import * as api from './api.js'
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


// the endpoints depend on the app
const endpoints = {
    all: '/data/cars?sortBy=_createdOn%20desc',
    byId: '/data/cars/',
    create: '/data/cars',
    edit: '/data/cars/',
    delete: '/data/cars/',
    myItems: (userId)=>`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    search: (query) => `/data/cars?where=year%3D${query}`,
}
////fetch requests for the specific application

/*

 
getAll
getByID
getMyItems

*///these functions depend on the app

export async function getAll() {
    return api.get(endpoints.all);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getMyItems(userId) {
    return api.get(endpoints.myItems(userId));
}

export async function createItem(data) {
    return api.post(endpoints.create, data);
}
export async function editItem(id, data) {
    return api.put(endpoints.edit + id, data);
}
export async function deleteItem(id) {
    return api.del(endpoints.delete + id);
}
//depend on the app

export async function searchItem(queryString) {
    return api.get(endpoints.search(queryString));
}

