const db = require('./main.js').database
var knex = require('knex')({
  client: 'pg',
  connection: db,
  searchPath: 'knex,public'
})

/* this is where we create our tables, you can move this to a different file
 * but for one table this should suffice */

function createTables () {
  return Promise.all(
    [
      knex.schema.createTableIfNotExists('users', function (t) {
        t.increments('id').primary()
        t.string('username')
        t.string('password')
        t.enum('role', ['user', 'admin'])
      }),
      knex.schema.createTableIfNotExists('todos', function (t) {
        t.increments('id').primary()
        t.string('task')
        t.boolean('completed')
        t.string('importance')
        t.integer('user_id')
        t.timestamps(null, true)
      })
    ])
}

exports.createTables = createTables

exports.bookshelf = require('bookshelf')(knex)
