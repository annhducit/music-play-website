const CommentDAO = require('../daos/CommentDAO');
const UserDAO = require('../daos/UserDAO');
const SongDAO = require('../daos/SongDAO');

const User = require('../models/User');
const Song = require('../models/Song');
const StringUtils = require('../utils/StringUtils');

class CommentController {
    // [GET]: /api/comments
    async index(req, res) {
        // Read all comments
        try {
            const comments = await CommentDAO.readAll();
            res.json({
                message: 'List of comments read successfully',
                data: comments,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /api/comments/:id
    async read(req, res) {
        // Get request data
        const id = req.params.id;

        // Read comment
        try {
            const comment = await CommentDAO.read(id);
            res.json({
                message: 'Comment read successfully',
                data: comment,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [POST]: api/comments/create
    async create(req, res) {
        // Get request data
        const {
            content = '',
            userId = '',
            songId = '',
        } = req.body;

        // Validate invalid info
        let isValid = true;
        if (!content || content === "") {
            isValid = false;
        } else if (!User.findOne({ userId })) {
            isValid = false;
        } else if (!Song.findOne({ songId })) {
            isValid = false;
        }

        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Create comment
        try {
            const comment = await CommentDAO.create({
                content,
                userId,
                songId,
            });
            res.status(201).json({
                message: 'Comment created successfully',
                data: comment,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [PUT]: /comments/:id
    async update(req, res) {
        // Get request data
        const id = req.params.id;
        const {
            content = '',
            userId = '',
            songId = '',
        } = req.body;

        // Validate invalid info
        let isValid = true;
        if (!content || content === "") {
            isValid = false;
        } else if (!User.findOne({ songId })) {
            isValid = false;
        } else if (!Song.findOne({ songId })) {
            isValid = false;
        }

        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Update comment
        try {
            const comment = await CommentDAO.update(id, {
                content,
                userId,
                songId,
            });
            res.json({
                message: 'Comment updated successfully',
                data: comment,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [DELETE]: /comments/:id
    async delete(req, res) {
        // Get request data
        const id = req.params.id;

        // Delete comment
        try {
            const comment = await CommentDAO.delete(id);
            res.json({
                message: 'Comment deleted successfully',
                data: comment,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
}

module.exports = new CommentController();
