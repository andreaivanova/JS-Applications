
import * as api from './api.js'
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


// the endpoints depend on the app
const endpoints = {
    all: '/data/albums?sortBy=_createdOn%20desc',
    byId: '/data/albums/',
    // myItems: (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/albums',
    edit: '/data/albums/',
    delete: '/data/albums/',
    like: '/data/likes',
    totalLikes: (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    likesUser: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
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
export async function likeAPost(albumId) {
    return api.post(endpoints.like, { albumId });
}
export async function getTotalLikes(offerId) {
    return api.get(endpoints.totalLikes(offerId));
}

export async function getLikesFromUser(albumId, userId) {
    return api.get(endpoints.likesUser(albumId, userId));
}

