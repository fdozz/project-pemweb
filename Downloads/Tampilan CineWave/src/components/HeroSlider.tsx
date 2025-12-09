import { useState, useEffect } from 'react';
import { Play, Info, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface HeroSliderProps {
  onPlayMovie?: (movieId: number) => void;
  onViewDetails?: (movieId: number) => void;
}

export function HeroSlider({ onPlayMovie, onViewDetails }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const movies = [
    {
      id: 1,
      title: 'Quantum Nexus',
      description: 'Dalam dunia dimana realitas virtual dan kenyataan menyatu, seorang hacker genius harus mengungkap konspirasi yang mengancam seluruh umat manusia.',
      genre: ['Sci-Fi', 'Thriller', 'Action'],
      rating: 9.2,
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Shadow Protocol',
      description: 'Agen rahasia elit harus menghentikan organisasi kriminal internasional sebelum mereka meluncurkan serangan cyber terbesar dalam sejarah.',
      genre: ['Action', 'Spy', 'Drama'],
      rating: 8.8,
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=1920&q=80',
      trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 3,
      title: 'The Last Expedition',
      description: 'Petualangan epik tim penjelajah yang menemukan peradaban kuno tersembunyi di jantung Amazon yang menyimpan rahasia kekuatan kosmis.',
      genre: ['Adventure', 'Mystery', 'Fantasy'],
      rating: 9.5,
      image: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=1920&q=80',
      trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Crimson Dawn',
      description: 'Kisah kelam detektif brilian yang memburu serial killer misterius yang meninggalkan pesan tersembunyi di setiap TKP.',
      genre: ['Thriller', 'Crime', 'Mystery'],
      rating: 8.6,
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=1920&q=80',
      trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 5,
      title: 'Realm of Legends',
      description: 'Dunia fantasi epik dimana para pahlawan dari berbagai dimensi bersatu untuk melawan kekuatan kegelapan yang mengancam semesta.',
      genre: ['Fantasy', 'Epic', 'Adventure'],
      rating: 9.3,
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=1920&q=80',
      trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 6,
      title: 'Eclipse Protocol',
      description: 'Misi luar angkasa berbahaya untuk menyelamatkan Bumi dari ancaman asteroid raksasa yang akan menghantam dalam 48 jam.',
      genre: ['Sci-Fi', 'Action', 'Drama'],
      rating: 8.9,
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 7,
      title: 'The Silent War',
      description: 'Perang modern yang tersembunyi di balik layar politik dunia, dimana teknologi AI menjadi senjata paling mematikan.',
      genre: ['Thriller', 'War', 'Sci-Fi'],
      rating: 8.7,
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=1920&q=80',
      trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 8,
      title: 'Beyond The Horizon',
      description: 'Ekspedisi berani ke planet baru yang menyimpan kehidupan alien dan teknologi canggih yang akan mengubah nasib umat manusia.',
      genre: ['Sci-Fi', 'Adventure', 'Mystery'],
      rating: 9.1,
      image: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=1920&q=80',
      trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 9,
      title: 'Nightfall Chronicles',
      description: 'Investigasi supernatural mengerikan tentang kota terpencil yang penduduknya menghilang satu per satu setiap malam bulan purnama.',
      genre: ['Horror', 'Mystery', 'Thriller'],
      rating: 8.4,
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=1920&q=80',
      trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 10,
      title: 'Dragon\'s Gate',
      description: 'Legenda kuno yang menjadi kenyataan ketika portal dimensi terbuka dan membebaskan makhluk mitologi yang telah lama terkurung.',
      genre: ['Fantasy', 'Action', 'Epic'],
      rating: 9.4,
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=1920&q=80',
      trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const currentMovie = movies[currentSlide];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, movies.length]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Movie Backgrounds */}
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.image})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117] via-[#0F1117]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full max-w-[1920px] mx-auto px-6 flex items-center">
        <div className="max-w-2xl space-y-6">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl leading-tight">
            {currentMovie.title}
          </h1>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2">
            {currentMovie.genre.map((g) => (
              <span
                key={g}
                className="px-3 py-1 bg-[#161921]/80 backdrop-blur-sm border border-[#2D3436] rounded-full text-sm"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#6C5CE7]/20 px-3 py-1 rounded-lg">
              <span className="text-[#6C5CE7]">★</span>
              <span className="text-sm">{currentMovie.rating}/10</span>
            </div>
            <span className="text-[#B2B7C2] text-sm">IMDb Rating</span>
          </div>

          {/* Description */}
          <p className="text-lg text-[#B2B7C2] leading-relaxed">
            {currentMovie.description}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] hover:from-[#7D6EF0] hover:to-[#9F55BE] rounded-xl transition-all duration-300 shadow-lg shadow-[#6C5CE7]/30 hover:shadow-[#6C5CE7]/50 hover:scale-105"
              onClick={() => onPlayMovie?.(currentMovie.id)}
            >
              <Play className="w-5 h-5" fill="white" />
              Watch Now
            </button>
            <button
              className="flex items-center gap-2 px-8 py-3 bg-[#161921]/80 backdrop-blur-sm hover:bg-[#1C1F27] border border-[#2D3436] hover:border-[#6C5CE7] rounded-xl transition-all duration-300 hover:scale-105"
              onClick={() => onViewDetails?.(currentMovie.id)}
            >
              <Info className="w-5 h-5" />
              Details
            </button>
          </div>

          {/* Mute/Unmute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-2 px-4 py-2 bg-[#161921]/60 backdrop-blur-sm border border-[#2D3436] rounded-lg hover:bg-[#1C1F27] transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#161921]/80 backdrop-blur-sm hover:bg-[#1C1F27] border border-[#2D3436] rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#161921]/80 backdrop-blur-sm hover:bg-[#1C1F27] border border-[#2D3436] rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlay(false);
              setCurrentSlide(index);
            }}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-[#6C5CE7]' 
                : 'w-4 bg-[#B2B7C2]/50 hover:bg-[#B2B7C2]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}