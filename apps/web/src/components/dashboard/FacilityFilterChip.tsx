interface FacilityFilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
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

export function FacilityFilterChip({ label, active, onClick, count }: FacilityFilterChipProps) {
  const emoji = CATEGORY_EMOJIS[label] || '📍';
  
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border-cyan-400/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
          : 'border-white/5 bg-[#12121e]/40 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
      }`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
      {count !== undefined && (
        <span className={`inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full text-[9px] font-black px-1.5 ${
          active ? 'bg-cyan-400 text-[#0a0a0f]' : 'bg-white/10 text-gray-400'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}
