const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)

module.exports = class Cart {
  static addProduct(product) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = fileContent.length > 0 ? JSON.parse(fileContent) : cart
      }
      // Analyse the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        p => p.id === product.id
      )
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct
      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.qty = updatedProduct.qty + 1
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = { ...product, qty: 1 }
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = Cart.getTotalPrice(cart.products)
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.error(err)
      })
    })
  }

  static getTotalPrice(products) {
    return products.reduce((total, current) => {
      return total + current.qty * current.price
    }, 0)
  }

  static deleteProduct(id) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        console.error(err)
        return
      }
      if (!fileContent.length) {
        console.info('Empty file')
        return
      }
      const updatedCart = { ...JSON.parse(fileContent) }
      if (!updatedCart.products || !updatedCart.products.length) {
        console.info('Empty cart')
        return
      }
      console.log('Removing product', id)
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice = Cart.getTotalPrice(updatedCart.products)

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.error(err)
      })
    })
  }

  static getCart(callback) {
    fs.readFile(p, (err, fileContent) => {
      const cart = fileContent.length ? JSON.parse(fileContent) : null
      if (err) {
        callback(null)
      } else {
        callback(cart)
      }
    })
  }
}
