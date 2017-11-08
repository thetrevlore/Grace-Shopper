const router = require('express').Router()
const { Order, OrderItem } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.status(200).json(orders))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  return Order.findOne(
    { where: {
      userId: Number(req.params.userId),
      status: "Created"
    },
    include:[{ model: OrderItem }]}
  )
    .then(singleOrder => res.status(200).json(singleOrder))
    .catch(next)
})

router.get('/byorder/:orderId', (req, res, next) => {
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

  return Order.findOne({
    where:{
      userId: body.userId,
      status: 'Created'
    }
  })
    .then(foundOrder=> foundOrder.update({status: 'Completed', shippingAddress: body.shippingAddress }))
    .then((order) => res.status(201).json(order)).catch(next)
});

router.post('/:userId', (req, res, next) => {
  Order.findOrCreate({
    where: {
      userId: +req.params.userId,
      email: req.body.email,
      status: "Created"
    }
  })
    .spread((order)=>{
    const { orderItem } = req.body;
    OrderItem.findOrCreate({
      where: {
        title: orderItem.title,
        orderId: +order.id,
        productId: orderItem.productId,
        price: orderItem.price
      }
    })
      .then(item=> {
        item[0].update({quantity: +req.body.quantity})
      })
      .then((updatedItem) => res.status(204).json(updatedItem))
  })
    .catch(next)
});

router.delete('/:orderId/:productId', (req, res, next) => {
  Order.destroy({
    where: {
      id: Number(req.params.orderId)
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})
