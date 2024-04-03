const bcrypt = require('bcrypt');

const Comment = require('../models/Comment');
const CustomError = require('../utils/CustomError');

class CommentDAO {
    async create(info) {
        try {
            // Create data
            const comment = new Comment(info);

            await comment.save();
            return comment;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error creating comment: ${err.message}`);
        }
    }

    async read(id) {
        try {
            // Read data
            const comment = await Comment.findById(id);
            if (!comment) {
                throw new CustomError(404, 'Comment not found');
            }
            return comment;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error reading comment by id: ${err.message}`,
            );
        }
    }

    async readAll() {
        try {
            // Read all data
            const comments = await Comment.find();
            return comments;
        } catch (err) {
            throw new CustomError(
                500,
                `Error reading all comments: ${err.message}`,
            );
        }
    }

    async update(id, info) {
        try {
            // Check user already exists
            const tmp = await Comment.findById(id);
            if (!tmp) {
                throw new CustomError(404, 'Comment not found');
            }

            // Update data
            const comment = await Comment.findByIdAndUpdate(id, info);

            return comment;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error updating comment: ${err.message}`);
        }
    }

    async delete(id) {
        try {
            // Delete data
            const comment = await Comment.findByIdAndDelete(id);
            if (!comment) {
                throw new CustomError(404, 'Comment not found');
            }
            return comment;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error deleting comment: ${err.message}`);
        }
    }
}

module.exports = new CommentDAO();
