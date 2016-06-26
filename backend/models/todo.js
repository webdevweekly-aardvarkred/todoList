const database = require('../config/database').bookshelf

var Todo = database.Model.extend({
  tableName: 'todos',
  hasTimeStamps: true
})

module.exports = Todo
