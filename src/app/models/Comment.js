const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const commentSchema = new Schema({
    content: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User' },
    songId: { type: ObjectId, ref: 'Song' },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
