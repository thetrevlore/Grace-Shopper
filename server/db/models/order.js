const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0.00
  },
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
  },
  productQuantity: { type: Sequelize.INTEGER, allowNull: false },
  productPrice: { type: Sequelize.INTEGER, allowNull: false },
  productId: { type: Sequelize.INTEGER, allowNull: false },
  hasBeenPlaced: { type: Sequelize.BOOLEAN, defaultValue: false }
})

module.exports = Order