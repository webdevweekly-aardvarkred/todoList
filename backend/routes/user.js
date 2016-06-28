const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.post('/register', (req, res) => {
  if (!req.body) {
    res.json({error: true, data: {message: 'Error no data'}})
  } else {
    User
      .forge(req.body)
      .save()
      .then(user => {
        res.json({error: false, data: {message: 'User ' + user.attributes.username + ' has been created.'}})
      })
      .catch(err => {
        res.status(500).json({error: true, data: {message: err.message}})
      })
  }
})

module.exports = router
