
const items = require('../Models/item');

exports.getmenuItem = (req,res) => {
    const resID = req.params.resId
    items.find({ restaurantId : resID  })
    .then(response => {
        res.status(200).json({
            message:"items fetched successfully",
            menuItems:response
        })
    })
    .catch(err => {
        res.status(500).json({error:err})
    })
}