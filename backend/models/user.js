const database = require('../config/database').bookshelf
const bcrypt = require('bcrypt')

var User = database.Model.extend({
  tableName: 'users',
  hasTimeStamps: true,
  initialize: function () {
    this.on('creating', this.hashPassword, this)
  },
  hashPassword: function (model, attrs, options) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(model.attributes.password, 10, function (err, hash) {
        if (err) reject(err)
        model.set('password', hash)
        resolve(hash)
      })
    })
  },
  comparePassword: function (password, callback) {
    bcrypt.compare(password, this.attributes.password, function (err, isMatch) {
      if (err) {
        return callback(err)
      }
      callback(null, isMatch)
    })
  }
})

module.exports = User
