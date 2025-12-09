import { ArrowLeft, Play, Plus, Share2, Info, Check } from 'lucide-react';
import { Movie } from '../data/movies';
import { useState, useEffect, useRef } from 'react';
import { WatchListMenu } from './WatchListMenu';
import { isInWatchList, addToWatchList, updateWatchListCategory, removeFromWatchList, WatchListCategory } from '../utils/watchlist';

interface MovieDetailPageProps {
  movie: Movie;
  onBack: () => void;
  onPlayMovie: () => void;
}

export function MovieDetailPage({ movie, onBack, onPlayMovie }: MovieDetailPageProps) {
  const [currentCategory, setCurrentCategory] = useState<WatchListCategory | null>(null);
  const [showWatchListMenu, setShowWatchListMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentCategory(isInWatchList(movie.id));
  }, [movie.id]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowWatchListMenu(false);
      }
    }

    if (showWatchListMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showWatchListMenu]);

  const handleWatchListSelect = (category: WatchListCategory | 'remove') => {
    if (category === 'remove') {
      removeFromWatchList(movie.id);
      setCurrentCategory(null);
    } else {
      if (currentCategory) {
        updateWatchListCategory(movie.id, category);
      } else {
        addToWatchList(movie, category);
      }
      setCurrentCategory(category);
    }
    setShowWatchListMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#0F1117]">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Backdrop Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.backdrop || movie.image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-[#0F1117]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117] via-transparent to-transparent" />
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black/70 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl mb-4 text-white">{movie.title}</h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
              <span className="flex items-center gap-1">
                <span className="text-2xl">⭐</span>
                <span className="text-xl">{movie.rating}</span>
              </span>
              <span>•</span>
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.duration}</span>
              <span>•</span>
              <div className="flex gap-2">
                {movie.genre.map((g, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-2xl">
              {movie.description}
            </p>

            {/* Director */}
            {movie.director && (
              <p className="text-gray-400 mb-8">
                <span className="text-gray-500">Director:</span> {movie.director}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onPlayMovie}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] text-white rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#6C5CE7]/30"
              >
                <Play className="w-6 h-6" />
                <span className="text-lg">Play Now</span>
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowWatchListMenu(!showWatchListMenu)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all shadow-lg ${
                    currentCategory
                      ? 'bg-[#6C5CE7] hover:bg-[#7D6EF0] text-white shadow-[#6C5CE7]/30'
                      : 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white'
                  }`}
                >
                  {currentCategory ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  <span className="text-lg">My List</span>
                </button>

                {/* WatchList Menu */}
                {showWatchListMenu && (
                  <WatchListMenu
                    currentCategory={currentCategory}
                    onSelect={handleWatchListSelect}
                    onClose={() => setShowWatchListMenu(false)}
                  />
                )}
              </div>

              <button className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Cast Section */}
        {movie.cast && movie.cast.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Info className="w-6 h-6 text-[#6C5CE7]" />
              <h2 className="text-3xl text-white">Cast & Crew</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movie.cast.map((actor) => (
                <div 
                  key={actor.id}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 bg-[#161921] border border-white/10">
                    <img
                      src={actor.photo}
                      alt={actor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-white mb-1 group-hover:text-[#6C5CE7] transition-colors">
                    {actor.name}
                  </h3>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* More Info Section */}
        <section className="grid md:grid-cols-2 gap-12">
          {/* About */}
          <div>
            <h3 className="text-2xl text-white mb-4">About This Movie</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex gap-2">
                <span className="text-gray-500 min-w-[100px]">Genres:</span>
                <span>{movie.genre.join(', ')}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 min-w-[100px]">Release Year:</span>
                <span>{movie.year}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 min-w-[100px]">Duration:</span>
                <span>{movie.duration}</span>
              </div>
              {movie.director && (
                <div className="flex gap-2">
                  <span className="text-gray-500 min-w-[100px]">Director:</span>
                  <span>{movie.director}</span>
                </div>
              )}
              <div className="flex gap-2">
                <span className="text-gray-500 min-w-[100px]">Rating:</span>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  {movie.rating}/10
                </span>
              </div>
            </div>
          </div>

          {/* Tags & Features */}
          <div>
            <h3 className="text-2xl text-white mb-4">Features</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                4K Ultra HD
              </span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                5.1 Surround Sound
              </span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                Subtitles Available
              </span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                HDR
              </span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                Dolby Atmos
              </span>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-[#6C5CE7]/10 to-[#8E44AD]/10 border border-[#6C5CE7]/20 rounded-2xl">
              <h4 className="text-lg text-white mb-2">Available on CineWave Premium</h4>
              <p className="text-sm text-gray-400">
                Watch this title in the highest quality with our Premium plan. Upgrade now for the ultimate streaming experience.
              </p>
            </div>
          </div>
        </section>

        {/* Similar Content Section */}
        <section className="mt-16">
          <h3 className="text-2xl text-white mb-6">More Like This</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 bg-[#161921] border border-white/10">
                  <img
                    src={movie.image}
                    alt="Similar movie"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}