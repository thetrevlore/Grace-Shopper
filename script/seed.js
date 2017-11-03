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
const db = require('../server/db')
const {User, Order, Category, Product} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '234'})
  ])
  const products = await Promise.all([
    Product.create({title: 'Dollar', description: 'US currency', photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/United_States_one_dollar_bill%2C_obverse.jpg/1200px-United_States_one_dollar_bill%2C_obverse.jpg'], price: 1, inventoryAmount: 18}),
    Product.create({title: 'Peso', description: 'Mexican currency', photos: ['http://www.coinfactswiki.com/w/images/thumb/a/ae/Mexico_1873Mo_peso_oro_rev_Stacks_110-1451.jpg/300px-Mexico_1873Mo_peso_oro_rev_Stacks_110-1451.jpg'], price: 19, inventoryAmount: 3}),
    Product.create({title: 'Rupee', description: 'Indian currency', photos: ['http://static.sify.com/cms/image/qbejGmdiifdfj.jpg'], price: 65, inventoryAmount: 9}),
    Product.create({title: 'Yen', description: 'Chinese currency', photos: ['http://www.chinatoday.com/fin/mon/rmb-1yuan-new1.jpg'], price: 114, inventoryAmount: 66})
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
