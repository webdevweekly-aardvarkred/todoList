var knex = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRESQL,
  searchPath: 'knex,public'
})

/* this is where we create our tables, you can move this to a different file
 * but for one table this should suffice */

function createTables () {
  return knex.schema.createTableIfNotExists('todos', function (t) {
    t.increments('id').primary()
    t.string('task')
    t.boolean('completed')
    t.string('importance')
    t.timestamps(null, true)
  })
}

exports.createTables = createTables

exports.bookshelf = require('bookshelf')(knex)
