const path = require('path')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/products')

// /admin/add-product => GET
router.get('/add-product', controller.getAddProdct)

// /admin/add-product => POST
router.post('/add-product', controller.postAddProduct)

module.exports = router
