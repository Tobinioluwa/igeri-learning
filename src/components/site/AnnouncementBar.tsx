import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AnnouncementBar() {
  const navigate = useNavigate();
  return (
    <div className="bg-earth-brown text-white text-center text-xs md:text-sm font-black py-2.5 px-4 border-b-[3px] border-earth-brown uppercase tracking-wide">
      Let's join new friends for a fresh learning adventure —{' '}
      <button onClick={() => navigate('/onboarding')} className="underline underline-offset-2 text-adire-gold">
        create a child profile
      </button>
    </div>
  );
}
