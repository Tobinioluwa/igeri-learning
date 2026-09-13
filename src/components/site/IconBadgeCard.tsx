import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const BADGE_COLORS = {
  green: 'bg-nigerian-green text-white',
  gold: 'bg-adire-gold text-earth-brown',
  coral: 'bg-accent text-white',
  sky: 'bg-sky-blue text-white',
  berry: 'bg-berry-pink text-white',
} as const;

interface IconBadgeCardProps {
  icon: LucideIcon;
  color?: keyof typeof BADGE_COLORS;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function IconBadgeCard({ icon: Icon, color = 'green', title, description, onClick, className }: IconBadgeCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'brut-card p-8 transition-transform',
        onClick && 'cursor-pointer hover:-translate-x-1 hover:-translate-y-1',
        className,
      )}
    >
      <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-6 brut-border', BADGE_COLORS[color])}>
        <Icon size={26} />
      </div>
      <h3 className="text-xl font-black text-earth-brown mb-3">{title}</h3>
      <p className="text-earth-brown/70 font-medium leading-relaxed mb-6">{description}</p>
      {onClick && (
        <span className="inline-flex items-center gap-1 text-sm font-black text-nigerian-green">
          Read More <ChevronRight size={16} />
        </span>
      )}
    </div>
  );
}
