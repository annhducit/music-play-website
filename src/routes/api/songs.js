const express = require('express');
const router = express.Router();

const SongController = require('../../app/controllers/SongController');

// [GET]: /api/songs
router.get('/', SongController.index);

// [GET]: /api/songs/readRandomSongs
router.get('/readRandomSongs', SongController.readRandomSongs);

// [GET]: /api/songs/:id
router.get('/:id', SongController.read);

// [POST]: /api/songs/create
router.post('/create', SongController.create);

// [PUT]: /api/songs/:id
router.put('/:id', SongController.update);

// [DELETE]: /api/songs/:id
router.delete('/:id', SongController.delete);

module.exports = router;