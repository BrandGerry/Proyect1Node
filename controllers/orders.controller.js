//MODELS
const { Orders } = require('../models/orders.model')
//Model secundario
const { Meals } = require('../models/meals.model')
//Restaurant terceario
const { Restaurants } = require('../models/restaurants.model')

//Traer todos los restaurantes
const getAllOrders = async (req, res) => {
    try {
        //Traido de protectSession
        const { sessionUser } = req
        const orders = await Orders.findAll({
            where: { userId: sessionUser.id },
            include: {
                model: Meals, attributes: ["id", "name", "price", "restaurantId", "status"],
                include: { model: Restaurants, attributes: ["id", "name", "address", "rating", "status"] },
            },
        })
        res.status(200).json({
            status: 'Success',
            data: {
                orders
            }
        })

    } catch (error) {
        console.log(error)
    }
}

//Crear restaurnates y hacer el calculo de total price
const createOrders = async (req, res) => {
    try {
        const { quantity, mealId } = req.body
        //Sacado de Protectsession
        const { sessionUser } = req
        const meal = await Meals.findOne({
            where: { id: mealId, status: 'active' }
        })

        if (!meal) {
            return res.status(404).json({
                status: 'Error',
                message: 'This meal is not active or exist'
            })
        }

        //Automatizarlo ver en post
        const newOrder = await Orders.create({ quantity, mealId, userId: sessionUser.id, totalPrice: quantity * meal.price })

        res.status(201).json({
            status: 'success',
            data: { newOrder },
        })
    } catch (error) {
        console.log(error)
    }
}

//Actualizar Restaurante solo admin
const updatedOrders = async (req, res) => {
    try {
        //ACTUALIZARLA COMO COMPLETADA
        //Viene de orderexist
        const { order } = req
        if (order.status === "active") {
            await order.update({ status: "completed" });
        } else {
            return res.status(404).json({
                status: "error",
                message: `Sorry... this order is already ${order.status}`,
            });
        }
        res.status(204).json({
            status: "success",
        });
    } catch (error) {
        console.log(error);
    }
}

//Eliminar Restaurante solo admin
const deleteOrders = async (req, res) => {
    try {
        const { order } = req;
        if (order.status === "active") {
            await order.update({ status: "cancelled" });
        } else {
            return res.status(404).json({
                status: "error",
                message: `Sorry... this order is already ${order.status}`,
            });
        }
        res.status(204).json({
            status: "success",
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createOrders, deleteOrders, getAllOrders, updatedOrders }