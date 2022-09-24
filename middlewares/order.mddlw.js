//Model
const { Orders } = require('../models/orders.model')

const orderExist = async (req, res, next) => {
    try {
        const { id } = req.params
        const order = await Orders.findOne({ where: { id } })
        if (!order) {
            return res.status(404).json({
                status: 'Error',
                message: 'Order not found'
            })
        }
        req.order = order
        next()

    } catch (error) {
        console.log(error)
    }

}

module.exports = { orderExist }