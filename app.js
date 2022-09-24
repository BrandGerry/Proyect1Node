const express = require('express')

//ROUTERS
const { userRouter } = require('./routes/user.routes')
const { restaurantRouter } = require('./routes/restaurants.routes')
const { mealsRouter } = require('./routes/meals.routes')
const { orderRouter } = require('./routes/orders.routes')

//INICIALIZAR NUESTRO EXPRESS
const app = express()

//RECIBA JSON
app.use(express.json())

//EINDPOINTS WITH ROUTER
app.use('/api/v1/users', userRouter)
app.use('/api/v1/restaurants', restaurantRouter)
app.use('/api/v1/meals', mealsRouter)
app.use('/api/v1/orders', orderRouter)

//Atrapa endpoins no existentes
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} doesnt exist`
    })
})

module.exports = { app }