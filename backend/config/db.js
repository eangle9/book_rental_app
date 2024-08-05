const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'book_rental',
  password: 'engdawork9397',
  port: 5432,
});

module.exports = pool;
