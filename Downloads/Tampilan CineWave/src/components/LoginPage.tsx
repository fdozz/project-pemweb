import { useState } from 'react';
import { Eye, EyeOff, Film } from 'lucide-react';

interface LoginPageProps {
  onLoginComplete: () => void;
  onSwitchToRegister: () => void;
}

export function LoginPage({ onLoginComplete, onSwitchToRegister }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Check if user exists in users array
      const existingUsers = JSON.parse(localStorage.getItem('cinewave_users') || '[]');
      const user = existingUsers.find((u: any) => u.email === formData.email);
      
      if (!user) {
        setLoginError('Akun tidak ditemukan. Silakan daftar terlebih dahulu.');
        return;
      }
      
      // Validate password
      if (user.password !== formData.password) {
        setLoginError('Email atau password salah');
        return;
      }
      
      // Set current user (without password)
      localStorage.setItem('cinewave_user', JSON.stringify({
        fullName: user.fullName,
        email: user.email
      }));
      
      onLoginComplete();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1117]/95 via-[#0F1117]/90 to-[#6C5CE7]/20" />
      </div>

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-xl flex items-center justify-center shadow-lg shadow-[#6C5CE7]/50">
              <Film className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] bg-clip-text text-transparent">
              CineWave
            </h1>
          </div>
          <p className="text-[#B2B7C2]">All-in-One Streaming Access</p>
        </div>

        {/* Glass Card */}
        <div className="bg-[#161921]/40 backdrop-blur-xl border border-[#2D3436]/50 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl mb-2">Selamat Datang Kembali</h2>
          <p className="text-[#B2B7C2] mb-6">Login untuk melanjutkan streaming</p>

          {loginError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#161921] border ${
                  errors.email ? 'border-red-500' : 'border-[#2D3436]'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent transition-all`}
                placeholder="nama@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#161921] border ${
                    errors.password ? 'border-red-500' : 'border-[#2D3436]'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent transition-all pr-12`}
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B2B7C2] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-[#6C5CE7] hover:underline">
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] hover:from-[#7D6EF0] hover:to-[#9F55BE] text-white rounded-xl transition-all duration-300 shadow-lg shadow-[#6C5CE7]/30 hover:shadow-[#6C5CE7]/50 hover:scale-[1.02]"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2D3436]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#161921]/40 text-[#B2B7C2]">Atau lanjutkan dengan</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#161921] border border-[#2D3436] rounded-xl hover:border-[#6C5CE7] transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#161921] border border-[#2D3436] rounded-xl hover:border-[#6C5CE7] transition-all">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Create Account */}
        <p className="text-center mt-6 text-[#B2B7C2]">
          Belum punya akun?{' '}
          <button 
            onClick={onSwitchToRegister}
            className="text-[#6C5CE7] hover:underline"
          >
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
}