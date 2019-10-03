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
  constructor(title, imageUrl, description, price) {
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
    this.id = Uuid.createUuid()
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), err => {
        console.error(err)
      })
    })
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
