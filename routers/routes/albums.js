
const router = require('express').Router()
const albums = require('../../models/albums')
const reviews = require('../../models/reviews')
const users = require('../../models/users')

router.get('/:id', (req, res, next) => {
  albums.findByID(req.params.id)
  .then( albums => {
    users.all()
    .then( users => {
      reviews.findByAlbumID(req.params.id)
      .then( reviews => {
        res.send([albums, users, reviews])
      }).catch(next)
    }).catch(next)
  }).catch(next)
})

router.post('/:id/reviews', (req, res, next) => {
  ! req.user
  ? res.redirect('/authenticate/sign-up')
  : reviews.create(
      req.user.id, 
      req.params.id, 
      req.body.review
    ).then( reviews => {
      res.redirect(`/albums/${req.params.id}`)
  }).catch(next)
})

module.exports = router