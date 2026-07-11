import { type AccessibilityService, type SupportHelper } from '../../hooks/useAccessibility';

interface AccessibilitySettingsPanelProps {
  service: AccessibilityService;
  isSubmitting: boolean;
  isBooked: boolean;
  requestId: string | null;
  countdownSeconds: number | null;
  assignedHelper: SupportHelper | null;
  onRequestAssistance: () => void;
  onCancelRequest: () => void;
}

export function AccessibilitySettingsPanel({
  service,
  isSubmitting,
  isBooked,
  requestId,
  countdownSeconds,
  assignedHelper,
  onRequestAssistance,
  onCancelRequest,
}: AccessibilitySettingsPanelProps) {
  
  // Format MM:SS for countdown timer
  const formatTime = (totalSeconds: number | null): string => {
    if (totalSeconds === null || totalSeconds < 0) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0f1d]/80 to-[#100d17]/80 p-6 shadow-xl backdrop-blur-xl">
      {/* Decorative ambient background glows */}
      <div className={`absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
        isBooked ? 'bg-cyan-500/10' : 'bg-blue-500/5'
      }`} />

      {/* 1. SUBMITTING/LOADING STATE */}
      {isSubmitting && (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
          <div className="relative flex h-20 w-20 items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" />
            <div className="absolute h-14 w-14 rounded-full border-4 border-t-cyan-500 border-r-cyan-500 border-b-transparent border-l-transparent animate-spin" />
            <span className="text-3xl relative z-10">♿</span>
          </div>
          <h4 className="text-base font-bold text-white uppercase tracking-wider">Requesting Support</h4>
          <p className="text-xs text-gray-400 mt-2 max-w-xs leading-relaxed">
            Pinging MetLife Guest Services... Dispatching closest available assistance steward.
          </p>
        </div>
      )}

      {/* 2. BOOKED/DISPATCHED STATE */}
      {!isSubmitting && isBooked && assignedHelper && (
        <div className="flex flex-col gap-5 animate-fade-in">
          {/* Booking Confirmation banner */}
          <div className="flex items-center gap-3.5 border-b border-white/5 pb-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-2xl shadow-[0_0_15px_rgba(34,211,238,0.15)] animate-pulse">
              🙋
            </div>
            <div>
              <h3 className="text-base font-black text-cyan-400 uppercase tracking-tight">Steward Dispatched</h3>
              <span className="text-[10px] text-gray-400 font-bold uppercase block mt-0.5">
                Request ID: {requestId}
              </span>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-4.5 text-center flex flex-col items-center">
            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest leading-none">
              Estimated Helper Arrival
            </span>
            <span className="text-4xl font-black text-white mt-3 tracking-wider leading-none">
              {formatTime(countdownSeconds)}
            </span>
            <span className="text-[9.5px] text-gray-400 mt-3 font-medium">
              Helper is transit to: <span className="text-white font-bold">Sec 114, Row 12, Seat 4</span>
            </span>
          </div>

          {/* Assigned Steward Helper Profile Card */}
          <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-4">
            <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-3 block">
              Assigned Support Partner
            </span>
            
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-2xl">
                {assignedHelper.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate leading-none">{assignedHelper.name}</h4>
                <span className="text-[9.5px] text-gray-400 mt-1 block">{assignedHelper.role}</span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 rounded bg-yellow-500/10 border border-yellow-500/25 px-1.5 py-0.5 text-[9px] font-black text-yellow-400">
                  ⭐ {assignedHelper.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/20 p-4 text-[10px] text-gray-400 leading-relaxed">
            Please remain at your seat portal. In case you need to update details, speak to the AI Concierge.
          </div>

          {/* Cancel request button */}
          <button
            onClick={onCancelRequest}
            className="w-full rounded-xl border border-cyan-500/20 bg-cyan-500/5 py-3 text-xs font-bold text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-500/30"
          >
            Cancel Assistance Booking
          </button>
        </div>
      )}

      {/* 3. DEFAULT DETAILS STATE */}
      {!isSubmitting && !isBooked && (
        <div className="flex flex-col gap-5 animate-fade-in">
          
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-2xl">
              {service.emoji}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight leading-none">{service.name}</h3>
              <span className="text-[9px] text-gray-400 mt-1.5 block uppercase font-bold tracking-wider leading-none">
                Service Configuration & Advice
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-300 leading-relaxed">
            {service.description}
          </p>

          {/* Facility Location Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col justify-between">
              <span className="text-gray-500 font-bold text-[8.5px] uppercase tracking-wider leading-none">Nearest Location</span>
              <span className="text-[10px] font-bold text-white mt-1.5 leading-tight">{service.nearestLocation}</span>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col justify-between">
              <span className="text-gray-500 font-bold text-[8.5px] uppercase tracking-wider leading-none">Walking Distance</span>
              <span className="text-xs font-black text-cyan-400 mt-1.5 leading-none">
                {service.distance}m <span className="text-[9.5px] text-gray-500 font-medium">({service.walkingTime} min)</span>
              </span>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col col-span-2">
              <span className="text-gray-500 font-bold text-[8.5px] uppercase tracking-wider leading-none">Current Status</span>
              <span className="text-[10.5px] font-bold text-emerald-400 mt-1">{service.status}</span>
            </div>
          </div>

          {/* Service Guidelines */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-xs text-gray-300">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5 uppercase text-[9px] tracking-wider mb-2">
              <span>ℹ️</span> Service Guidelines
            </div>
            <p className="leading-relaxed text-[10px] text-gray-400">
              {service.guidelines}
            </p>
          </div>

          {/* Request Button */}
          <button
            onClick={onRequestAssistance}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3.5 text-xs font-bold text-white shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:brightness-110 active:scale-98"
          >
            Request Assistance
          </button>
        </div>
      )}

    </div>
  );
}
