let express = require('express');
let router = express.Router();
let axios = require('axios');

module.exports = function(config) {
    // const data = require('../data.json')
    router.get('/playlist', (req, res) => {
        axios.get('http://musicapi.leanapp.cn/top/playlist/highquality', {
            params: {
                ...req.query
            }
        }).then(resp => {
            const musicApiData = resp.data.playlists;
            res.json(musicApiData);
        })
    });
    router.get('/playlist/detail', (req, res) => {
        axios.get('http://musicapi.leanapp.cn/playlist/detail', {
            params: {
                ...req.query
            }
        }).then(resp => {
            const musicApiData = resp.data.playlist;
            res.json(musicApiData);
        })
    });

    router.get('/comment/playlist', (req, res) => {
        axios.get('http://musicapi.leanapp.cn/comment/playlist', {
            params: {
                ...req.query
            }
        }).then(resp => {
            const musicApiData = resp.data;
            res.json(musicApiData);
        })
    });

    router.get('/user/detail', (req, res) => {
        axios.get('http://musicapi.leanapp.cn/user/detail', {
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