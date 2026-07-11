import { useStadiumNavigation } from '../../hooks/useStadiumNavigation';
import { StadiumMap } from './StadiumMap';

export function StadiumNavigation() {
  const {
    searchQuery,
    setSearchQuery,
    destinations,
    filteredDestinations,
    activeDest,
    selectDestination,
    activeRoute,
    resetNavigation,
    zoom,
    setZoom,
    panOffset,
    setPanOffset,
    userPosition,
  } = useStadiumNavigation();

  const quickActions = [
    { label: 'Find My Seat', id: 'seat-114', emoji: '🎫', desc: 'Sec 114 Portal' },
    { label: 'Nearest Washroom', id: 'washroom-north', emoji: '🚻', desc: 'North Section' },
    { label: 'Food Nearby', id: 'food-b', emoji: '🍔', desc: 'Concession Stand B' },
    { label: 'Emergency Exit', id: 'exit-south', emoji: '🚨', desc: 'South Tunnel' },
    { label: 'Medical Clinic', id: 'medical-firstaid', emoji: '🏥', desc: 'Section 118 First Aid' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden lg:flex-row">
      {/* Left Sidebar Control Dashboard */}
      <div className="flex w-full flex-col bg-[#0a0a0f]/40 p-6 lg:w-[400px] lg:shrink-0 lg:overflow-y-auto border-r border-white/10">
        
        {/* Search Panel */}
        <div className="relative mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
            Search Stadium Map
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search seat, gates, foods, toilets..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-4 pr-10 text-sm text-white placeholder-gray-400 transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Search suggestions dropdown */}
          {searchQuery.trim() && filteredDestinations.length > 0 && (
            <div className="glass absolute left-0 right-0 mt-2 z-20 max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-[#0a0a0f]/95 p-1.5 shadow-2xl backdrop-blur-3xl">
              {filteredDestinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => {
                    selectDestination(dest.id);
                    setSearchQuery('');
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <div>
                    <span className="block font-semibold text-white">{dest.name}</span>
                    <span className="text-[10px] text-gray-400">{dest.details}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                    {dest.type}
                  </span>
                </button>
              ))}
            </div>
          )}

          {searchQuery.trim() && filteredDestinations.length === 0 && (
            <div className="glass absolute left-0 right-0 mt-2 z-20 rounded-xl border border-white/10 bg-[#0a0a0f]/95 p-4 text-center text-xs text-gray-400 shadow-2xl">
              No stadium locations matching your query.
            </div>
          )}
        </div>

        {/* Route Panel (Shows when a path destination is selected) */}
        {activeRoute ? (
          <div className="glass mb-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/20 to-slate-900/40 p-4 shadow-xl animate-fade-in">
            <div className="mb-3 flex items-start justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">Destination</span>
                <h3 className="text-sm font-bold text-white mt-0.5">{activeRoute.destination.name}</h3>
                <p className="text-[10px] text-gray-400">{activeRoute.destination.details}</p>
              </div>
              <button
                onClick={resetNavigation}
                className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[9px] font-bold text-white hover:bg-white/10"
              >
                CLEAR ROUTE
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Walking Est.</span>
                <span className="text-lg font-black text-cyan-400 mt-1">{activeRoute.walkingTime}</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Distance</span>
                <span className="text-lg font-black text-white mt-1">{activeRoute.distance}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-[#0a0a0f]/40 px-3 py-2 border border-white/5">
                <span className="text-gray-400">Crowd Density:</span>
                <span
                  className={`font-semibold ${
                    activeRoute.crowdLevel === 'Low'
                      ? 'text-green-400'
                      : activeRoute.crowdLevel === 'Moderate'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                  }`}
                >
                  {activeRoute.crowdLevel}
                </span>
              </div>

              {activeRoute.accessibleRoute && (
                <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2 text-green-400 font-medium">
                  <span>♿</span>
                  <span>Wheelchair Accessible Path available</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Route Panel Placeholder */
          <div className="glass mb-6 rounded-2xl border border-dashed border-white/10 p-5 text-center text-xs text-gray-400">
            Select a location on the map or search above to calculate directions.
          </div>
        )}

        {/* Quick Destinations Grid */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
            Quick Destinations
          </label>
          <div className="flex flex-col gap-2.5">
            {quickActions.map((action) => {
              const isActive = activeDest?.id === action.id;
              return (
                <button
                  key={action.id}
                  onClick={() => selectDestination(action.id)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border-cyan-400/50 text-cyan-400'
                      : 'border-white/5 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{action.emoji}</span>
                    <div>
                      <span className="block text-xs font-bold">{action.label}</span>
                      <span className="text-[9px] text-gray-400">{action.desc}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-white">
                    {isActive ? 'Selected' : 'Go'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Right Map Canvas Panel */}
      <div className="flex-1 p-6 relative overflow-hidden min-h-[400px] lg:min-h-0 bg-[#0a0a0f]/10">
        <StadiumMap
          destinations={destinations}
          activeDest={activeDest}
          pathPoints={activeRoute ? activeRoute.pathPoints : null}
          userPosition={userPosition}
          zoom={zoom}
          setZoom={setZoom}
          panOffset={panOffset}
          setPanOffset={setPanOffset}
          onMarkerSelect={selectDestination}
        />
      </div>
    </div>
  );
}
