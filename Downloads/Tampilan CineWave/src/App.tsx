import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { PaymentPlan } from './components/PaymentPlan';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { PlatformStrip } from './components/PlatformStrip';
import { PlatformPage } from './components/PlatformPage';
import { ContinueWatching } from './components/ContinueWatching';
import { MovieRow } from './components/MovieRow';
import { CommunityFeed } from './components/CommunityFeed';
import { CommunityPage } from './components/CommunityPage';
import { Footer } from './components/Footer';
import { FooterPage } from './components/FooterPage';
import { MoviePlayerPage } from './components/MoviePlayerPage';
import { EnhancedMoviePlayerPage } from './components/EnhancedMoviePlayerPage';
import { MovieDetailPage } from './components/MovieDetailPage';
import { MyListPage } from './components/MyListPage';
import { ProfilePage } from './components/ProfilePage';
import { CategoryPage } from './components/CategoryPage';
import { SearchModal } from './components/SearchModal';
import { NotificationPanel } from './components/NotificationPanel';
import { moviesData, Movie } from './data/movies';
import { extendedMoviesData } from './data/extendedMovies';
import './styles/globals.css';

type AppState = 'landing' | 'login' | 'register' | 'payment' | 'home' | 'player' | 'details' | 'platform' | 'mylist' | 'profile' | 'films' | 'series' | 'new-popular' | 'genre' | 'footer-page' | 'community';
type FooterPageType = 'about' | 'browse' | 'pricing' | 'support' | 'help' | 'contact' | 'privacy' | 'terms' | null;

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [userEmail, setUserEmail] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<{ id: string; name: string } | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [footerPage, setFooterPage] = useState<FooterPageType>(null);

  useEffect(() => {
    // Check if user is registered and has selected a plan
    const user = localStorage.getItem('cinewave_user');
    const plan = localStorage.getItem('cinewave_plan');

    if (user && plan) {
      setAppState('home');
    } else if (user) {
      setAppState('payment');
    } else {
      setAppState('landing');
    }
  }, []);

  const handleGetStarted = (email: string) => {
    setUserEmail(email);
    setAppState('register');
  };

  const handleSwitchToLogin = () => {
    setAppState('login');
  };

  const handleSwitchToRegister = () => {
    setAppState('register');
  };

  const handleRegisterComplete = () => {
    // After registration, user must pay then login
    setAppState('payment');
  };

  const handleLoginComplete = () => {
    const plan = localStorage.getItem('cinewave_plan');
    if (plan) {
      setAppState('home');
    } else {
      setAppState('payment');
    }
  };

  const handlePlanSelected = () => {
    // After selecting plan, user must login
    // Clear current user to force login
    const user = localStorage.getItem('cinewave_user');
    if (user) {
      // User is logged in, go to home
      setAppState('home');
    } else {
      // No user logged in, go to login
      setAppState('login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cinewave_user');
    localStorage.removeItem('cinewave_plan');
    setUserEmail('');
    setAppState('landing');
  };

  const findMovieById = (id: number): Movie | null => {
    const allMovies = [
      ...moviesData.trending,
      ...moviesData.popular,
      ...moviesData.newReleases,
      ...moviesData.action,
      ...moviesData.scifi,
    ];
    return allMovies.find(movie => movie.id === id) || null;
  };

  const handlePlayMovie = (movieOrId: Movie | number) => {
    const movie = typeof movieOrId === 'number' ? findMovieById(movieOrId) : movieOrId;
    if (movie) {
      setSelectedMovie(movie);
      setAppState('player');
    }
  };

  const handleViewDetails = (movieOrId: Movie | number) => {
    const movie = typeof movieOrId === 'number' ? findMovieById(movieOrId) : movieOrId;
    if (movie) {
      setSelectedMovie(movie);
      setAppState('details');
    }
  };

  const handleBackToHome = () => {
    setSelectedMovie(null);
    setAppState('home');
  };

  const handlePlatformSelect = (platformId: string, platformName: string) => {
    setSelectedPlatform({ id: platformId, name: platformName });
    setAppState('platform');
  };

  const handleBackToHomeFromPlatform = () => {
    setSelectedPlatform(null);
    setAppState('home');
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setAppState('genre');
  };

  const handleBackToHomeFromGenre = () => {
    setSelectedGenre(null);
    setAppState('home');
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleOpenNotifications = () => {
    setIsNotificationOpen(true);
  };

  const handleCloseNotifications = () => {
    setIsNotificationOpen(false);
  };

  const handleOpenFooterPage = (page: FooterPageType) => {
    setFooterPage(page);
    setAppState('footer-page');
  };

  const handleCloseFooterPage = () => {
    setFooterPage(null);
    setAppState('home');
  };

  const handleOpenCommunity = () => {
    setAppState('community');
  };

  const handleCloseCommunity = () => {
    setAppState('home');
  };

  // Landing Page
  if (appState === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Login Page
  if (appState === 'login') {
    return (
      <LoginPage 
        onLoginComplete={handleLoginComplete}
        onSwitchToRegister={handleSwitchToRegister}
      />
    );
  }

  // Register Page
  if (appState === 'register') {
    return (
      <RegisterPage 
        onRegisterComplete={handleRegisterComplete} 
        initialEmail={userEmail}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  // Payment Plan Page
  if (appState === 'payment') {
    return <PaymentPlan onPlanSelected={handlePlanSelected} />;
  }

  // Movie Player Page
  if (appState === 'player' && selectedMovie) {
    return (
      <EnhancedMoviePlayerPage
        movie={selectedMovie}
        onBack={handleBackToHome}
        onViewDetails={() => handleViewDetails(selectedMovie)}
      />
    );
  }

  // Movie Detail Page
  if (appState === 'details' && selectedMovie) {
    return (
      <MovieDetailPage
        movie={selectedMovie}
        onBack={handleBackToHome}
        onPlayMovie={() => handlePlayMovie(selectedMovie)}
      />
    );
  }

  // Platform Page
  if (appState === 'platform' && selectedPlatform) {
    return (
      <PlatformPage
        platformName={selectedPlatform.name}
        onBack={handleBackToHomeFromPlatform}
        onPlayMovie={handlePlayMovie}
        onViewDetails={handleViewDetails}
      />
    );
  }

  // My List Page
  if (appState === 'mylist') {
    return (
      <MyListPage
        onBack={handleBackToHome}
        onPlayMovie={handlePlayMovie}
        onViewDetails={handleViewDetails}
      />
    );
  }

  // Profile Page
  if (appState === 'profile') {
    return (
      <ProfilePage
        onBack={handleBackToHome}
        onPlayMovie={handlePlayMovie}
        onViewDetails={handleViewDetails}
      />
    );
  }

  // Category Page
  if (appState === 'films' || appState === 'series' || appState === 'new-popular') {
    return (
      <CategoryPage
        category={appState}
        onBack={handleBackToHome}
        onPlayMovie={handlePlayMovie}
        onViewDetails={handleViewDetails}
      />
    );
  }

  // Genre Page
  if (appState === 'genre' && selectedGenre) {
    return (
      <CategoryPage
        category="genre"
        genreName={selectedGenre}
        onBack={handleBackToHomeFromGenre}
        onPlayMovie={handlePlayMovie}
        onViewDetails={handleViewDetails}
      />
    );
  }

  // Footer Page
  if (appState === 'footer-page' && footerPage) {
    return (
      <FooterPage
        page={footerPage}
        onBack={handleCloseFooterPage}
      />
    );
  }

  // Community Page
  if (appState === 'community') {
    return (
      <CommunityPage
        onBack={handleCloseCommunity}
      />
    );
  }

  // Home Page
  return (
    <div className="min-h-screen bg-[#0F1117]">
      <Header 
        onLogout={handleLogout}
        onNavigateHome={handleBackToHome}
        onNavigateFilms={() => setAppState('films')}
        onNavigateSeries={() => setAppState('series')}
        onNavigateNewPopular={() => setAppState('new-popular')}
        onNavigateMyList={() => setAppState('mylist')}
        onNavigateGenre={handleGenreSelect}
        onNavigateProfile={() => setAppState('profile')}
        onOpenSearch={handleOpenSearch}
        onNavigateNotifications={handleOpenNotifications}
      />
      
      <main>
        {/* Hero Section */}
        <HeroSlider 
          onPlayMovie={handlePlayMovie}
          onViewDetails={handleViewDetails}
        />

        {/* Platform Strip */}
        <PlatformStrip 
          onPlatformClick={handlePlatformSelect}
        />

        {/* Continue Watching */}
        <ContinueWatching 
          onPlayMovie={handlePlayMovie}
          onViewDetails={handleViewDetails}
        />

        {/* Movie Rows */}
        <div className="space-y-8 py-8">
          {/* Top 10 in Indonesia Today */}
          <MovieRow 
            title="🔥 Top 10 in Indonesia Today" 
            movies={extendedMoviesData.top10 as Movie[]}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Trending Now */}
          <MovieRow 
            title="Trending Now" 
            movies={moviesData.trending}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Popular on CineWave */}
          <MovieRow 
            title="Popular on CineWave" 
            movies={moviesData.popular}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Award-Winning Movies */}
          <MovieRow 
            title="🏆 Award-Winning Movies" 
            movies={extendedMoviesData.awardWinning as Movie[]}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* New Releases */}
          <MovieRow 
            title="🎬 New Releases" 
            movies={moviesData.newReleases}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Anime & Animation */}
          <MovieRow 
            title="⚡ Anime & Animation" 
            movies={extendedMoviesData.anime as Movie[]}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Action & Adventure */}
          <MovieRow 
            title="💥 Action & Adventure" 
            movies={moviesData.action}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Sci-Fi Collection */}
          <MovieRow 
            title="🚀 Sci-Fi Collection" 
            movies={moviesData.scifi}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Family Favorites */}
          <MovieRow 
            title="👨‍👩‍👧‍👦 Family Favorites" 
            movies={extendedMoviesData.family as Movie[]}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Mystery & Thriller */}
          <MovieRow 
            title="🔍 Mystery & Thriller" 
            movies={extendedMoviesData.thriller as Movie[]}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Romance & Drama */}
          <MovieRow 
            title="💕 Romance & Drama" 
            movies={extendedMoviesData.romance as Movie[]}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Comedy Specials */}
          <MovieRow 
            title="😂 Comedy Specials" 
            movies={extendedMoviesData.comedy as Movie[]}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Documentary Highlights */}
          <MovieRow 
            title="📺 Documentary Highlights" 
            movies={extendedMoviesData.documentary as Movie[]}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Mystery Collection */}
          <MovieRow 
            title="🕵️ Mystery Collection" 
            movies={extendedMoviesData.mystery as Movie[]}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Critically Acclaimed */}
          <MovieRow 
            title="⭐ Critically Acclaimed" 
            movies={extendedMoviesData.trending as Movie[]}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />

          {/* Recently Added */}
          <MovieRow 
            title="🆕 Recently Added" 
            movies={moviesData.newReleases}
            onPlayMovie={handlePlayMovie}
            onViewDetails={handleViewDetails}
          />
        </div>

        {/* Community Feed */}
        <CommunityFeed onLoadMore={handleOpenCommunity} />
      </main>

      <Footer onNavigate={handleOpenFooterPage} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
        onPlayMovie={handlePlayMovie}
        onViewDetails={handleViewDetails}
      />

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={handleCloseNotifications}
        onPlayMovie={handlePlayMovie}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}