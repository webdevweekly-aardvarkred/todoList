const User = require('../models/user')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../config/main')

function createToken (user) {
  /* we don't want to send the hashed password with token */
  const profile = {
    id: user.id,
    username: user.username
  }

  return Promise.resolve(jwt.sign(profile, config.secret, { expiresIn: (60 * 60) }))
}

router.get('/', (req, res, next) => {
  res.send('authenticated')
})

router.post('/register', (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ error: true, message: 'Error no data' })
  } else {
    User
      .forge({username: req.body.username})
      .fetch()
      .then(user => {
        if (user) {
          res.status(400).json({ error: true, message: 'Username already exists.' })
        } else {
          return User
            .forge(req.body)
            .save()
            .then(user => {
              return createToken(user.toJSON())
            })
            .then(token => {
              res.json({ error: false, token: token })
            })
        }
      })
      .catch(err => {
        next(err)
      })
  }
})

router.post('/authenticate', (req, res, next) => {
  User
    .forge({username: req.body.username})
    .fetch()
    .then(user => {
      if (!user) {
        res.status(404).json({ error: true, message: 'User not found.' })
      } else {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            createToken(user.toJSON())
              .then(token => {
                res.json({ error: false, token: token })
              })
          } else {
            res.status(401).json({ error: true, message: 'Authentication failed. Password invalid.' })
          }
        })
      }
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
