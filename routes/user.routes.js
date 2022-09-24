const express = require('express')

//FUNCIONES CONTROLLER
const { getAllUsers, createUser, login, deleteUser, updatedUser, getAllOrdersByUser, getOnlyOrderByUser } = require('../controllers/user.controller')

//MIDDLEWARE
const { protectAdminRole, protectSession, protectUserId, protectOrderOwners } = require('../middlewares/auth.mddlw')
const { createUserValidators } = require('../middlewares/validation.mddlw')
const { userExist } = require('../middlewares/users.mddlw')

//With Order
const { orderExist } = require('../middlewares/order.mddlw')

//ROUTER
const userRouter = express.Router()

//ENDPOINTS
userRouter.get('/', protectSession, protectAdminRole, getAllUsers)
userRouter.post('/singup', createUserValidators, createUser)
userRouter.patch('/:id', protectSession, userExist, protectUserId, updatedUser)
userRouter.delete('/:id', protectSession, userExist, protectUserId, deleteUser)
userRouter.post('/login', login)
//With order
userRouter.get('/orders', protectSession, getAllOrdersByUser)
userRouter.get('/orders/:id', protectSession, orderExist, protectOrderOwners, getOnlyOrderByUser)

module.exports = { userRouter }