import { useState } from 'react';
import { Eye, EyeOff, Film } from 'lucide-react';

interface RegisterPageProps {
  onRegisterComplete: () => void;
  initialEmail?: string;
  onSwitchToLogin?: () => void;
}

export function RegisterPage({ onRegisterComplete, initialEmail = '', onSwitchToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: initialEmail,
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('cinewave_users') || '[]');
      const userExists = existingUsers.find((user: any) => user.email === formData.email);
      
      if (userExists) {
        setErrors({ email: 'Email sudah terdaftar. Silakan login.' });
        return;
      }
      
      // Save new user to array of users with password
      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password, // In real app, this would be hashed
        registeredAt: new Date().toISOString()
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('cinewave_users', JSON.stringify(existingUsers));
      
      // Set current user (without password for security)
      localStorage.setItem('cinewave_user', JSON.stringify({
        fullName: formData.fullName,
        email: formData.email
      }));
      
      onRegisterComplete();
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

      {/* Register Box */}
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
          <h2 className="text-2xl mb-2">Buat Akun Baru</h2>
          <p className="text-[#B2B7C2] mb-6">Mulai petualangan streaming tanpa batas</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#161921] border ${
                  errors.fullName ? 'border-red-500' : 'border-[#2D3436]'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent transition-all`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

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
                  placeholder="Minimal 6 karakter"
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#161921] border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-[#2D3436]'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent transition-all pr-12`}
                  placeholder="Ulangi password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B2B7C2] hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] hover:from-[#7D6EF0] hover:to-[#9F55BE] text-white rounded-xl transition-all duration-300 shadow-lg shadow-[#6C5CE7]/30 hover:shadow-[#6C5CE7]/50 hover:scale-[1.02]"
            >
              Daftar Sekarang
            </button>
          </form>

          {/* Terms */}
          <p className="text-xs text-[#B2B7C2] text-center mt-6">
            Dengan mendaftar, Anda menyetujui{' '}
            <a href="#" className="text-[#6C5CE7] hover:underline">
              Syarat & Ketentuan
            </a>{' '}
            dan{' '}
            <a href="#" className="text-[#6C5CE7] hover:underline">
              Kebijakan Privasi
            </a>
          </p>
        </div>

        {/* Already have account */}
        <p className="text-center mt-6 text-[#B2B7C2]">
          Sudah punya akun?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-[#6C5CE7] hover:underline"
          >
            Login di sini
          </button>
        </p>
      </div>
    </div>
  );
}