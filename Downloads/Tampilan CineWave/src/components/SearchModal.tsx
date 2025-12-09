import { useState, useEffect, useRef } from 'react';
import { X, Search, Play, TrendingUp } from 'lucide-react';
import { Movie } from '../data/movies';
import { moviesData } from '../data/movies';
import { extendedMoviesData } from '../data/extendedMovies';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayMovie: (movie: Movie) => void;
  onViewDetails: (movie: Movie) => void;
}

export function SearchModal({ isOpen, onClose, onPlayMovie, onViewDetails }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [trendingSearches] = useState([
    'Action', 'Sci-Fi', 'Thriller', 'Romance', 'Comedy', 'Horror'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get all movies
  const getAllMovies = (): Movie[] => {
    return [
      ...moviesData.trending,
      ...moviesData.popular,
      ...moviesData.newReleases,
      ...moviesData.action,
      ...moviesData.scifi,
      ...(extendedMoviesData.top10 as Movie[]),
      ...(extendedMoviesData.anime as Movie[]),
      ...(extendedMoviesData.awardWinning as Movie[]),
      ...(extendedMoviesData.family as Movie[]),
      ...(extendedMoviesData.thriller as Movie[]),
      ...(extendedMoviesData.romance as Movie[]),
      ...(extendedMoviesData.comedy as Movie[]),
      ...(extendedMoviesData.documentary as Movie[]),
      ...(extendedMoviesData.mystery as Movie[]),
    ].filter((movie, index, self) =>
      index === self.findIndex((m) => m.id === movie.id)
    );
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const allMovies = getAllMovies();
    const query = searchQuery.toLowerCase();
    
    const filtered = allMovies.filter(movie => 
      movie.title.toLowerCase().includes(query) ||
      movie.genre.some(g => g.toLowerCase().includes(query)) ||
      movie.description?.toLowerCase().includes(query) ||
      movie.director?.toLowerCase().includes(query)
    ).slice(0, 8); // Limit to 8 results

    setSearchResults(filtered);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-3xl bg-[#161921] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
        {/* Search Input */}
        <div className="p-6 border-b border-[#2D3436]">
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-[#B2B7C2]" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies, series, genres..."
              className="flex-1 bg-transparent text-xl outline-none text-white placeholder:text-[#B2B7C2]"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Results or Trending */}
        <div className="max-h-[60vh] overflow-y-auto">
          {searchQuery.trim() === '' ? (
            // Trending Searches
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#6C5CE7]" />
                <h3 className="text-lg">Trending Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            // Search Results
            <div className="p-4">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="flex gap-4 p-3 hover:bg-white/5 rounded-xl transition-all cursor-pointer group"
                  onClick={() => {
                    onViewDetails(movie);
                    onClose();
                  }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-36 flex-shrink-0 rounded-lg overflow-hidden bg-[#0F1117]">
                    <img
                      src={movie.poster || movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg mb-2 line-clamp-1 group-hover:text-[#6C5CE7] transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[#B2B7C2] mb-2">
                      <span className="px-2 py-0.5 bg-[#6C5CE7] text-white rounded text-xs">
                        {movie.rating}
                      </span>
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span className="line-clamp-1">{movie.genre.join(', ')}</span>
                    </div>
                    <p className="text-sm text-[#B2B7C2] line-clamp-2">
                      {movie.description}
                    </p>
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayMovie(movie);
                      onClose();
                    }}
                    className="flex-shrink-0 w-12 h-12 bg-[#6C5CE7] hover:bg-[#7D6EF0] rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Play className="w-5 h-5" fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            // No Results
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#B2B7C2]" />
              </div>
              <h3 className="text-xl mb-2">No results found</h3>
              <p className="text-[#B2B7C2]">
                Try searching for a different title or genre
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
