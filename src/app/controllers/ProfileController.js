const PlaylistDAO = require('../daos/PlaylistDAO');

class ProfileController {
    async profile(req, res) {
        try {
            const playlistProfile = await PlaylistDAO.readAll();
            res.render('profile', { playlistProfile });

        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
}
module.exports = new ProfileController();