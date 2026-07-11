interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

export function FilterChip({ label, active, onClick, count }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border-cyan-400/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
          : 'border-white/5 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className={`inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full text-[9px] font-black px-1 ${
          active ? 'bg-cyan-400 text-[#0a0a0f]' : 'bg-white/10 text-gray-400'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}
