import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_URL } from '@/lib/assets';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { name: 'How it works', path: '/how-it-works' },
      { name: 'Curriculum', path: '/curriculum' },
      { name: 'For Schools', path: '/for-schools' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { name: 'Safety Center', path: '/safety-center' },
      { name: 'Privacy & Trust', path: '/safety' },
      { name: 'Parents Guide', path: '/parents-guide' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', path: '/about' },
      { name: 'Schools', path: '/schools' },
      { name: 'Contact', path: '/contact' },
    ],
  },
];

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-earth-brown text-white/70 border-t-[3px] border-earth-brown">
      <div className="ankara-border" />
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-adire-gold rounded-xl flex items-center justify-center border-[3px] border-white/20">
              <img src={LOGO_URL} alt="Igeri AI logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">IGERI AI</span>
          </div>
          <p className="text-sm font-medium max-w-xs leading-relaxed">
            AI for Nigerian kids that speaks our languages, honors our culture, and matches our curriculum.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-black uppercase tracking-widest text-adire-gold mb-4">{col.title}</p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm font-bold hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t-[3px] border-white/20 py-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <p className="text-center text-[11px] font-black uppercase tracking-widest text-white/40">
          © 2026 IGERI AI • NYSC Abuja
        </p>
        <button
          onClick={() => navigate('/admin/login')}
          className="text-[11px] font-black uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
        >
          Admin Login
        </button>
      </div>
    </footer>
  );
}
