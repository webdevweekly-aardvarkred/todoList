const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')
const config = require('./main')

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = config.secret
  passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
    User
      .forge({id: jwtPayload.id})
      .fetch()
      .then(user => {
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
      .catch(err => {
        done(err, false)
      })
  }))
}
