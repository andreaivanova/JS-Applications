
import * as api from './api.js'
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


// the endpoints depend on the app
const endpoints = {
    all: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    byId: '/data/pets/',
    // myItems: (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/pets',
    edit: '/data/pets/',
    delete: '/data/pets/',
    donate: '/data/donation',
   totalDonations: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
   donUser: (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
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
export async function donatePet(petId) {
    return api.post(endpoints.donate, { petId });
}
export async function getTotalDonations(petId) {
    return api.get(endpoints.totalDonations(petId));
}

export async function getDonFromUser(petId, userId) {
    return api.get(endpoints.donUser(petId, userId));
}

