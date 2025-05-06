import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/ping', async (req, res) => {
    try {
      await db.get('SELECT 1');
      res.status(200).send('pong');
    } catch (err) {
      console.error('Health check failed:', err);
      res.status(500).send('Database not reachable');
    }
  });
  
app.get('/users', async (req, res) => {
  try {
    const users = await db.all('SELECT * FROM users');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});


app.get('/users/:id', async (req, res) => {
    try {
        const user = await db.get('SELECT * FROM users WHERE id = ?', [req.params.id]);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.json({ id: result.lastID, name, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const result = await db.run('DELETE FROM users WHERE id = ?', req.params.id);
        res.json({ message: 'User deleted', changes: result.changes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
  

