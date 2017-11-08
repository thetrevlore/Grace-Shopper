const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
module.exports = router

//get routes: all users and single user

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})


router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(createdUser => res.json(createdUser))
    .catch(next)
})

router.put('/:userid', (req, res, next) => {
  User.findById(req.params.userid)
    .then(user => {
      return user.update(req.body)
    })
    .then(updatedUser => res.json(updatedUser))
    .catch(next)
})

router.delete('/:userid', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.userid
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next);
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
