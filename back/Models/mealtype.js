const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealsSchems = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('mealtypes',mealsSchems,'mealtype')



