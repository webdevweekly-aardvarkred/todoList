module.exports = {
  database: process.env.DATABASE_URL,
  secret: process.env.JWT_SECRET || 'secret'
}
