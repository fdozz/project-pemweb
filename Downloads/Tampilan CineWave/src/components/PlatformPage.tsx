import { ArrowLeft } from 'lucide-react';
import { MovieRow } from './MovieRow';
import { getMoviesByPlatform, ExtendedMovie } from '../data/extendedMovies';
import { Movie } from '../data/movies';

interface PlatformPageProps {
  platformName: string;
  platformLogo?: string;
  onBack: () => void;
  onPlayMovie: (movie: Movie) => void;
  onViewDetails: (movie: Movie) => void;
}

export function PlatformPage({ 
  platformName, 
  platformLogo,
  onBack, 
  onPlayMovie, 
  onViewDetails 
}: PlatformPageProps) {
  const platformMovies = getMoviesByPlatform(platformName);

  const categoryTitles: Record<string, string> = {
    trending: `Trending Now on ${platformName}`,
    popular: `Popular on ${platformName}`,
    newReleases: 'New Releases',
    action: 'Action & Adventure',
    scifi: 'Sci-Fi Collection',
    comedy: 'Comedy Specials',
    romance: 'Romance & Drama',
    thriller: 'Mystery & Thriller',
    anime: 'Anime & Animation',
    family: 'Family Favorites',
    documentary: 'Documentary Highlights',
    awardWinning: 'Award-Winning Movies',
    top10: `Top 10 on ${platformName}`,
    mystery: 'Mystery Collection'
  };

  return (
    <div className="min-h-screen bg-[#0F1117]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0F1117]/95 backdrop-blur-sm border-b border-[#2D3436]/50">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-[#1E2128] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              {platformLogo && (
                <img src={platformLogo} alt={platformName} className="h-8" />
              )}
              <h1 className="text-2xl">{platformName}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="relative h-[70vh] flex items-center"
        style={{
          backgroundImage: `url(${platformMovies.trending?.[0]?.backdrop || platformMovies.trending?.[0]?.image || 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-[#0F1117]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117] via-[#0F1117]/50 to-transparent" />
        
        <div className="relative z-10 px-6 lg:px-16 max-w-3xl">
          <h1 className="text-5xl lg:text-6xl mb-4">
            Welcome to {platformName}
          </h1>
          <p className="text-xl text-[#B2B7C2] mb-6">
            Stream thousands of movies and series from {platformName} on CineWave
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => platformMovies.trending?.[0] && onPlayMovie(platformMovies.trending[0])}
              className="px-8 py-3 bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] rounded-xl hover:scale-105 transition-transform shadow-lg shadow-[#6C5CE7]/30"
            >
              Start Watching
            </button>
            <button
              onClick={() => platformMovies.trending?.[0] && onViewDetails(platformMovies.trending[0])}
              className="px-8 py-3 bg-[#1E2128]/80 backdrop-blur-sm border border-[#2D3436] rounded-xl hover:border-[#6C5CE7] transition-colors"
            >
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <main className="px-6 lg:px-16 py-8 space-y-8">
        {Object.entries(platformMovies).map(([category, movies]) => (
          movies.length > 0 && (
            <MovieRow
              key={category}
              title={categoryTitles[category] || category}
              movies={movies as Movie[]}
              onPlayMovie={onPlayMovie}
              onViewDetails={onViewDetails}
            />
          )
        ))}

        {Object.keys(platformMovies).length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-[#B2B7C2]">
              No content available for {platformName} at the moment.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
