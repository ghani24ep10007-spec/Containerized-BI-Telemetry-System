const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const todos = [
  { id: 1, title: 'Setup backend API', done: true },
  { id: 2, title: 'Bangun frontend dashboard', done: false }
];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'fullstack-server', time: new Date().toISOString() });
});

app.get('/api/todos', (_req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Field title wajib berupa string.' });
  }

  const todo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title: title.trim(),
    done: false
  };

  todos.push(todo);
  return res.status(201).json(todo);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server full-stack berjalan di http://localhost:${PORT}`);
});
