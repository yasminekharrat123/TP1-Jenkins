import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const db = {
  run: (sql, params) => pool.query(sql, params),
  get: async (sql, params) => {
    const res = await pool.query(sql, params);
    return res.rows[0];
  },
  all: async (sql, params) => {
    const res = await pool.query(sql, params);
    return res.rows;
  },
  exec: async (sql) => pool.query(sql),
};

await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE
  )
`);

const usersCount = await db.get('SELECT COUNT(*) AS count FROM users');
if (usersCount.count === 0) {
  await db.run('INSERT INTO users (name, email) VALUES ($1, $2)', ['Alice Johnson', 'alice@example.com']);
  await db.run('INSERT INTO users (name, email) VALUES ($1, $2)', ['Bob Smith', 'bob@example.com']);
  await db.run('INSERT INTO users (name, email) VALUES ($1, $2)', ['Charlie Brown', 'charlie@example.com']);
  console.log('Sample users added to database.');
}

console.log('Connected to PostgreSQL database.');

export default db;
