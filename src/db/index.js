require('dotenv/config');
const { Pool } = require('pg')

const config = {
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS, 
  ssl: true, 
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

const pool = new Pool(config)

module.exports = { 
  query: (text, params, callback) => { 
    return pool.query(text, params, (err, res) => { 
      callback(err, res)
    })
  },
  
  getClient: (callback) => {
      pool.connect((err, client, done) => {
      callback(err, client, done)
    })
  }
}