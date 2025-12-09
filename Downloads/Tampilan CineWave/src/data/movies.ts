export interface Cast {
  id: number;
  name: string;
  character: string;
  photo: string;
}

export interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string[];
  rating: number;
  description: string;
  year: number;
  duration?: string;
  director?: string;
  cast?: Cast[];
  backdrop?: string;
}

const castPhotos = [
  'https://images.unsplash.com/photo-1758639842438-718755aa57e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  'https://images.unsplash.com/photo-1706824258534-c3740a1ae96b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  'https://images.unsplash.com/photo-1706824250412-42b8ba877abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  'https://images.unsplash.com/photo-1676810052606-a1664d2d5dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
];

export const moviesData: Record<string, Movie[]> = {
  trending: [
    {
      id: 1,
      title: 'Quantum Nexus',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Sci-Fi', 'Thriller', 'Action'],
      rating: 9.2,
      description: 'Dalam dunia dimana realitas virtual dan kenyataan menyatu, seorang hacker genius harus mengungkap konspirasi yang mengancam keberadaan manusia. Dengan teknologi neural interface terbaru, dia menemukan kebenaran yang mengejutkan tentang dunia yang selama ini dipercayanya.',
      year: 2024,
      duration: '2h 18m',
      director: 'Christopher Nolan',
      cast: [
        { id: 1, name: 'Alex Chen', character: 'Neo Hacker', photo: castPhotos[0] },
        { id: 2, name: 'Sarah Williams', character: 'Dr. Maya', photo: castPhotos[1] },
        { id: 3, name: 'Michael Jordan', character: 'Agent Black', photo: castPhotos[4] },
        { id: 4, name: 'Emma Stone', character: 'Lisa Parker', photo: castPhotos[2] },
        { id: 5, name: 'David Kim', character: 'Tech Specialist', photo: castPhotos[3] },
      ]
    },
    {
      id: 2,
      title: 'Shadow Protocol',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=1920&q=80',
      genre: ['Action', 'Spy', 'Drama'],
      rating: 8.8,
      description: 'Agen rahasia elit menghentikan organisasi kriminal internasional yang mengancam dunia. Dengan keterampilan combat yang luar biasa dan teknologi mata-mata tercanggih, dia harus menghadapi musuh yang selalu selangkah lebih maju.',
      year: 2024,
      duration: '2h 5m',
      director: 'Denis Villeneuve',
      cast: [
        { id: 6, name: 'James Ryan', character: 'Agent Shadow', photo: castPhotos[0] },
        { id: 7, name: 'Victoria Blake', character: 'Commander', photo: castPhotos[2] },
        { id: 8, name: 'Marcus Lee', character: 'Villain Boss', photo: castPhotos[4] },
        { id: 9, name: 'Sophie Turner', character: 'Tech Support', photo: castPhotos[1] },
      ]
    },
    {
      id: 3,
      title: 'The Last Expedition',
      image: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=1920&q=80',
      genre: ['Adventure', 'Mystery', 'Fantasy'],
      rating: 9.5,
      description: 'Petualangan epik menemukan peradaban kuno tersembunyi di jantung Amazon. Tim arkeolog menemukan artefak misterius yang membuka portal ke dunia yang telah lama hilang, penuh dengan keajaiban dan bahaya.',
      year: 2024,
      duration: '2h 32m',
      director: 'Steven Spielberg',
      cast: [
        { id: 10, name: 'Harrison Ford Jr.', character: 'Dr. Jack Stone', photo: castPhotos[4] },
        { id: 11, name: 'Alicia Vikander', character: 'Dr. Elena Cruz', photo: castPhotos[1] },
        { id: 12, name: 'Oscar Isaac', character: 'Guide Miguel', photo: castPhotos[0] },
        { id: 13, name: 'Zendaya Coleman', character: 'Young Explorer', photo: castPhotos[2] },
      ]
    },
    {
      id: 4,
      title: 'Crimson Dawn',
      image: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1599480189969-ae93eea51672?w=1920&q=80',
      genre: ['Thriller', 'Crime', 'Mystery'],
      rating: 8.6,
      description: 'Detektif brilian memburu serial killer misterius yang meninggalkan pesan tersembunyi. Setiap petunjuk membawa dia lebih dalam ke dalam permainan psikologis yang mengerikan dan mengungkap rahasia gelap masa lalunya.',
      year: 2023,
      duration: '2h 12m',
      director: 'David Fincher',
      cast: [
        { id: 14, name: 'Jake Gyllenhaal', character: 'Detective Miller', photo: castPhotos[0] },
        { id: 15, name: 'Rooney Mara', character: 'FBI Agent', photo: castPhotos[1] },
        { id: 16, name: 'Mark Ruffalo', character: 'Captain Hayes', photo: castPhotos[4] },
      ]
    },
    {
      id: 5,
      title: 'Realm of Legends',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=1920&q=80',
      genre: ['Fantasy', 'Epic', 'Adventure'],
      rating: 9.3,
      description: 'Pahlawan dari berbagai dimensi bersatu melawan kekuatan kegelapan yang mengancam semesta. Dalam pertempuran epik antara cahaya dan kegelapan, nasib seluruh realitas bergantung pada keberanian mereka.',
      year: 2024,
      duration: '2h 45m',
      director: 'Peter Jackson',
      cast: [
        { id: 17, name: 'Chris Hemsworth', character: 'Thor Magnus', photo: castPhotos[0] },
        { id: 18, name: 'Gal Gadot', character: 'Princess Aria', photo: castPhotos[2] },
        { id: 19, name: 'Idris Elba', character: 'King Eldric', photo: castPhotos[4] },
        { id: 20, name: 'Saoirse Ronan', character: 'Mage Luna', photo: castPhotos[1] },
      ]
    },
    {
      id: 6,
      title: 'Nightfall Chronicles',
      image: 'https://images.unsplash.com/photo-1724378435887-70b90bce60c0?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1724378435887-70b90bce60c0?w=1920&q=80',
      genre: ['Horror', 'Mystery', 'Thriller'],
      rating: 8.4,
      description: 'Investigasi supernatural mengerikan tentang kota yang penduduknya menghilang setiap malam. Seorang jurnalis berani mengungkap misteri gelap yang telah tersembunyi selama puluhan tahun.',
      year: 2023,
      duration: '1h 58m',
      director: 'James Wan',
      cast: [
        { id: 21, name: 'Vera Farmiga', character: 'Sarah Mitchell', photo: castPhotos[1] },
        { id: 22, name: 'Patrick Wilson', character: 'John Carter', photo: castPhotos[0] },
        { id: 23, name: 'Lupita Nyongo', character: 'Dr. Grace', photo: castPhotos[2] },
      ]
    }
  ],
  popular: [
    {
      id: 7,
      title: 'Eclipse Protocol',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Sci-Fi', 'Action', 'Drama'],
      rating: 8.9,
      description: 'Misi luar angkasa untuk menyelamatkan Bumi dari ancaman asteroid raksasa.',
      year: 2024,
      duration: '2h 15m',
      director: 'Alfonso Cuarón',
      cast: [
        { id: 24, name: 'Ryan Gosling', character: 'Commander Blake', photo: castPhotos[0] },
        { id: 25, name: 'Emily Blunt', character: 'Dr. Stevens', photo: castPhotos[1] },
        { id: 26, name: 'John Boyega', character: 'Pilot Jackson', photo: castPhotos[4] },
      ]
    },
    {
      id: 8,
      title: 'The Silent War',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=1920&q=80',
      genre: ['Thriller', 'War', 'Sci-Fi'],
      rating: 8.7,
      description: 'Perang modern tersembunyi dimana teknologi AI menjadi senjata paling mematikan.',
      year: 2023,
      duration: '2h 8m',
      director: 'Ridley Scott',
      cast: [
        { id: 27, name: 'Tom Hardy', character: 'Colonel Hunt', photo: castPhotos[0] },
        { id: 28, name: 'Charlize Theron', character: 'General Ross', photo: castPhotos[2] },
      ]
    },
    {
      id: 9,
      title: 'Love Under Stars',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=1920&q=80',
      genre: ['Romance', 'Drama', 'Comedy'],
      rating: 8.2,
      description: 'Kisah cinta yang terjalin di bawah langit malam penuh bintang dan takdir.',
      year: 2024,
      duration: '1h 52m',
      director: 'Richard Curtis',
      cast: [
        { id: 29, name: 'Timothée Chalamet', character: 'Daniel', photo: castPhotos[0] },
        { id: 30, name: 'Florence Pugh', character: 'Sophie', photo: castPhotos[1] },
      ]
    },
    {
      id: 10,
      title: 'Dragon\'s Gate',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=1920&q=80',
      genre: ['Fantasy', 'Action', 'Epic'],
      rating: 9.4,
      description: 'Portal dimensi terbuka dan membebaskan makhluk mitologi yang telah lama terkurung.',
      year: 2024,
      duration: '2h 28m',
      director: 'Guillermo del Toro',
      cast: [
        { id: 31, name: 'Henry Cavill', character: 'Warrior King', photo: castPhotos[0] },
        { id: 32, name: 'Anya Taylor-Joy', character: 'Dragon Keeper', photo: castPhotos[2] },
      ]
    },
    {
      id: 11,
      title: 'Comedy Central',
      image: 'https://images.unsplash.com/photo-1649446801521-61ea6333f4c9?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1649446801521-61ea6333f4c9?w=1920&q=80',
      genre: ['Comedy', 'Family', 'Drama'],
      rating: 7.8,
      description: 'Petualangan lucu keluarga yang penuh dengan kejutan dan tawa tak terduga.',
      year: 2023,
      duration: '1h 45m',
      director: 'Taika Waititi',
      cast: [
        { id: 33, name: 'Kevin Hart', character: 'Dad Mike', photo: castPhotos[0] },
        { id: 34, name: 'Awkwafina', character: 'Mom Lisa', photo: castPhotos[1] },
      ]
    },
    {
      id: 12,
      title: 'Anime Legends',
      image: 'https://images.unsplash.com/photo-1686397139785-a4ba627eb3e2?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1686397139785-a4ba627eb3e2?w=1920&q=80',
      genre: ['Anime', 'Action', 'Fantasy'],
      rating: 9.6,
      description: 'Petualangan epik seorang ninja muda yang bertekad menjadi hokage terkuat.',
      year: 2024,
      duration: '2h 10m',
      director: 'Makoto Shinkai',
      cast: [
        { id: 35, name: 'Voice Actor A', character: 'Hero Naruto', photo: castPhotos[0] },
        { id: 36, name: 'Voice Actor B', character: 'Sasuke', photo: castPhotos[4] },
      ]
    }
  ],
  newReleases: [
    {
      id: 13,
      title: 'Beyond The Horizon',
      image: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=1920&q=80',
      genre: ['Sci-Fi', 'Adventure', 'Mystery'],
      rating: 9.1,
      description: 'Ekspedisi ke planet baru yang menyimpan teknologi canggih untuk mengubah nasib manusia.',
      year: 2024,
      duration: '2h 22m',
      director: 'James Cameron',
      cast: [
        { id: 37, name: 'Sam Worthington', character: 'Captain Rex', photo: castPhotos[0] },
        { id: 38, name: 'Zoe Saldana', character: 'Scientist Navi', photo: castPhotos[2] },
      ]
    },
    {
      id: 14,
      title: 'Dark Secrets',
      image: 'https://images.unsplash.com/photo-1724378435887-70b90bce60c0?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1724378435887-70b90bce60c0?w=1920&q=80',
      genre: ['Horror', 'Thriller', 'Mystery'],
      rating: 8.5,
      description: 'Rahasia kelam terungkap di rumah tua yang terkutuk sejak ratusan tahun lalu.',
      year: 2024,
      duration: '1h 55m',
      director: 'Mike Flanagan',
      cast: [
        { id: 39, name: 'Jessica Chastain', character: 'Anna', photo: castPhotos[1] },
        { id: 40, name: 'Oscar Isaac', character: 'David', photo: castPhotos[0] },
      ]
    },
    {
      id: 15,
      title: 'Warrior\'s Path',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=1920&q=80',
      genre: ['Action', 'Drama', 'War'],
      rating: 8.9,
      description: 'Perjuangan seorang prajurit melawan invasi yang mengancam tanah kelahirannya.',
      year: 2024,
      duration: '2h 18m',
      director: 'Mel Gibson',
      cast: [
        { id: 41, name: 'Jason Momoa', character: 'General Khal', photo: castPhotos[0] },
        { id: 42, name: 'Rebecca Ferguson', character: 'Queen Mara', photo: castPhotos[1] },
      ]
    },
    {
      id: 16,
      title: 'Love in Tokyo',
      image: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?w=1920&q=80',
      genre: ['Romance', 'Drama', 'Comedy'],
      rating: 8.3,
      description: 'Pertemuan tak terduga di kota Tokyo yang mengubah hidup dua orang selamanya.',
      year: 2024,
      duration: '1h 48m',
      director: 'Sofia Coppola',
      cast: [
        { id: 43, name: 'Andrew Garfield', character: 'Matt', photo: castPhotos[0] },
        { id: 44, name: 'Hailee Steinfeld', character: 'Yuki', photo: castPhotos[2] },
      ]
    },
    {
      id: 17,
      title: 'Magic Kingdom',
      image: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1683858650446-be07d2573c84?w=1920&q=80',
      genre: ['Fantasy', 'Family', 'Adventure'],
      rating: 9.0,
      description: 'Kerajaan ajaib penuh sihir dimana setiap mimpi bisa menjadi kenyataan.',
      year: 2024,
      duration: '2h 5m',
      director: 'Jon Favreau',
      cast: [
        { id: 45, name: 'Tom Holland', character: 'Prince Arthur', photo: castPhotos[0] },
        { id: 46, name: 'Elle Fanning', character: 'Princess Ella', photo: castPhotos[1] },
      ]
    },
    {
      id: 18,
      title: 'Space Odyssey 2084',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Sci-Fi', 'Epic', 'Adventure'],
      rating: 9.7,
      description: 'Perjalanan luar angkasa paling ambisius untuk mencari kehidupan baru di galaksi jauh.',
      year: 2024,
      duration: '2h 55m',
      director: 'Christopher Nolan',
      cast: [
        { id: 47, name: 'Matthew McConaughey', character: 'Cooper', photo: castPhotos[0] },
        { id: 48, name: 'Anne Hathaway', character: 'Brand', photo: castPhotos[1] },
      ]
    }
  ],
  action: [
    {
      id: 19,
      title: 'Thunder Strike',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=1920&q=80',
      genre: ['Action', 'Adventure', 'Thriller'],
      rating: 8.4,
      description: 'Operasi militer berbahaya untuk menyelamatkan sandera dari tangan teroris.',
      year: 2023,
      duration: '2h 2m',
      director: 'Michael Bay',
      cast: [
        { id: 49, name: 'Dwayne Johnson', character: 'Sgt. Rock', photo: castPhotos[0] },
        { id: 50, name: 'Gal Gadot', character: 'Agent Storm', photo: castPhotos[2] },
      ]
    },
    {
      id: 20,
      title: 'Cyber Assault',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Action', 'Sci-Fi', 'Thriller'],
      rating: 8.6,
      description: 'Perang cyber futuristik yang menentukan masa depan teknologi dunia.',
      year: 2024,
      duration: '2h 12m',
      director: 'Wachowski Sisters',
      cast: [
        { id: 51, name: 'Keanu Reeves', character: 'Neo', photo: castPhotos[0] },
        { id: 52, name: 'Carrie-Anne Moss', character: 'Trinity', photo: castPhotos[1] },
      ]
    },
    {
      id: 21,
      title: 'Street Fighter',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=1920&q=80',
      genre: ['Action', 'Martial Arts', 'Drama'],
      rating: 8.1,
      description: 'Petarung jalanan terbaik bertanding dalam turnamen ilegal paling berbahaya.',
      year: 2023,
      duration: '1h 58m',
      director: 'Chad Stahelski',
      cast: [
        { id: 53, name: 'Scott Adkins', character: 'Ryu', photo: castPhotos[0] },
        { id: 54, name: 'Michelle Yeoh', character: 'Chun-Li', photo: castPhotos[2] },
      ]
    },
    {
      id: 22,
      title: 'Vengeance Road',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=1920&q=80',
      genre: ['Action', 'Crime', 'Thriller'],
      rating: 8.8,
      description: 'Pembalasan dendam yang membawa petualangan penuh aksi dan bahaya.',
      year: 2024,
      duration: '2h 15m',
      director: 'John Wick Team',
      cast: [
        { id: 55, name: 'Keanu Reeves', character: 'John', photo: castPhotos[0] },
        { id: 56, name: 'Halle Berry', character: 'Sofia', photo: castPhotos[1] },
      ]
    },
    {
      id: 23,
      title: 'Desert Storm',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=1920&q=80',
      genre: ['Action', 'War', 'Adventure'],
      rating: 8.5,
      description: 'Operasi militer di tengah padang pasir yang penuh dengan bahaya tak terduga.',
      year: 2023,
      duration: '2h 8m',
      director: 'Kathryn Bigelow',
      cast: [
        { id: 57, name: 'Jeremy Renner', character: 'Sgt. James', photo: castPhotos[0] },
        { id: 58, name: 'Anthony Mackie', character: 'Sgt. Sanborn', photo: castPhotos[4] },
      ]
    },
    {
      id: 24,
      title: 'Mercenary Force',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=1920&q=80',
      genre: ['Action', 'Adventure', 'War'],
      rating: 8.3,
      description: 'Pasukan bayaran elit menjalankan misi berbahaya di zona perang.',
      year: 2024,
      duration: '2h 10m',
      director: 'Sylvester Stallone',
      cast: [
        { id: 59, name: 'Jason Statham', character: 'Lee Christmas', photo: castPhotos[0] },
        { id: 60, name: 'Terry Crews', character: 'Hale Caesar', photo: castPhotos[4] },
      ]
    }
  ],
  scifi: [
    {
      id: 25,
      title: 'Interstellar Journey',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Sci-Fi', 'Adventure', 'Drama'],
      rating: 9.3,
      description: 'Perjalanan antar bintang mencari planet baru yang bisa dihuni manusia.',
      year: 2024,
      duration: '2h 49m',
      director: 'Christopher Nolan',
      cast: [
        { id: 61, name: 'Matthew McConaughey', character: 'Cooper', photo: castPhotos[0] },
        { id: 62, name: 'Jessica Chastain', character: 'Murphy', photo: castPhotos[1] },
      ]
    },
    {
      id: 26,
      title: 'AI Revolution',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Sci-Fi', 'Thriller', 'Drama'],
      rating: 8.9,
      description: 'Ketika AI menjadi lebih cerdas dari manusia dan mengambil alih kendali.',
      year: 2024,
      duration: '2h 18m',
      director: 'Alex Garland',
      cast: [
        { id: 63, name: 'Oscar Isaac', character: 'Nathan', photo: castPhotos[0] },
        { id: 64, name: 'Alicia Vikander', character: 'Ava', photo: castPhotos[1] },
      ]
    },
    {
      id: 27,
      title: 'Time Loop',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Sci-Fi', 'Mystery', 'Thriller'],
      rating: 9.0,
      description: 'Terjebak dalam lingkaran waktu yang sama, mencari cara untuk keluar.',
      year: 2023,
      duration: '1h 53m',
      director: 'Doug Liman',
      cast: [
        { id: 65, name: 'Tom Cruise', character: 'Cage', photo: castPhotos[0] },
        { id: 66, name: 'Emily Blunt', character: 'Rita', photo: castPhotos[1] },
      ]
    },
    {
      id: 28,
      title: 'Mars Colony',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Sci-Fi', 'Drama', 'Adventure'],
      rating: 8.7,
      description: 'Kehidupan koloni manusia pertama di planet Mars yang penuh tantangan.',
      year: 2024,
      duration: '2h 24m',
      director: 'Ridley Scott',
      cast: [
        { id: 67, name: 'Matt Damon', character: 'Mark Watney', photo: castPhotos[0] },
        { id: 68, name: 'Jessica Chastain', character: 'Commander Lewis', photo: castPhotos[1] },
      ]
    },
    {
      id: 29,
      title: 'Parallel Universe',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Sci-Fi', 'Fantasy', 'Mystery'],
      rating: 9.2,
      description: 'Penemuan portal ke alam semesta paralel yang mengubah segalanya.',
      year: 2024,
      duration: '2h 35m',
      director: 'Russo Brothers',
      cast: [
        { id: 69, name: 'Benedict Cumberbatch', character: 'Dr. Strange', photo: castPhotos[0] },
        { id: 70, name: 'Elizabeth Olsen', character: 'Wanda', photo: castPhotos[1] },
      ]
    },
    {
      id: 30,
      title: 'Robot Uprising',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=500&q=80',
      backdrop: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=1920&q=80',
      genre: ['Sci-Fi', 'Action', 'Thriller'],
      rating: 8.6,
      description: 'Pemberontakan robot yang mengancam kelangsungan hidup umat manusia.',
      year: 2023,
      duration: '2h 11m',
      director: 'James Cameron',
      cast: [
        { id: 71, name: 'Arnold Schwarzenegger', character: 'T-800', photo: castPhotos[0] },
        { id: 72, name: 'Linda Hamilton', character: 'Sarah Connor', photo: castPhotos[1] },
      ]
    }
  ]
};
