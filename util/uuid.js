module.exports = class Uuid {
  static _S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  static createUuid() {
    return (
      this._S4() +
      this._S4() +
      '-' +
      this._S4() +
      '-4' +
      this._S4().substr(0, 3) +
      '-' +
      this._S4() +
      '-' +
      this._S4() +
      this._S4() +
      this._S4()
    ).toLowerCase()
  }

  static isUuidValid(value) {
    return /^[0-9A-Fa-f]{8}[-]?([[0-9A-Fa-f]{4}[-]?){3}[[0-9A-Fa-f]{12}$/.test(
      value
    )
  }

  static isUuidEmpty(value) {
    if (value) {
      if (value === '00000000-0000-0000-0000-000000000000') {
        return true
      } else {
        return false
      }
    }
    return false
  }
}
