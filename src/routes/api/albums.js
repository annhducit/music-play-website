const express = require('express');
const router = express.Router();

const AlbumController = require('../../app/controllers/AlbumController');

router.get('/', AlbumController.index);

router.get('/:id', AlbumController.read);

router.post('/create', AlbumController.create);

router.put('/:id', AlbumController.update);

router.delete('/:id', AlbumController.delete);

module.exports = router;