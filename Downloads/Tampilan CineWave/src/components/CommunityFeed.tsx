import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, User, Image as ImageIcon, ArrowLeft } from 'lucide-react';

interface CommunityFeedProps {
  onBack?: () => void;
  onLoadMore?: () => void;
}

export function CommunityFeed({ onBack, onLoadMore }: CommunityFeedProps) {
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
    }
  ]);

  const [newPost, setNewPost] = useState('');

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

  return (
    <div className={`${onBack ? 'min-h-screen' : ''} py-12 bg-[#0F1117]`}>
      {/* Header with back button if fullpage */}
      {onBack && (
        <div className="sticky top-0 z-50 bg-[#0F1117]/95 backdrop-blur-md border-b border-[#2D3436] mb-6">
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
      )}

      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl mb-6">Community Feed</h2>
        <p className="text-[#B2B7C2] mb-8">
          Bergabung dengan komunitas pecinta film. Share review, diskusi, dan rekomendasi!
        </p>

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
                placeholder="Apa yang ingin kamu share tentang film/series favorit?"
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
            onClick={onLoadMore}
            className="px-8 py-3 bg-[#161921] hover:bg-[#1C1F27] border border-[#2D3436] hover:border-[#6C5CE7] rounded-xl transition-all"
          >
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}