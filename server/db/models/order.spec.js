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
        quantity: 1
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
          OrderItem.create(purchase)
            .then( orderItem =>{
              item = orderItem
            })
        }).catch(console.error)
      });

      xit('returns correct productId', (done) => {
        expect(item.productId.to.be.equal(1))
        done()
      });

      xit('order id = items orderId', () => {
        expect(item.orderId.to.be.equal(builtOrder.id))
      })


    });
  });

  it('has the expected schema definition', () => {
    expect(Order.attributes.email).to.be.an('object');
  });

  describe('validations', () => {
    it('require email', () => {
      const order = Order.build();
      return order.validate()
        .then(() => { throw new Error('Promise should have rejected'); })
        .catch(err => {
          expect(err).to.be.an('error');

        });
    });
  });

})
