import type { ReactNode } from 'react';
import { DashboardCard } from './DashboardCard';

export interface CardMetric {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

interface FoodCardProps {
  title: string;
  subtitle: string;
  emoji: string;
  rating?: number;
  priceRange?: string;
  statusBadge?: {
    text: string;
    type: 'success' | 'warning' | 'danger' | 'info' | 'default';
  };
  metrics: CardMetric[];
  tags?: string[];
  active?: boolean;
  onClick?: () => void;
}

export function FoodCard({
  title,
  subtitle,
  emoji,
  rating,
  priceRange,
  statusBadge,
  metrics,
  tags = [],
  active = false,
  onClick,
}: FoodCardProps) {
  // Helper to resolve badge styles
  const getBadgeClasses = (type: string = 'default') => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'warning':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'danger':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'info':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      default:
        return 'bg-white/5 text-gray-400 border-white/10';
    }
  };

  return (
    <DashboardCard
      onClick={onClick}
      hoverable={true}
      className={`border transition-all duration-300 ${
        active
          ? 'bg-gradient-to-br from-cyan-900/20 via-slate-900/40 to-purple-900/15 border-cyan-400/50 shadow-[0_0_25px_rgba(34,211,238,0.1)]'
          : 'border-white/5 bg-white/5 hover:border-white/20 hover:shadow-lg'
      }`}
    >
      <div className="flex flex-col gap-4">
        
        {/* Top details block */}
        <div className="flex items-start gap-3">
          {/* Logo / Emoji Indicator */}
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0a0f] border border-white/10 text-2xl shadow-inner transition-transform duration-300 ${
            active ? 'scale-105 border-cyan-400/30' : ''
          }`}>
            {emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="truncate text-sm font-bold text-white tracking-tight">{title}</h4>
              {priceRange && (
                <span className="text-[10px] font-black text-gray-500 tracking-wider shrink-0">
                  {priceRange}
                </span>
              )}
            </div>
            <p className="truncate text-xs text-gray-400 mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* Central Badges row */}
        {(rating !== undefined || statusBadge || tags.length > 0) && (
          <div className="flex flex-wrap items-center gap-1.5 border-t border-white/5 pt-3">
            {/* Rating */}
            {rating !== undefined && (
              <span className="inline-flex items-center gap-1 rounded bg-yellow-500/10 border border-yellow-500/25 px-1.5 py-0.5 text-[10px] font-black text-yellow-400">
                ⭐ {rating.toFixed(1)}
              </span>
            )}

            {/* Status Badge */}
            {statusBadge && (
              <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getBadgeClasses(statusBadge.type)}`}>
                {statusBadge.text}
              </span>
            )}

            {/* Tags */}
            {tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="inline-flex items-center rounded border border-white/5 bg-white/5 px-1.5 py-0.5 text-[9px] text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Metrics Grid */}
        {metrics.length > 0 && (
          <div className={`grid gap-2 border-t border-white/5 pt-3 ${
            metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
          }`}>
            {metrics.map((metric, i) => (
              <div key={i} className="flex flex-col rounded-lg bg-[#0a0a0f]/30 border border-white/5 p-2 text-center">
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                  {metric.label}
                </span>
                <span className="text-xs font-black text-white mt-1 leading-none">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardCard>
  );
}
