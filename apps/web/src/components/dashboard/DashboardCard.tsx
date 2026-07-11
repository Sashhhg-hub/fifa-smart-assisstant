import type { ReactNode } from 'react';

interface DashboardCardProps {
  title?: ReactNode;
  subtitle?: string;
  badge?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function DashboardCard({
  title,
  subtitle,
  badge,
  icon,
  children,
  className = '',
  onClick,
  hoverable = true,
}: DashboardCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
        hoverable ? 'hover:border-white/20 hover:bg-white/10' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Decorative subtle background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl" />
      
      {(title || subtitle || icon || badge) && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/10 to-blue-500/10 text-cyan-400">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}
      
      <div className="relative z-10">{children}</div>
    </div>
  );
}
