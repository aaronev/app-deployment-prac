const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('../models/users')

passport.serializeUser((user, done) => { 
  done(null, user.id) 
})

passport.deserializeUser((id, done) => {
  getUsersTable.byID(id)
  .then(users => done(null, users)) 
})

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', 
    passReqToCallback: true
  }, 
  (req, email, plainTextPassword, done) => {
    getUsersTable.byEmail(email)
    .then(user => {
      if (!user) {
        return done(null, false, req.flash(
          'errorLogin', 
          'Email not found, please sign up!'
          ))
      } else {
        return getUsersTable.toVerifyPassword(
          plainTextPassword, user.password
        )
        ? done(null, user)
        : done(null, false, req.flash(
            'errorLogin', 
            'Incorrect password!'
        ))
      }
    })
  }
))

module.exports = passport