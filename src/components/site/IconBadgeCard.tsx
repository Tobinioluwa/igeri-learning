import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const BADGE_COLORS = {
  green: 'bg-nigerian-green text-white',
  gold: 'bg-adire-gold text-white',
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
        'bg-white p-8 rounded-[2rem] shadow-kid hover:shadow-kid-hover hover:-translate-y-1 transition-all',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-6', BADGE_COLORS[color])}>
        <Icon size={26} />
      </div>
      <h3 className="text-xl font-black text-earth-brown mb-3">{title}</h3>
      <p className="text-earth-brown/60 font-medium leading-relaxed mb-6">{description}</p>
      {onClick && (
        <span className="inline-flex items-center gap-1 text-sm font-black text-nigerian-green">
          Read More <ChevronRight size={16} />
        </span>
      )}
    </div>
  );
}
