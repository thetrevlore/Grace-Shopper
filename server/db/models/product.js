'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: ['https://static.webshopapp.com/shops/030495/files/076899443/200x200x2/cactus-euphorbia-hermentiana.jpg']
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventoryAmount: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Product
