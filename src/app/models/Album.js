const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    imageLink: { type: String },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
