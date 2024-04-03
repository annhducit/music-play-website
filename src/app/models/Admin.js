const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String },
    dateOfBirth: { type: Date },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
