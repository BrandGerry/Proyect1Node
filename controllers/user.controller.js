//ENCRIPTADOR
const bcrypt = require('bcryptjs')
//DOTENV
const dotenv = require('dotenv')
//JSON WEB TOKEN
const jwt = require('jsonwebtoken')

//MODELS
const { User } = require('../models/user.model')
//MODELS SECUNDARIOS
const { Orders } = require('../models/orders.model')
const { Meals } = require('../models/meals.model')
const { Restaurants } = require('../models/restaurants.model')


//DOTENVCONF
dotenv.config({ path: './config.env' })

//FUNCIONES

//Traer los users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json({
            status: 'Sucess',
            data: {
                users
            }
        })

    } catch (error) {
        console.log(error)
    }
}

//Crear un user
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        //Agregar el role
        if (role !== 'admin' && role !== 'normal') {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid role'
            })
        }
        //ENCRIPTACION
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ name, email, role, password: hashedPassword })

        //No devolver la contraseña 
        newUser.password = undefined

        res.status(201).json({
            status: 'Sucess',
            data: { newUser }
        })

    } catch (error) {
        console.log(error)

    }

}

//Iniciar Sesion
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: { email, status: 'active' }
        })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                status: 'Error',
                message: 'Credentials Incorrect'
            })
        }
        //Remover la contraseña
        user.password = undefined

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '20m' })
        res.status(200).json({
            status: 'Success',
            data: { user, token }
        })

    } catch (error) {
        console.log(error)
    }
}

//Actualizar User
const updatedUser = async (req, res) => {
    try {
        const { user } = req
        const { name, email } = req.body

        const updatedUser = await user.update({ name, email })
        res.status(200).json({
            status: 'Success',
            data: { updatedUser }
        })

    } catch (error) {
        console.log(error)

    }
}

//Eliminar User
const deleteUser = async (req, res) => {
    try {
        const { user } = req
        await user.update({ status: 'deleted' })
        res.status(204).json({
            status: 'Sucess'
        })

    } catch (error) {
        console.log(error)

    }
}

//Traer todas las ordenes del User
const getAllOrdersByUser = async (req, res) => {
    try {
        //Verificando que el id es el del usuario desde ----> protectSession
        const { sessionUser } = req
        const orderUser = await Orders.findAll({
            where: { status: 'active', userId: sessionUser.id },
            include: { model: Meals, include: { model: Restaurants } },
        })
        res.status(200).json({
            status: 'Sucess',
            data: { orderUser },
        })

    } catch (error) {
        console.log(error)
    }
}

//Traer una sola orden del user
const getOnlyOrderByUser = async (req, res) => {
    try {
        //Trayendo la orden con el id desde ----> OrderExist
        const { order } = req
        res.status(200).json({
            status: 'Sucess',
            data: { order }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllUsers, createUser, login, updatedUser, deleteUser, getAllOrdersByUser, getOnlyOrderByUser }

