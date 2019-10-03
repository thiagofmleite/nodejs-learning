const express = require('express')
const router = express.Router()
const controller = require('../controllers/shop.controller')

router.get('/', controller.getIndex)
router.get('/products/:productId', controller.getProduct)
router.get('/products', controller.getProducts)
router.get('/cart', controller.getCart)
router.post('/cart', controller.postCart)
router.get('/orders', controller.getOrders)
router.get('/checkout', controller.getCheckout)

module.exports = router
