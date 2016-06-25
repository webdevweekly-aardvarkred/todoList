var knex = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRESQL,
  searchPath: 'knex,public'
});

module.exports = require('bookshelf')(knex);
