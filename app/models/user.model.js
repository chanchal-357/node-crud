var mongoose = require('mongoose');

var Users = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    ipAddress: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', Users);