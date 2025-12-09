import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward, ChevronLeft, ChevronRight, Info, Minimize } from 'lucide-react';
import { Movie } from '../data/movies';

interface EnhancedMoviePlayerPageProps {
  movie: Movie;
  onBack: () => void;
  onViewDetails: () => void;
}

export function EnhancedMoviePlayerPage({ movie, onBack, onViewDetails }: EnhancedMoviePlayerPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [subtitleSettings, setSubtitleSettings] = useState({
    enabled: true,
    language: 'English',
    fontSize: 'Medium',
    placement: 'Bottom',
    background: 'Transparent',
    color: 'White'
  });
  
  const videoRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number>();
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const duration = 7200;
  const totalEpisodes = movie.type === 'series' ? 12 : 1;

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
      if (isPlaying && !showSettings) {
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePreviousEpisode = () => {
    if (currentEpisode > 1) {
      setCurrentEpisode(currentEpisode - 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handleNextEpisode = () => {
    if (currentEpisode < totalEpisodes) {
      setCurrentEpisode(currentEpisode + 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const qualities = ['4K', '1080p', '720p', '480p', 'Auto'];
  const languages = ['English', 'Indonesian', 'Spanish', 'Japanese', 'Korean', 'Off'];
  const fontSizes = ['Small', 'Medium', 'Large', 'Extra Large'];
  const placements = ['Top', 'Bottom'];
  const backgrounds = ['Transparent', 'Semi-Transparent', 'Opaque'];
  const colors = ['White', 'Yellow', 'Cyan', 'Green'];

  return (
    <div 
      ref={playerContainerRef}
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

        {/* Subtitle Overlay */}
        {subtitleSettings.enabled && isPlaying && (
          <div 
            className={`absolute ${subtitleSettings.placement === 'Top' ? 'top-20' : 'bottom-32'} left-0 right-0 flex justify-center px-12`}
          >
            <div
              className={`px-4 py-2 rounded ${
                subtitleSettings.background === 'Transparent' ? 'bg-transparent' :
                subtitleSettings.background === 'Semi-Transparent' ? 'bg-black/50' : 'bg-black'
              } text-${subtitleSettings.color.toLowerCase()} font-${subtitleSettings.fontSize.toLowerCase()}`}
              style={{
                fontSize: 
                  subtitleSettings.fontSize === 'Small' ? '14px' :
                  subtitleSettings.fontSize === 'Medium' ? '18px' :
                  subtitleSettings.fontSize === 'Large' ? '24px' : '32px',
                color: subtitleSettings.color.toLowerCase()
              }}
            >
              [Subtitle text appears here]
            </div>
          </div>
        )}

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
              <h1 className="text-2xl text-white mb-1">
                {movie.title}
                {movie.type === 'series' && ` - S01:E${currentEpisode.toString().padStart(2, '0')}`}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  ⭐ {movie.rating}
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 bg-[#6C5CE7] rounded text-xs">{selectedQuality}</span>
              </div>
            </div>

            <button
              onClick={onViewDetails}
              className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
            >
              <Info className="w-4 h-4" />
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
                title="Rewind 10s"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              {/* Skip Forward */}
              <button
                onClick={() => handleSkip(10)}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors"
                title="Forward 10s"
              >
                <SkipForward className="w-6 h-6" />
              </button>

              {/* Previous Episode */}
              {movie.type === 'series' && (
                <button
                  onClick={handlePreviousEpisode}
                  disabled={currentEpisode === 1}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Previous Episode"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Episode */}
              {movie.type === 'series' && (
                <button
                  onClick={handleNextEpisode}
                  disabled={currentEpisode === totalEpisodes}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Next Episode"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Volume */}
              <div className="relative flex items-center">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
                
                {showVolumeSlider && (
                  <div 
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#161921]/95 backdrop-blur-xl border border-[#2D3436] rounded-lg p-3"
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="h-24 w-2 appearance-none bg-gray-600 rounded-lg cursor-pointer volume-slider"
                      style={{
                        writingMode: 'bt-lr',
                        WebkitAppearance: 'slider-vertical',
                      }}
                    />
                    <div className="text-center text-xs text-gray-400 mt-2">{volume}%</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Settings */}
              <div className="relative">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors"
                >
                  <Settings className="w-6 h-6" />
                </button>

                {/* Settings Menu */}
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 w-96 bg-[#161921]/98 backdrop-blur-xl border border-[#2D3436] rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-4">
                      <h3 className="text-lg mb-4">Playback Settings</h3>

                      {/* Quality */}
                      <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-2">Quality</label>
                        <div className="grid grid-cols-5 gap-2">
                          {qualities.map((quality) => (
                            <button
                              key={quality}
                              onClick={() => setSelectedQuality(quality)}
                              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                                selectedQuality === quality
                                  ? 'bg-[#6C5CE7] text-white'
                                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                              }`}
                            >
                              {quality}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Subtitle Settings */}
                      <div className="border-t border-[#2D3436] pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm text-gray-400">Subtitles</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={subtitleSettings.enabled}
                              onChange={(e) => setSubtitleSettings({...subtitleSettings, enabled: e.target.checked})}
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-[#6C5CE7] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6C5CE7]"></div>
                          </label>
                        </div>

                        {subtitleSettings.enabled && (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Language</label>
                              <select
                                value={subtitleSettings.language}
                                onChange={(e) => setSubtitleSettings({...subtitleSettings, language: e.target.value})}
                                className="w-full px-3 py-2 bg-white/5 border border-[#2D3436] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                              >
                                {languages.map(lang => (
                                  <option key={lang} value={lang}>{lang}</option>
                                ))}
                              </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Font Size</label>
                                <select
                                  value={subtitleSettings.fontSize}
                                  onChange={(e) => setSubtitleSettings({...subtitleSettings, fontSize: e.target.value})}
                                  className="w-full px-3 py-2 bg-white/5 border border-[#2D3436] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                                >
                                  {fontSizes.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Placement</label>
                                <select
                                  value={subtitleSettings.placement}
                                  onChange={(e) => setSubtitleSettings({...subtitleSettings, placement: e.target.value})}
                                  className="w-full px-3 py-2 bg-white/5 border border-[#2D3436] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                                >
                                  {placements.map(pos => (
                                    <option key={pos} value={pos}>{pos}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Background</label>
                                <select
                                  value={subtitleSettings.background}
                                  onChange={(e) => setSubtitleSettings({...subtitleSettings, background: e.target.value})}
                                  className="w-full px-3 py-2 bg-white/5 border border-[#2D3436] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                                >
                                  {backgrounds.map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Color</label>
                                <select
                                  value={subtitleSettings.color}
                                  onChange={(e) => setSubtitleSettings({...subtitleSettings, color: e.target.value})}
                                  className="w-full px-3 py-2 bg-white/5 border border-[#2D3436] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                                >
                                  {colors.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button 
                onClick={toggleFullscreen}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-[#6C5CE7] transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-6 h-6" />
                ) : (
                  <Maximize className="w-6 h-6" />
                )}
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

        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: #6C5CE7;
          border-radius: 50%;
          cursor: pointer;
        }

        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #6C5CE7;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
