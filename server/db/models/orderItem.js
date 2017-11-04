const db = require('../db')
const Sequelize = require('sequelize')

const OrderItem = db.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  }
})

module.exports = OrderItem
