import http from '../util/request'

export const getData = () => {
    return http.get('/home/getData');
}

export const getUserData = (params) => {
    return http.get('/user/getData', params);
}

export const addUser = (data) => {
    return http.post('/user/add', data);
}

export const updateUser = (data) => {
    return http.post('/user/update', data);
}

export const deleteUser = (data) => {
    return http.post('/user/delete', data);
}

export const batchDeleteUser = (data) => {
    return http.post('/user/batchDelete', data);
}