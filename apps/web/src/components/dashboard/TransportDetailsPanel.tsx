import { type TransportOption } from '../../constants/transportationData';

interface TransportDetailsPanelProps {
  option: TransportOption | null;
  onNavigate: (pickupPointId: string) => void;
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

export function TransportDetailsPanel({ option, onNavigate }: TransportDetailsPanelProps) {
  if (!option) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-gray-400">
        Select a transit option from the list to view scheduling, pickup details, and interactive maps.
      </div>
    );
  }

  const emoji = CATEGORY_EMOJIS[option.type] || '📍';

  const getCrowdColor = (level: TransportOption['crowdLevel']) => {
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
    <div className="glass flex h-full flex-col justify-between overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0f]/60 p-6 shadow-2xl relative animate-fade-in">
      <div className="absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl" />
      
      <div>
        {/* Category Header */}
        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{emoji}</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                {option.type} Option
              </span>
              <h2 className="text-lg font-black text-white leading-tight mt-0.5">
                {option.name}
              </h2>
            </div>
          </div>
          
          <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
            option.isOpen 
              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]' 
              : 'bg-red-500/10 border-red-500/25 text-red-400'
          }`}>
            {option.isOpen ? 'Available' : 'Unavailable'}
          </span>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col items-center text-center">
            <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider">Est. Travel Time</span>
            <span className="text-xl font-black text-cyan-400 mt-1.5">{option.travelTime} mins</span>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col items-center text-center">
            <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider">Pricing / Fare</span>
            <span className="text-xl font-black text-white mt-1.5">{option.cost}</span>
          </div>
        </div>

        {/* Detailed Stats list */}
        <div className="flex flex-col gap-3 text-xs mb-6">
          {/* Crowd status */}
          {option.isOpen && (
            <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
              <span className="text-gray-400 font-medium">Crowd Density:</span>
              <span className={`font-black uppercase tracking-wide ${getCrowdColor(option.crowdLevel)}`}>
                {option.crowdLevel}
              </span>
            </div>
          )}

          {/* Departure Frequency */}
          <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Frequency:</span>
            <span className="text-white font-semibold">{option.departureFrequency}</span>
          </div>

          {/* Location details */}
          <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Pickup/Drop Location:</span>
            <span className="text-white font-semibold mt-0.5">{option.pickupPoint}</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Operating Hours:</span>
            <span className="text-white font-semibold mt-0.5">{option.operatingHours}</span>
          </div>

          {/* Accessibility Info */}
          <div className="flex flex-col gap-1.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 px-4 py-3.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <span>♿</span>
              <span>Accessibility Assistance</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-[11px] mt-0.5 font-medium">
              {option.accessibilitySupport}
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Transit Details:</span>
            <p className="text-gray-300 mt-1 leading-relaxed">{option.details}</p>
          </div>
        </div>
      </div>

      {/* Navigation Button */}
      {option.isOpen && (
        <button
          onClick={() => onNavigate(option.pickupPointId)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:brightness-110 active:scale-[0.98] mt-4"
        >
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25g7.5-9 7.5 9z" />
          </svg>
          Navigate to Pickup Point
        </button>
      )}
    </div>
  );
}
