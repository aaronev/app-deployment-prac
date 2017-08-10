const router = require('express').Router()
const reviews = require('../../models/reviews')

router.delete('/:id', (req, res) => {
  !req.user
  ?res.redirect('/authenticate/sign-up')
  :reviews.delete(req.params.id)
    .then(() => {
      res.redirect(`/users/${req.user.id}`)
  }).catch(next)
})

module.exports = router