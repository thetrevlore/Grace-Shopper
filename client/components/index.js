/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as SingleProduct} from './single-product'
export {default as Products} from './products'
export {default as Cart} from './cart'
export {default as Welcome} from './welcome';
export {default as NotFound} from './notfound';
export {default as OrderConfirmation} from './OrderConfirmation';
export {default as AdminPanel} from './adminpanel';
export {default as SingleOrder} from './SingleOrder'
