import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AnnouncementBar() {
  const navigate = useNavigate();
  return (
    <div className="bg-adire-gold text-earth-brown text-center text-xs md:text-sm font-bold py-2.5 px-4">
      Let's join new friends for a fresh learning adventure —{' '}
      <button onClick={() => navigate('/onboarding')} className="underline underline-offset-2 font-black">
        create a child profile
      </button>
    </div>
  );
}
