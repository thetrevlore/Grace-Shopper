/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const OrderItem = db.model('orderItem')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('order instance', () => {
    describe('correct order', () => {
      let item;
      let builtOrder;
      let purchase = {
        productId: 1,
        quantity: 1,
        title: 'testOrderItem'
      };

      let orderRequest = {
        shippingAddress: 'My house',
        hasBeenPlaced: true
      };

      beforeEach(() => {
        return Order.create(orderRequest)
        .then( order => {
          builtOrder = order;
          purchase.orderId = order.id
        })
        .then(_ => {
          OrderItem.create(purchase)
          .then(orderItem => {
              item = orderItem
          })
        }).catch(console.error)
      });

      it('returns correct productId', (done) => {
        console.log(item)
        expect(item.productId.to.be.equal(1))
        done()
      });

      it('order id = items orderId', () => {
        expect(item.orderId.to.be.equal(builtOrder.id))
      })


    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
