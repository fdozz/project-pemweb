import { useState, useEffect, useRef } from 'react';
import { Play, Plus, Info, Star, Check, Edit3 } from 'lucide-react';
import { Movie } from '../data/movies';
import { WatchListMenu } from './WatchListMenu';
import { isInWatchList, addToWatchList, updateWatchListCategory, removeFromWatchList, WatchListCategory, getCategoryDisplayName } from '../utils/watchlist';

interface MovieCardProps {
  movie: Movie;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onPlayMovie?: (movie: Movie) => void;
  onViewDetails?: (movie: Movie) => void;
}

export function MovieCard({ 
  movie, 
  isHovered, 
  onHover, 
  onLeave, 
  onPlayMovie, 
  onViewDetails 
}: MovieCardProps) {
  const [showWatchListMenu, setShowWatchListMenu] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<WatchListCategory | null>(null);
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
  };

  return (
    <div
      className="flex-shrink-0 w-[280px] group/card cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={`
        relative rounded-xl overflow-hidden bg-[#161921]
        transition-all duration-300 ease-in-out
        ${isHovered 
          ? 'scale-125 z-50 shadow-2xl shadow-black/50' 
          : 'scale-100'
        }
      `}>
        {/* Thumbnail */}
        <div className="relative aspect-video">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#161921] via-transparent to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">{movie.rating}</span>
          </div>

          {/* Watch List Badge */}
          {currentCategory && !isHovered && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-[#6C5CE7]/90 backdrop-blur-sm rounded-md">
              <span className="text-xs">{getCategoryDisplayName(currentCategory)}</span>
            </div>
          )}
        </div>

        {/* Expanded Info (shown on hover) */}
        {isHovered && (
          <div className="p-4 space-y-3 bg-[#161921]">
            {/* Action Buttons */}
            <div className="flex items-center gap-2" ref={menuRef}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayMovie?.(movie);
                }}
                className="w-9 h-9 bg-white hover:bg-white/90 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Play className="w-4 h-4 text-black ml-0.5" fill="black" />
              </button>
              
              {/* Watch List Button */}
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowWatchListMenu(!showWatchListMenu);
                  }}
                  className={`w-9 h-9 border rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                    currentCategory
                      ? 'bg-[#6C5CE7] border-[#6C5CE7] hover:bg-[#7D6EF0]'
                      : 'bg-[#1C1F27] hover:bg-[#2D3436] border-[#2D3436] hover:border-white'
                  }`}
                >
                  {currentCategory ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>

                {showWatchListMenu && (
                  <WatchListMenu
                    currentCategory={currentCategory}
                    onSelect={handleWatchListSelect}
                    onClose={() => setShowWatchListMenu(false)}
                  />
                )}
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails?.(movie);
                }}
                className="w-9 h-9 bg-[#1C1F27] hover:bg-[#2D3436] border border-[#2D3436] hover:border-white rounded-full flex items-center justify-center transition-all hover:scale-110 ml-auto"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Title */}
            <h3 className="text-sm line-clamp-1">
              {movie.title}
            </h3>

            {/* Year & Genre */}
            <div className="flex items-center gap-2 text-xs text-[#B2B7C2]">
              <span>{movie.year}</span>
              <span>•</span>
              <span className="line-clamp-1">{movie.genre.join(', ')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
