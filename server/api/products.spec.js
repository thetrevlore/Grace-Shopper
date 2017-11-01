
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const sampleProduct = {
      title: 'dummyRod',
      description: 'A rod for dummies.',
      price: 9.99,
      inventoryAmount: 1000
    }

    beforeEach(() => {
      return Product.create(sampleProduct);
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal('dummyRod');
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
