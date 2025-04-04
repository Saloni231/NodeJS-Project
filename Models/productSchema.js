const mongoose = require('mongoose');
let productSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: Number,
    name: String,
    description: String,
    price: String,
    images: Array,
});

module.exports = mongoose.model('Products', productSchema);