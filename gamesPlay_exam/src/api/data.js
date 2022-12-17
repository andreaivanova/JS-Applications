
import * as api from './api.js'
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


// the endpoints depend on the app
const endpoints = {
    mostRecent: `/data/games?sortBy=_createdOn%20desc&distinct=category`,
    all: '/data/games?sortBy=_createdOn%20desc',
    byId: '/data/games/',
    // myItems: (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/games',
    edit: '/data/games/',
    delete: '/data/games/',
    comment: '/data/comments',
    allComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
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

export async function mostRecent() {
    return api.get(endpoints.mostRecent);
} 


export async function commentPost(gameId, comment) {
    return api.post(endpoints.comment, { gameId, comment });
}
export async function getAllComments(gameId) {
    return api.get(endpoints.allComments(gameId));
}



