const Todo = require('../models/todo')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  if (!req.user) {
    res.status(403).json({error: true, date: {message: 'No user found. Please log in.'}})
  }
  Todo
    .query('where', 'user_id', '=', req.user.attributes.id)
    .fetchAll()
    .then(collection => {
      var temp = collection.map(element => {
        var obj = {}
        obj.id = element.id
        obj.task = element.attributes.task
        obj.completed = element.attributes.completed
        obj.importance = element.attributes.importance
        return obj
      })
      res.json({error: false, data: temp})
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
      } else if (todo.user_id !== req.user.attributes.id) {
        res.json({error: false, data: {message: 'This is not your todo.'}})
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
    var todoTemp = req.body
    todoTemp.user_id = req.user.attributes.id
    Todo
      .forge(todoTemp)
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
          res.status(404).json({error: true, data: {message: 'Todo not found.'}})
        } else if (todo.user_id !== req.user.attributes.id) {
          res.status(403).json({error: true, data: {message: 'You do not have access to this todo.'}})
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
        res.status(404).json({error: true, data: {message: 'Todo not found.'}})
      } else if (todo.user_id !== req.user.attributes.id) {
        res.status(403).json({error: true, data: {message: 'You do not have access to this todo'}})
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
