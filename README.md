# 🎬 Nontonmantap - Platform Streaming Modern

> **Project Pemrograman Web** - Platform streaming film terbaru dengan teknologi Node.js (Express + EJS) dan SQLite.

![Nontonmantap Preview](https://img.shields.io/badge/Status-Complete-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Fitur Utama

- 🎥 **Video YouTube Integration** - Semua video menggunakan YouTube embed
- 🎭 **Hover Preview** - Preview trailer saat hover pada card film
- 📱 **100% Responsive Design** - Tampilan optimal di semua perangkat (Desktop, Tablet, Mobile)
- 🎨 **Modern UI/UX** - Desain gradient dan animasi smooth
- 💬 **Sistem Komentar** - Berikan ulasan pada film favorit
- 👤 **User Authentication** - Sistem login dan registrasi lengkap
- 🔥 **Film Terbaru** - Koleksi film blockbuster terkini
- 🌙 **Dark Theme** - Desain modern dengan tema gelap
- ⚡ **Fast Loading** - Optimized untuk performa terbaik

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone https://github.com/fdozz/project-pemweb.git
cd project-pemweb
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup database**
```bash
npm run seed
```

4. **Start development server**
```bash
npm start
```

5. **Buka browser**
```
http://localhost:3005
```

## 🎯 Demo Account

| Role | Email | Password |
|------|-------|----------|
| User | demo@example.com | password |
| Admin | admin@nontonmantap.com | password |

## 🎬 Film Collection

- **Dune: Part Two** (Sci-Fi)
- **Oppenheimer** (Biography) 
- **Spider-Man: Across the Spider-Verse** (Animation)
- **The Batman** (Action)
- **Top Gun: Maverick** (Action)
- **Avatar: The Way of Water** (Sci-Fi)
- **Black Panther: Wakanda Forever** (Action)
- **Everything Everywhere All at Once** (Comedy)

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **bcrypt** - Password hashing
- **express-session** - Session management

### Frontend
- **EJS** - Template engine
- **CSS3** - Styling dengan custom properties
- **JavaScript** - Client-side interactivity
- **YouTube Embed API** - Video streaming

### UI/UX
- **CSS Grid & Flexbox** - Layout system
- **Responsive Design** - Mobile-first approach
- **CSS Animations** - Smooth transitions
- **Modern Typography** - Inter font family

## 📱 Responsive Design

Website ini **100% responsif** dan telah dioptimalkan untuk:

- 🖥️ **Desktop** (1200px+)
- 💻 **Laptop** (992px-1199px)
- 📱 **Tablet** (768px-991px)
- 📱 **Mobile Landscape** (576px-767px)
- 📱 **Mobile Portrait** (320px-575px)

### Fitur Responsive:
- Adaptive navigation
- Flexible card layouts
- Scalable typography
- Touch-friendly buttons
- Optimized video players

## 📁 Project Structure

```
project-pemweb/
├── db/
│   ├── data.sqlite          # Database file
│   └── init_db.js          # Database initialization
├── public/
│   ├── app.js              # Client-side JavaScript
│   └── styles.css          # Main stylesheet
├── views/
│   ├── index.ejs           # Homepage
│   ├── login.ejs           # Login page
│   ├── register.ejs        # Registration page
│   ├── movie.ejs           # Movie detail page
│   └── profile.ejs         # User profile page
├── server.js               # Main server file
├── package.json            # Dependencies
└── README.md              # Documentation
```

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Initialize/reset database
npm run seed

# Install dependencies
npm install
```

## 🌟 Screenshots

### Desktop View
![Desktop](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Desktop+View)

### Mobile View
![Mobile](https://via.placeholder.com/400x600/1a1a1a/ffffff?text=Mobile+View)

## 🚀 Deployment

### Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**fdozz**
- GitHub: [@fdozz](https://github.com/fdozz)
- Project: [project-pemweb](https://github.com/fdozz/project-pemweb)

## 🙏 Acknowledgments

- Film data dari [TMDB](https://www.themoviedb.org/)
- Video streaming via [YouTube](https://youtube.com)
- Icons dari [Emoji](https://emojipedia.org/)
- Fonts dari [Google Fonts](https://fonts.google.com/)

---

⭐ **Jangan lupa berikan star jika project ini membantu!** ⭐
