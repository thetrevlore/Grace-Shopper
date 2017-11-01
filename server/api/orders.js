const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.status(200).json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  Order.findOne(
    {where: {
      id: Number(req.params.orderId)
    }}
  )
    .then(singleOrder => res.status(200).json(singleOrder))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(newOrder => res.status(201).json(newOrder))
    .catch(next)
})

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
  Order.destroy((req.body), {
    where: {
      id: Number(req.params.orderId)
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})
