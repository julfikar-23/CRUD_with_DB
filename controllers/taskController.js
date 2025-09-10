const db = require('../db/connection');

// Get all tasks of logged-in user
exports.getTasks = (req, res) => {
  const query = 'SELECT * FROM tasks WHERE user_id = ?';
  db.query(query, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// Create task
exports.createTask = (req, res) => {
  const { title, description, status } = req.body;
  const query = 'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)';
  db.query(query, [title, description, status || 'To Do', req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: 'Task created', taskId: result.insertId });
  });
};

// Update task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const query = 'UPDATE tasks SET title=?, description=?, status=? WHERE id=? AND user_id=?';
  db.query(query, [title, description, status, id, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Task not found or not authorized' });
    res.json({ message: 'Task updated' });
  });
};

// Delete task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id=? AND user_id=?';
  db.query(query, [id, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Task not found or not authorized' });
    res.json({ message: 'Task deleted' });
  });
};
