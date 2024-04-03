const AdminDAO = require('../daos/AdminDAO');
const SongDAO = require('../daos/SongDAO');
const StringUtils = require('../utils/StringUtils');
const PlaylistDAO = require('../daos/PlaylistDAO');
const AlbumDAO = require('../daos/AlbumDAO')
const UserDAO = require('../daos/UserDAO');
const { validationResult } = require('express-validator');

class AdminController {
    //[GET]: /song/creat
    async creatSong_get(req, res) {
        try {
            const albums = await AlbumDAO.readAll();
            res.render('song-add',{ data: albums });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    //[GET]: /playlist/creat
    async creatPlaylist_get(req, res) {
        try {
            const accounts = await UserDAO.readAll();
            const songs = await SongDAO.readAll();
            res.render('playlist-add',{ users: accounts, songs: songs});
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    //[POST]: /playlist/creat
    async creatPlaylist(req, res) {
        const info = req.body;
        // Create a new album
        try {
            await PlaylistDAO.create(info);
            res.render('playlist-add', {
                success: 'Song created successfully! ',
            });
        } catch (err) {
            res.render('playlist-add', {
                info,
                registerError: err.message,
            });
        }
    }

    //[POST]: /song/creat
    async creatSong(req, res) {
        const info = req.body;
        // Create a new album
        try {
            await SongDAO.create(info);
            res.render('song-add', {
                success: 'Song created successfully! ',
            });
        } catch (err) {
            res.render('song-add', {
                info,
                registerError: err.message,
            });
        }
    }

    //[POST]: /album/creat
    async creatAlbum(req, res) {
        const info = req.body;

        // Validate info
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('album-add', {
                info,
                registerError: errors.array()[0].msg,
            });
        }

        // Create a new album
        try {
            await AlbumDAO.create(info);
            res.render('album-add', {
                success: 'Album created successfully! ',
            });
        } catch (err) {
            res.render('album-add', {
                info,
                registerError: err.message,
            });
        }
    }

    //[POST]: /account/creat
    async creatAccount(req, res) {
        const info = req.body;

        // Validate info
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('account-add', {
                info,
                registerError: errors.array()[0].msg,
            });
        }

        // Create a new user
        try {
            await UserDAO.create(info);
            res.render('account-add', {
                success: 'Account created successfully! ',
            });
        } catch (err) {
            res.render('account-add', {
                info,
                registerError: err.message,
            });
        }
    }

    // [GET]: /admin/album/details/:id
    // async detailAlbum(req, res) {
    //     const albumId = req.params.id;
    //     try {
    //         const album = await AlbumDAO.read(albumId);
    //         alert(album);
    //         res.redirect('/admin/albums');  
    //      } catch (err) {
    //          res.status(err.code).json({ message: err.message });
    //      }
    // }

    // [GET]: /api/admin
    async administrator(req, res) {
        try {
            res.render('admin/admin', {layout: '../../views/layouts/nolayout.hbs'});
        }
        catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /admin/song
    async readAllSong(req, res) {
        try {
            const songs = await SongDAO.readAll();
            res.render('admin/song',{layout: '../../views/layouts/nolayout.hbs', data: songs });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    
    }

     // [GET]: /admin/playlist
     async readAllPlaylist(req, res) {
        try {
            const playlists = await PlaylistDAO.readAll();
            res.render('admin/playlist',{layout: '../../views/layouts/nolayout.hbs', data: playlists });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    
    }


     // [GET]: /admin/album
     async readAllAlbum(req, res) {
        try {
            const albums = await AlbumDAO.readAll();
            res.render('admin/album',{layout: '../../views/layouts/nolayout.hbs', data: albums });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    
    }

     // [GET]: /admin/account
     async readAllAccount(req, res) {
        try {
            const accounts = await UserDAO.readAll();
            res.render('admin/account',{layout: '../../views/layouts/nolayout.hbs', data: accounts });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    
    }

    // [DELETE]: /song/delete/:id
    async deleteSong(req, res) {
        const songId = req.params.id;
        try {
           const song = await SongDAO.delete(songId);
           res.redirect('/admin/songs')       
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

     // [DELETE]: /song/album/:id
    async deleteAlbum(req, res) {
        const albumId = req.params.id;
        try {
           const album = await AlbumDAO.delete(albumId);
           res.redirect('/admin/albums')       
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
    
     // [DELETE]: /playlist/delete/:id
     async deletePlaylist(req, res) {
        const playlistId = req.params.id;
        try {
           const playlists = await PlaylistDAO.delete(playlistId);
           res.redirect('/admin/playlists')       
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

        // [DELETE]: /account/delete/:id
        async deleteAccount(req, res) {
            const userId = req.params.id;
            try {
               const user = await UserDAO.delete(userId);
               res.redirect('/admin/accounts')       
            } catch (err) {
                res.status(err.code).json({ message: err.message });
            }
        }
        
        
    // [GET]: /api/admin
    async index(req, res) {
        // Read all admins
        try {
            const admins = await AdminDAO.readAll();
            res.json({
                message: 'List of admins read successfully',
                data: admins,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /api/admin/:id
    async read(req, res) {
        // Get request data
        const id = req.params.id;

        // Read admin
        try {
            const admin = await AdminDAO.read(id);
            res.json({
                message: 'Admin read successfully',
                data: admin,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [POST]: /api/admins/create
    async create(req, res) {
        // Get request data
        const {
            email = '',
            password = '',
            name = '',
            gender = '',
            dateOfBirth = '',
        } = req.body;

        // Validate invalid info
        let isValid = true;
        if (email.length === 0) {
            isValid = false;
        } else if (!StringUtils.isValidEmail(email)) {
            isValid = false;
        } else if (password.length === 0) {
            isValid = false;
        } else if (name.length === 0) {
            isValid = false;
        } else if (!StringUtils.isValidGender(gender)) {
            isValid = false;
        } else if (!StringUtils.isValidDate(dateOfBirth)) {
            isValid = false;
        }
        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Create admin
        try {
            const admin = await AdminDAO.create({
                email,
                password,
                name,
                gender,
                dateOfBirth,
            });
            res.status(201).json({
                message: 'Admin created successfully',
                data: admin,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [PUT]: /api/admins/:id
    async update(req, res) {
        // Get request data
        const id = req.params.id;
        const {
            email = '',
            password = '',
            name = '',
            gender = '',
            dateOfBirth = '',
        } = req.body;

        // Validate invalid info
        let isValid = true;
        if (email.length === 0) {
            isValid = false;
        } else if (!StringUtils.isValidEmail(email)) {
            isValid = false;
        } else if (password.length === 0) {
            isValid = false;
        } else if (name.length === 0) {
            isValid = false;
        } else if (!StringUtils.isValidGender(gender)) {
            isValid = false;
        } else if (!StringUtils.isValidDate(dateOfBirth)) {
            isValid = false;
        }
        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Update admin
        try {
            const admin = await AdminDAO.update(id, {
                email,
                password,
                name,
                gender,
                dateOfBirth,
            });
            res.json({
                message: 'Admin updated successfully',
                data: admin,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [DELETE]: /api/admins/:id
    async delete(req, res) {
        // Get request data
        const id = req.params.id;

        // Delete admin
        try {
            const admin = await AdminDAO.delete(id);
            res.json({
                message: 'Admin deleted successfully',
                data: admin,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
}

module.exports = new AdminController();
