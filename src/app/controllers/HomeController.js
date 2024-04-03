const SongDAO = require('../daos/SongDAO');
const PlaylistDAO = require('../daos/PlaylistDAO');
const AlbumDAO = require('../daos/AlbumDAO');
const BookmarkDAO = require('../daos/BookmarkDAO');
class HomeController {
    // [GET]: /
    async index(req, res) {
        const topSongs = await SongDAO.readAll();
        req.session.user;

        res.render('home', {
            topSongs,
            recentlyPlayed: [[...topSongs].pop()],
        });
    }

    // [GET]: /search || /search/:keyword
    async search(req, res) {
        const keyword = req.params.keyword || '';
        let topResults = await SongDAO.search(keyword, 4);
        let albums = await AlbumDAO.readAll();

        // Get random songs if top results less than limit (4)
        if (topResults.length < 4) {
            const randomSongs = await SongDAO.readRandom(4 - topResults.length);
            topResults = topResults.concat(randomSongs);
        }

        res.render('search', {
            topResults,
            albums,
        });
    }

    // [GET]: /lyrics
    async lyrics(req, res) {
        try {
            const id = req.params.id;
            const lyrics = await SongDAO.read(id);
            console.log(lyrics);
            res.render('lyrics', { data: lyrics });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /profile
    async profile(req, res) {
        try {
            const userId = req.session.userId;
            const user = req.session.user;
            const playlists = await PlaylistDAO.readPlaylistsByUserId(userId);
            const bookmarks = await BookmarkDAO.readBookmarksByUserId(userId);
            const songs = bookmarks.map((ad) => ad.songId);

            const bookmark = {
                id: user._id,
                name: user.name,
            };

            res.render('profile', { playlists, songs, bookmark });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /favorite
    async favorite(req, res) {
        try {
            const userId = req.session.userId;
            const user = req.session.user;
            const bookmarks = await BookmarkDAO.readBookmarksByUserId(userId);
            const songs = bookmarks.map((ad) => ad.songId);

            const bookmark = {
                id: user._id,
                name: user.name,
            };

            res.render('favorite', {
                bookmark,
                songs,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /playlists
    async playlists(req, res) {
        try {
            const userId = req.session.userId;
            const playlists = await PlaylistDAO.readPlaylistsByUserId(userId);
            res.render('playlists', {
                playlists,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /albums/:id
    async album(req, res) {
        const id = req.params.id;
        try {
            const album = await AlbumDAO.read(id);
            const songs = await AlbumDAO.readSongs(id);
            res.render('album', {
                album,
                songs,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /playlists/:id
    async playlistDetails(req, res) {
        const id = req.params.id;
        try {
            const playlist = await PlaylistDAO.read(id);
            const songs = await PlaylistDAO.readSongs(id);

            res.render('playlist-details', {
                playlist,
                songs,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
}

module.exports = new HomeController();
