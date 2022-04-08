const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    placedOn : {
        type: String,
        required: true
    },
    placedBy : {
        type: String,
        required: true
    },
    placedByUserId: {
        type: Number,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('orders', orderSchema , 'order');

