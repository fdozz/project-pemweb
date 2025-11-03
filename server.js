const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'db', 'data.sqlite');
const db = new sqlite3.Database(DB_PATH);

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Middleware to expose user to views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Homepage - list latest movies
app.get('/', (req, res) => {
  // if not logged in, go to login page first
  if (!req.session.user) return res.redirect('/login');
  db.all('SELECT id, title, synopsis, genre, thumbnail, is_latest FROM movies ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).send('DB error');
    res.render('index', { movies: rows });
  });
});

// Register
app.get('/register', (req, res) => {
  res.render('register', { error: null });
});
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.render('register', { error: 'Email and password required' });
  const hash = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name||'', email, hash], function(err) {
    if (err) return res.render('register', { error: 'Email already used or DB error' });
    req.session.user = { id: this.lastID, name: name || '', email };
    res.redirect('/');
  });
});

// Login
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});
app.post('/login', (req, res) => {
  const { identifier, password } = req.body; // identifier = email or username
  if (!identifier || !password) return res.render('login', { error: 'Please provide username/email and password' });
  db.get('SELECT id, name, email, password_hash FROM users WHERE email = ? OR name = ?', [identifier, identifier], async (err, row) => {
    if (err || !row) return res.render('login', { error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, row.password_hash);
    if (!ok) return res.render('login', { error: 'Invalid credentials' });
    req.session.user = { id: row.id, name: row.name, email: row.email };
    res.redirect('/');
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

// Movie detail
app.get('/movie/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM movies WHERE id = ?', [id], (err, movie) => {
    if (err || !movie) return res.status(404).send('Movie not found');
    db.all('SELECT c.id, c.user_id, c.content, c.created_at, u.name FROM comments c LEFT JOIN users u ON u.id = c.user_id WHERE c.movie_id = ? ORDER BY c.created_at DESC', [id], (err2, comments) => {
      if (err2) comments = [];
      res.render('movie', { movie, comments });
    });
  });
});

// Post comment (requires login)
app.post('/movie/:id/comment', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const movie_id = req.params.id;
  const user_id = req.session.user.id;
  const content = req.body.content || '';
  db.run('INSERT INTO comments (movie_id, user_id, content, created_at) VALUES (?, ?, ?, ?)', [movie_id, user_id, content, new Date().toISOString()], function(err) {
    if (err) return res.status(500).send('DB error');
    res.redirect('/movie/' + movie_id);
  });
});

// Profile
app.get('/profile', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const uid = req.session.user.id;
  db.all('SELECT m.* FROM movies m JOIN comments c ON c.movie_id = m.id WHERE c.user_id = ? GROUP BY m.id', [uid], (err, rows) => {
    res.render('profile', { user: req.session.user, watched: rows || [] });
  });
});

// Simple JSON API for movies (used by potential SPA)
app.get('/api/movies', (req, res) => {
  db.all('SELECT id, title, synopsis, genre, thumbnail, is_latest FROM movies ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB' });
    res.json(rows);
  });
});

// Start
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log('🚀 Nontonmantap server running on http://localhost:' + PORT));
