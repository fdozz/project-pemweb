import { useState } from 'react';
import { ArrowLeft, Play, Info, Plus, Check } from 'lucide-react';
import { Movie } from '../data/movies';
import { moviesData } from '../data/movies';
import { extendedMoviesData } from '../data/extendedMovies';
import { addToWatchList, isInWatchList } from '../utils/watchlist';

interface CategoryPageProps {
  category: 'films' | 'series' | 'new-popular' | 'genre';
  genreName?: string;
  onBack: () => void;
  onPlayMovie: (movie: Movie) => void;
  onViewDetails: (movie: Movie) => void;
}

export function CategoryPage({ category, genreName, onBack, onPlayMovie, onViewDetails }: CategoryPageProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [watchListUpdate, setWatchListUpdate] = useState(0);

  // Get movies based on category
  const getCategoryMovies = (): Movie[] => {
    const allMovies = [
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
    ];

    // Remove duplicates
    const uniqueMovies = allMovies.filter((movie, index, self) =>
      index === self.findIndex((m) => m.id === movie.id)
    );

    switch (category) {
      case 'films':
        return uniqueMovies.filter(m => m.type !== 'series');
      case 'series':
        return uniqueMovies.filter(m => m.type === 'series');
      case 'new-popular':
        return [...moviesData.newReleases, ...moviesData.trending, ...moviesData.popular]
          .filter((movie, index, self) => index === self.findIndex((m) => m.id === movie.id));
      case 'genre':
        if (genreName) {
          return uniqueMovies.filter(m => 
            m.genre?.some(g => g.toLowerCase().includes(genreName.toLowerCase()))
          );
        }
        return uniqueMovies;
      default:
        return uniqueMovies;
    }
  };

  const getCategoryTitle = (): string => {
    switch (category) {
      case 'films':
        return 'All Films';
      case 'series':
        return 'All Series';
      case 'new-popular':
        return 'New & Popular';
      case 'genre':
        return genreName ? `${genreName} Collection` : 'Browse by Genre';
      default:
        return 'Browse';
    }
  };

  const movies = getCategoryMovies();

  return (
    <div className="min-h-screen bg-[#0F1117]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0F1117]/95 backdrop-blur-md border-b border-[#2D3436]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-xl transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl">{getCategoryTitle()}</h1>
              <p className="text-sm text-[#B2B7C2]">{movies.length} titles available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      {movies[0] && (
        <div className="relative h-[50vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${movies[0].poster})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-[#0F1117]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117] via-transparent to-[#0F1117]/80" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl mb-4">{movies[0].title}</h2>
              <p className="text-[#B2B7C2] mb-6 line-clamp-3">
                {movies[0].description || 'Discover amazing content from our extensive collection.'}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onPlayMovie(movies[0])}
                  className="flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-white/90 rounded-xl transition-all"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                  Play
                </button>
                <button
                  onClick={() => onViewDetails(movies[0])}
                  className="flex items-center gap-2 px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all"
                >
                  <Info className="w-5 h-5" />
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredId(movie.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onViewDetails(movie)}
            >
              {/* Movie Poster */}
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[#161921]">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="text-sm mb-2 line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#B2B7C2] mb-3">
                      <span className="px-2 py-0.5 bg-[#6C5CE7] text-white rounded">
                        {movie.rating}
                      </span>
                      <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayMovie(movie);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 py-2 bg-white text-black hover:bg-white/90 rounded-lg transition-all text-xs"
                      >
                        <Play className="w-3 h-3" fill="currentColor" />
                        Play
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isInWatchList(movie.id)) {
                            addToWatchList(movie, 'plan-to-watch');
                            setWatchListUpdate(watchListUpdate + 1);
                          }
                        }}
                        className={`p-2 ${isInWatchList(movie.id) ? 'bg-[#6C5CE7] text-white' : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'} rounded-lg transition-all`}
                      >
                        {isInWatchList(movie.id) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Badge for new content */}
                {movie.isNew && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-md">
                      NEW
                    </span>
                  </div>
                )}

                {/* Badge for exclusive content */}
                {movie.isExclusive && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-[#6C5CE7] text-white text-xs rounded-md">
                      Exclusive
                    </span>
                  </div>
                )}
              </div>

              {/* Title below poster (always visible) */}
              <div className="mt-2">
                <h4 className="text-sm text-[#B2B7C2] line-clamp-1">{movie.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}