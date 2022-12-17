
import * as api from './api.js'
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


// the endpoints depend on the app
const endpoints = {
    all: '/data/books?sortBy=_createdOn%20desc',
    byId: '/data/books/',
    myItems: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/books',
    edit: '/data/books/',
    delete: '/data/books/',
    like: '/data/likes',
    totalLikes: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    myLikeOneBook: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
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
export async function likeBook(bookId) {
    return api.post(endpoints.like, { bookId });
}
export async function getTotalLikesOfABook(bookId) {
    return api.get(endpoints.totalLikes(bookId));
}

export async function getMyLikeByBookId(bookId, userId) {
    return api.get(endpoints.myLikeOneBook(bookId, userId));
}

