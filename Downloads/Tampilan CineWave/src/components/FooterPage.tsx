import { ArrowLeft } from 'lucide-react';

interface FooterPageProps {
  page: 'about' | 'browse' | 'pricing' | 'support' | 'help' | 'contact' | 'privacy' | 'terms';
  onBack: () => void;
}

export function FooterPage({ page, onBack }: FooterPageProps) {
  const getPageContent = () => {
    switch (page) {
      case 'about':
        return {
          title: 'About CineWave',
          content: (
            <>
              <p>CineWave is Indonesia's premier all-in-one streaming platform, bringing together the best content from Netflix, Disney+, HBO, Amazon Prime, and more into one seamless experience.</p>
              <h2>Our Mission</h2>
              <p>We believe entertainment should be accessible, affordable, and unified. No more juggling multiple subscriptions or searching across different platforms.</p>
              <h2>Our Story</h2>
              <p>Founded in 2024, CineWave emerged from a simple idea: why should viewers need 5+ subscriptions to watch their favorite content? We partnered with major streaming services to create the ultimate streaming hub.</p>
              <h2>What Makes Us Different</h2>
              <ul>
                <li>Unified search across all platforms</li>
                <li>Single subscription, unlimited access</li>
                <li>Smart recommendations based on your taste</li>
                <li>4K quality with Dolby Atmos</li>
                <li>Community features to connect with fellow movie lovers</li>
              </ul>
            </>
          )
        };
      case 'pricing':
        return {
          title: 'Pricing Plans',
          content: (
            <>
              <p>Choose the perfect plan for your entertainment needs. All plans include access to content from all our partner platforms.</p>
              <h2>Basic Plan - Rp 89,000/month</h2>
              <ul>
                <li>HD quality streaming</li>
                <li>Watch on 2 devices simultaneously</li>
                <li>Access to all content</li>
                <li>Limited downloads</li>
              </ul>
              <h2>Premium Plan - Rp 149,000/month</h2>
              <ul>
                <li>4K Ultra HD quality</li>
                <li>Watch on 4 devices simultaneously</li>
                <li>Dolby Atmos audio</li>
                <li>Unlimited downloads</li>
                <li>Early access to new releases</li>
              </ul>
              <h2>Family Plan - Rp 199,000/month</h2>
              <ul>
                <li>Everything in Premium</li>
                <li>Watch on 6 devices simultaneously</li>
                <li>6 individual profiles</li>
                <li>Parental controls</li>
                <li>Priority customer support</li>
              </ul>
            </>
          )
        };
      case 'support':
        return {
          title: 'Support',
          content: (
            <>
              <p>Need help? We're here 24/7 to assist you with any questions or issues.</p>
              <h2>Quick Support</h2>
              <p>Email: support@cinewave.com</p>
              <p>Phone: +62 21 1234 5678</p>
              <p>Live Chat: Available in app</p>
              <h2>Common Issues</h2>
              <ul>
                <li>Video quality problems - Check your internet connection</li>
                <li>Login issues - Try resetting your password</li>
                <li>Billing questions - Contact our billing team</li>
                <li>Technical support - Available 24/7</li>
              </ul>
            </>
          )
        };
      case 'help':
        return {
          title: 'Help Center',
          content: (
            <>
              <p>Find answers to frequently asked questions and learn how to make the most of CineWave.</p>
              <h2>Getting Started</h2>
              <ul>
                <li>How to create an account</li>
                <li>Choosing the right plan</li>
                <li>Setting up your profile</li>
                <li>Downloading content for offline viewing</li>
              </ul>
              <h2>Account Management</h2>
              <ul>
                <li>Updating payment information</li>
                <li>Changing your plan</li>
                <li>Managing family members</li>
                <li>Viewing watch history</li>
              </ul>
              <h2>Troubleshooting</h2>
              <ul>
                <li>Video playback issues</li>
                <li>Audio sync problems</li>
                <li>Subtitle settings</li>
                <li>App crashes or freezes</li>
              </ul>
            </>
          )
        };
      case 'contact':
        return {
          title: 'Contact Us',
          content: (
            <>
              <p>Get in touch with our team. We'd love to hear from you!</p>
              <h2>Customer Service</h2>
              <p>Email: hello@cinewave.com</p>
              <p>Phone: +62 21 1234 5678</p>
              <p>Hours: 24/7</p>
              <h2>Business Inquiries</h2>
              <p>Email: business@cinewave.com</p>
              <h2>Press & Media</h2>
              <p>Email: press@cinewave.com</p>
              <h2>Office Address</h2>
              <p>CineWave Indonesia</p>
              <p>Jl. Sudirman No. 123</p>
              <p>Jakarta Selatan 12345</p>
              <p>Indonesia</p>
            </>
          )
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          content: (
            <>
              <p>Last updated: December 2024</p>
              <h2>Information We Collect</h2>
              <p>We collect information you provide directly, including your name, email, payment details, and viewing preferences to enhance your experience.</p>
              <h2>How We Use Your Information</h2>
              <ul>
                <li>To provide and improve our services</li>
                <li>To personalize content recommendations</li>
                <li>To process payments securely</li>
                <li>To communicate updates and offers</li>
              </ul>
              <h2>Data Security</h2>
              <p>We use industry-standard encryption and security measures to protect your personal information.</p>
              <h2>Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data at any time.</p>
            </>
          )
        };
      case 'terms':
        return {
          title: 'Terms of Use',
          content: (
            <>
              <p>Last updated: December 2024</p>
              <h2>Acceptance of Terms</h2>
              <p>By accessing CineWave, you agree to these terms. If you don't agree, please don't use our service.</p>
              <h2>User Accounts</h2>
              <p>You're responsible for maintaining the security of your account and all activities under it.</p>
              <h2>Content Rights</h2>
              <p>All content on CineWave is protected by copyright. You may not reproduce, distribute, or modify any content without permission.</p>
              <h2>Prohibited Activities</h2>
              <ul>
                <li>Sharing your account with unauthorized users</li>
                <li>Using automated tools to access the service</li>
                <li>Attempting to bypass geographic restrictions</li>
                <li>Engaging in illegal or harmful activities</li>
              </ul>
              <h2>Termination</h2>
              <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
            </>
          )
        };
      default:
        return {
          title: 'Browse Content',
          content: (
            <>
              <p>Explore our extensive library of movies, series, documentaries, and more.</p>
              <h2>Categories</h2>
              <ul>
                <li>Action & Adventure</li>
                <li>Drama & Romance</li>
                <li>Comedy & Animation</li>
                <li>Sci-Fi & Fantasy</li>
                <li>Horror & Thriller</li>
                <li>Documentary & Reality</li>
                <li>Kids & Family</li>
                <li>Anime & Manga</li>
              </ul>
              <h2>Featured Collections</h2>
              <ul>
                <li>Award Winners</li>
                <li>Trending Now</li>
                <li>New Releases</li>
                <li>Critics' Choice</li>
              </ul>
            </>
          )
        };
    }
  };

  const { title, content } = getPageContent();

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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl mb-8">{title}</h1>
        <div className="text-[#B2B7C2] space-y-6">
          {content}
        </div>
      </div>
    </div>
  );
}