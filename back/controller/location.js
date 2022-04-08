
const locations = require('../Models/location');

exports.getlocation = (req,res) => {
    locations.find()
    .then(response => {
        res.status(200).json({
            message:"location fetched successfully",
            locations:response
        })
    })
    .catch(err => {
        res.status(500).json({error:err})
    })
}