//Model
const { Restaurants } = require('../models/restaurants.model')

const restaurantExist = async (req, res, next) => {
    try {
        const { id } = req.params
        const restaurant = await Restaurants.findOne({ where: { id } })
        if (!restaurant) {
            return res.status(404).json({
                status: 'Error',
                message: 'Restaurant not found'
            })
        }
        req.restaurant = restaurant
        next()

    } catch (error) {
        console.log(error)
    }

}

module.exports = { restaurantExist }