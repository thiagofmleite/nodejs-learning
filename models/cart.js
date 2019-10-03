const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = fileContent.length > 0 ? JSON.parse(fileContent) : cart
      }
      // Analyse the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(p => p.id === id)
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct
      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.qty = updatedProduct.qty + 1
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = { id: id, qty: 1, price: productPrice }
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = Cart.getTotalPrice(cart.products)
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err)
      })
    })
  }

  static getTotalPrice(products) {
    return products.reduce((total, current) => {
      return total + current.qty * current.price
    }, 0)
  }

  static deleteProduct(id, productPrice) {
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
      console.log(updatedCart)
      if (!updatedCart.products || !updatedCart.products.length) {
        console.info('Empty cart')
        return
      }
      const product = updatedCart.products.find(p => p.id === id)

      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice = Cart.getTotalPrice(updatedCart.products)

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err)
      })
    })
  }
}
