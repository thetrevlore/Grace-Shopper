/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const faker = require('faker');
const db = require('../server/db')
const {User, Order, Category, Product} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'admin@admin.com', password: 'admin', isAdmin: true}),
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    User.create({email: 'murphy@email.com', password: '234'}),
    User.create({email: faker.internet.email(),  password: '234'}),
    User.create({email: faker.internet.email(),  password: '234'}),
    User.create({email: faker.internet.email(),  password: '234'}),
    User.create({email: faker.internet.email(),  password: '234'}),
    User.create({email: faker.internet.email(),  password: '234'}),
    User.create({email: faker.internet.email(),  password: '234'}),
    User.create({email: faker.internet.email(),  password: '234'}),
    User.create({email: faker.internet.email(),  password: '234'}),
    User.create({email: faker.internet.email(),  password: '234'}),
    User.create({email: faker.internet.email(),  password: '234'})
  ])

  const products = await Promise.all([
    Product.create({title: 'US Dollar', description: faker.lorem.sentence(7), photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/United_States_one_dollar_bill%2C_obverse.jpg/1200px-United_States_one_dollar_bill%2C_obverse.jpg'], price: 1, inventoryAmount: 18}),
    Product.create({title: 'Mexican Peso', description: faker.lorem.sentences(3), photos: ['http://flagpedia.net/data/currency/mxn/mexico-20pesos.jpg'], price: 19, inventoryAmount: 3}),
    Product.create({title: 'Indian Rupees', description: faker.lorem.sentences(1), photos: ['http://static.sify.com/cms/image/qbejGmdiifdfj.jpg'], price: 65, inventoryAmount: 9}),
    Product.create({title: 'Chinese RMB', description: faker.lorem.sentences(2), photos: ['http://www.chinatoday.com/fin/mon/rmb-1yuan-new1.jpg'], price: 114, inventoryAmount: 66}),
    Product.create({title: 'Vietnamese Dong', description: faker.lorem.sentences(4), photos: ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Vietnam_10_Dong_1951_Averse.jpg'], price: 818, inventoryAmount: 85}),
    Product.create({title: 'Nigerian Naira', description: faker.lorem.sentences(5), photos: ['http://flagpedia.net/data/currency/ngn/one-thousand-naira.jpg'], price: 70, inventoryAmount: 21}),
    Product.create({title: 'Canadian Dollar', description: faker.lorem.sentences(9), photos: ['http://media.npr.org/assets/img/2015/12/02/undefined_wide-c75093b5e1b71fae52f2d27a504848aa75c9cf9d-s900-c85.jpg'], price: 70, inventoryAmount: 70}),
    Product.create({title: 'HK Dollar', description: faker.lorem.sentences(4), photos: ['http://www.coolawesome.com/wp-content/uploads/2011/06/hk-dollar.jpg'], price: 700, inventoryAmount: 18}),
    Product.create({title: 'Iranian Dinar', description: faker.lorem.sentences(4), photos: ['http://dieline.typepad.com/blog/images/2007/07/26/76iranb.gif'], price: 230, inventoryAmount: 21}),
    Product.create({title: 'Icelandic Kronur', description: faker.lorem.sentences(3), photos: ['http://www.coolawesome.com/images/2011/06/iceland-kronur.jpg'], price: 20, inventoryAmount: 45}),
    Product.create({title: 'Faroe Island Kronur', description: faker.lorem.sentences(1), photos: ['http://www.coolawesome.com/wp-content/uploads/2011/06/faroe-island-kronur.jpg'], price: 111, inventoryAmount: 30}),
    Product.create({title: 'Comorian Franc', description: faker.lorem.sentences(3), photos: ['https://4.bp.blogspot.com/-zC4jsH_0Eh8/V4kmEOGdKcI/AAAAAAAAPlw/bsDyABj4xh0o2KiRy_AvC7OjoIDA3BUuwCLcB/s1600/COMORES%2B5000%2BFRANC%2BBACK.jpg'], price: 1000, inventoryAmount: 1}),
    Product.create({title: 'Cook Islands Dollar', description: faker.lorem.sentences(5), photos: ['http://www.coolawesome.com/wp-content/uploads/2011/06/cook-islands-dollar.jpg'], price: 323, inventoryAmount: 12})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users and ${products.length} products`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
