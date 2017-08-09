const bycrpt = require('bcrypt')
const DBTable = require('./database/database')
const DBUsers = new DBTable('users', ['name', 'email', 'password', 'image'])

const users = {}

users.all = () => 
  DBUsers.all()

users.create = (userID, albumID, review) =>
  DBUsers.insert([userID, albumID, review])

users.findByID = (reviewID) => 
  DBUsers.find('id', reviewID)
  .then(foundUser => foundUser[0])

users.findByEmail = (reviewID) => 
  DBUsers.find('email', reviewID)
  .then(foundUser => foundUser[0])

module.exports = users