//ENCRIPTADOR
const bcrypt = require('bcryptjs')
//DOTENV
const dotenv = require('dotenv')

//MODELS
const { Meals } = require('../models/meals.model')
//Model extra
const { Restaurants } = require('../models/restaurants.model')

//DOTENVCONF
dotenv.config({ path: './config.env' })

//Traer todos las comidas
const getAllMeals = async (req, res) => {
    try {
        const meals = await Meals.findAll({
            where: { status: 'active' },
            include: { model: Restaurants, attributes: ["id", "name", "address"] }
        })
        res.status(200).json({
            status: 'Success',
            data: {
                meals
            }
        })

    } catch (error) {
        console.log(error)
    }
}

//Traer una comida
const getOneMeal = async (req, res) => {
    try {
        const { id } = req.params
        const meal = await Meals.findOne({
            where: { id },
            include: { model: Restaurants, attributes: ["id", "name", "address"] }
        })
        res.status(200).json({
            status: 'Success',
            data: {
                meal
            }
        })

    } catch (error) {
        console.log(error)
    }
}

//Crear comida
const createMeal = async (req, res) => {
    try {
        const { name, price } = req.body
        const { restaurant } = req
        const newMeal = await Meals.create({ name, price, restaurantId: restaurant.id })

        res.status(201).json({
            status: 'success',
            data: { newMeal },
        })
    } catch (error) {
        console.log(error)
    }
}

//Actualizar comida solo admin
const updatedMeal = async (req, res) => {
    try {
        const { name, price } = req.body
        const { meal } = req

        await meal.update({ name, price })

        res.status(200).json({
            status: 'Success',
            data: { meal },
        });

    } catch (error) {
        console.log(error)
    }
}

//Eliminar comida solo el admin
const deleteMeal = async (req, res) => {
    try {
        const { meal } = req

        await meal.update({ status: 'deleted' })
        res.status(200).json({
            status: 'Success'
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllMeals, createMeal, deleteMeal, getOneMeal, updatedMeal }