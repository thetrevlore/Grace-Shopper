const User = require('./user')

const Product = require('./product');
const Order = require('./order')
const OrderItem = require('./orderItem')
// const Category = require('./category')
// const Review = require('./review');

//
// Product.hasMany(Review);
// Product.hasMany(Category)
// Category.hasMany(Product);
// Review.belongsTo(Product);
// Review.belongsTo(User, {as: 'author'});
Order.belongsTo(User);
User.hasMany(Order);
OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Order,
  OrderItem,
  // Category,
  Product
}
