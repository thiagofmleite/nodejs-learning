const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Set a global configuration value
app.set('view engine', 'pug') // Setting Pug as view engine
app.set('views', 'views')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))

// Serves statics files
app.use(express.static(path.join(__dirname, 'public')))

// Admin Routes
app.use('/admin', adminData.routes)

// Public Routes
app.use(shopRoutes)

// 404 Page
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  res.status(404).render('404', { pageTitle: 'Page not found' })
})

// Start server on port 3000
app.listen(3000)
