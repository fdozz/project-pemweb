import { useState } from 'react';
import { ArrowLeft, User, Clock, CreditCard, Settings, Edit2, Save, Eye } from 'lucide-react';
import { Movie } from '../data/movies';

interface ProfilePageProps {
  onBack: () => void;
  onPlayMovie: (movie: Movie) => void;
  onViewDetails: (movie: Movie) => void;
}

type ProfileTab = 'profile' | 'history' | 'billing' | 'settings';

export function ProfilePage({ onBack, onPlayMovie, onViewDetails }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Get user data
  const user = JSON.parse(localStorage.getItem('cinewave_user') || '{}');
  const plan = localStorage.getItem('cinewave_plan') || 'Basic';
  
  const [profileData, setProfileData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    phone: '+62 812-3456-7890',
    dateOfBirth: '01/01/1990',
    gender: 'Prefer not to say'
  });

  // Watch history from localStorage
  const watchHistory = JSON.parse(localStorage.getItem('cinewave_watch_history') || '[]');

  const handleSaveProfile = () => {
    // Save updated profile
    const updatedUser = {
      ...user,
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      dateOfBirth: profileData.dateOfBirth,
      gender: profileData.gender
    };
    
    localStorage.setItem('cinewave_user', JSON.stringify(updatedUser));
    
    // Update in users array too
    const users = JSON.parse(localStorage.getItem('cinewave_users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.email === user.email ? { ...u, fullName: profileData.fullName } : u
    );
    localStorage.setItem('cinewave_users', JSON.stringify(updatedUsers));
    
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'history', label: 'Watch History', icon: Clock },
    { id: 'billing', label: 'Account & Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#0F1117]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0F1117]/95 backdrop-blur-md border-b border-[#2D3436]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-xl transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl">Profile & Settings</h1>
              <p className="text-sm text-[#B2B7C2]">Kelola akun dan preferensi Anda</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#161921]/40 backdrop-blur-xl border border-[#2D3436]/50 rounded-2xl p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as ProfileTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] text-white'
                        : 'text-[#B2B7C2] hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* My Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-[#161921]/40 backdrop-blur-xl border border-[#2D3436]/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#6C5CE7] hover:bg-[#7D6EF0] rounded-xl transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    {isEditing && (
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm">
                        Change Photo
                      </button>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#B2B7C2] mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#0F1117] border border-[#2D3436] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#B2B7C2] mb-2">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#0F1117] border border-[#2D3436] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#B2B7C2] mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#0F1117] border border-[#2D3436] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#B2B7C2] mb-2">Date of Birth</label>
                      <input
                        type="text"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#0F1117] border border-[#2D3436] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] disabled:opacity-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm text-[#B2B7C2] mb-2">Gender</label>
                      <select
                        value={profileData.gender}
                        onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#0F1117] border border-[#2D3436] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] disabled:opacity-50"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Watch History Tab */}
            {activeTab === 'history' && (
              <div className="bg-[#161921]/40 backdrop-blur-xl border border-[#2D3436]/50 rounded-2xl p-6">
                <h2 className="text-xl mb-6">Watch History</h2>
                {watchHistory.length === 0 ? (
                  <div className="text-center py-12 text-[#B2B7C2]">
                    <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No watch history yet</p>
                    <p className="text-sm mt-2">Start watching to see your history here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {watchHistory.slice(0, 10).map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-[#0F1117] rounded-xl hover:bg-white/5 transition-all group cursor-pointer"
                        onClick={() => item.movie && onViewDetails(item.movie)}
                      >
                        <img
                          src={item.movie?.poster || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400'}
                          alt={item.movie?.title || 'Movie'}
                          className="w-20 h-28 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="group-hover:text-[#6C5CE7] transition-colors">{item.movie?.title || 'Unknown'}</h3>
                          <p className="text-sm text-[#B2B7C2] mt-1">{item.movie?.genre || 'Movie'}</p>
                          <p className="text-xs text-[#B2B7C2] mt-2">{item.watchedAt || 'Recently watched'}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            item.movie && onPlayMovie(item.movie);
                          }}
                          className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-[#6C5CE7] hover:bg-[#7D6EF0] rounded-xl transition-all"
                        >
                          Watch Again
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Account & Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                {/* Current Plan */}
                <div className="bg-[#161921]/40 backdrop-blur-xl border border-[#2D3436]/50 rounded-2xl p-6">
                  <h2 className="text-xl mb-4">Current Plan</h2>
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#6C5CE7]/20 to-[#8E44AD]/20 border border-[#6C5CE7]/30 rounded-xl">
                    <div>
                      <h3 className="text-2xl mb-1">{plan} Plan</h3>
                      <p className="text-[#B2B7C2]">
                        {plan === 'Basic' && 'IDR 49,000/month - 1080p Quality'}
                        {plan === 'Standard' && 'IDR 89,000/month - 4K Quality + 2 Devices'}
                        {plan === 'Premium' && 'IDR 139,000/month - 4K HDR + 4 Devices + Download'}
                      </p>
                    </div>
                    <button className="px-6 py-3 bg-[#6C5CE7] hover:bg-[#7D6EF0] rounded-xl transition-all">
                      Change Plan
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-[#161921]/40 backdrop-blur-xl border border-[#2D3436]/50 rounded-2xl p-6">
                  <h2 className="text-xl mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[#0F1117] rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                          <p>•••• •••• •••• 4242</p>
                          <p className="text-sm text-[#B2B7C2]">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-[#6C5CE7] hover:underline text-sm">Edit</button>
                    </div>
                    <button className="w-full py-3 border border-[#2D3436] hover:border-[#6C5CE7] rounded-xl transition-all">
                      + Add Payment Method
                    </button>
                  </div>
                </div>

                {/* Billing History */}
                <div className="bg-[#161921]/40 backdrop-blur-xl border border-[#2D3436]/50 rounded-2xl p-6">
                  <h2 className="text-xl mb-4">Billing History</h2>
                  <div className="space-y-3">
                    {[
                      { date: 'Dec 1, 2025', amount: 'IDR 89,000', status: 'Paid' },
                      { date: 'Nov 1, 2025', amount: 'IDR 89,000', status: 'Paid' },
                      { date: 'Oct 1, 2025', amount: 'IDR 89,000', status: 'Paid' },
                    ].map((bill, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#0F1117] rounded-xl">
                        <div>
                          <p>{bill.date}</p>
                          <p className="text-sm text-[#B2B7C2]">{bill.amount}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                            {bill.status}
                          </span>
                          <button className="text-[#6C5CE7] hover:underline text-sm flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Playback Settings */}
                <div className="bg-[#161921]/40 backdrop-blur-xl border border-[#2D3436]/50 rounded-2xl p-6">
                  <h2 className="text-xl mb-4">Playback Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Auto-play next episode</p>
                        <p className="text-sm text-[#B2B7C2]">Automatically play the next episode</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-[#6C5CE7] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6C5CE7]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Auto-play previews</p>
                        <p className="text-sm text-[#B2B7C2]">Play previews when browsing</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-[#6C5CE7] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6C5CE7]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-[#161921]/40 backdrop-blur-xl border border-[#2D3436]/50 rounded-2xl p-6">
                  <h2 className="text-xl mb-4">Notifications</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>New episodes</p>
                        <p className="text-sm text-[#B2B7C2]">Notify when new episodes are available</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-[#6C5CE7] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6C5CE7]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Recommendations</p>
                        <p className="text-sm text-[#B2B7C2]">Get personalized recommendations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-[#6C5CE7] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6C5CE7]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Privacy & Security */}
                <div className="bg-[#161921]/40 backdrop-blur-xl border border-[#2D3436]/50 rounded-2xl p-6">
                  <h2 className="text-xl mb-4">Privacy & Security</h2>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 bg-[#0F1117] hover:bg-white/5 rounded-xl transition-all">
                      Change Password
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-[#0F1117] hover:bg-white/5 rounded-xl transition-all">
                      Privacy Settings
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-[#0F1117] hover:bg-white/5 rounded-xl transition-all text-red-500">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
