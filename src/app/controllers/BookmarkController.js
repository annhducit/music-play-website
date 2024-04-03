const BookmarkDAO = require('../daos/BookmarkDAO');

class BookmarkController {
    // [GET]: /api/bookmarks
    async index(req, res) {
        // Read all bookmarks
        try {
            const bookmarks = await BookmarkDAO.readAll();
            res.json({
                message: 'List of bookmarks read successfully',
                data: bookmarks,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /api/bookmarks/:userId
    async readByUserId(req, res) {
        // Get request
        const userId = req.params.userId;

        // Read bookmark
        try {
            const bookmarks = await BookmarkDAO.readBookmarksByUserId(userId);
            res.json({
                message: 'Bookmarks read successfully',
                data: bookmarks,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [POST]: /api/bookmarks/create
    async create(req, res) {
        // Get request body
        const { userId, songId } = req.body;

        // Create bookmark
        try {
            const bookmark = await BookmarkDAO.create({
                userId,
                songId,
            });
            res.status(201).json({
                message: 'Bookmark created successfully',
                data: bookmark,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [DELETE]: /api/bookmarks
    async delete(req, res) {
        // Get request body
        const { userId, songId } = req.body;

        // Delete bookmark
        try {
            const bookmark = await BookmarkDAO.delete({
                userId,
                songId,
            });
            res.json({
                message: 'bookmark deleted successfully',
                data: bookmark,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
}

module.exports = new BookmarkController();
