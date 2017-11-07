const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  User.findOne(
    { include: [{
      model: Order, include: [{
        model: OrderItem
      }]
    }],
      where: {
      id: Number(req.params.userId)
    }}
  )
    .then(singleOrder => res.status(200).json(singleOrder))
    .catch(next)
})
