//Model
const { Meals } = require('../models/meals.model')

const mealsExist = async (req, res, next) => {
    try {
        const { id } = req.params
        const meal = await Meals.findOne({ where: { id } })
        if (!meal) {
            return res.status(404).json({
                status: 'Error',
                message: 'Meal not found'
            })
        }
        req.meal = meal
        next()

    } catch (error) {
        console.log(error)
    }

}

module.exports = { mealsExist }