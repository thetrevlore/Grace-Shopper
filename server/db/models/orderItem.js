const db = require('../db')
const Sequelize = require('sequelize')

const OrderItem = db.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
})

module.exports = OrderItem
