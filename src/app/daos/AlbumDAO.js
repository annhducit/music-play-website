const Album = require('../models/Album');
const AlbumDetail = require('../models/AlbumDetail');
const CustomError = require('../utils/CustomError');
const MongooseParser = require('../utils/MongooseParser');

class AlbumDAO {
    async create(info) {
        try {
            const album = new Album({
                ...info,
            });
            await album.save();
            return album.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error creating album: ${err.message}`);
        }
    }

    async read(id) {
        try {
            const album = await Album.findById(id);
            if (!album) {
                throw new CustomError(500, 'Album not found');
            }
            return album.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error reading album by id: ${err.message}`,
            );
        }
    }

    async readAll() {
        try {
            const album = await Album.find();
            return MongooseParser.toArray(album);
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error reading all albul: ${err.message}`,
            );
        }
    }

    async update(id, info) {
        try {
            const tmp = await User.findById(id);
            if (!tmp) {
                throw new CustomError(404, 'Album not found');
            }
            const album = await User.findByIdAndUpdate(id, {
                ...info,
                password: hashedPassword,
            });
            return album;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error updating album: ${err.message}`);
        }
    }

    async delete(id) {
        try {
            const album = await Album.findByIdAndDelete(id);
            if (!album) {
                throw new CustomError(404, 'Album not found');
            }
            return album;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error deleting album: ${err.message}`);
        }
    }

    async readSongs(albumId) {
        try {
            // Read data
            const albumDetails = await AlbumDetail.find({
                albumId,
            }).populate('songId');
            const songs = albumDetails.map((ad) => ad.songId);

            return MongooseParser.toArray(songs);
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, 'An error occurred');
        }
    }
}

module.exports = new AlbumDAO();
