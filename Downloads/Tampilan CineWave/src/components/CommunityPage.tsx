import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, User, Image as ImageIcon, ArrowLeft, TrendingUp, Film } from 'lucide-react';

interface CommunityPageProps {
  onBack: () => void;
}

export function CommunityPage({ onBack }: CommunityPageProps) {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Anderson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        verified: true
      },
      timestamp: '2 jam yang lalu',
      content: 'Baru selesai marathon Quantum Nexus! Plot twist di episode terakhir bikin speechless 🤯 Siapa yang sudah nonton? Rating 10/10!',
      image: null,
      likes: 234,
      comments: 45,
      shares: 12,
      liked: false
    },
    {
      id: 2,
      user: {
        name: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=12',
        verified: false
      },
      timestamp: '4 jam yang lalu',
      content: 'Shadow Protocol adalah film action terbaik tahun ini! Choreography fight scene-nya luar biasa. Highly recommended! 🔥',
      image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?w=600&q=80',
      likes: 567,
      comments: 89,
      shares: 34,
      liked: true
    },
    {
      id: 3,
      user: {
        name: 'Lisa Martinez',
        avatar: 'https://i.pravatar.cc/150?img=5',
        verified: true
      },
      timestamp: '6 jam yang lalu',
      content: 'Looking for recommendations: Film fantasy epic mirip Realm of Legends? Drop your suggestions below! ⚔️✨',
      image: null,
      likes: 123,
      comments: 67,
      shares: 8,
      liked: false
    },
    {
      id: 4,
      user: {
        name: 'David Park',
        avatar: 'https://i.pravatar.cc/150?img=8',
        verified: false
      },
      timestamp: '8 jam yang lalu',
      content: 'Cinematography di The Last Expedition benar-benar masterpiece! Setiap frame bisa dijadikan wallpaper. Siapa sutradara favorit kalian? 🎬',
      image: 'https://images.unsplash.com/photo-1550622485-860e9d423364?w=600&q=80',
      likes: 445,
      comments: 52,
      shares: 21,
      liked: false
    },
    {
      id: 5,
      user: {
        name: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=9',
        verified: true
      },
      timestamp: '10 jam yang lalu',
      content: 'Just finished watching "Digital Dreams" dan wow... ending-nya unpredictable banget! Ada yang bisa jelasin teori kalian tentang scene terakhir? 🤔',
      image: null,
      likes: 892,
      comments: 156,
      shares: 43,
      liked: false
    },
    {
      id: 6,
      user: {
        name: 'Ryan Thompson',
        avatar: 'https://i.pravatar.cc/150?img=13',
        verified: false
      },
      timestamp: '12 jam yang lalu',
      content: 'Neon Nights soundtrack-nya bikin merinding! Composer-nya genius. Already added to my Spotify playlist 🎵',
      image: 'https://images.unsplash.com/photo-1574267432644-f610cab1aec9?w=600&q=80',
      likes: 334,
      comments: 28,
      shares: 15,
      liked: false
    },
    {
      id: 7,
      user: {
        name: 'Jessica Lee',
        avatar: 'https://i.pravatar.cc/150?img=3',
        verified: true
      },
      timestamp: '14 jam yang lalu',
      content: 'Hot take: Eclipse Chronicles season 2 lebih bagus dari season 1. Character development-nya insane! Who agrees? 🔥',
      image: null,
      likes: 678,
      comments: 234,
      shares: 56,
      liked: true
    },
    {
      id: 8,
      user: {
        name: 'Alex Kumar',
        avatar: 'https://i.pravatar.cc/150?img=14',
        verified: false
      },
      timestamp: '16 jam yang lalu',
      content: 'Baru nonton Storm Chasers dan visual effects-nya mind-blowing! Budget film ini pasti gede banget. Worth every penny! 💰',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
      likes: 445,
      comments: 67,
      shares: 23,
      liked: false
    },
    {
      id: 9,
      user: {
        name: 'Sophia Garcia',
        avatar: 'https://i.pravatar.cc/150?img=2',
        verified: true
      },
      timestamp: '18 jam yang lalu',
      content: 'Midnight City punya world-building terbaik yang pernah saya lihat di film sci-fi. Director-nya visioner! 🌃',
      image: null,
      likes: 756,
      comments: 98,
      shares: 45,
      liked: false
    },
    {
      id: 10,
      user: {
        name: 'James Wright',
        avatar: 'https://i.pravatar.cc/150?img=15',
        verified: false
      },
      timestamp: '20 jam yang lalu',
      content: 'The acting di "Broken Mirrors" deserves Oscar! Lead actor-nya deliver performance of a lifetime 🎭',
      image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80',
      likes: 923,
      comments: 134,
      shares: 67,
      liked: true
    },
    {
      id: 11,
      user: {
        name: 'Olivia Brown',
        avatar: 'https://i.pravatar.cc/150?img=4',
        verified: true
      },
      timestamp: '22 jam yang lalu',
      content: 'Quantum Paradox bikin otak gw mikir keras. Suka banget sama film yang challenging audience like this! 🧠',
      image: null,
      likes: 567,
      comments: 89,
      shares: 34,
      liked: false
    },
    {
      id: 12,
      user: {
        name: 'Daniel Kim',
        avatar: 'https://i.pravatar.cc/150?img=16',
        verified: false
      },
      timestamp: '1 hari yang lalu',
      content: 'Stellar Voyage adalah love letter untuk semua sci-fi fans. Referensi ke classic films-nya subtle tapi brilliant! 🚀',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80',
      likes: 445,
      comments: 56,
      shares: 29,
      liked: false
    },
    {
      id: 13,
      user: {
        name: 'Mia Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=6',
        verified: true
      },
      timestamp: '1 hari yang lalu',
      content: 'The chemistry antara leads di "Summer Romance" so natural! Best rom-com tahun ini hands down 💕',
      image: null,
      likes: 834,
      comments: 112,
      shares: 48,
      liked: true
    },
    {
      id: 14,
      user: {
        name: 'Chris Anderson',
        avatar: 'https://i.pravatar.cc/150?img=17',
        verified: false
      },
      timestamp: '1 hari yang lalu',
      content: 'Dark Horizons punya plot twists yang bener-bener unexpected. Every episode leaves me wanting more! 🎬',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80',
      likes: 678,
      comments: 145,
      shares: 52,
      liked: false
    },
    {
      id: 15,
      user: {
        name: 'Isabella Martinez',
        avatar: 'https://i.pravatar.cc/150?img=7',
        verified: true
      },
      timestamp: '1 hari yang lalu',
      content: 'Dokumenter "Ocean Depths" opened my eyes tentang marine life. Production quality Netflix-level! 🌊',
      image: null,
      likes: 456,
      comments: 73,
      shares: 38,
      liked: false
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleNewPost = () => {
    if (newPost.trim()) {
      const user = JSON.parse(localStorage.getItem('cinewave_user') || '{}');
      const post = {
        id: posts.length + 1,
        user: {
          name: user.fullName || 'User',
          avatar: 'https://i.pravatar.cc/150?img=20',
          verified: false
        },
        timestamp: 'Baru saja',
        content: newPost,
        image: null,
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLoadMore = () => {
    // Simulate loading more posts
    const newPosts = [
      {
        id: posts.length + 1,
        user: {
          name: 'New User ' + (posts.length + 1),
          avatar: `https://i.pravatar.cc/150?img=${(posts.length % 20) + 1}`,
          verified: Math.random() > 0.5
        },
        timestamp: '2 hari yang lalu',
        content: 'Just discovered this amazing movie! The storytelling is phenomenal 🎬',
        image: Math.random() > 0.6 ? 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80' : null,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 200),
        shares: Math.floor(Math.random() * 50),
        liked: false
      }
    ];
    setPosts([...posts, ...newPosts]);
  };

  return (
    <div className="min-h-screen bg-[#0F1117]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0F1117]/95 backdrop-blur-md border-b border-[#2D3436]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#B2B7C2] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-xl flex items-center justify-center">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl">Movie Community</h1>
              <p className="text-[#B2B7C2] text-sm">Join the conversation with fellow movie lovers</p>
            </div>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-[#161921] border border-[#2D3436] rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#6C5CE7]" />
            <h3 className="text-lg">Trending Topics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['#QuantumNexus', '#ShadowProtocol', '#RealmOfLegends', '#EclipseChronicles', '#DigitalDreams'].map((tag, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#6C5CE7] rounded-full text-sm transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* New Post Box */}
        <div className="bg-[#161921] border border-[#2D3436] rounded-2xl p-6 mb-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts about movies, series, or ask for recommendations..."
                className="w-full bg-[#1C1F27] border border-[#2D3436] rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
                rows={3}
              />
              <div className="flex items-center justify-between mt-3">
                <button className="p-2 text-[#B2B7C2] hover:text-white hover:bg-[#1C1F27] rounded-lg transition-all">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNewPost}
                  disabled={!newPost.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] hover:from-[#7D6EF0] hover:to-[#9F55BE] disabled:from-[#2D3436] disabled:to-[#2D3436] disabled:cursor-not-allowed rounded-lg transition-all"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#161921] border border-[#2D3436] rounded-2xl p-6 hover:border-[#6C5CE7]/30 transition-all"
            >
              {/* User Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{post.user.name}</span>
                      {post.user.verified && (
                        <div className="w-4 h-4 bg-[#6C5CE7] rounded-full flex items-center justify-center">
                          <span className="text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-[#B2B7C2]">{post.timestamp}</span>
                  </div>
                </div>
                <button className="p-2 text-[#B2B7C2] hover:text-white hover:bg-[#1C1F27] rounded-lg transition-all">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <p className="text-[#B2B7C2] mb-4 leading-relaxed">{post.content}</p>

              {/* Image if exists */}
              {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-[#2D3436]">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 hover:text-red-400 transition-colors ${
                    post.liked ? 'text-red-400' : 'text-[#B2B7C2]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.liked ? 'fill-red-400' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-[#B2B7C2] hover:text-[#6C5CE7] transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-[#B2B7C2] hover:text-[#6C5CE7] transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-[#161921] hover:bg-[#1C1F27] border border-[#2D3436] hover:border-[#6C5CE7] rounded-xl transition-all"
          >
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}
