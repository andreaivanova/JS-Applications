
import * as api from './api.js'
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


// the endpoints depend on the app
const endpoints = {
    all: '/data/memes?sortBy=_createdOn%20desc',
    byId: '/data/memes/',
    myItems: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/memes',
    edit: '/data/memes/',
    delete: '/data/memes/',

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
// //depend on the app
// export async function donatePost(postId) {
//     return api.post(endpoints.donate, { postId });
// }
// export async function getTotalDonations(postId) {
//     return api.get(endpoints.totalDonations(postId));
// }

// export async function getDonFromUser(postId, userId) {
//     return api.get(endpoints.donUser(postId, userId));
// }

