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
    <nav className="relative z-30 bg-parchment border-b-[3px] border-earth-brown">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
          onClick={() => navigate('/')}
        >
          <div className="w-11 h-11 bg-adire-gold rounded-xl flex items-center justify-center overflow-hidden brut-border">
            <img src={LOGO_URL} alt="Igeri AI logo" className="w-7 h-7 object-contain" />
          </div>
          <span className="text-xl font-black text-earth-brown tracking-tight">IGERI AI</span>
        </div>

        {variant === 'full' && (
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="text-sm font-black text-earth-brown/70 hover:text-nigerian-green transition-colors uppercase tracking-wide"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate(variant === 'full' ? '/onboarding' : '/')}
          className="kid-button bg-nigerian-green text-white text-sm px-5 md:px-6 h-11 rounded-xl shrink-0"
        >
          {variant === 'full' ? 'Get Started' : 'Back Home'}
        </button>
      </div>
    </nav>
  );
}
