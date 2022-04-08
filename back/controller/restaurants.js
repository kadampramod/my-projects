
const restaurants = require('../Models/Restaurants');

exports.getrestaurantsbycity = (req,res) => {
    const locId =  req.params.locId
    restaurants.find({ location_id: locId})
    .then(response => {
        res.status(200).json({
            message:"restaurants fetched successfully",
            restaurants:response
        })
    })
    .catch(err => {
        res.status(500).json({error:err})
    })
}

exports.restaurantFilter = (req, res) => {
  let { mealtype, location, cuisine, lcost, hcost, sort, page } = req.body;

    sort = sort ? sort : 1;
    page = page ? page : 1;

  let ItemsPerPage = 2;

    let startIndex = ItemsPerPage * page - ItemsPerPage;
    let endIndex = ItemsPerPage * page  ;

    let filterObj = {};

    mealtype && (filterObj['mealtype_id'] = mealtype);
    location && (filterObj['location_id'] = location);
    cuisine && (filterObj['cuisine_id'] = { $in: cuisine });
    lcost && hcost && (filterObj['min_price'] = { $lte: hcost, $gte: lcost });


    restaurants.find(filterObj).sort({ min_price: sort })
        .then(response => {

            // Pagination Logic
            const paginatedResponse = response.slice(startIndex, endIndex);
            let arr= [];
            for (let i=1; i<= Math.ceil(response.length / ItemsPerPage);i++){
                arr.push(i);
            }

            

            res.status(200).json(
                {
                    message: "Restaurants Fetched Succesfully",
                    restaurants: paginatedResponse,
                    pageCount: arr,
                    currentPage: page
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}




exports.getrestaurantsbyID = (req, res) => {
    const resId = req.params.resId;

    restaurants.findById(resId)
        .then(response => {
            res.status(200).json(
                {
                    message: "Restaurant Fetched Succesfully",
                    restaurant: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}