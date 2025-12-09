import { Check } from 'lucide-react';
import { WatchListCategory, getCategoryDisplayName, getCategoryColor } from '../utils/watchlist';

interface WatchListMenuProps {
  currentCategory: WatchListCategory | null;
  onSelect: (category: WatchListCategory | 'remove') => void;
  onClose: () => void;
}

export function WatchListMenu({ currentCategory, onSelect, onClose }: WatchListMenuProps) {
  const categories: WatchListCategory[] = [
    'watching',
    'on-hold',
    'plan-to-watch',
    'dropped',
    'completed'
  ];

  const handleSelect = (category: WatchListCategory | 'remove') => {
    onSelect(category);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-56 bg-[#161921] border border-[#2D3436] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#2D3436]">
        <p className="text-sm text-[#B2B7C2]">Add to Watch List</p>
      </div>

      {/* Categories */}
      <div className="py-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleSelect(category)}
            className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#1C1F27] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`} />
              <span className="text-sm group-hover:text-white transition-colors">
                {getCategoryDisplayName(category)}
              </span>
            </div>
            {currentCategory === category && (
              <Check className="w-4 h-4 text-[#6C5CE7]" />
            )}
          </button>
        ))}
      </div>

      {/* Remove Button */}
      {currentCategory && (
        <>
          <div className="border-t border-[#2D3436]" />
          <div className="py-2">
            <button
              onClick={() => handleSelect('remove')}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-500/10 transition-colors text-red-400 hover:text-red-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-sm">Remove</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}