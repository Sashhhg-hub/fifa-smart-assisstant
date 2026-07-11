import { type EmergencyCategory } from '../../hooks/useEmergency';

interface EmergencyStatusPanelProps {
  category: EmergencyCategory;
  isSubmitting: boolean;
  isDispatched: boolean;
  ticketNumber: string | null;
  countdownSeconds: number | null;
  onRequestAssistance: () => void;
  onCancelRequest: () => void;
}

export function EmergencyStatusPanel({
  category,
  isSubmitting,
  isDispatched,
  ticketNumber,
  countdownSeconds,
  onRequestAssistance,
  onCancelRequest,
}: EmergencyStatusPanelProps) {
  
  // Format MM:SS for countdown timer
  const formatTime = (totalSeconds: number | null): string => {
    if (totalSeconds === null || totalSeconds < 0) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0d12]/80 to-[#181015]/80 p-6 shadow-xl backdrop-blur-xl">
      {/* Visual warning backdrop glow for emergency context */}
      <div className={`absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
        isDispatched ? 'bg-rose-500/10' : 'bg-cyan-500/5'
      }`} />

      {/* 1. SUBMITTING/LOADING STATE */}
      {isSubmitting && (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
          {/* Pulsing loading rings */}
          <div className="relative flex h-20 w-20 items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 animate-ping" />
            <div className="absolute h-14 w-14 rounded-full border-4 border-t-rose-500 border-r-rose-500 border-b-transparent border-l-transparent animate-spin" />
            <span className="text-3xl relative z-10">🚨</span>
          </div>
          <h4 className="text-base font-bold text-white uppercase tracking-wider">Securing Connection</h4>
          <p className="text-xs text-gray-400 mt-2 max-w-xs leading-relaxed">
            Broadcasting incident coordinates from Seat Sec 114 to MetLife Control Room. Please wait...
          </p>
        </div>
      )}

      {/* 2. DISPATCHED STATE */}
      {!isSubmitting && isDispatched && (
        <div className="flex flex-col gap-5 animate-fade-in">
          {/* Dispatch Header Banner */}
          <div className="flex items-center gap-3.5 border-b border-white/5 pb-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/30 text-2xl shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse">
              🚑
            </div>
            <div>
              <h3 className="text-base font-black text-rose-400 uppercase tracking-tight">Team Dispatched</h3>
              <span className="text-[10px] text-gray-400 font-bold uppercase block mt-0.5">
                Ticket ID: {ticketNumber}
              </span>
            </div>
          </div>

          {/* Large Countdown Timer display */}
          <div className="rounded-2xl border border-rose-500/10 bg-rose-500/5 p-5 text-center flex flex-col items-center">
            <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest leading-none">
              Estimated Responder Arrival
            </span>
            <span className="text-4xl font-black text-white mt-3 tracking-wider leading-none shadow-sm">
              {formatTime(countdownSeconds)}
            </span>
            <span className="text-[9.5px] text-gray-400 mt-3 font-medium">
              Response team is en route to: <span className="text-white font-bold">Sec 114, Row 12, Seat 4</span>
            </span>
          </div>

          {/* Action Checklist Info */}
          <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-4.5 text-xs text-gray-300">
            <div className="font-bold text-white flex items-center gap-1.5 uppercase text-[10px] tracking-wider mb-2">
              <span>⚠️</span> Incident Guidance
            </div>
            <p className="leading-relaxed text-[10px] text-gray-400">
              {category.actionGuidance} Keep this assistant tab open. If the patient's condition changes, report details to the AI Concierge immediately.
            </p>
          </div>

          {/* Cancel alert button */}
          <button
            onClick={onCancelRequest}
            className="w-full rounded-xl border border-rose-500/20 bg-rose-500/5 py-3 text-xs font-bold text-rose-400 transition-all duration-300 hover:bg-rose-500/10 hover:border-rose-500/30"
          >
            Cancel Assistance Request
          </button>
        </div>
      )}

      {/* 3. DEFAULT DETAILS PANEL */}
      {!isSubmitting && !isDispatched && (
        <div className="flex flex-col gap-5 animate-fade-in">
          
          {/* Header option */}
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-2xl">
              {category.emoji}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight leading-none">{category.name}</h3>
              <span className="text-[9px] text-gray-400 mt-1.5 block uppercase font-bold tracking-wider leading-none">
                Emergency Guide Details
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-300 leading-relaxed">
            {category.description}
          </p>

          {/* Location & Time details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col justify-between">
              <span className="text-gray-500 font-bold text-[8.5px] uppercase tracking-wider leading-none">Response Time</span>
              <span className="text-sm font-black text-cyan-400 mt-1.5 leading-none">{category.etaDescription}</span>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col justify-between">
              <span className="text-gray-500 font-bold text-[8.5px] uppercase tracking-wider leading-none">Nearest Unit</span>
              <span className="text-[10px] font-bold text-white mt-1.5 leading-tight">{category.locationDescription}</span>
            </div>
          </div>

          {/* Action Guidelines */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-gray-300">
            <div className="font-bold text-amber-400 flex items-center gap-1.5 uppercase text-[9px] tracking-wider mb-2">
              <span>🛡️</span> Immediate Actions
            </div>
            <p className="leading-relaxed text-[10px] text-gray-400">
              {category.actionGuidance}
            </p>
          </div>

          {/* SOS button */}
          <button
            onClick={onRequestAssistance}
            className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-600 py-3.5 text-xs font-bold text-white shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:brightness-110 active:scale-98"
          >
            Request Assistance
          </button>
        </div>
      )}

    </div>
  );
}
