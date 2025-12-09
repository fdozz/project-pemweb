import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from 'lucide-react';
import { Movie } from '../data/movies';

interface MoviePlayerPageProps {
  movie: Movie;
  onBack: () => void;
  onViewDetails: () => void;
}

export function MoviePlayerPage({ movie, onBack, onViewDetails }: MoviePlayerPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number>();

  // Simulate video duration (in seconds)
  const duration = 7200; // 2 hours

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)));
  };

  return (
    <div 
      className="relative min-h-screen bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Video Player Area */}
      <div className="relative w-full h-screen" ref={videoRef}>
        {/* Mock Video Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.backdrop || movie.image})`,
            filter: isPlaying ? 'brightness(0.8)' : 'brightness(0.5)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayPause}
              className="w-24 h-24 bg-[#6C5CE7]/90 rounded-full flex items-center justify-center hover:bg-[#6C5CE7] transition-all hover:scale-110 shadow-2xl"
            >
              <Play className="w-12 h-12 text-white ml-2" />
            </button>
          </div>
        )}

        {/* Top Controls */}
        <div 
          className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-[#6C5CE7] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="text-lg">Back</span>
            </button>

            <div className="text-center">
              <h1 className="text-2xl text-white mb-1">{movie.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  ⭐ {movie.rating}
                </span>
              </div>
            </div>

            <button
              onClick={onViewDetails}
              className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #6C5CE7 0%, #6C5CE7 ${(currentTime / duration) * 100}%, #4B5563 ${(currentTime / duration) * 100}%, #4B5563 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={handlePlayPause}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>

              {/* Skip Back */}
              <button
                onClick={() => handleSkip(-10)}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              {/* Skip Forward */}
              <button
                onClick={() => handleSkip(10)}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>

              {/* Volume */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Settings */}
              <button className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors">
                <Settings className="w-6 h-6" />
              </button>

              {/* Fullscreen */}
              <button className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors">
                <Maximize className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Click to Play/Pause */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={handlePlayPause}
        />
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #6C5CE7;
          border-radius: 50%;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .slider:hover::-webkit-slider-thumb {
          opacity: 1;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #6C5CE7;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .slider:hover::-moz-range-thumb {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
