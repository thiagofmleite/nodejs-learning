const path = require('path')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/admin.controller')

// /admin/add-product => GET
router.get('/add-product', controller.getAddProdct)

// /admin/edit-product => GET
router.get('/edit-product/:productId', controller.getEditProdct)

// /admin/add-product => GET
router.get('/products', controller.getProducts)

// /admin/add-product => POST
router.post('/add-product', controller.postAddProduct)

// /admin/add-product => POST
router.post('/edit-product', controller.postEditProduct)

// /admin/add-product => POST
router.post('/delete-product', controller.postDeleteProduct)

module.exports = router
