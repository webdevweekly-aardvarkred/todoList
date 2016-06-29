const database = require('../config/database').bookshelf
const User = require('./user')

var Todo = database.Model.extend({
  tableName: 'todos',
  hasTimeStamps: true,
  user: function () {
    return this.belongsTo(User)
  }
})

module.exports = Todo
