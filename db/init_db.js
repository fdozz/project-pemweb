const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const DB_DIR = path.join(__dirname);
const DB_FILE = path.join(DB_DIR, 'data.sqlite');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
const db = new sqlite3.Database(DB_FILE);

const run = (sql, params=[]) => new Promise((resolve, reject) => db.run(sql, params, function(err){ if(err) reject(err); else resolve(this); }));

(async () => {
  try {
    // Drop tables if they exist to allow reseed
    await run('PRAGMA foreign_keys = OFF');
    await run('DROP TABLE IF EXISTS comments');
    await run('DROP TABLE IF EXISTS movies');
    await run('DROP TABLE IF EXISTS users');

    await run(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password_hash TEXT
    )`);

    await run(`CREATE TABLE movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      synopsis TEXT,
      genre TEXT,
      video_url TEXT,
      trailer_url TEXT,
      preview_url TEXT,
      thumbnail TEXT,
      is_latest INTEGER DEFAULT 0
    )`);

    await run(`CREATE TABLE comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movie_id INTEGER,
      user_id INTEGER,
      content TEXT,
      created_at TEXT
    )`);

    // Demo users
    const demoPassword = await bcrypt.hash('password', 10);
    await run('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', ['Demo User', 'demo@example.com', demoPassword]);
    await run('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', ['Admin', 'admin@nontonmantap.com', demoPassword]);

    // Seed movies with YouTube videos and trailers
    const movies = [
      {
        title: 'Dune: Part Two',
        synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
        genre: 'Sci-Fi',
        video_url: 'https://www.youtube.com/embed/Way9Dexny3w?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        trailer_url: 'https://www.youtube.com/embed/Way9Dexny3w?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        preview_url: 'https://www.youtube.com/embed/Way9Dexny3w?autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        is_latest: 1
      },
      {
        title: 'Oppenheimer',
        synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
        genre: 'Biography',
        video_url: 'https://www.youtube.com/embed/uYPbbksJxIg?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        trailer_url: 'https://www.youtube.com/embed/uYPbbksJxIg?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        preview_url: 'https://www.youtube.com/embed/uYPbbksJxIg?autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        thumbnail: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        is_latest: 1
      },
      {
        title: 'Spider-Man: Across the Spider-Verse',
        synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.',
        genre: 'Animation',
        video_url: 'https://www.youtube.com/embed/cqGjhVJWtEg?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        trailer_url: 'https://www.youtube.com/embed/cqGjhVJWtEg?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        preview_url: 'https://www.youtube.com/embed/cqGjhVJWtEg?autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        thumbnail: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
        is_latest: 1
      },
      {
        title: 'The Batman',
        synopsis: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.',
        genre: 'Action',
        video_url: 'https://www.youtube.com/embed/mqqft2x_Aa4?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        trailer_url: 'https://www.youtube.com/embed/mqqft2x_Aa4?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        preview_url: 'https://www.youtube.com/embed/mqqft2x_Aa4?autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        thumbnail: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
        is_latest: 0
      },
      {
        title: 'Top Gun: Maverick',
        synopsis: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator.',
        genre: 'Action',
        video_url: 'https://www.youtube.com/embed/giXco2jaZ_4?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        trailer_url: 'https://www.youtube.com/embed/giXco2jaZ_4?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        preview_url: 'https://www.youtube.com/embed/giXco2jaZ_4?autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        thumbnail: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
        is_latest: 0
      },
      {
        title: 'Avatar: The Way of Water',
        synopsis: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',
        genre: 'Sci-Fi',
        video_url: 'https://www.youtube.com/embed/d9MyW72ELq0?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        trailer_url: 'https://www.youtube.com/embed/d9MyW72ELq0?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        preview_url: 'https://www.youtube.com/embed/d9MyW72ELq0?autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        thumbnail: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
        is_latest: 0
      },
      {
        title: 'Black Panther: Wakanda Forever',
        synopsis: 'The people of Wakanda fight to protect their home from intervening world powers.',
        genre: 'Action',
        video_url: 'https://www.youtube.com/embed/_Z3QKkl1WyM?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        trailer_url: 'https://www.youtube.com/embed/_Z3QKkl1WyM?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        preview_url: 'https://www.youtube.com/embed/_Z3QKkl1WyM?autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        thumbnail: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
        is_latest: 0
      },
      {
        title: 'Everything Everywhere All at Once',
        synopsis: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence.',
        genre: 'Comedy',
        video_url: 'https://www.youtube.com/embed/WLVXzgvxEzs?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        trailer_url: 'https://www.youtube.com/embed/WLVXzgvxEzs?rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        preview_url: 'https://www.youtube.com/embed/WLVXzgvxEzs?autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1',
        thumbnail: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
        is_latest: 0
      }
    ];

    for (const m of movies) {
      await run('INSERT INTO movies (title, synopsis, genre, video_url, trailer_url, preview_url, thumbnail, is_latest) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [m.title, m.synopsis, m.genre, m.video_url, m.trailer_url, m.preview_url, m.thumbnail, m.is_latest]);
    }

    console.log('DB initialized at', DB_FILE);
    db.close();
  } catch (e) {
    console.error('Failed to init DB', e);
    process.exit(1);
  }
})();
