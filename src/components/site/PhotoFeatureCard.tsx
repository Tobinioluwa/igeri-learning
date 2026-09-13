import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ACCENT_COLORS = {
  green: 'bg-nigerian-green',
  gold: 'bg-adire-gold',
  coral: 'bg-accent',
  sky: 'bg-sky-blue',
  berry: 'bg-berry-pink',
} as const;

interface PhotoFeatureCardProps {
  image: string;
  /** CSS object-position value, so repeated source photos can show a different crop/focal point. */
  imagePosition?: string;
  accent?: keyof typeof ACCENT_COLORS;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function PhotoFeatureCard({
  image,
  imagePosition = 'center',
  accent = 'green',
  title,
  description,
  onClick,
  className,
}: PhotoFeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'brut-card overflow-hidden transition-transform',
        onClick && 'cursor-pointer hover:-translate-x-1 hover:-translate-y-1',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b-[3px] border-earth-brown">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <span className={cn('absolute top-3 left-3 w-4 h-4 rounded-full brut-border', ACCENT_COLORS[accent])} />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black text-earth-brown mb-2">{title}</h3>
        <p className="text-earth-brown/70 font-medium leading-relaxed text-sm">{description}</p>
        {onClick && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-nigerian-green">
            Read More <ChevronRight size={16} />
          </span>
        )}
      </div>
    </div>
  );
}
