const mongoose = require('mongoose');
let categorySchema = mongoose.Schema({
    _id: Number,
    category: String
})

module.exports = mongoose.model('category', categorySchema);