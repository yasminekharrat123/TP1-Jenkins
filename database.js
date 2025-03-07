import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';

const dataDir = './data';
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const db = await open({
    filename: './data/database.db',
    driver: sqlite3.Database
});

await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE
    )
`);

const usersCount = await db.get('SELECT COUNT(*) AS count FROM users');
if (usersCount.count === 0) {
    await db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['Alice Johnson', 'alice@example.com']);
    await db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['Bob Smith', 'bob@example.com']);
    await db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['Charlie Brown', 'charlie@example.com']);
    console.log('Sample users added to database.');
}

console.log('Connected to SQLite database.');

export default db;
