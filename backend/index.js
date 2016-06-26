const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const todoRoutes = require('./routes/todo')

app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

app.use('/api/todos', todoRoutes)

app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log('ToDo api server has started.')
})
