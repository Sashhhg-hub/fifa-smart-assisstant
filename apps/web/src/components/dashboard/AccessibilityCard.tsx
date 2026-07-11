import { DashboardCard } from './DashboardCard';

interface AccessibilityCardProps {
  name: string;
  emoji: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

export function AccessibilityCard({ name, emoji, description, active, onClick }: AccessibilityCardProps) {
  return (
    <DashboardCard
      onClick={onClick}
      hoverable={true}
      className={`border transition-all duration-300 ${
        active
          ? 'bg-gradient-to-br from-cyan-900/20 via-slate-900/40 to-blue-900/20 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.15)] scale-[1.01]'
          : 'border-white/5 bg-white/5 hover:border-white/20 hover:shadow-lg'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Animated Icon Container */}
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0a0a0f] border border-white/10 text-3xl shadow-inner transition-transform duration-300 ${
          active ? 'scale-105 border-cyan-400/30' : ''
        }`}>
          <span className={active ? 'animate-pulse' : ''}>{emoji}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white tracking-tight leading-tight">
            {name}
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
            {description}
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
