const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const songSchema = new Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    lyrics: { type: String, required: true },
    imageLink: { type: String },
    uploadLink: { type: String },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
