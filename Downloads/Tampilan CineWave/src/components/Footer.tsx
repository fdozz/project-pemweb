import { Film, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: 'about' | 'browse' | 'pricing' | 'support' | 'help' | 'contact' | 'privacy' | 'terms') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0F1117] border-t border-[#2D3436] py-12">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6C5CE7] to-[#8E44AD] rounded-lg flex items-center justify-center">
                <Film className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] bg-clip-text text-transparent">
                CineWave
              </span>
            </div>
            <p className="text-[#B2B7C2] text-sm mb-4 max-w-md">
              Platform streaming all-in-one yang memberikan akses ke ribuan film dan series dari berbagai platform terbaik dunia. Nikmati pengalaman menonton tanpa batas.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-[#161921] hover:bg-[#1C1F27] border border-[#2D3436] hover:border-[#6C5CE7] rounded-lg flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-[#161921] hover:bg-[#1C1F27] border border-[#2D3436] hover:border-[#6C5CE7] rounded-lg flex items-center justify-center transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-[#161921] hover:bg-[#1C1F27] border border-[#2D3436] hover:border-[#6C5CE7] rounded-lg flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-[#161921] hover:bg-[#1C1F27] border border-[#2D3436] hover:border-[#6C5CE7] rounded-lg flex items-center justify-center transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[#B2B7C2] hover:text-white transition-colors" onClick={() => onNavigate?.('about')}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B2B7C2] hover:text-white transition-colors" onClick={() => onNavigate?.('browse')}>
                  Browse Content
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B2B7C2] hover:text-white transition-colors" onClick={() => onNavigate?.('pricing')}>
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B2B7C2] hover:text-white transition-colors" onClick={() => onNavigate?.('support')}>
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[#B2B7C2] hover:text-white transition-colors" onClick={() => onNavigate?.('help')}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B2B7C2] hover:text-white transition-colors" onClick={() => onNavigate?.('contact')}>
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B2B7C2] hover:text-white transition-colors" onClick={() => onNavigate?.('privacy')}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B2B7C2] hover:text-white transition-colors" onClick={() => onNavigate?.('terms')}>
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#2D3436] text-center">
          <p className="text-sm text-[#B2B7C2]">
            © 2025 CineWave. All rights reserved. Made with ❤️ for movie lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}