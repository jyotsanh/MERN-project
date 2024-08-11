const express = require('express');
router = express.Router();

const {UserAuthenticationMiddleware} = require('../middleware/AuthenticationMiddleware');
const {CartMiddleWare} = require('../middleware/CartMiddleware');
const { GetCartItems,AddToCart,DelCartItems } = require('../controllers/cartController');

router.post('/add-to-cart',UserAuthenticationMiddleware,CartMiddleWare,AddToCart);
router.get('/get-cart-items',UserAuthenticationMiddleware,GetCartItems);
router.get('/del-cart-items/:id',UserAuthenticationMiddleware,DelCartItems);

module.exports = router;