
const router = require('express').Router()

router.use('/', require('./routes/home'))
router.use('/albums', require('./routes/albums'))
router.use('/users', require('./routes/users'))
router.use('/reviews', require('./routes/reviews'))
router.use('/authenticate', require('./routes/authenticate'))

module.exports = router