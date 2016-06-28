const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const todoRoutes = require('./routes/todo')
const userRoutes = require('./routes/user')
const passport = require('passport')
const passportStrategy = require('./config/passport')
const db = require('./config/database')

/* importing database to createTable if it doesn't exist
 * start our application after database tables have been created */

db.createTables()
  .then(() => {
    console.log('tables have been created')

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(methodOverride('_method'))
    app.use(morgan('dev'))
    app.use(passport.initialize())
    passportStrategy(passport)
    app.use('/api/todos', todoRoutes)
    app.use('/api/users', userRoutes)

    app.listen(process.env.PORT || 8080, process.env.IP, function () {
      console.log('ToDo api server has started.')
    })
  })
  .catch(err => {
    console.error(err.stack)
  })
