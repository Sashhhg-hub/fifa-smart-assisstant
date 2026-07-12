import { type Facility } from '../../constants/facilityData';

interface FacilityCardProps {
  facility: Facility;
  isSelected: boolean;
  onClick: () => void;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  'Washrooms': '🚻',
  'Accessible Washrooms': '♿',
  'ATMs': '💵',
  'Water Stations': '💧',
  'Charging Stations': '🔌',
  'Information Desk': 'ℹ️',
  'First Aid Center': '🏥',
  'Prayer Room': '🙏',
  'Merchandise Store': '🛍️',
  'Baby Care Room': '👶',
  'Smoking Zone': '🚬',
  'Lost & Found Counter': '🔍',
};

export function FacilityCard({ facility, isSelected, onClick }: FacilityCardProps) {
  const emoji = CATEGORY_EMOJIS[facility.category] || '📍';

  const getCrowdBadgeStyle = (level: Facility['crowdLevel']) => {
    switch (level) {
      case 'Low':
        return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'Moderate':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'Heavy':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`glass group relative cursor-pointer rounded-2xl border p-4.5 transition-all duration-300 hover:scale-[1.01] ${
        isSelected
          ? 'bg-gradient-to-br from-cyan-950/20 to-slate-900/40 border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
          : 'border-white/5 bg-[#12121e]/20 hover:border-white/15 hover:bg-[#12121e]/40'
      }`}
    >
      {/* Selection Glow Accent */}
      {isSelected && (
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
      )}

      {/* Header Info */}
      <div className="mb-3.5 flex items-start gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
          isSelected 
            ? 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-400' 
            : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'
        }`}>
          <span className="text-xl">{emoji}</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            {facility.category}
          </span>
          <h3 className="truncate text-sm font-bold text-white transition-colors group-hover:text-cyan-300">
            {facility.name}
          </h3>
          <span className="block truncate text-[10px] text-gray-400 mt-0.5">
            {facility.details}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>🏃‍♂️</span>
            <span className="text-[11px] font-medium text-gray-200">
              {facility.walkingTime} min
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>📍</span>
            <span className="text-[11px] font-medium text-gray-200">
              {facility.distance}m
            </span>
          </div>
        </div>

        <div className="flex gap-1.5">
          {/* Availability Status Badge */}
          <span className={`rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
            facility.isOpen 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-gray-500/10 border-white/10 text-gray-400'
          }`}>
            {facility.isOpen ? 'Open' : 'Closed'}
          </span>

          {/* Crowd density status badge */}
          <span className={`rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${getCrowdBadgeStyle(facility.crowdLevel)}`}>
            {facility.crowdLevel}
          </span>
        </div>
      </div>
    </div>
  );
}
