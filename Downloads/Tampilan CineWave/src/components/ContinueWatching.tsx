import { Play, RotateCcw, Info } from 'lucide-react';

interface ContinueWatchingProps {
  onPlayMovie?: (movieId: number) => void;
  onViewDetails?: (movieId: number) => void;
}

export function ContinueWatching({ onPlayMovie, onViewDetails }: ContinueWatchingProps) {
  const watchingList = [
    {
      id: 1,
      title: 'Quantum Nexus',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      progress: 65,
      currentTime: 78,
      totalTime: 120,
      episode: 'S01E03'
    },
    {
      id: 2,
      title: 'Shadow Protocol',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=500&q=80',
      progress: 45,
      currentTime: 54,
      totalTime: 120,
      episode: 'Movie'
    },
    {
      id: 3,
      title: 'The Last Expedition',
      image: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=500&q=80',
      progress: 80,
      currentTime: 96,
      totalTime: 120,
      episode: 'S02E05'
    },
    {
      id: 4,
      title: 'Crimson Dawn',
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=500&q=80',
      progress: 30,
      currentTime: 36,
      totalTime: 120,
      episode: 'S01E01'
    },
    {
      id: 5,
      title: 'Realm of Legends',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      progress: 92,
      currentTime: 110,
      totalTime: 120,
      episode: 'Movie'
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Continue Watching</h2>
          <button className="text-[#6C5CE7] hover:underline text-sm">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {watchingList.map((item) => (
            <div
              key={item.id}
              className="group relative cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#161921] mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2D3436]">
                  <div
                    className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>

                {/* Hover Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => onPlayMovie?.(item.id)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Play className="w-5 h-5 ml-0.5" fill="white" />
                  </button>
                  <button className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-110">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onViewDetails?.(item.id)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Episode Badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-[#161921]/80 backdrop-blur-sm rounded-md text-xs">
                  {item.episode}
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-sm mb-1 truncate group-hover:text-[#6C5CE7] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#B2B7C2]">
                  {item.currentTime}m of {item.totalTime}m
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}