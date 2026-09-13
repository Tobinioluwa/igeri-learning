import React from 'react';
import { cn } from '@/lib/utils';

const PALETTE = [
  'from-nigerian-green to-emerald-400',
  'from-adire-gold to-amber-400',
  'from-orange-400 to-rose-400',
  'from-sky-400 to-blue-500',
  'from-purple-400 to-fuchsia-400',
];

/**
 * A friendly, illustrated stand-in for a profile photo. We deliberately never
 * show real stranger photos (e.g. random face-photo placeholder services) on
 * a children's product — this renders a colorful initial bubble instead.
 */
export function AvatarBubble({
  name,
  size = 40,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || '🌟';
  const paletteIndex = name
    ? name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % PALETTE.length
    : 0;

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-black text-white shrink-0 bg-gradient-to-br',
        PALETTE[paletteIndex],
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}
