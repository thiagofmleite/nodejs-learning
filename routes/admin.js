const path = require('path')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/admin.controller')

// /admin/add-product => GET
router.get('/add-product', controller.getAddProdct)

// /admin/add-product => GET
router.get('/products', controller.getProducts)

// /admin/add-product => POST
router.post('/add-product', controller.postAddProduct)

module.exports = router
