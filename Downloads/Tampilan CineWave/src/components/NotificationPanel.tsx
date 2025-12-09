import { X, Play, Info, TrendingUp, Tv } from 'lucide-react';
import { Movie } from '../data/movies';
import { getWatchList } from '../utils/watchlist';
import { moviesData } from '../data/movies';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayMovie: (movie: Movie) => void;
  onViewDetails: (movie: Movie) => void;
}

interface Notification {
  id: number;
  type: 'series' | 'trending';
  title: string;
  message: string;
  movie: Movie;
  time: string;
  isNew: boolean;
}

export function NotificationPanel({ isOpen, onClose, onPlayMovie, onViewDetails }: NotificationPanelProps) {
  // Generate notifications based on watchlist and trending
  const generateNotifications = (): Notification[] => {
    const notifications: Notification[] = [];
    const watchList = getWatchList();
    
    // Notifications for series in watchlist
    const seriesInWatchlist = watchList.filter(item => 
      item.category === 'watching' && item.movie.type === 'series'
    );
    
    seriesInWatchlist.slice(0, 3).forEach((item, index) => {
      notifications.push({
        id: index,
        type: 'series',
        title: `New Episode Available!`,
        message: `${item.movie.title} - Episode ${Math.floor(Math.random() * 10) + 1} is now streaming`,
        movie: item.movie,
        time: index === 0 ? '2h ago' : index === 1 ? '5h ago' : '1d ago',
        isNew: index === 0
      });
    });

    // Get user's favorite genres from watchlist
    const favoriteGenres = new Set<string>();
    watchList.forEach(item => {
      item.movie.genre.forEach(g => favoriteGenres.add(g));
    });

    // Notifications for new trending movies matching user's genre
    const trendingMovies = moviesData.trending.filter(movie =>
      movie.genre.some(g => favoriteGenres.has(g))
    );

    trendingMovies.slice(0, 2).forEach((movie, index) => {
      notifications.push({
        id: 100 + index,
        type: 'trending',
        title: 'New Trending Match!',
        message: `${movie.title} is now trending in ${movie.genre[0]}`,
        movie: movie,
        time: index === 0 ? '3h ago' : '6h ago',
        isNew: index === 0 && seriesInWatchlist.length === 0
      });
    });

    return notifications;
  };

  const notifications = generateNotifications();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Notification Panel */}
      <div className="fixed top-20 right-6 w-96 max-h-[600px] bg-[#161921] border border-[#2D3436] rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#2D3436] flex items-center justify-between">
          <h2 className="text-lg">Notifications</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[520px]">
          {notifications.length > 0 ? (
            <div className="p-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-xl mb-2 hover:bg-white/5 transition-all cursor-pointer group ${
                    notif.isNew ? 'bg-[#6C5CE7]/10 border border-[#6C5CE7]/20' : ''
                  }`}
                  onClick={() => {
                    onViewDetails(notif.movie);
                    onClose();
                  }}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notif.type === 'series' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-[#6C5CE7]/20 text-[#6C5CE7]'
                    }`}>
                      {notif.type === 'series' ? (
                        <Tv className="w-5 h-5" />
                      ) : (
                        <TrendingUp className="w-5 h-5" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm">{notif.title}</p>
                        {notif.isNew && (
                          <span className="w-2 h-2 bg-[#6C5CE7] rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-[#B2B7C2] line-clamp-2 mb-2">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#B2B7C2]">{notif.time}</span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlayMovie(notif.movie);
                              onClose();
                            }}
                            className="px-3 py-1 bg-[#6C5CE7] hover:bg-[#7D6EF0] rounded-md text-xs flex items-center gap-1 transition-all"
                          >
                            <Play className="w-3 h-3" fill="currentColor" />
                            Play
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDetails(notif.movie);
                              onClose();
                            }}
                            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md text-xs flex items-center gap-1 transition-all"
                          >
                            <Info className="w-3 h-3" />
                            Info
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#B2B7C2]" />
              </div>
              <h3 className="text-lg mb-2">No notifications</h3>
              <p className="text-sm text-[#B2B7C2]">
                Add movies to your watchlist to get personalized notifications
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
