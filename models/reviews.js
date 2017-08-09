const DBTable = require('./database/database')
const DBReviews = new DBTable('reviews', ['user_id', 'artist'])

const reviews = {}

reviews.all = () => 
  DBReviews.all()

reviews.latest3 = () => 
  DBReviews.limit(3)

reviews.create = (userID, albumID, review) =>
  DBReviews.insert([userID, albumID, review])

reviews.findByUserID = (userID) => 
  DBReviews.find('user_id', userID)

reviews.findByAlbumID = (albumID) => 
  DBReviews.find('album_id', userID)

reviews.delete = (reviewID) => 
  DBReviews.delete('id', reviewID)

module.exports = reviews