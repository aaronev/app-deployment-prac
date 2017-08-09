const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

module.exports = class DataBaseGenericTableFunctions {
  constructor(tableName, insertIntoColumns) {
    this.table = tableName
    this.insertIntoColumns = insertIntoColumns
  }

  errorHandler(SQLCommand, queryParams) {
    return db.any(SQLCommand, queryParams)
    .then(queries => queries)
    .catch(error => {
      console.log('Queries ERROR: ===> ', error)
      throw error
    })
  }

  generate_$1$2etc() {
    let colmns = []
    for (let i = 1; i <= this.insertRow.length; i++) {
      colmns.push('$'+ i)
    }
    return colmns.join()
  } 

  insert(valuesAsAnArray) {
    return this.errorHandler(`
      INSERT INTO 
        ${this.table} 
        (${this.insertIntoColumns}) 
      VALUES 
        (${this.generate_$1$2etc()})
      `, valuesAsAnArray
    )
  }

  delete(column, value) {
    return this.errorHandler(`
      DELETE FROM 
        ${this.table} 
      WHERE 
        ${column} = $1`, value
    )
  }

  all() {
    return this.errorHandler(`
      SELECT 
        * 
      FROM 
        ${this.table}
      ORDER BY 
        timestamp
      DESC`
    )
  }

  find(column, value) { 
    return this.errorHandler(`
      SELECT 
        * 
      FROM 
        ${this.table} 
      WHERE 
        ${column} = $1
      ORDER BY 
        timestamp
      DESC`, value
    )
  }

  limit(limit) {
    return this.errorHandler(`
      SELECT 
        * 
      FROM 
        ${this.table}
      ORDER BY 
        timestamp
      DESC
      LIMIT $1
      `, limit
    )
  }
}