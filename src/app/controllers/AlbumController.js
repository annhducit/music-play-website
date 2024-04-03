const AlbumDAO = require('../daos/AlbumDAO');

class AlbumController {

    async index(req, res) {
        try {
            const albums = await AlbumDAO.readAll();
            res.json({
                message: 'List of albums read successfully',
                data: albums,
            });
        } catch (err) {
            res.status(err.code).json({
                message: err.message
            });
        }
    }

    async read(req, res) {
        const id = req.params.id;
        try {
            const album = await AlbumDAO.read(id)
            const songs = await AlbumDAO.readSongs(id);
            album.songs = songs;

            res.json({
                message: 'Album read successfully',
                data: album,
            });
        } catch (err) {
            res.status(err.code).json({
                message: err.message
            });
        }
    }

    async create(req, res) {
        const {
            name = '',
            imageLink = ''
        } = req.body;

        let isValue = true;
        if (name.length == 0) {
            isValue = false;
        } else if (imageLink.length === 0) {
            isValid = false;
        }
        if (!isValid) {
            return res.status(422).json({
                message: 'Invalid information'
            });
        }

        try {
            const album = await AlbumDAO.create({
                name,
                imageLink
            });
            res.status(201).json({
                message: 'Album created successfully',
                data: album,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    async update(req, res) {
        let id  = req.params.id;
        const {
            name = '',
            imageLink = ''
        } = req.body;

        let isValue = true;
        if (name.length == 0) {
            isValue = false;
        } else if (imageLink.length === 0) {
            isValid = false;
        }
        if (!isValid) {
            return res.status(422).json({
                message: 'Invalid information'
            });
        }

        try {
            const album = await AlbumDAO.update(id, {
                name,
                imageLink
            });
            res.status(201).json({
                message: 'Album update successfully',
                data: album,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            const album = await AlbumDAO.delete(id);
            res.json({
                message: 'Album deleted successfully',
                data: album,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
}

module.exports = new AlbumController();