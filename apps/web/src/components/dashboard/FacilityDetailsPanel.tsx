import { type Facility } from '../../constants/facilityData';

interface FacilityDetailsPanelProps {
  facility: Facility | null;
  onNavigate: (id: string) => void;
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

export function FacilityDetailsPanel({ facility, onNavigate }: FacilityDetailsPanelProps) {
  if (!facility) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-gray-400">
        Select a facility from the list to view detailed information and directions.
      </div>
    );
  }

  const emoji = CATEGORY_EMOJIS[facility.category] || '📍';

  const getCrowdColor = (level: Facility['crowdLevel']) => {
    switch (level) {
      case 'Low':
        return 'text-green-400';
      case 'Moderate':
        return 'text-yellow-400';
      case 'Heavy':
        return 'text-red-400';
    }
  };

  return (
    <div className="glass flex h-full flex-col justify-between overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0f]/60 p-6 shadow-2xl relative">
      <div className="absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl" />
      
      <div>
        {/* Category Header */}
        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{emoji}</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                {facility.category}
              </span>
              <h2 className="text-lg font-black text-white leading-tight mt-0.5">
                {facility.name}
              </h2>
            </div>
          </div>
          
          <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
            facility.isOpen 
              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]' 
              : 'bg-red-500/10 border-red-500/25 text-red-400'
          }`}>
            {facility.isOpen ? 'Available' : 'Closed'}
          </span>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col items-center text-center">
            <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider">Distance</span>
            <span className="text-xl font-black text-white mt-1.5">{facility.distance} meters</span>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col items-center text-center">
            <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider">Est. Walking</span>
            <span className="text-xl font-black text-cyan-400 mt-1.5">{facility.walkingTime} min</span>
          </div>
        </div>

        {/* Detailed Stats list */}
        <div className="flex flex-col gap-3 text-xs mb-6">
          {/* Crowd status */}
          <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Crowd Density:</span>
            <span className={`font-black uppercase tracking-wide ${getCrowdColor(facility.crowdLevel)}`}>
              {facility.crowdLevel}
            </span>
          </div>

          {/* Location details */}
          <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Location Details:</span>
            <span className="text-white font-semibold mt-0.5">{facility.details}</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Opening Hours:</span>
            <span className="text-white font-semibold mt-0.5">{facility.openingHours}</span>
          </div>

          {/* Accessibility Info */}
          <div className="flex flex-col gap-1.5 rounded-xl bg-[#22d3ee]/5 border border-[#22d3ee]/10 px-4 py-3.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <span>♿</span>
              <span>Accessibility Information</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-[11px] mt-0.5 font-medium">
              {facility.accessibilityInfo}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Button */}
      <button
        onClick={() => onNavigate(facility.id)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:brightness-110 active:scale-[0.98] mt-4"
      >
        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25g7.5-9 7.5 9z" />
        </svg>
        Navigate To Facility
      </button>
    </div>
  );
}
