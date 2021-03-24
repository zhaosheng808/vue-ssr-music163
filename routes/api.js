let express = require('express');
let router = express.Router();
let axios = require('axios');

// 网易云音乐接口地址 https://binaryify.github.io/NeteaseCloudMusicApi/#/
const neteaseCloudMusicApiAddress = 'http://musicapi.leanapp.cn';

// 只是单纯的将接口转发到网易云 获取网易云提供的数据
module.exports = function () {
    // const data = require('../data.json')
    router.get('/playlist', (req, res) => {
        axios.get(neteaseCloudMusicApiAddress + '/top/playlist/highquality', {
            params: {
                ...req.query
            }
        }).then(resp => {
            const musicApiData = resp.data.playlists;
            res.json(musicApiData);
        })
    });
    router.get('/playlist/detail', (req, res) => {
        axios.get(neteaseCloudMusicApiAddress + '/playlist/detail', {
            params: {
                ...req.query
            }
        }).then(resp => {
            const musicApiData = resp.data.playlist;
            res.json(musicApiData);
        })
    });

    router.get('/comment/playlist', (req, res) => {
        axios.get(neteaseCloudMusicApiAddress + '/comment/playlist', {
            params: {
                ...req.query
            }
        }).then(resp => {
            const musicApiData = resp.data;
            res.json(musicApiData);
        })
    });

    router.get('/user/detail', (req, res) => {
        axios.get(neteaseCloudMusicApiAddress + '/user/detail', {
            params: {
                ...req.query
            }
        }).then(resp => {
            const musicApiData = resp.data;
            res.json(musicApiData);
        })
    });
    return router;
}