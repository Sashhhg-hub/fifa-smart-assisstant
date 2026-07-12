import { type TransportOption } from '../../constants/transportationData';

interface TransportCardProps {
  option: TransportOption;
  isSelected: boolean;
  onClick: () => void;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  'Metro': '🚇',
  'Shuttle Bus': '🚐',
  'Public Bus': '🚌',
  'Taxi': '🚕',
  'Uber': '🚗',
  'Walking': '🚶‍♂️',
  'Cycling': '🚲',
  'Parking': '🅿️',
  'Ride Sharing': '🚘',
};

export function TransportCard({ option, isSelected, onClick }: TransportCardProps) {
  const emoji = CATEGORY_EMOJIS[option.type] || '📍';

  const getCrowdBadgeStyle = (level: TransportOption['crowdLevel']) => {
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
            {option.type}
          </span>
          <h3 className="truncate text-sm font-bold text-white transition-colors group-hover:text-cyan-300">
            {option.name}
          </h3>
          <span className="block truncate text-[10px] text-gray-400 mt-0.5">
            {option.pickupPoint}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>⏱️</span>
            <span className="text-[11px] font-medium text-gray-200">
              {option.travelTime} mins
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>💵</span>
            <span className="text-[11px] font-medium text-gray-200">
              {option.cost}
            </span>
          </div>
        </div>

        <div className="flex gap-1.5">
          {/* Status Badge */}
          <span className={`rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
            option.isOpen 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {option.isOpen ? 'Available' : 'Closed'}
          </span>

          {/* Crowd density status badge */}
          {option.isOpen && (
            <span className={`rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${getCrowdBadgeStyle(option.crowdLevel)}`}>
              {option.crowdLevel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
