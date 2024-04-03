const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ratingSchema = new Schema({
    rate: { type: Number, required: true },
    lastUpdate: { type: Date, required: true },
    songId: { type: ObjectId, ref: 'Song' },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
