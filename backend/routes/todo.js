const Todo    = require('../models/todo'),
      express = require('express'),
      router  = express.Router();

router
.get('/', (req, res) => {
  Todo
    .forge()
    .fetch()
    .then( collection => {
      res.json({error: false, data: collection});
    })
    .catch( err => {
      res.status(500).json({error: true, data: {message: err.message}});
    });
});

router.get('/:id', (req, res) => {
  Todo
    .forge({id: req.params.id})
    .fetch()
    .then(todo => {
      if (!todo) {
        res.status(404).json( {error: true, data: {} });
      }
      else {
        res.json({error: false, data: todo.toJSON()});
      }
    })
    .catch( err => {
      // console.log(err);
      res.status(500).json({ error: true, data: {message: err.message }});
    });
});

router.post('/', (req, res) => {
  if(['highly', 'moderately', 'low'].indexOf(req.body.todo.importance) === -1){
    res.json({error: true, data: {message: "Importance level can only be highly, moderately, or low."}});
  } else {
    Todo
      .forge(req.body.todo)
      .save()
      .then( todo => {
        res.json({error: false, data: todo});
      })
      .catch( err => {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  }
});

module.exports = router;
