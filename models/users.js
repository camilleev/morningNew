const mongoose = require('mongoose')

const wishListSchema = mongoose.Schema({
    title: String,
    img: String,
    content: String
});

const userSchema = mongoose.Schema({
    wishList: [wishListSchema],
    username: String,
    email: String,
    password: String,
    token: String,
    langage: String
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel