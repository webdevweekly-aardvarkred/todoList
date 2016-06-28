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

router.post('/register', (req, res) => {
  if (!req.body) {
    res.json({error: true, data: {message: 'Error no data'}})
  } else {
    User
      .forge({username: req.body.username})
      .fetch()
      .then(user => {
        if (user) {
          res.json({error: true, data: {message: 'Username already exists.'}})
        } else {
          return User
            .forge(req.body)
            .save()
            .then(user => {
              return createToken(user.toJSON())
            })
            .then(token => {
              res.json({error: false, data: { token: token }})
            })
        }
      })
      .catch(err => {
        console.log(err, err.stack)
        res.status(500).send('An Error Occurrred')
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
          if (isMatch && !err) {
            createToken(user.toJSON())
              .then(token => {
                res.json({error: false, data: { token: token }})
              })
          } else {
            res.json({error: true, data: {message: 'Authentication failed. Password invalid.'}})
          }
        })
      }
    })
    .catch(err => {
      console.log(err, err.stack)
      res.status(500).send('An Error Occured')
    })
})

module.exports = router
