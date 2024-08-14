// index.js

const express = require('express');
const bodyParser = require('body-parser');
const { addUser, getUserById, updateUser, deleteUser, listUsers } = require('./model/user');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Register User
app.post('/users', (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  const user = addUser({ firstName, lastName, email, phone });
  res.status(201).json(user);
});

// Get User by ID
app.get('/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Update User
app.put('/users/:id', (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  const updatedUser = updateUser(req.params.id, { firstName, lastName, email, phone });
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete/Disable User
app.delete('/users/:id', (req, res) => {
  const result = deleteUser(req.params.id);
  if (result) {
    res.json({ message: 'User disabled' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// List All Users with Filters
app.get('/users', (req, res) => {
  const filters = req.query;
  const users = listUsers(filters);
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
