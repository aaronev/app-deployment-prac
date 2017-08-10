const router = require('express').Router()
const albums = require('../../models/albums')
const reviews = require('../../models/reviews')
const users = require('../../models/users')

router.get('/:id', (req, res, next) => {
  albums.all()
  .then( albums => {
    users.findByID(req.params.id)
    .then( user => {
      ! user
      ? res.render('./errors/not-found')
      : reviews.findByUserID(req.params.id)
      .then( reviews => {
        res.send([albums, users, reviews])
      }).catch(next)
    }).catch(next)
  }).catch(next)
})

module.exports = router