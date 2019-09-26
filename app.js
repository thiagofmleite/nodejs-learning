const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

// Controller
const errorController = require('./controllers/error.controller')

// Express
const app = express()

// Set a global configuration value
app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRouter = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))

// Serves statics files
app.use(express.static(path.join(__dirname, 'public')))

// Admin Routes
app.use('/admin', adminRouter)

// Public Routes
app.use(shopRoutes)

// 404 Page
app.use(errorController.get404)

// Start server on port 3000
app.listen(3000)
