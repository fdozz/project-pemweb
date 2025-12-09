import { useState } from 'react';

interface PlatformStripProps {
  onPlatformClick?: (platformId: string, platformName: string) => void;
}

export function PlatformStrip({ onPlatformClick }: PlatformStripProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const platforms = [
    { id: 'all', name: 'All Platforms', color: 'from-[#6C5CE7] to-[#8E44AD]', emoji: '🎬' },
    { id: 'netflix', name: 'Netflix', color: 'from-red-600 to-red-700', emoji: 'N' },
    { id: 'disney', name: 'Disney+', color: 'from-blue-500 to-blue-600', emoji: 'D+' },
    { id: 'prime', name: 'Prime Video', color: 'from-cyan-500 to-blue-700', emoji: 'P' },
    { id: 'hbo', name: 'HBO Max', color: 'from-purple-600 to-purple-800', emoji: 'H' },
    { id: 'hulu', name: 'Hulu', color: 'from-green-500 to-green-600', emoji: 'H' },
    { id: 'apple', name: 'Apple TV+', color: 'from-gray-700 to-gray-900', emoji: '' },
    { id: 'paramount', name: 'Paramount+', color: 'from-blue-600 to-blue-800', emoji: 'P+' },
  ];

  const handlePlatformClick = (platform: typeof platforms[0]) => {
    setSelectedPlatform(platform.id === selectedPlatform ? null : platform.id);
    if (onPlatformClick && platform.id !== 'all') {
      onPlatformClick(platform.id, platform.name);
    }
  };

  return (
    <div className="py-8 border-t border-b border-[#2D3436] bg-[#0F1117]/50">
      <div className="max-w-[1920px] mx-auto px-6">
        <h3 className="text-xl mb-4">Browse by Platform</h3>
        
        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformClick(platform)}
                className={`flex-shrink-0 group transition-all duration-300 ${
                  selectedPlatform === platform.id ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <div className={`
                  w-24 h-24 rounded-2xl 
                  bg-gradient-to-br ${platform.color}
                  flex flex-col items-center justify-center
                  shadow-lg transition-all duration-300
                  ${selectedPlatform === platform.id 
                    ? 'ring-4 ring-[#6C5CE7] shadow-2xl shadow-[#6C5CE7]/50' 
                    : 'hover:shadow-xl'
                  }
                `}>
                  <div className="text-2xl mb-1">
                    {platform.emoji}
                  </div>
                  <div className="text-xs text-center px-2 leading-tight">
                    {platform.name}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Gradient Fade Effects */}
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-[#0F1117] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-[#0F1117] to-transparent pointer-events-none" />
        </div>

        {/* Selected Platform Info */}
        {selectedPlatform && selectedPlatform !== 'all' && (
          <div className="mt-4 text-center">
            <p className="text-sm text-[#B2B7C2]">
              Menampilkan konten dari{' '}
              <span className="text-[#6C5CE7]">
                {platforms.find(p => p.id === selectedPlatform)?.name}
              </span>
            </p>
          </div>
        )}
      </div>

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