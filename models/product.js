const fs = require('fs')
const path = require('path')

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
    }
    cb(JSON.parse(fileContent))
  })
}

module.exports = class Product {
  constructor(t) {
    this.title = t
  }

  /**
   * Save a Product
   *
   */
  save() {
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
}
