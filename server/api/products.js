
const router = require('express').Router()
const {Product} = require('../db/models')
const { Op } = require('sequelize')

//get routes, non admin users

router.get('/', (req, res, next) => {
  Product.findAll({
    where: {
      inventoryAmount: {
        [Op.gt]: 0
      }
    }
  })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(foundProduct => {
      res.json(foundProduct);
    })
    .catch(next);
});

module.exports = router
