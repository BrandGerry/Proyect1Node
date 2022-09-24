const express = require('express')

//FUNCIONES CONTROLLER
const { createMeal, deleteMeal, getAllMeals, getOneMeal, updatedMeal } = require('../controllers/meals.controller')

//MIDDLEWARES
const { protectAdminRole, protectSession, protectUserId } = require('../middlewares/auth.mddlw')
const { createMealsValidators } = require('../middlewares/validation.mddlw')
const { mealsExist } = require('../middlewares/meals.mddlw')
const { restaurantExist } = require('../middlewares/restaurant.mddlw')

//ROUTER
const mealsRouter = express.Router()

//Obtener todos las meals
mealsRouter.get('/', getAllMeals)
//Obtener un restaurante 
mealsRouter.get('/:id', mealsExist, getOneMeal)

mealsRouter.use(protectSession)

mealsRouter.post('/:id', restaurantExist, createMealsValidators, createMeal)

mealsRouter.patch('/:id', mealsExist, protectAdminRole, updatedMeal);

mealsRouter.delete('/:id', mealsExist, protectAdminRole, deleteMeal);

module.exports = { mealsRouter }
