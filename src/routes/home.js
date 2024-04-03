const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

const userAuth = require('../middlewares/userAuth');
const userContext = require('../middlewares/userContext');
const redirectIfNotLogIn = require('../middlewares/redirectIfNotLogIn');

router.use(userAuth);
router.use(userContext);

// [GET]: /
router.get('/', homeController.index);

router.get('/search', homeController.search);

router.get('/search/:keyword', homeController.search);

router.get('/lyrics/:id', homeController.lyrics);

router.get('/profile', redirectIfNotLogIn, homeController.profile);

router.get('/favorite', redirectIfNotLogIn, homeController.favorite);

router.get('/albums/:id', redirectIfNotLogIn, homeController.album);

router.get('/playlists', redirectIfNotLogIn, homeController.playlists);

router.get('/playlists/:id', redirectIfNotLogIn, homeController.playlistDetails);

module.exports = router;
