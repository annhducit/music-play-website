const PlaylistDAO = require('../daos/PlaylistDAO');
const path = require('path');
const fsx = require('fs-extra');
const multiparty = require('multiparty');
const uuid = require('uuid');

class PlaylistController {
    // [GET]: /api/playlists
    async index(req, res) {
        // Read all playlists
        try {
            const playlists = await PlaylistDAO.readAll();
            res.json({
                message: 'Playlists read successfully',
                data: playlists,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /api/playlists/:id
    async read(req, res) {
        // Get request
        const id = req.params.id;

        // Read playlist
        try {
            const playlist = await PlaylistDAO.read(id);
            const songs = await PlaylistDAO.readSongs(id);
            playlist.songs = songs;

            res.json({
                message: 'playlist read successfully',
                data: playlist,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [POST]: /api/playlists
    async create(req, res) {
        const userId = req.session.userId;
        const form = new multiparty.Form();

        form.parse(req, async (err, fields, files) => {
            if (err)
                return res.status(505).render('505', { error: err.message });

            console.log(fields, files);

            const name = fields.name[0];
            const description = fields.description[0];
            const photo = files.files[0];

            const photoExtname = path.extname(photo.originalFilename);

            if (photo.size > 500 * 1000)
                return console.log(`${photo.originalFilename}: failed!`);

            if (!['.jpg', '.png'].includes(photoExtname))
                return console.log(`${photo.originalFilename}: failed!`);

            // Move tmp file to the new location
            const imageLink = `/images/playlists/${uuid.v4()}.jpg`;
            const newPath = `${__dirname}/../../public${imageLink}`;

            fsx.move(photo.path, newPath, (err) => {
                if (err) return console.error(err);
                console.log(`${photo.originalFilename}: successfully!`);
            });

            // Create playlist
            try {
                const playlist = await PlaylistDAO.create({
                    name,
                    description,
                    imageLink,
                    userId,
                });
                res.status(201).json({
                    message: 'Playlist created successfully',
                    data: playlist,
                });
            } catch (err) {
                res.status(err.code).json({ message: err.message });
            }
        });
    }

    // [PUT]: /api/playlists/:id
    async update(req, res) {
        // Get request data
        const id = req.params.id;
        const { name = '', description = '', iamgeLink = '' } = req.body;

        // Validate invalid info
        let isValid = true;
        if (name.length === 0) {
            isValid = false;
        } else if (description.length === 0) {
            isValid = false;
        } else if (imageLink.length === 0) {
            isValid = false;
        }
        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Update playlist
        try {
            const playlist = await PlaylistDAO.update(id, {
                name,
                description,
                imageLink,
            });
            res.json({
                message: 'Playlist updated successfully',
                data: playlist,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [DELETE]: /api/playlists/:id
    async delete(req, res) {
        // Get request data
        const id = req.params.id;

        // Delete playlist
        try {
            const playlist = await PlaylistDAO.delete(id);
            const imageLink = playlist.imageLink;
            const path = `${__dirname}/../../public${imageLink}`;

            fsx.remove(path, (err) => {
                if (err) return console.error(err);
                console.log(`Remove successfully!`);
            });

            res.json({
                message: 'Playlist deleted successfully',
                data: playlist,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
}

module.exports = new PlaylistController();
