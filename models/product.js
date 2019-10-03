const fs = require('fs')
const path = require('path')
const Uuid = require('../util/uuid')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
)

/**
 * Return an array of Products from a JSON file
 *
 * @param {} cb Callback Function
 */
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  /**
   * Save a Product
   *
   */
  save() {
    this._persistPrice()
    getProductsFromFile(products => {
      if (this.id) {
        this._updateProduct(products)
      } else {
        this._saveNewProduct(products)
      }
    })
  }

  _persistPrice() {
    this.price = this.price || 0
    this.price = Number.parseFloat(this.price)
  }

  _storeData(products) {
    fs.writeFile(p, JSON.stringify(products), err => {
      console.error(err)
    })
  }

  _saveNewProduct(products) {
    this.id = Uuid.createUuid()
    products.push(this)
    this._storeData(products)
  }

  _updateProduct(products) {
    const existingProductIndex = products.findIndex(prod => prod.id === this.id)
    const updatedProducts = [...products]
    updatedProducts[existingProductIndex] = this
    this._storeData(updatedProducts)
  }

  /**
   * Fetch all products
   *
   * @static
   * @param {*} callback Callback Function
   */
  static fetchAll(callback) {
    getProductsFromFile(callback)
  }

  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      callback(product)
    })
  }
}
