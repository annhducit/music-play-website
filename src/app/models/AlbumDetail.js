const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const albumDetailShema = new Schema({
    albumId: { type: ObjectId, ref: 'Album' },
    songId: { type: ObjectId, ref: 'Song' },
});

const AlbumDetail = mongoose.model('AlbumDetail', albumDetailShema);
module.exports = AlbumDetail;
