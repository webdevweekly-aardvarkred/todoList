const Todo = require('../models/todo')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  if (!req.user) {
    res.status(403).json({error: true, message: 'No user found. Please log in.'})
  }
  Todo
    .query('where', 'user_id', '=', req.user.attributes.id)
    .fetchAll({ columns: ['id', 'task', 'completed', 'importance'] })
    .then(todos => {
      res.json({error: false, todos: todos.toJSON()})
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id', (req, res, next) => {
  Todo
    .forge({id: req.params.id})
    .fetch()
    .then(todo => {
      if (!todo) {
        res.status(404).json({error: true, message: 'Todo not found.'})
      } else {
        res.json({error: false, todo})
      }
    })
    .catch(err => {
      next(err)
    })
})

router.post('/', (req, res, next) => {
  if (['highly', 'moderately', 'low'].indexOf(req.body.importance) === -1) {
    res.json({error: true, data: {message: 'Importance level can only be highly, moderately, or low.'}})
  } else {
    var todoTemp = req.body
    todoTemp.user_id = req.user.attributes.id
    Todo
      .forge(todoTemp)
      .save()
      .then(todo => {
        res.json({error: false, todo})
      })
      .catch(err => {
        next(err)
      })
  }
})

router.put('/:id', (req, res, next) => {
  if (req.body.importance && ['highly', 'moderately', 'low'].indexOf(req.body.importance) === -1) {
    res.json({error: true, message: 'Importance level can only be highly, moderately, or low.'})
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
              res.json({error: false, message: 'Todo has been updated.'})
            })
        }
      })
      .catch(err => {
        next(err)
      })
  }
})

router.delete('/:id', (req, res, next) => {
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
            res.json({error: false, message: 'Todo has been successfully eradicated.'})
          })
      }
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
