
const orders = require('../Models/order');

exports.saveorder= (req,res) => {
    let {placedOn,placedBy,placedByUserId,Amount,restaurantId} = req.body
   let obj1 = new orders({placedOn,placedBy,placedByUserId,Amount,restaurantId})
    obj1.save()

    .then(response => {
        res.status(200).json({
            message:"order saved successfully",
            order:response
        })
    })
    .catch(err => {
        res.status(500).json({error:err})
    })
}


exports.orderBYuserID = (req,res) => {
    orders.find({placedByUserId:req.params.userid})
    .then(response => {
        res.status(200).json({
            message:"order fetched successfully",
            order:response
        })
    })
    .catch(err => {
        res.status(500).json({error:err})
    })
}