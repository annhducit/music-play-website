const express = require('express');
const  router = express.Router();

const PlaylistController = require('../../app/controllers/PlaylistController');
// [GET]: /api/playlists
router.get('/', PlaylistController.index);

// [GET]: /api/playlists/:id
router.get('/:id', PlaylistController.read);

// [POST]: /api/playlists
router.post('/', PlaylistController.create);

// [PUT]: /api/playlists/:id
router.put('/:id', PlaylistController.update);

// [DELETE]: /api/playlists/:id
router.delete('/:id', PlaylistController.delete);


module.exports = router;