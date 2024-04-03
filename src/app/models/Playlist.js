const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const playlistShema = new Schema({
    name: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User' },
    description: { type: String },
    imageLink: { type: String },
});

const Playlist = mongoose.model('Playlist', playlistShema);
module.exports = Playlist;
