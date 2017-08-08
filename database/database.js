const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

module.exports = class DataBaseGenericTableFunctions {
  constructor(tableName, columnsForInsertingToTable) {
    this.table = tableName
    this.insertRow = columnsForInsertingToTable
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
        (${this.insertRow}) 
      VALUES 
        (${this.generate_$1$2etc()})
      RETURNING 
        *`, valuesAsAnArray
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

  findByColumn(column, value) { 
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

  search(column, searchQuery) {
    return this.errorHandler(`
      SELECT
        *
      FROM
        ${this.table}
      WHERE
        lower(${column})
      LIKE 
        $1
      `, `%${searchQuery.toLowerCase()}%`
    )
  }
}