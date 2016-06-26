const database = require('../config/database')

var Todo = database.Model.extend({
  tableName: 'todos',
  hasTimeStamps: true
})

module.exports = Todo
