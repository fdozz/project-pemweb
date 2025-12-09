import { useState, useEffect } from 'react';
import { ArrowRight, Tv, Brain, Play, Sparkles, Plus, Minus } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: (email: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Apa itu CineWave dan bagaimana cara kerjanya?',
    answer: 'CineWave adalah platform streaming all-in-one yang mengintegrasikan konten dari berbagai platform streaming populer (Netflix, Disney+, Prime Video, HBO Max, dll) dalam satu tempat. Anda cukup berlangganan CineWave untuk mengakses semua konten favorit Anda tanpa perlu berpindah aplikasi.',
  },
  {
    question: 'Platform streaming apa saja yang tersedia?',
    answer: 'CineWave menyediakan akses ke Netflix, Disney+, Amazon Prime Video, HBO Max, Apple TV+, Paramount+, dan berbagai platform streaming premium lainnya. Semua konten dapat diakses langsung dari dashboard CineWave Anda.',
  },
  {
    question: 'Apakah saya bisa membatalkan kapan saja?',
    answer: 'Ya! Anda dapat membatalkan langganan kapan saja tanpa biaya tambahan atau penalti. Tidak ada kontrak jangka panjang, dan Anda tetap bisa mengakses konten hingga akhir periode billing Anda.',
  },
  {
    question: 'Apakah semua film dan series tersedia dalam kualitas HD/4K?',
    answer: 'Kualitas streaming bergantung pada paket yang Anda pilih. Paket Basic mendukung hingga 720p, Standard hingga 1080p Full HD, dan Premium hingga 4K Ultra HD dengan HDR. Pastikan koneksi internet Anda memadai untuk kualitas terbaik.',
  },
  {
    question: 'Apakah data saya aman?',
    answer: 'Keamanan data Anda adalah prioritas kami. CineWave menggunakan enkripsi SSL/TLS untuk semua transaksi dan data pribadi. Kami tidak membagikan informasi Anda kepada pihak ketiga tanpa izin Anda.',
  },
  {
    question: 'Berapa harga setiap paket?',
    answer: 'CineWave menawarkan 3 paket: Basic (IDR 49.000/bulan) dengan 1 device dan kualitas 720p, Standard (IDR 89.000/bulan) dengan 2 devices dan Full HD, serta Premium (IDR 139.000/bulan) dengan 4 devices dan kualitas 4K HDR.',
  },
  {
    question: 'Apakah ada batasan perangkat?',
    answer: 'Jumlah perangkat yang dapat digunakan secara bersamaan tergantung paket Anda: Basic (1 device), Standard (2 devices), dan Premium (4 devices). Anda dapat login di berbagai perangkat, namun streaming bersamaan dibatasi sesuai paket.',
  },
];

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const heroImages = [
    'https://images.unsplash.com/photo-1739433437912-cca661ba902f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzY1MTcyODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1761044591339-d958277e7858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBlbnRlcnRhaW5tZW50fGVufDF8fHx8MTc2NTI2Njc0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1557343133-b5cf261ace6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXRmbGl4JTIwbW92aWUlMjBuaWdodHxlbnwxfHx8fDE3NjUyMDc3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1638961862991-bd7ee1c9ecfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcHJvZHVjdGlvbiUyMGNpbmVtYXRpY3xlbnwxfHx8fDE3NjUyNjY3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onGetStarted(email);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0F1117]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentImageIndex === index ? 1 : 0,
              }}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1117]/80 via-[#0F1117]/70 to-[#0F1117]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl mb-6 text-white">
            All Your Favorite Stories,<br />
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] bg-clip-text text-transparent">
              One Wave Away
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Ready to watch? Enter your email to create or restart your membership.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full sm:flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] transition-all"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] text-white rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-white">
            Here&apos;s What Makes <span className="text-[#6C5CE7]">CineWave</span> Different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#6C5CE7]/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Tv className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4 text-white">Everything in One Place</h3>
              <p className="text-gray-400">
                Nikmati semua film dan series dari berbagai platform tanpa berpindah aplikasi.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#6C5CE7]/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4 text-white">Smarter, Sharper Suggestions</h3>
              <p className="text-gray-400">
                Rekomendasi yang disesuaikan berdasarkan genre, mood, dan aktivitas menontonmu.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#6C5CE7]/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4 text-white">Continue from Where You Left</h3>
              <p className="text-gray-400">
                Lanjutkan tontonan terakhirmu di device mana pun, kapan pun.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#6C5CE7]/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4 text-white">Cinematic Streaming</h3>
              <p className="text-gray-400">
                Nikmati kualitas streaming mulai 720p sampai 4K HDR (tergantung plan).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F1117] to-[#0a0b0f]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-12 text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-[#6C5CE7]/50 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-xl text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFAQIndex === index ? (
                      <Minus className="w-6 h-6 text-[#6C5CE7]" />
                    ) : (
                      <Plus className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-400 text-lg">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA at bottom of FAQ */}
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-300 mb-6">
              Ready to start your journey with CineWave?
            </p>
            <button
              onClick={() => onGetStarted(email)}
              className="px-12 py-4 bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] text-white text-lg rounded-lg hover:scale-105 transition-transform"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            © 2025 CineWave. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}