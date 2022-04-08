const express= require('express');
const route = express.Router();
  
const locationController = require('../controller/location');
const mealtypesController =  require('../controller/mealtype');
const restaurantscontroller =  require('../controller/restaurants');
const userController = require('../controller/user');
const restaurantsBYiDcontroller =  require('../controller/restaurants');
const menuItemcontroller =  require('../controller/item');
const orderscontroller =  require('../controller/order');
const ordersBYusercontroller =  require('../controller/order');
const paymentGatewayController = require('../controller/Payments');



route.get('/locations', locationController.getlocation);
route.get('/mealtypes', mealtypesController.getmeals);
route.get('/restaurant/:locId', restaurantscontroller.getrestaurantsbycity);
route.get('/login', userController.logincontroller);
route.post('/signUp', userController.usersignup);
route.get('/menuItem/:resId', menuItemcontroller.getmenuItem);
route.post('/filter', restaurantscontroller.restaurantFilter);
route.get('/restaurants/:resId', restaurantsBYiDcontroller.getrestaurantsbyID);
route.post('/orders', orderscontroller.saveorder);
route.get('/ordersBYuserID/:userid', ordersBYusercontroller.orderBYuserID);
route.post('/payment', paymentGatewayController.payment);
route.post('/callback', paymentGatewayController.callback);







module.exports = route;