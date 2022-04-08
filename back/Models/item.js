const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    restaurantId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('item', itemSchema, 'items');

