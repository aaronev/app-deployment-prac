const router = require('express').Router()
const albums = require('../../models/albums')
const reviews = require('../../models/reviews')
const users = require('../../models/users')

router.get('/', (req, res, next) => {
  albums.all()
  .then( albums => {
   users.all()
    .then( users => {
     reviews.latest3()
      .then( reviews => {
        res.render('index',{albums, users, reviews})
      }).catch(next)
    }).catch(next)
  }).catch(next)
})

module.exports = router