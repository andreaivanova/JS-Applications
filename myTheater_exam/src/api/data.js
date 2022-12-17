
import * as api from './api.js'
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


// the endpoints depend on the app
const endpoints = {
    all: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    byId: '/data/theaters/',
    myItems: (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/theaters',
    edit: '/data/theaters/',
    delete: '/data/theaters/',
    like: '/data/likes',
   totalLikes: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
   likeUser: (theaterId, userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
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
export async function likeItem(theaterId) {
    return api.post(endpoints.like, { theaterId });
}
export async function getTotalLikes(theaterId) {
    return api.get(endpoints.totalLikes(theaterId));
}

export async function getLikeFromUser(theaterId, userId) {
    return api.get(endpoints.likeUser(theaterId, userId));
}

