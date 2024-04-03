const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');


router.get('/admin', adminController.administrator);
router.get('/admin/songs', adminController.readAllSong);
router.get('/admin/playlists', adminController.readAllPlaylist);
router.get('/admin/albums', adminController.readAllAlbum);
router.get('/admin/accounts', adminController.readAllAccount);

// Delete
router.get('/song/delete/:id', adminController.deleteSong);
router.get('/playlist/delete/:id', adminController.deletePlaylist);
router.get('/album/delete/:id', adminController.deleteAlbum);
router.get('/account/delete/:id', adminController.deleteAccount);

//detail
// router.get('/song/detail/:id', adminController.detailSong);
// router.get('/playlist/detail/:id', adminController.detailPlaylist);
// router.get('/album/detail/:id', adminController.detailAlbum);
// router.get('/account/detail/:id', adminController.detailAccount);

//add
router.get('/account/creat', adminController.creatAccount);
router.post('/account/creat', adminController.creatAccount);

router.get('/album/creat', adminController.creatAlbum);
router.post('/album/creat', adminController.creatAlbum);

router.get('/song/creat', adminController.creatSong_get);
router.post('/song/creat', adminController.creatSong);

router.get('/playlist/creat', adminController.creatPlaylist_get);
router.post('/playlist/creat', adminController.creatPlaylist);

module.exports = router;