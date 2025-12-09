import { useState, useEffect, useRef } from 'react';
import { Film, Search, Bell, ChevronDown, User, Clock, CreditCard, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  onNavigateHome?: () => void;
  onNavigateFilms?: () => void;
  onNavigateSeries?: () => void;
  onNavigateNewPopular?: () => void;
  onNavigateMyList?: () => void;
  onNavigateGenre?: (genre: string) => void;
  onNavigateProfile?: () => void;
  onOpenSearch?: () => void;
  onNavigateNotifications?: () => void;
}

export function Header({ 
  onLogout, 
  onNavigateHome,
  onNavigateFilms,
  onNavigateSeries,
  onNavigateNewPopular,
  onNavigateMyList,
  onNavigateGenre,
  onNavigateProfile,
  onOpenSearch,
  onNavigateNotifications
}: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance',
    'Sci-Fi', 'Thriller', 'War', 'Western', 'Anime', 'K-Drama'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (genreRef.current && !genreRef.current.contains(event.target as Node)) {
        setIsGenreOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const user = JSON.parse(localStorage.getItem('cinewave_user') || '{}');

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1C1F27]/95 backdrop-blur-xl shadow-lg' 
          : 'bg-gradient-to-b from-[#0F1117] to-transparent'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-lg flex items-center justify-center shadow-lg shadow-[#6C5CE7]/50">
                <Film className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] bg-clip-text text-transparent">
                CineWave
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#" className="text-white hover:text-[#6C5CE7] transition-colors" onClick={onNavigateHome}>
                Home
              </a>
              <a href="#" className="text-[#B2B7C2] hover:text-white transition-colors" onClick={onNavigateFilms}>
                Films
              </a>
              <a href="#" className="text-[#B2B7C2] hover:text-white transition-colors" onClick={onNavigateSeries}>
                Series
              </a>
              <a href="#" className="text-[#B2B7C2] hover:text-white transition-colors" onClick={onNavigateNewPopular}>
                New & Popular
              </a>
              <a href="#" className="text-[#B2B7C2] hover:text-white transition-colors" onClick={onNavigateMyList}>
                My List
              </a>
              
              {/* Genre Dropdown */}
              <div className="relative" ref={genreRef}>
                <button
                  onClick={() => setIsGenreOpen(!isGenreOpen)}
                  className="flex items-center gap-1 text-[#B2B7C2] hover:text-white transition-colors"
                >
                  Browse by Genre
                  <ChevronDown className={`w-4 h-4 transition-transform ${isGenreOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Genre Mega Menu */}
                {isGenreOpen && (
                  <div className="absolute top-full left-0 mt-4 w-[400px] bg-[#161921]/98 backdrop-blur-xl border border-[#2D3436] rounded-xl p-6 shadow-2xl">
                    <div className="grid grid-cols-3 gap-3">
                      {genres.map((genre) => (
                        <a
                          key={genre}
                          href="#"
                          className="text-sm text-[#B2B7C2] hover:text-white hover:bg-[#1C1F27] px-3 py-2 rounded-lg transition-all"
                          onClick={() => onNavigateGenre(genre)}
                        >
                          {genre}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right: Search, Notifications, Profile */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="p-2 text-[#B2B7C2] hover:text-white transition-colors" onClick={onOpenSearch}>
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="p-2 text-[#B2B7C2] hover:text-white transition-colors relative" onClick={onNavigateNotifications}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#6C5CE7] rounded-full" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <ChevronDown className={`w-4 h-4 text-[#B2B7C2] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-4 w-64 bg-[#161921]/98 backdrop-blur-xl border border-[#2D3436] rounded-xl shadow-2xl overflow-hidden">
                  {/* User Info */}
                  <div className="p-4 border-b border-[#2D3436]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm">{user.fullName || 'User'}</p>
                        <p className="text-xs text-[#B2B7C2]">{user.email || 'email@example.com'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <a
                      href="#"
                      className="flex items-center gap-3 px-3 py-2.5 text-[#B2B7C2] hover:text-white hover:bg-[#1C1F27] rounded-lg transition-all"
                      onClick={onNavigateProfile}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">My Profile</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-3 px-3 py-2.5 text-[#B2B7C2] hover:text-white hover:bg-[#1C1F27] rounded-lg transition-all"
                    >
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Watch History</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-3 px-3 py-2.5 text-[#B2B7C2] hover:text-white hover:bg-[#1C1F27] rounded-lg transition-all"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm">Account & Billing</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-3 px-3 py-2.5 text-[#B2B7C2] hover:text-white hover:bg-[#1C1F27] rounded-lg transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </a>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-[#2D3436]">
                    <button
                      onClick={onLogout}
                      className="flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-[#1C1F27] rounded-lg transition-all w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}