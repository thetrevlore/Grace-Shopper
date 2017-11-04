const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  },
  shippingAddress: Sequelize.STRING,
  hasBeenPlaced: { type: Sequelize.BOOLEAN, defaultValue: false }
})

module.exports = Order
