const Playlist = require('../models/Playlist');
const PlaylistDetail = require('../models/PlaylistDetail');
const CustomError = require('../utils/CustomError');
const MongooseParser = require('../utils/MongooseParser');

class PlaylistDAO {
    async create(info) {
        try {
            // Create data
            const playlist = new Playlist(info);
            await playlist.save();
            return playlist.toObject();
        } catch (err) {
            throw new CustomError(
                500,
                `Error creating playlist: ${err.message}`,
            );
        }
    }

    async read(id) {
        try {
            // Read data
            const playlist = await Playlist.findById(id);
            if (!playlist) {
                throw new CustomError(404, 'Playlist not found');
            }
            return playlist.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error reading playlist: ${err.message}`,
            );
        }
    }

    async readAll() {
        try {
            // Read all data
            const playlists = await Playlist.find();
            return MongooseParser.toArray(playlists);
        } catch (err) {
            throw new CustomError(
                500,
                `Error reading all playlist: ${err.message}`,
            );
        }
    }

    async update(id, info) {
        try {
            // Update data
            const playlist = await Playlist.findByIdAndUpdate(id, info);
            if (!playlist) {
                throw new CustomError(404, 'playlist not found');
            }
            return playlist;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error updating playlist: ${err.message}`,
            );
        }
    }

    async delete(id) {
        try {
            // Delete data
            const playlist = await Playlist.findByIdAndDelete(id);
            if (!playlist) {
                throw new CustomError(404, 'Playlist not found');
            }
            return playlist.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error deleting playlist: ${err.message}`,
            );
        }
    }

    async readSongs(playlistId) {
        try {
            // Read dat
            const playlistDetails = await PlaylistDetail.find({
                playlistId,
            }).populate('songId');

            const songs = playlistDetails.map((pd) => pd.songId);
            return MongooseParser.toArray(songs);
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, 'An error occurred');
        }
    }

    async readPlaylistsByUserId(userId) {
        try {
            const playlist = await Playlist.find({ userId });
            if (!playlist) {
                throw new CustomError(404, 'Playlist not found');
            }
            return MongooseParser.toArray(playlist);
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error deleting playlist: ${err.message}`,
            );
        }
    }
}

module.exports = new PlaylistDAO();
