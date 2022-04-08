
const mealtype = require('../Models/mealtype');

exports.getmeals = (req , res) => {
    mealtype.find()
    .then(response => {
        res.status(200).json({
            message:"meals fetched successfully",
            mealtypes:response
        })
    })
    .catch(err => {
        res.status(500).json({error:err})
    })
}