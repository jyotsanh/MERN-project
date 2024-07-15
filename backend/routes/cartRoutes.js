const express = require('express');
router = express.Router();

const UserAuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');
const {CartMiddleWare} = require('../middleware/CartMiddleware');
const { GetCartItems,AddToCart } = require('../controllers/cartController');

router.post('/add-to-cart',CartMiddleWare,AddToCart);
router.get('/get-cart-items',GetCartItems);

module.exports = router;