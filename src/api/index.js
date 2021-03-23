import axios from 'axios'
import {navArr} from '../config'

function fetch(url, Data, method = 'GET') {
    const data = method === 'POST' ? Data : {}
    const params = method === 'GET' ? Data : {}
    console.log('url', url);
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:8080/api',
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

export function fetchIdsByType(type) {
    return fetch(`${type}stories`)
}

export function fetchListByType(type) {
    const currentNav = navArr.find(item => item.value == type) || {};
    const params = {
        cat: currentNav.cat
    };
    return fetch(`${type}`, params)
}

export function fetchItem(id) {
    return fetch(`item/${id}`)
}

export function fetchItems(ids) {
    return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser(id) {
    return fetch(`user/${id}`)
}
