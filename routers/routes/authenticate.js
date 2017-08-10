const router = require('express').Router()
const users = require('../../models/users')
const passport = require('../../config/authentication')

router.route('/sign-up')
  .get((req, res) => { 
    res.render('sign-up') 
  })
  .post((req, res, next) => {
    const {name, email, password} = req.body
    getUsersTable.byEmail(email)
    .then(foundEmail => {
      if (foundEmail) {
        req.flash('errorSignUp', 'Email already exist!')
        res.redirect('/authenticate/sign-up')
      } else {
        getUsersTable.toAdd(name, email, password, '/img/no-dj.png')
        .then(addedUsers => { res.redirect('/authenticate/sign-in') })
        .catch(next)
      }
    }).catch(next)
  })

router.route('/sign-in')
  .get((req, res) => { 
    req.user
    ? res.redirect(`/users/${req.user.id}`)
    : res.render('sign-in')
  })
  .post(passport.authenticate('local', {
    successRedirect: '/authenticate/sign-in',
    failureRedirect: '/authenticate/sign-in',
    failureFlash: true
  }))

router.get('/sign-out', (req, res) => { 
  req.logout()
  res.redirect('/') 
})

module.exports = router