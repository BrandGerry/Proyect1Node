const express = require('express')

//FUNCIONES CONTROLLER
const { createOrders, deleteOrders, getAllOrders, updatedOrders } = require('../controllers/orders.controller')

//MIDDLEWARE
const { protectAdminRole, protectSession, protectOrderOwners } = require('../middlewares/auth.mddlw')
const { orderExist } = require('../middlewares/order.mddlw')

//ROUTER
const orderRouter = express.Router()

//ProtecSession
orderRouter.use(protectSession)

//Obtener todos los restaurantes
orderRouter.get('/me', getAllOrders)

orderRouter.post('/', createOrders)

orderRouter.patch('/:id', orderExist, protectOrderOwners, protectAdminRole, updatedOrders);

orderRouter.delete('/:id', orderExist, protectOrderOwners, protectAdminRole, deleteOrders);



module.exports = { orderRouter }