const SongDAO = require('../daos/SongDAO');

class SongController {
    // [GET]: /api/songs
    async index(req, res) {
        // Read all songs
        try {
            const songs = await SongDAO.readAll();
            res.json({
                message: 'List of songs read successfully',
                data: songs,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /api/songs/:id
    async read(req, res) {
        // Get request
        const id = req.params.id;

        // Read song
        try {
            const song = await SongDAO.read(id);
            res.json({
                message: 'Song read successfully',
                data: song,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [POST]: /api/songs/create
    async create(req, res) {
        // Get request data
        const {
            name = '',
            artist = '',
            lyrics = '',
            imageLink = '',
            uploadLink = '',
            categoryId = '',
            albumId = '',
        } = req.body;

        // Validate invalid info
        let isValid = true;
        if (name.length === 0) {
            isValid = false;
        } else if (artist.length === 0) {
            isValid = false;
        } else if (lyrics.length === 0) {
            isValid = false;
        } else if (imageLink.length === 0) {
            isValid = false;
        } else if (uploadLink.length === 0) {
            isValid = false;
        } else if (categoryId.length === 0) {
            isValid = false;
        } else if (albumId.length === 0) {
            isValid = false;
        }
        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Create song
        try {
            const song = await SongDAO.create({
                name,
                artist,
                lyrics,
                imageLink,
                uploadLink,
                categoryId,
                albumId,
            });
            res.status(201).json({
                message: 'Song created successfully',
                data: song,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [PUT]: /api/songs/:id
    async update(req, res) {
        // Get request data
        const id = req.params.id;
        const {
            name = '',
            artist = '',
            lyrics = '',
            imageLink = '',
            uploadLink = '',
            categoryId = '',
            albumId = '',
        } = req.body;

        // Validate invalid info
        let isValid = true;
        if (name.length === 0) {
            isValid = false;
        } else if (artist.length === 0) {
            isValid = false;
        } else if (lyrics.length === 0) {
            isValid = false;
        } else if (imageLink.length === 0) {
            isValid = false;
        } else if (uploadLink.length === 0) {
            isValid = false;
        } else if (categoryId.length === 0) {
            isValid = false;
        } else if (albumId.length === 0) {
            isValid = false;
        }
        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Update song
        try {
            const song = await SongDAO.update(id, {
                name,
                artist,
                lyrics,
                imageLink,
                uploadLink,
                categoryId,
                albumId,
            });
            res.json({
                message: 'Song updated successfully',
                data: song,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [DELETE]: /api/songs/:id
    async delete(req, res) {
        // Get request data
        const id = req.params.id;

        // Delete song
        try {
            const song = await SongDAO.delete(id);
            res.json({
                message: 'Song deleted successfully',
                data: song,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /api/songs/readRandomSongs
    async readRandomSongs(req, res) {
        // Read the list of 20 random songs
        try {
            const songs = await SongDAO.readRandom(20);
            res.json({
                message: 'List of 20 random songs',
                data: songs,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
}

module.exports = new SongController();
