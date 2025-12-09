import { Check, X, Crown, Zap, Sparkles } from 'lucide-react';

interface PaymentPlanProps {
  onPlanSelected: () => void;
}

export function PaymentPlan({ onPlanSelected }: PaymentPlanProps) {
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '49.000',
      icon: Zap,
      gradient: 'from-blue-500 to-blue-600',
      popular: false,
      features: [
        { text: 'Streaming kualitas 720p', included: true },
        { text: 'Akses ke sebagian besar platform', included: true },
        { text: '1 device', included: true },
        { text: 'Bisa buat 1 profile', included: true },
        { text: 'Streaming 1080p/4K', included: false },
        { text: 'Akses film eksklusif', included: false },
        { text: 'Fitur download', included: false },
        { text: 'Ads muncul di beberapa konten', included: false, isWarning: true }
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '89.000',
      icon: Sparkles,
      gradient: 'from-[#6C5CE7] to-[#8E44AD]',
      popular: true,
      features: [
        { text: 'Streaming Full HD 1080p', included: true },
        { text: 'Akses ke seluruh platform', included: true },
        { text: '2 devices', included: true },
        { text: 'No Ads', included: true },
        { text: 'Bisa buat 3 profile', included: true },
        { text: 'Prioritas loading', included: true },
        { text: 'Streaming 4K', included: false },
        { text: 'Komunitas premium', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '139.000',
      icon: Crown,
      gradient: 'from-amber-500 to-orange-600',
      popular: false,
      features: [
        { text: '4K HDR streaming', included: true },
        { text: 'Akses semua platform lengkap', included: true },
        { text: '4 devices', included: true },
        { text: 'Bisa buat 5 profile', included: true },
        { text: 'No Ads', included: true },
        { text: 'Download access', included: true },
        { text: 'Komunitas premium (ranking, badges)', included: true },
        { text: 'Support 24/7', included: true }
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    localStorage.setItem('cinewave_plan', planId);
    onPlanSelected();
  };

  return (
    <div className="min-h-screen w-full bg-[#0F1117] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] bg-clip-text text-transparent">
            Pilih Paket Streaming Anda
          </h1>
          <p className="text-[#B2B7C2] text-lg">
            Akses ribuan film & series dari berbagai platform dalam satu tempat
          </p>
          <p className="text-[#B2B7C2] mt-2">
            <span className="text-white">✨ Semua paket dalam IDR (Rupiah)</span>
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative bg-[#161921] border ${
                  plan.popular ? 'border-[#6C5CE7] scale-105' : 'border-[#2D3436]'
                } rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  plan.popular ? 'shadow-lg shadow-[#6C5CE7]/20' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] text-white px-6 py-1 rounded-full text-sm shadow-lg">
                      Paling Populer
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6 pt-2">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-[#B2B7C2]">IDR</span>
                    <span className="text-4xl">
                      {plan.price}
                    </span>
                    <span className="text-[#B2B7C2]">/bulan</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="flex-shrink-0 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center mt-0.5">
                          <X className="w-3 h-3 text-red-500" />
                        </div>
                      )}
                      <span className={`text-sm ${
                        feature.included 
                          ? 'text-white' 
                          : feature.isWarning 
                          ? 'text-red-400' 
                          : 'text-[#B2B7C2] line-through'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] hover:from-[#7D6EF0] hover:to-[#9F55BE] text-white shadow-lg shadow-[#6C5CE7]/30 hover:shadow-[#6C5CE7]/50'
                      : 'bg-[#1C1F27] hover:bg-[#2D3436] text-white border border-[#2D3436] hover:border-[#6C5CE7]'
                  } hover:scale-105`}
                >
                  Pilih {plan.name}
                </button>
              </div>
            );
          })}
        </div>

        {/* Payment Info */}
        <div className="mt-12 text-center">
          <div className="bg-[#161921] border border-[#2D3436] rounded-2xl p-6 max-w-3xl mx-auto">
            <h3 className="text-xl mb-3">Metode Pembayaran</h3>
            <p className="text-[#B2B7C2] mb-4">
              Kami menerima berbagai metode pembayaran untuk kemudahan Anda
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="px-4 py-2 bg-[#1C1F27] rounded-lg text-sm">💳 Kartu Kredit/Debit</div>
              <div className="px-4 py-2 bg-[#1C1F27] rounded-lg text-sm">🏦 Transfer Bank</div>
              <div className="px-4 py-2 bg-[#1C1F27] rounded-lg text-sm">📱 E-Wallet (GoPay, OVO, DANA)</div>
              <div className="px-4 py-2 bg-[#1C1F27] rounded-lg text-sm">🏪 Indomaret/Alfamart</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 text-center text-[#B2B7C2]">
          <p>
            Punya pertanyaan?{' '}
            <a href="#" className="text-[#6C5CE7] hover:underline">
              Hubungi Customer Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
