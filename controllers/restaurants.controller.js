//MODELS
const { Restaurants } = require('../models/restaurants.model')
//Modelo secundario
const { Reviews } = require('../models/reviews.model')

//Traer todos los restaurantes
const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurants.findAll({
            where: { status: 'active' },
            include: { model: Reviews },
        })
        res.status(200).json({
            status: 'Success',
            data: {
                restaurants
            }
        })

    } catch (error) {
        console.log(error)
    }
}

//Traer un Restaurante
const getOneRestaurant = async (req, res) => {
    try {
        const { id } = req.params
        const restaurant = await Restaurants.findOne({
            where: { id }
        })
        res.status(200).json({
            status: 'Success',
            data: {
                restaurant
            }
        })

    } catch (error) {
        console.log(error)
    }
}

//Crear restaurnates
const createRestaurant = async (req, res) => {
    try {
        const { name, address, rating } = req.body
        //Automatizarlo ver en post
        const newRestaurant = await Restaurants.create({ name, address, rating })

        res.status(201).json({
            status: 'success',
            data: { newRestaurant },
        })
    } catch (error) {
        console.log(error)
    }
}

//Actualizar Restaurante solo admin
const updatedRestaurant = async (req, res) => {
    try {
        const { name, address } = req.body
        //Traido de restaurantsexist 
        const { restaurant } = req

        await restaurant.update({ name, address })

        res.status(200).json({
            status: 'Success',
            data: { restaurant },
        });

    } catch (error) {
        console.log(error)

    }
}

//Eliminar Restaurante solo admin
const deleteRestaurant = async (req, res) => {
    try {
        const { restaurant } = req
        await restaurant.update({ status: 'deleted' })
        res.status(200).json({
            status: 'Success'
        })

    } catch (error) {
        console.log(error)

    }

}

const createReview = async (req, res) => {
    try {
        const { comment, rating } = req.body
        const { restaurantId } = req.params
        const { sessionUser } = req
        const review = await Reviews.create({
            comment,
            rating,
            restaurantId,
            userId: sessionUser.id
        })
        res.status(201).json({
            status: 'Success',
            data: review,
        })
    } catch (error) {
        console.log(error)
    }
}

const updatedReview = async (req, res) => {
    try {
        const { comment, rating } = req.body

        //El id ya viene junto con la validacion de reviews exist
        const { review } = req

        await review.update({ comment, rating })
        res.status(200).json({
            status: 'Success',
            data: { review },
        });

    } catch (error) {
        console.log(error)
    }
}

const deletedReview = async (req, res) => {
    try {
        const { review } = req
        await review.update({ status: 'deleted' })
        res.status(200).json({
            status: 'Success'
        })

    } catch (error) {
        console.log(error)
    }
}
module.exports = { getAllRestaurants, getOneRestaurant, updatedRestaurant, createRestaurant, deleteRestaurant, createReview, updatedReview, deletedReview }