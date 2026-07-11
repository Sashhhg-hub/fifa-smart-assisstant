import { useState } from 'react';
import { useEmergency } from '../../hooks/useEmergency';
import { EmergencyCard } from './EmergencyCard';
import { EmergencyStatusPanel } from './EmergencyStatusPanel';
import { DashboardCard } from './DashboardCard';

interface Hotline {
  name: string;
  phone: string;
  emoji: string;
  description: string;
}

export function EmergencyAssistance() {
  const {
    categories,
    selectedId,
    selectedCategory,
    selectEmergency,
    isSubmitting,
    isDispatched,
    ticketNumber,
    countdownSeconds,
    requestAssistance,
    cancelRequest,
  } = useEmergency();

  const [activeCall, setActiveCall] = useState<Hotline | null>(null);
  const [callStatus, setCallStatus] = useState<'dialing' | 'connected'>('dialing');

  const hotlines: Hotline[] = [
    { name: 'Security Dispatch', phone: '+1 (800) 555-0190', emoji: '👮', description: 'Immediate stadium patrol contact' },
    { name: 'First Aid Desk', phone: '+1 (800) 555-0118', emoji: '🏥', description: 'Medical response central desk' },
    { name: 'Fire Safety Line', phone: '+1 (800) 555-0199', emoji: '🚒', description: 'Evacuation & smoke control desk' },
    { name: 'Family Guest Escort', phone: '+1 (800) 555-0102', emoji: '👶', description: 'Guest assistance & lost kids patrol' },
  ];

  const handleCall = (hotline: Hotline) => {
    setActiveCall(hotline);
    setCallStatus('dialing');
    
    // Simulate connection after 1.8 seconds
    setTimeout(() => {
      setCallStatus('connected');
    }, 1800);
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden lg:flex-row relative">
      
      {/* LEFT CONTENT: CATEGORIES GRID & TIMELINE CHECKLISTS */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#0a0a0f]/10">
        
        {/* Header Title block */}
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">
            METLIFE EMERGENCY CONTROL CENTER
          </span>
          <h2 className="text-2xl font-black text-white mt-0.5 tracking-tight flex items-center gap-2">
            Emergency Assistance <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Select an incident category to summon emergency services directly to your seat.
          </p>
        </div>

        {/* Categories Grid layout */}
        <div className="mb-6">
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-400 mb-3.5">
            Emergency Categories
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((cat) => (
              <EmergencyCard
                key={cat.id}
                name={cat.name}
                emoji={cat.emoji}
                description={cat.description}
                active={selectedId === cat.id}
                onClick={() => selectEmergency(cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Safety & Evacuation guidelines banner */}
        <div className="mt-8">
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-400 mb-3.5">
            Evacuation & Safety Plan
          </label>
          <DashboardCard
            title="Stadium Evacuation Plan"
            subtitle="MetLife Arena Fan Safety Guide"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            }
          >
            <div className="flex flex-col gap-4 text-xs text-gray-300">
              <p className="leading-relaxed">
                In the event of an arena evacuation, emergency alerts will broadcast over PA speakers and video displays. Retain your composure. Follow the instructions of the nearest stadium steward.
              </p>
              
              {/* Checklist list */}
              <div className="grid gap-3 sm:grid-cols-2 border-t border-white/5 pt-4 mt-2">
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-400">🚪</span>
                  <div>
                    <h5 className="font-bold text-white leading-none">Emergency Exits</h5>
                    <span className="text-[10px] text-gray-400 mt-1 block">Tunnels located at South Concourse (Sec 102) & North Concourse (Sec 132).</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-400">🏥</span>
                  <div>
                    <h5 className="font-bold text-white leading-none">First Aid Clinics</h5>
                    <span className="text-[10px] text-gray-400 mt-1 block">Full-service medical facilities operational at Sections 118 & 144.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-400">📢</span>
                  <div>
                    <h5 className="font-bold text-white leading-none">Safety Stewards</h5>
                    <span className="text-[10px] text-gray-400 mt-1 block">Yellow-jacketed safety stewards are equipped with radios at all portals.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-400">⚡</span>
                  <div>
                    <h5 className="font-bold text-white leading-none">Evacuation Orders</h5>
                    <span className="text-[10px] text-gray-400 mt-1 block">Use stairs only. Do not attempt to use elevator shafts or escalators.</span>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

      </div>

      {/* RIGHT SIDEBAR: CURRENT ACTIVE STATUS & DIRE DIALS */}
      <div className="w-full flex flex-col bg-[#0a0a0f]/40 p-6 lg:w-[420px] lg:shrink-0 lg:overflow-y-auto border-l border-white/10 gap-6">
        
        {/* Status Panel wrapper */}
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-400 mb-3.5">
            Incident Status Monitor
          </label>
          <EmergencyStatusPanel
            category={selectedCategory}
            isSubmitting={isSubmitting}
            isDispatched={isDispatched}
            ticketNumber={ticketNumber}
            countdownSeconds={countdownSeconds}
            onRequestAssistance={requestAssistance}
            onCancelRequest={cancelRequest}
          />
        </div>

        {/* speed dials directory */}
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-400 mb-3.5">
            Emergency Hotline Directory
          </label>
          <div className="flex flex-col gap-3">
            {hotlines.map((hotline) => (
              <div
                key={hotline.name}
                onClick={() => handleCall(hotline)}
                className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3.5 text-left transition-all duration-300 hover:border-rose-500/30 hover:bg-rose-500/5 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-lg group-hover:scale-105 transition-transform">
                    {hotline.emoji}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white group-hover:text-rose-400 transition-colors">
                      {hotline.name}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">{hotline.description}</span>
                  </div>
                </div>
                <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 text-[9px] font-black text-rose-400 uppercase tracking-widest leading-none">
                  CALL
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. MODAL OVERLAY DIALING SIMULATOR */}
      {activeCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]/85 backdrop-blur-md animate-fade-in">
          <div className="glass max-w-sm w-full mx-4 rounded-3xl border border-rose-500/20 p-8 text-center relative overflow-hidden shadow-2xl">
            {/* Pulsing ring graphic background */}
            <div className="absolute inset-0 m-auto h-40 w-40 rounded-full border border-rose-500/10 animate-ping" />
            
            {/* Call State Logo */}
            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-600 text-3xl text-white shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse">
              📞
            </div>

            <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400">
              STADIUM CENTRAL CALL ROUTING
            </span>
            <h3 className="text-lg font-black text-white mt-1.5">
              {activeCall.name}
            </h3>
            <span className="text-xs text-gray-500 block mt-1">
              {activeCall.phone}
            </span>

            {/* Calling Status text */}
            <div className="mt-8 mb-8 text-sm font-bold text-gray-300">
              {callStatus === 'dialing' ? (
                <span className="flex items-center justify-center gap-1">
                  Dialing<span className="animate-bounce">.</span><span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span><span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center justify-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Connected • Live Audio
                </span>
              )}
            </div>

            {/* End Call button */}
            <button
              onClick={handleEndCall}
              className="w-full rounded-xl bg-rose-500 py-3.5 text-xs font-bold text-white transition-all duration-300 hover:bg-rose-600"
            >
              End Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
