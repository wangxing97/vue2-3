import http from '../util/request'

export const getData = () => {
    return http.get('/home/getData');
}