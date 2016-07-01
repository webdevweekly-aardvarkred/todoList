module.exports = {
  database: process.env.POSTGRESQL,
  secret: process.env.JWT_SECRET || 'secret'
}
