const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bookmarkShema = new Schema({
    userId: { type: ObjectId, ref: 'User' },
    songId: { type: ObjectId, ref: 'Song' },
});

const Bookmark = mongoose.model('Bookmark', bookmarkShema);
module.exports = Bookmark;
