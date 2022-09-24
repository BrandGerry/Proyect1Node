const { Meals } = require('./meals.model')
const { Orders } = require('./orders.model')
const { Restaurants } = require('./restaurants.model')
const { Reviews } = require('./reviews.model')
const { User } = require('./user.model')

const initModels = () => {
    //1 Restaurant <---> M reviews
    Restaurants.hasMany(Reviews, { foreignKey: 'restaurantId' })
    Reviews.belongsTo(Restaurants)
    //1 User <---> M reviews
    User.hasMany(Reviews, { foreignKey: 'userId' })
    Reviews.belongsTo(User)
    //1 User <---> M ordenes
    User.hasMany(Orders, { foreignKey: 'userId' })
    Orders.belongsTo(User)
    //1 Restaurante <---> M meals
    Restaurants.hasMany(Meals, { foreignKey: 'restaurantId' })
    Meals.belongsTo(Restaurants)
    //1 order <---> 1 meal
    Meals.hasOne(Orders, { foreignKey: "mealId" })
    Orders.belongsTo(Meals)

}

module.exports = { initModels }