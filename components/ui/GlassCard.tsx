import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'purple' | 'emerald' | 'none';
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className,
  glow = 'none',
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  const glowClasses = {
    cyan: 'glow-cyan border-[#00F0FF]/30',
    purple: 'glow-purple border-[#8B5CF6]/30',
    emerald: 'box-shadow-[0_0_25px_rgba(0,255,136,0.35)] border-[#00FF88]/30',
    none: '',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'glass-panel rounded-2xl p-6 transition-all duration-300',
          hoverEffect && 'glass-card-hover',
          glowClasses[glow],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
