const DBTable = require('./database/database')
const DBAlbums = new DBTable('albums', ['title', 'artist'])

const albums= {}

albums.all = () => 
  DBAlbums.all()
  
albums.findByID = (ID) => 
  DBAlbums.find('id', ID)

module.exports = albums