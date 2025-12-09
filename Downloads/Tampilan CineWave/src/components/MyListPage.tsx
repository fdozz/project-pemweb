import { useState, useEffect } from 'react';
import { ArrowLeft, Film } from 'lucide-react';
import { Movie } from '../data/movies';
import { MovieRow } from './MovieRow';
import { getWatchListByCategory, WatchListCategory, getCategoryDisplayName, getCategoryColor } from '../utils/watchlist';

interface MyListPageProps {
  onBack: () => void;
  onPlayMovie: (movie: Movie) => void;
  onViewDetails: (movie: Movie) => void;
}

export function MyListPage({ onBack, onPlayMovie, onViewDetails }: MyListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<WatchListCategory | 'all'>('all');
  const [watchListData, setWatchListData] = useState<Record<WatchListCategory, Movie[]>>({
    'watching': [],
    'on-hold': [],
    'plan-to-watch': [],
    'dropped': [],
    'completed': []
  });

  useEffect(() => {
    loadWatchList();

    // Listen for storage changes to update in real-time
    const handleStorageChange = () => {
      loadWatchList();
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener('watchlist-updated' as any, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('watchlist-updated' as any, handleStorageChange);
    };
  }, []);

  const loadWatchList = () => {
    const categories: WatchListCategory[] = ['watching', 'on-hold', 'plan-to-watch', 'dropped', 'completed'];
    const data: Record<WatchListCategory, Movie[]> = {} as any;
    
    categories.forEach(category => {
      data[category] = getWatchListByCategory(category);
    });

    setWatchListData(data);
  };

  const categories: { id: WatchListCategory | 'all'; label: string; gradient?: string }[] = [
    { id: 'all', label: 'All Lists' },
    { id: 'watching', label: 'Watching', gradient: getCategoryColor('watching') },
    { id: 'plan-to-watch', label: 'Plan to Watch', gradient: getCategoryColor('plan-to-watch') },
    { id: 'on-hold', label: 'On-Hold', gradient: getCategoryColor('on-hold') },
    { id: 'completed', label: 'Completed', gradient: getCategoryColor('completed') },
    { id: 'dropped', label: 'Dropped', gradient: getCategoryColor('dropped') },
  ];

  const getTotalCount = () => {
    return Object.values(watchListData).reduce((sum, movies) => sum + movies.length, 0);
  };

  const getFilteredData = () => {
    if (selectedCategory === 'all') {
      return watchListData;
    }
    return { [selectedCategory]: watchListData[selectedCategory] };
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
            <div>
              <h1 className="text-2xl">My List</h1>
              <p className="text-sm text-[#B2B7C2]">{getTotalCount()} titles in your watchlist</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-6 pb-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? category.gradient
                      ? `bg-gradient-to-r ${category.gradient} text-white`
                      : 'bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] text-white'
                    : 'bg-[#1E2128] hover:bg-[#2D3436] text-[#B2B7C2]'
                }`}
              >
                <span className="text-sm whitespace-nowrap">{category.label}</span>
                {category.id !== 'all' && watchListData[category.id as WatchListCategory]?.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                    {watchListData[category.id as WatchListCategory].length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-8">
        {getTotalCount() === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-[#1E2128] rounded-full flex items-center justify-center mb-6">
              <Film className="w-12 h-12 text-[#B2B7C2]" />
            </div>
            <h2 className="text-2xl mb-2">Your list is empty</h2>
            <p className="text-[#B2B7C2] text-center max-w-md mb-6">
              Add movies and series to your watchlist to keep track of what you want to watch
            </p>
            <button
              onClick={onBack}
              className="px-8 py-3 bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] rounded-xl hover:scale-105 transition-transform"
            >
              Browse Content
            </button>
          </div>
        ) : (
          // Movie Rows by Category
          <div className="space-y-8">
            {Object.entries(getFilteredData()).map(([category, movies]) => 
              movies.length > 0 && (
                <MovieRow
                  key={category}
                  title={getCategoryDisplayName(category as WatchListCategory)}
                  movies={movies}
                  onPlayMovie={onPlayMovie}
                  onViewDetails={onViewDetails}
                />
              )
            )}
          </div>
        )}
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
