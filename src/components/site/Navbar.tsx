import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_URL } from '@/lib/assets';

const DEFAULT_LINKS = [
  { name: 'How it works', path: '/how-it-works' },
  { name: 'Curriculum', path: '/curriculum' },
  { name: 'Safety', path: '/safety' },
  { name: 'For Schools', path: '/for-schools' },
];

interface NavbarProps {
  /** Inner pages just want a logo + a way back; the landing page wants the full link set + CTA. */
  variant?: 'full' | 'minimal';
  links?: { name: string; path: string }[];
}

export function Navbar({ variant = 'minimal', links = DEFAULT_LINKS }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <div className="relative z-30 container mx-auto px-4 md:px-6 pt-6">
      <nav className="pill-nav flex items-center justify-between gap-4 px-4 md:px-6 py-3">
        <div
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
          onClick={() => navigate('/')}
        >
          <div className="w-9 h-9 bg-nigerian-green/10 rounded-full flex items-center justify-center overflow-hidden">
            <img src={LOGO_URL} alt="Igeri AI logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-lg font-black text-earth-brown tracking-tight">IGERI AI</span>
        </div>

        {variant === 'full' && (
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="text-sm font-bold text-earth-brown/60 hover:text-nigerian-green transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate(variant === 'full' ? '/onboarding' : '/')}
          className="bg-earth-brown hover:bg-earth-brown/90 text-white text-sm font-black px-5 md:px-6 h-11 rounded-full kid-button shrink-0"
        >
          {variant === 'full' ? 'Get Started' : 'Back Home'}
        </button>
      </nav>
    </div>
  );
}
