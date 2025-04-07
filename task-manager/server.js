const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true
}));

app.use('/', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
