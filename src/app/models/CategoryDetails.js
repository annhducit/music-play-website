const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const categoryDetailShema = new Schema({
    categoryId: { type: ObjectId, ref: 'Category' },
    songId: { type: ObjectId, ref: 'Song' },
});

const CategoryDetail = mongoose.model('CategoryDetail', categoryDetailShema);
module.exports = CategoryDetail;
