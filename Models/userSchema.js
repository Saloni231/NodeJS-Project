const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    password: String,
    product: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Products'
    }
});

module.exports = mongoose.model('user', userSchema);