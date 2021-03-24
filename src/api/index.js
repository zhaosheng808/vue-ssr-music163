import axios from 'axios'
import {navArr} from '../config'

function fetch(url, Data, method = 'GET') {
    const data = method === 'POST' ? Data : {}
    const params = method === 'GET' ? Data : {}
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            data,
            params,
            method,
        })
            .then((result) => {
                const res = result.data
                resolve(res)
            })
            .catch(() => {
                reject(new Error('网络繁忙，请稍后再试'))
            })
    })
}

export function fetchListByType(type) {
    const currentNav = navArr.find(item => item.value == type) || {};
    const url = 'http://localhost:8080/api/playlist';
    const params = {
        cat: currentNav.cat
    };
    return fetch(url, params)
}

export function fetchItem(id) {
    const url = 'http://localhost:8080/api/playlist/detail';
    const params = {
        id: id
    };
    return fetch(url, params)
}

export function fetchItemComments(id) {
    const url = 'http://localhost:8080/api/comment/playlist';
    const params = {
        id: id
    };
    return fetch(url, params)
}

export function fetchUser(id) {
    const url = 'http://localhost:8080/api/user/detail';
    const params = {
        uid: id
    };
    return fetch(url, params)
}
