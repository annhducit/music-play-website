const Song = require('../models/Song');
const CustomError = require('../utils/CustomError');
const MongooseParser = require('../utils/MongooseParser');

class SongDAO {
    async create(info) {
        try {
            // Create data
            const song = new Song({
                ...info
            });
            await song.save();
            return song.toObject();
        } catch (err) {
            throw new CustomError(500, `Error creating song: ${err.message}`);
        }
    }

    async read(id) {
        try {
            // Read data
            const song = await Song.findById(id);
            if (!song) {
                throw new CustomError(404, 'Song not found');
            }
            return song.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error reading song: ${err.message}`);
        }
    }

    async readAll() {
        try {
            // Read all data
            const songs = await Song.find();
            return MongooseParser.toArray(songs);
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error reading all songs: ${err.message}`,
            );
        }
    }

    async update(id, info) {
        try {
            // Update data
            const song = await Song.findByIdAndUpdate(id, info);
            if (!song) {
                throw new CustomError(404, 'Song not found');
            }
            return song;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error updating song: ${err.message}`);
        }
    }

    async delete(id) {
        try {
            // Delete data
            const song = await Song.findByIdAndDelete(id);
            if (!song) {
                throw new CustomError(404, 'Song not found');
            }
            return song;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error deleting song: ${err.message}`);
        }
    }

    async readRandom(number) {
        try {
            // Read random data
            const songs = await Song.aggregate([{ $sample: { size: number } }]);
            return songs;
        } catch (err) {
            throw new CustomError(
                500,
                `Error reading random number: ${err.message}`,
            );
        }
    }

    async search(keyword, limit) {
        try {
            // Search data
            const songs = await Song.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { artist: { $regex: keyword, $options: 'i' } },
                ],
            }).limit(limit);
            
            return MongooseParser.toArray(songs);
        } catch (err) {
            throw new CustomError(500, `Error searching songs: ${err.message}`);
        }
    }
}

module.exports = new SongDAO();
