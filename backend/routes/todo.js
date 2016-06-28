const Todo = require('../models/todo')
const express = require('express')
const router = express.Router()
// const passport = require('passport')

router.get('/', (req, res) => { // passport.authenticate('jwt', { session: false }) is currently not authenticating jwt given
  Todo
    .forge()
    .fetchAll()
    .then(collection => {
      res.json({error: false, data: collection})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: err.message}})
    })
})

router.get('/:id', (req, res) => {
  Todo
    .forge({id: req.params.id})
    .fetch()
    .then(todo => {
      if (!todo) {
        res.status(404).json({error: true, message: 'Todo not found.'})
      } else {
        res.json({error: false, data: todo})
      }
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: err.message}})
    })
})

router.post('/', (req, res) => {
  if (['highly', 'moderately', 'low'].indexOf(req.body.importance) === -1) {
    res.json({error: true, data: {message: 'Importance level can only be highly, moderately, or low.'}})
  } else {
    Todo
      .forge(req.body)
      .save()
      .then(todo => {
        res.json({error: false, data: todo})
      })
      .catch(err => {
        res.status(500).json({error: true, data: {message: err.message}})
      })
  }
})

router.put('/:id', (req, res) => {
  if (req.body.importance && ['highly', 'moderately', 'low'].indexOf(req.body.importance) === -1) {
    res.json({error: true, data: {message: 'Importance level can only be highly, moderately, or low.'}})
  } else {
    Todo
      .forge({id: req.params.id})
      .fetch()
      .then(todo => {
        if (!todo) {
          res.status(404).json({error: true, message: 'Todo not found.'})
        } else {
          return todo
            .save(Object.assign({}, todo.toJSON(), req.body))
            .then(todo => {
              res.json({error: false, data: {message: 'Todo has been updated.'}})
            })
        }
      })
      .catch(err => {
        res.status(500).json({error: true, data: {message: err.message}})
      })
  }
})

router.delete('/:id', (req, res) => {
  Todo
    .forge({id: req.params.id})
    .fetch()
    .then(todo => {
      if (!todo) {
        res.status(404).json({error: true, message: 'Todo not found.'})
      } else {
        return todo
          .destroy()
          .then(() => {
            res.json({error: false, data: {message: 'Todo has been successfully eradicated.'}})
          })
      }
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: err.message}})
    })
})

module.exports = router
