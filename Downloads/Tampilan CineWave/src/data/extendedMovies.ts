import { Movie, moviesData } from './movies';

// Add platform property to movies
export interface ExtendedMovie extends Movie {
  platform?: string[];
}

// Platform names
export const platforms = {
  netflix: 'Netflix',
  disney: 'Disney+',
  prime: 'Prime Video',
  hbo: 'HBO Max',
  apple: 'Apple TV+',
  paramount: 'Paramount+',
  hulu: 'Hulu',
};

// Generate extended movies with platform assignments
export const extendedMoviesData: Record<string, ExtendedMovie[]> = {
  // Keep existing categories and add platform info
  trending: moviesData.trending.map((movie, index) => ({
    ...movie,
    platform: index % 2 === 0 
      ? ['Netflix', 'Prime Video'] 
      : ['Disney+', 'HBO Max']
  })),
  
  popular: moviesData.popular.map((movie, index) => ({
    ...movie,
    platform: index % 3 === 0 
      ? ['Netflix'] 
      : index % 3 === 1 
      ? ['Disney+', 'Apple TV+'] 
      : ['Prime Video', 'Hulu']
  })),
  
  newReleases: moviesData.newReleases.map((movie, index) => ({
    ...movie,
    platform: index % 2 === 0 
      ? ['HBO Max', 'Paramount+'] 
      : ['Netflix', 'Apple TV+']
  })),
  
  action: moviesData.action.map((movie, index) => ({
    ...movie,
    platform: index % 2 === 0 
      ? ['Netflix', 'Prime Video'] 
      : ['HBO Max', 'Disney+']
  })),
  
  scifi: moviesData.scifi.map((movie, index) => ({
    ...movie,
    platform: index % 3 === 0 
      ? ['Netflix'] 
      : index % 3 === 1 
      ? ['Prime Video'] 
      : ['Disney+', 'Apple TV+']
  })),

  // New genre categories
  comedy: [
    {
      id: 101,
      title: 'Laugh Out Loud',
      image: 'https://images.unsplash.com/photo-1649446801521-61ea6333f4c9?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1649446801521-61ea6333f4c9?w=1920&q=80',
      genre: ['Comedy', 'Family'],
      rating: 8.2,
      description: 'Komedi keluarga yang penuh dengan momen-momen lucu dan menghangatkan hati.',
      year: 2024,
      duration: '1h 42m',
      platform: ['Netflix', 'Hulu']
    },
    {
      id: 102,
      title: 'Stand Up Special',
      image: 'https://images.unsplash.com/photo-1649446801521-61ea6333f4c9?w=500&q=80',
      genre: ['Comedy', 'Stand-up'],
      rating: 8.5,
      description: 'Pertunjukan stand-up comedy terbaik dari komedian ternama dunia.',
      year: 2024,
      duration: '1h 15m',
      platform: ['Netflix']
    },
    {
      id: 103,
      title: 'Funny Business',
      image: 'https://images.unsplash.com/photo-1649446801521-61ea6333f4c9?w=500&q=80',
      genre: ['Comedy', 'Drama'],
      rating: 7.9,
      description: 'Bisnis yang penuh dengan situasi konyol dan karakter eksentrik.',
      year: 2023,
      duration: '1h 38m',
      platform: ['Prime Video']
    },
    {
      id: 104,
      title: 'The Comedy Club',
      image: 'https://images.unsplash.com/photo-1649446801521-61ea6333f4c9?w=500&q=80',
      genre: ['Comedy'],
      rating: 8.1,
      description: 'Kehidupan di balik layar klub komedi terkenal di New York.',
      year: 2024,
      duration: '1h 45m',
      platform: ['HBO Max']
    },
    {
      id: 105,
      title: 'Romantic Comedy',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      genre: ['Comedy', 'Romance'],
      rating: 8.3,
      description: 'Kisah cinta yang penuh dengan kejadian lucu dan tidak terduga.',
      year: 2024,
      duration: '1h 52m',
      platform: ['Disney+']
    },
    {
      id: 106,
      title: 'Office Jokes',
      image: 'https://images.unsplash.com/photo-1649446801521-61ea6333f4c9?w=500&q=80',
      genre: ['Comedy', 'Drama'],
      rating: 8.4,
      description: 'Kehidupan kantor yang penuh dengan humor dan drama antar karyawan.',
      year: 2023,
      duration: '1h 40m',
      platform: ['Hulu', 'Prime Video']
    }
  ],

  romance: [
    {
      id: 201,
      title: 'Endless Love',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=1920&q=80',
      genre: ['Romance', 'Drama'],
      rating: 8.6,
      description: 'Kisah cinta yang melampaui waktu dan jarak dengan emosi yang mendalam.',
      year: 2024,
      duration: '2h 5m',
      platform: ['Netflix']
    },
    {
      id: 202,
      title: 'Parisian Romance',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      genre: ['Romance', 'Comedy'],
      rating: 8.1,
      description: 'Petualangan romantis di kota cinta, Paris.',
      year: 2024,
      duration: '1h 48m',
      platform: ['Prime Video', 'Apple TV+']
    },
    {
      id: 203,
      title: 'Second Chance',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      genre: ['Romance', 'Drama'],
      rating: 8.4,
      description: 'Kesempatan kedua untuk cinta yang pernah hilang bertahun-tahun lalu.',
      year: 2023,
      duration: '1h 55m',
      platform: ['HBO Max']
    },
    {
      id: 204,
      title: 'Summer Love',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      genre: ['Romance', 'Teen'],
      rating: 7.8,
      description: 'Kisah cinta musim panas yang membawa kenangan indah selamanya.',
      year: 2024,
      duration: '1h 42m',
      platform: ['Disney+']
    },
    {
      id: 205,
      title: 'Wedding Bells',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      genre: ['Romance', 'Comedy'],
      rating: 8.0,
      description: 'Kekacauan dan kebahagiaan dalam perjalanan menuju pernikahan impian.',
      year: 2024,
      duration: '1h 50m',
      platform: ['Hulu']
    },
    {
      id: 206,
      title: 'Eternal Promise',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      genre: ['Romance', 'Drama'],
      rating: 8.7,
      description: 'Janji cinta yang bertahan menghadapi segala rintangan hidup.',
      year: 2023,
      duration: '2h 8m',
      platform: ['Netflix', 'Paramount+']
    }
  ],

  thriller: [
    {
      id: 301,
      title: 'The Conspiracy',
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=1920&q=80',
      genre: ['Thriller', 'Mystery'],
      rating: 8.8,
      description: 'Konspirasi besar yang melibatkan pemerintah dan korporasi raksasa.',
      year: 2024,
      duration: '2h 15m',
      platform: ['Netflix', 'HBO Max']
    },
    {
      id: 302,
      title: 'Midnight Runner',
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=500&q=80',
      genre: ['Thriller', 'Action'],
      rating: 8.5,
      description: 'Pelarian menegangkan di tengah malam dari kejaran pembunuh bayaran.',
      year: 2024,
      duration: '1h 58m',
      platform: ['Prime Video']
    },
    {
      id: 303,
      title: 'Hidden Truth',
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=500&q=80',
      genre: ['Thriller', 'Mystery'],
      rating: 8.6,
      description: 'Kebenaran tersembunyi yang perlahan terungkap dengan konsekuensi mematikan.',
      year: 2023,
      duration: '2h 2m',
      platform: ['Apple TV+']
    },
    {
      id: 304,
      title: 'The Witness',
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=500&q=80',
      genre: ['Thriller', 'Crime'],
      rating: 8.3,
      description: 'Saksi kunci dalam kasus pembunuhan yang harus bertahan hidup.',
      year: 2024,
      duration: '1h 52m',
      platform: ['HBO Max']
    },
    {
      id: 305,
      title: 'Danger Zone',
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=500&q=80',
      genre: ['Thriller', 'Action'],
      rating: 8.4,
      description: 'Memasuki zona berbahaya dimana setiap langkah bisa berarti kematian.',
      year: 2024,
      duration: '2h 5m',
      platform: ['Netflix']
    },
    {
      id: 306,
      title: 'Psychological Game',
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=500&q=80',
      genre: ['Thriller', 'Psychological'],
      rating: 8.9,
      description: 'Permainan psikologis yang mempertanyakan realitas dan kewarasan.',
      year: 2023,
      duration: '2h 10m',
      platform: ['Prime Video', 'Hulu']
    }
  ],

  anime: [
    {
      id: 401,
      title: 'Dragon Warrior Saga',
      image: 'https://images.unsplash.com/photo-1686397139785-a4ba627eb3e2?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1686397139785-a4ba627eb3e2?w=1920&q=80',
      genre: ['Anime', 'Action', 'Fantasy'],
      rating: 9.4,
      description: 'Petualangan epik seorang prajurit naga yang mencari kristal legendaris.',
      year: 2024,
      duration: '2h 15m',
      platform: ['Netflix']
    },
    {
      id: 402,
      title: 'Ninja Chronicles',
      image: 'https://images.unsplash.com/photo-1686397139785-a4ba627eb3e2?w=500&q=80',
      genre: ['Anime', 'Action'],
      rating: 9.2,
      description: 'Kisah ninja muda yang berjuang menjadi yang terkuat di desanya.',
      year: 2024,
      duration: '2h 5m',
      platform: ['Netflix', 'Hulu']
    },
    {
      id: 403,
      title: 'Magic Academy',
      image: 'https://images.unsplash.com/photo-1686397139785-a4ba627eb3e2?w=500&q=80',
      genre: ['Anime', 'Fantasy', 'School'],
      rating: 8.9,
      description: 'Kehidupan di akademi sihir terbaik dimana siswa belajar menguasai magic.',
      year: 2023,
      duration: '1h 55m',
      platform: ['Prime Video']
    },
    {
      id: 404,
      title: 'Mecha Warriors',
      image: 'https://images.unsplash.com/photo-1686397139785-a4ba627eb3e2?w=500&q=80',
      genre: ['Anime', 'Sci-Fi', 'Action'],
      rating: 9.1,
      description: 'Pilot mecha elit melawan invasi alien yang mengancam Bumi.',
      year: 2024,
      duration: '2h 20m',
      platform: ['Disney+']
    },
    {
      id: 405,
      title: 'Slice of Life',
      image: 'https://images.unsplash.com/photo-1686397139785-a4ba627eb3e2?w=500&q=80',
      genre: ['Anime', 'Drama', 'Slice of Life'],
      rating: 8.7,
      description: 'Kehidupan sehari-hari yang penuh dengan momen-momen mengharukan.',
      year: 2024,
      duration: '1h 48m',
      platform: ['Apple TV+']
    },
    {
      id: 406,
      title: 'Demon Slayer Chronicles',
      image: 'https://images.unsplash.com/photo-1686397139785-a4ba627eb3e2?w=500&q=80',
      genre: ['Anime', 'Action', 'Dark Fantasy'],
      rating: 9.6,
      description: 'Pemburu iblis yang berjuang menyelamatkan umat manusia dari kegelapan.',
      year: 2024,
      duration: '2h 12m',
      platform: ['Netflix', 'HBO Max']
    }
  ],

  family: [
    {
      id: 501,
      title: 'Adventure Kids',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      genre: ['Family', 'Adventure', 'Comedy'],
      rating: 8.1,
      description: 'Petualangan seru sekelompok anak yang menemukan peta harta karun.',
      year: 2024,
      duration: '1h 38m',
      platform: ['Disney+']
    },
    {
      id: 502,
      title: 'Talking Animals',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      genre: ['Family', 'Animation', 'Comedy'],
      rating: 8.3,
      description: 'Dunia dimana hewan bisa bicara dan menjalani petualangan lucu.',
      year: 2024,
      duration: '1h 42m',
      platform: ['Disney+', 'Paramount+']
    },
    {
      id: 503,
      title: 'Magic School',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      genre: ['Family', 'Fantasy', 'Adventure'],
      rating: 8.5,
      description: 'Sekolah sihir untuk anak-anak dengan kekuatan magis istimewa.',
      year: 2023,
      duration: '1h 55m',
      platform: ['Netflix']
    },
    {
      id: 504,
      title: 'Super Family',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      genre: ['Family', 'Action', 'Comedy'],
      rating: 8.4,
      description: 'Keluarga dengan kekuatan super yang harus menyelamatkan dunia.',
      year: 2024,
      duration: '2h 2m',
      platform: ['Disney+']
    },
    {
      id: 505,
      title: 'Toy Story Legends',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      genre: ['Family', 'Animation', 'Adventure'],
      rating: 8.8,
      description: 'Mainan yang hidup dan menjalani petualangan epik saat anak pergi.',
      year: 2024,
      duration: '1h 48m',
      platform: ['Disney+']
    },
    {
      id: 506,
      title: 'Ocean Adventure',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      genre: ['Family', 'Animation', 'Adventure'],
      rating: 8.6,
      description: 'Petualangan di bawah laut yang penuh dengan makhluk laut menakjubkan.',
      year: 2023,
      duration: '1h 52m',
      platform: ['Disney+', 'Apple TV+']
    }
  ],

  documentary: [
    {
      id: 601,
      title: 'Nature Wonders',
      image: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=500&q=80',
      genre: ['Documentary', 'Nature'],
      rating: 9.1,
      description: 'Keajaiban alam yang menakjubkan dari seluruh penjuru dunia.',
      year: 2024,
      duration: '1h 28m',
      platform: ['Netflix', 'Apple TV+']
    },
    {
      id: 602,
      title: 'Space Exploration',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      genre: ['Documentary', 'Science'],
      rating: 9.3,
      description: 'Perjalanan eksplorasi luar angkasa dan penemuan-penemuan luar biasa.',
      year: 2024,
      duration: '1h 35m',
      platform: ['Prime Video']
    },
    {
      id: 603,
      title: 'Historical Mysteries',
      image: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=500&q=80',
      genre: ['Documentary', 'History'],
      rating: 8.8,
      description: 'Misteri sejarah yang belum terpecahkan dan teori konspirasi.',
      year: 2023,
      duration: '1h 42m',
      platform: ['HBO Max']
    },
    {
      id: 604,
      title: 'Ocean Deep',
      image: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=500&q=80',
      genre: ['Documentary', 'Nature'],
      rating: 9.2,
      description: 'Eksplorasi kehidupan di kedalaman samudra yang belum terjamah.',
      year: 2024,
      duration: '1h 32m',
      platform: ['Netflix']
    },
    {
      id: 605,
      title: 'Wildlife Chronicles',
      image: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=500&q=80',
      genre: ['Documentary', 'Nature'],
      rating: 9.0,
      description: 'Kehidupan satwa liar di habitat alami mereka.',
      year: 2024,
      duration: '1h 38m',
      platform: ['Disney+', 'Apple TV+']
    },
    {
      id: 606,
      title: 'Tech Revolution',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      genre: ['Documentary', 'Technology'],
      rating: 8.7,
      description: 'Revolusi teknologi yang mengubah cara hidup manusia modern.',
      year: 2023,
      duration: '1h 45m',
      platform: ['Prime Video', 'Hulu']
    }
  ],

  awardWinning: [
    {
      id: 701,
      title: 'The Masterpiece',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=1920&q=80',
      genre: ['Drama', 'Historical'],
      rating: 9.5,
      description: 'Karya masterpiece yang memenangkan berbagai penghargaan internasional.',
      year: 2023,
      duration: '2h 35m',
      platform: ['Netflix', 'HBO Max']
    },
    {
      id: 702,
      title: 'Critically Acclaimed Drama',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      genre: ['Drama'],
      rating: 9.3,
      description: 'Drama yang mendapat pujian dari kritikus film seluruh dunia.',
      year: 2024,
      duration: '2h 28m',
      platform: ['Prime Video']
    },
    {
      id: 703,
      title: 'Oscar Winner',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      genre: ['Drama', 'Biography'],
      rating: 9.4,
      description: 'Pemenang Oscar untuk Best Picture dan Best Director.',
      year: 2023,
      duration: '2h 42m',
      platform: ['Apple TV+']
    }
  ],

  top10: [
    {
      id: 801,
      title: '#1 Trending Today',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Action', 'Thriller'],
      rating: 9.6,
      description: 'Film paling trending hari ini di Indonesia.',
      year: 2024,
      duration: '2h 18m',
      platform: ['Netflix']
    },
    {
      id: 802,
      title: '#2 Most Watched',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=500&q=80',
      genre: ['Action', 'Sci-Fi'],
      rating: 9.4,
      description: 'Film dengan jumlah penonton terbanyak minggu ini.',
      year: 2024,
      duration: '2h 12m',
      platform: ['Prime Video']
    },
    {
      id: 803,
      title: '#3 Viral Sensation',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      genre: ['Fantasy', 'Adventure'],
      rating: 9.3,
      description: 'Film yang menjadi viral di social media.',
      year: 2024,
      duration: '2h 8m',
      platform: ['Disney+']
    }
  ],

  mystery: [
    {
      id: 901,
      title: 'The Enigma Code',
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=500&q=80',
      genre: ['Mystery', 'Thriller'],
      rating: 8.9,
      description: 'Teka-teki misterius yang harus dipecahkan sebelum terlambat.',
      year: 2024,
      duration: '2h 5m',
      platform: ['Netflix', 'HBO Max']
    },
    {
      id: 902,
      title: 'Unsolved Case',
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=500&q=80',
      genre: ['Mystery', 'Crime'],
      rating: 8.7,
      description: 'Kasus yang belum terpecahkan selama 20 tahun akhirnya terungkap.',
      year: 2023,
      duration: '1h 58m',
      platform: ['Prime Video']
    }
  ]
};

// Get movies by platform
export function getMoviesByPlatform(platformName: string): Record<string, ExtendedMovie[]> {
  const result: Record<string, ExtendedMovie[]> = {};
  
  for (const [category, movies] of Object.entries(extendedMoviesData)) {
    const filtered = movies.filter(movie => 
      movie.platform?.includes(platformName)
    );
    if (filtered.length > 0) {
      result[category] = filtered;
    }
  }
  
  return result;
}
