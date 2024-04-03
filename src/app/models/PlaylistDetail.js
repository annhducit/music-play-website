const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const playlistDetailShema = new Schema({
    playlistId: { type: ObjectId, ref: 'Playlist' },
    songId: { type: ObjectId, ref: 'Song' },
});

const PlaylistDetail = mongoose.model('PlaylistDetail', playlistDetailShema);
module.exports = PlaylistDetail;
