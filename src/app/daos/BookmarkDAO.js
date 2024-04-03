const Bookmark = require('../models/Bookmark');
const CustomError = require('../utils/CustomError');
const MongooseParser = require('../utils/MongooseParser');

class BookmarkDAO {
    async create(info) {
        try {
            // Create data
            const bookmark = new Bookmark(info);
            await bookmark.save();
            return bookmark.toObject();
        } catch (err) {
            throw new CustomError(
                500,
                `Error creating bookmark: ${err.message}`,
            );
        }
    }

    async read(id) {
        try {
            // Read data
            const bookmark = await Bookmark.findById(id);
            if (!bookmark) {
                throw new CustomError(404, 'Bookmark not found');
            }
            return bookmark;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error reading bookmark: ${err.message}`,
            );
        }
    }

    async readAll() {
        try {
            // Read all data
            const bookmarks = await Bookmark.find();
            return bookmarks;
        } catch (err) {
            throw new CustomError(
                500,
                `Error reading all bookmarks: ${err.message}`,
            );
        }
    }

    async update(id, info) {
        try {
            // Update data
            const bookmark = await Bookmark.findByIdAndUpdate(id, info);
            if (!bookmark) {
                throw new CustomError(404, 'Bookmark not found');
            }
            return bookmark;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error updating bookmark: ${err.message}`,
            );
        }
    }

    async delete(info) {
        try {
            // Delete data
            const bookmark = await Bookmark.findOne(info);
            if (!bookmark) {
                throw new CustomError(404, 'bookmark not found');
            }

            await Bookmark.deleteOne(info);
            return bookmark.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error deleting bookmark: ${err.message}`,
            );
        }
    }

    async readBookmarksByUserId(userId) {
        try {
            // Read data
            const bookmarks = await Bookmark.find({
                userId,
            }).populate('songId');

            return MongooseParser.toArray(bookmarks);
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, 'An error occurred');
        }
    }
}

module.exports = new BookmarkDAO();
