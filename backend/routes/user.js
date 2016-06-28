const User = require('../models/user')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../config/main')

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

router.post('/authenticate', (req, res) => {
  User
    .forge({username: req.body.username})
    .fetch()
    .then(user => {
      if (!user) {
        res.status(404).json({error: true, data: {message: 'User not found.'}})
      } else {
        user.comparePassword(req.body.password, function (err, isMatch) {
          // console.log(req.body, '||', user)
          if (isMatch && !err) {
            // create token
            var token = jwt.sign(user, config.secret, {expiresIn: (60 * 60)})
            res.json({error: false, token: 'JWT' + token})
          } else {
            res.json({error: true, data: {message: 'Authentication failed. Password invalid.'}})
          }
        })
      }
    })
})

module.exports = router
