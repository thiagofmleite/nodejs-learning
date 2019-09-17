const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const expressHandlebars = require('express-handlebars')

const app = express()

app.engine(
  'hbs',
  expressHandlebars({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main'
  })
)
// Set a global configuration value
app.set('view engine', 'hbs')
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
