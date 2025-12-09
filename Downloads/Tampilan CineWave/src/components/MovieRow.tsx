import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../data/movies';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onPlayMovie?: (movie: Movie) => void;
  onViewDetails?: (movie: Movie) => void;
}

export function MovieRow({ title, movies, onPlayMovie, onViewDetails }: MovieRowProps) {
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-4 group/row">
      <div className="max-w-[1920px] mx-auto px-6">
        <h2 className="text-xl md:text-2xl mb-4">{title}</h2>

        <div className="relative">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-r from-[#0F1117] to-transparent opacity-0 group-hover/row:opacity-100 hover:from-[#0F1117]/95 transition-opacity flex items-center justify-center"
          >
            <div className="w-10 h-10 bg-[#161921]/80 backdrop-blur-sm border border-[#2D3436] rounded-full flex items-center justify-center hover:bg-[#1C1F27] hover:scale-110 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </button>

          {/* Movies Container */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isHovered={hoveredMovie === movie.id}
                onHover={() => setHoveredMovie(movie.id)}
                onLeave={() => setHoveredMovie(null)}
                onPlayMovie={onPlayMovie}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-l from-[#0F1117] to-transparent opacity-0 group-hover/row:opacity-100 hover:from-[#0F1117]/95 transition-opacity flex items-center justify-center"
          >
            <div className="w-10 h-10 bg-[#161921]/80 backdrop-blur-sm border border-[#2D3436] rounded-full flex items-center justify-center hover:bg-[#1C1F27] hover:scale-110 transition-all">
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>
        </div>
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