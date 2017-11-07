const router = require('express').Router()
const { Order, OrderItem } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.status(200).json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  Order.findOne(
    { include: [{model: OrderItem}],
      where: {
      id: Number(req.params.orderId)
    }}
  )
    .then(singleOrder => res.status(200).json(singleOrder))
    .catch(next)
})

router.post('/', (req, res, next) => {
  const { body } = req;

  return Order.create(
    body,
    {
      returning: true,
      include: [ { model: OrderItem } ]
    })
    .then((order) => res.status(201).json(order)).catch(next)
});

router.put('/:orderId', (req, res, next) => {
  Order.update(req.body, {
    where: {
      id: Number(req.params.orderId)
    }
  })
    .then(updatedOrder => res.status(204).json(updatedOrder))
    .catch(next)
})

router.delete('/:orderId', (req, res, next) => {
  Order.destroy({
    where: {
      id: Number(req.params.orderId)
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})
