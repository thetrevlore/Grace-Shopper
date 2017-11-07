
const router = require('express').Router()
const {OrderItem} = require('../db/models')

router.delete('/:orderId/:productId', (req, res, next) => {
  return OrderItem.findOne({
    where: {
      orderId: +req.params.orderId,
      productId: +req.params.productId
    }
  })
    .then(foundItem => {
      foundItem.destroy()
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(console.error);
});

module.exports = router
