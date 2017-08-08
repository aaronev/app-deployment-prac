const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

module.exports = class DataBaseGenericTableFunctions {
  constructor(tableName, columnsForThePurposeOfAddingToTheTableAsAnArray) {
    this.table = tableName
    this.columns = columnsForThePurposeOfAddingToTheTableAsAnArray
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
    for (let i = 1; i <= this.columns.length; i++) {
      colmns.push('$'+ i)
    }
    return colmns.join()
  } 

  addRow(valuesAsAnArray) {
    return this.errorHandler(`
      INSERT INTO 
        ${this.table} 
        (${this.columns}) 
      VALUES 
        (${this.generate_$1$2etc()})
      RETURNING 
        *`, valuesAsAnArray
    )
  }
  
  deleteByColumn(column, value) {
    return this.errorHandler(`
      DELETE FROM 
        ${this.table} 
      WHERE 
        ${column} = $1`, value
    )
  }

  getAllRows() {
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

  getRowsByColumn(column, value) { 
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

  getRowsByLimit(limit) {
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

  searchRowsByColumn(col1, col2, searchQuery) {
    return this.errorHandler(`
      SELECT
        *
      FROM
        ${this.table}
      WHERE
        lower(${col1} || ${col2})
      LIKE 
        $1
      `, `%${searchQuery.toLowerCase()}%`
    )
  }
}