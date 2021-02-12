const mongoose = require('mongoose')

const wishListSchema = mongoose.Schema({
    title: String,
    img: String,
})

const wishListModel = mongoose.model('wishLists', wishListSchema)

module.exports = wishListModel