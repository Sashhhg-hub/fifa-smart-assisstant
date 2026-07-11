import { useAccessibility } from '../../hooks/useAccessibility';
import { AccessibilityCard } from './AccessibilityCard';
import { AccessibilitySettingsPanel } from './AccessibilitySettingsPanel';
import { DashboardCard } from './DashboardCard';

export function AccessibilitySupport() {
  const {
    services,
    selectedId,
    selectedService,
    selectService,
    isSubmitting,
    isBooked,
    requestId,
    countdownSeconds,
    assignedHelper,
    requestAssistance,
    cancelRequest,
  } = useAccessibility();

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden lg:flex-row">
      
      {/* LEFT COMPONENT: INFORMATION GRID & SAFETY STANDARDS */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#0a0a0f]/10">
        
        {/* Header Titles */}
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
            METLIFE STADIUM ACCESSIBLE SERVICE PORTAL
          </span>
          <h2 className="text-2xl font-black text-white mt-0.5 tracking-tight flex items-center gap-2">
            Accessibility Support <span className="text-sm">♿</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Request assistance partners, escorts, and access facility maps designed for fans of all abilities.
          </p>
        </div>

        {/* Categories grid */}
        <div className="mb-6">
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mb-3.5">
            Select Support Service
          </label>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <AccessibilityCard
                key={service.id}
                name={service.name}
                emoji={service.emoji}
                description={service.description}
                active={selectedId === service.id}
                onClick={() => selectService(service.id)}
              />
            ))}
          </div>
        </div>

        {/* Reusable Extra info: ADA Guidelines card */}
        <div className="mt-8">
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mb-3.5">
            Stadium Inclusion Policies
          </label>
          
          <DashboardCard
            title="ADA Guidelines & Facility Access"
            subtitle="Stadium accessibility standards overview"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
              </svg>
            }
          >
            <div className="flex flex-col gap-4 text-xs text-gray-300">
              <p className="leading-relaxed">
                MetLife Stadium is fully ADA compliant. Accessible seating, sensory rooms, ramps, elevators, and companion seating are provided throughout the arena. Safety stewards are trained to assist differently-abled guests during normal operations and evacuations.
              </p>
              
              <div className="grid gap-3.5 sm:grid-cols-3 border-t border-white/5 pt-4 mt-2">
                <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 p-3">
                  <span className="text-cyan-400 font-black text-sm">🎒</span>
                  <h5 className="font-bold text-white mt-1">Sensory Rooms</h5>
                  <span className="text-[9.5px] text-gray-400 leading-normal mt-0.5">
                    Sensory bags with noise-canceling headphones are ready at Section 116. Sensory room open at Plaza level.
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 p-3">
                  <span className="text-cyan-400 font-black text-sm">🦮</span>
                  <h5 className="font-bold text-white mt-1">Service Animals</h5>
                  <span className="text-[9.5px] text-gray-400 leading-normal mt-0.5">
                    Trained service animals are welcome. Dedicated relief zone located just outside Gate A.
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 p-3">
                  <span className="text-cyan-400 font-black text-sm">🛗</span>
                  <h5 className="font-bold text-white mt-1">Stroller Parking</h5>
                  <span className="text-[9.5px] text-gray-400 leading-normal mt-0.5">
                    Complimentary stroller check-in counters operational at Guests Services portals inside Gates B, C, & D.
                  </span>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

      </div>

      {/* RIGHT SIDEBAR: CURRENT ACTIVE STATUS & ACTION CONTROLS */}
      <div className="w-full flex flex-col bg-[#0a0a0f]/40 p-6 lg:w-[420px] lg:shrink-0 lg:overflow-y-auto border-l border-white/10 gap-6">
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mb-3.5">
            Support Status Monitor
          </label>
          
          <AccessibilitySettingsPanel
            service={selectedService}
            isSubmitting={isSubmitting}
            isBooked={isBooked}
            requestId={requestId}
            countdownSeconds={countdownSeconds}
            assignedHelper={assignedHelper}
            onRequestAssistance={requestAssistance}
            onCancelRequest={cancelRequest}
          />
        </div>
      </div>

    </div>
  );
}
