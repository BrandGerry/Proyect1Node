const express = require('express')

//FUNCIONES CONTROLLER
const { getAllRestaurants, getOneRestaurant, updatedRestaurant, createRestaurant, deleteRestaurant, createReview, deletedReview, updatedReview } = require('../controllers/restaurants.controller')

//MIDDLEWARE
const { protectAdminRole, protectSession, protectReviesOwners } = require('../middlewares/auth.mddlw')
const { createRestaurantValidators } = require('../middlewares/validation.mddlw')
const { restaurantExist } = require('../middlewares/restaurant.mddlw')
const { reviewExist } = require('../middlewares/review.mddlw')

//ROUTER
const restaurantRouter = express.Router()

//Obtener todos los restaurantes
restaurantRouter.get('/', getAllRestaurants)

//Obtener un restaurante 
restaurantRouter.get('/:id', getOneRestaurant)

restaurantRouter.use(protectSession)

restaurantRouter.post('/', createRestaurantValidators, createRestaurant)

restaurantRouter.patch('/:id', restaurantExist, protectAdminRole, updatedRestaurant)

restaurantRouter.delete('/:id', restaurantExist, protectAdminRole, deleteRestaurant)

//Parte de review
restaurantRouter.post("/reviews/:restaurantId", createReview)

restaurantRouter.patch("/reviews/:id", reviewExist, protectReviesOwners, updatedReview)

restaurantRouter.delete("/reviews/:id", reviewExist, protectReviesOwners, deletedReview)


module.exports = { restaurantRouter }