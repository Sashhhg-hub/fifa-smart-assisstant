import { useTransportation } from '../../hooks/useTransportation';
import { TransportFilterChip } from './TransportFilterChip';
import { TransportCard } from './TransportCard';
import { TransportDetailsPanel } from './TransportDetailsPanel';
import { TRANSPORT_CATEGORIES, MOCK_TRANSPORT_OPTIONS } from '../../constants/transportationData';
import { type SidebarTab } from './Sidebar';

interface TransportationProps {
  onNavigateTab: (tab: SidebarTab) => void;
  onSelectDestination: (destId: string | null) => void;
}

export function Transportation({ onNavigateTab, onSelectDestination }: TransportationProps) {
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    selectedOptionId,
    setSelectedOptionId,
    selectedOption,
    filteredOptions,
    smartRecommendation,
  } = useTransportation();

  const handleNavigate = (pickupPointId: string) => {
    onSelectDestination(pickupPointId);
    onNavigateTab('navigation');
  };

  const getCategoryCount = (category: string) => {
    return MOCK_TRANSPORT_OPTIONS.filter((opt) => {
      if (opt.type !== category) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          opt.name.toLowerCase().includes(query) ||
          opt.pickupPoint.toLowerCase().includes(query) ||
          opt.details.toLowerCase().includes(query)
        );
      }
      return true;
    }).length;
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden lg:flex-row">
      {/* Left List Pane */}
      <div className="flex w-full flex-col bg-[#0a0a0f]/40 p-6 lg:w-[480px] lg:shrink-0 lg:overflow-y-auto border-r border-white/10">
        
        {/* Header section */}
        <div className="mb-6">
          <h1 className="text-2xl font-black tracking-wide text-white uppercase bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Transit & Transportation
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Compare schedules, check transit fare, and get directed routing to your pickup location.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-5">
          <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">
            Search Transit Method
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search metro, shuttles, uber stands, parking..."
              className="w-full rounded-xl border border-white/10 bg-[#12121e]/50 py-3 pl-4 pr-10 text-xs text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-400/50 focus:bg-[#12121e]/80 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-xs font-bold text-gray-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="block text-[10px] font-black uppercase tracking-widest text-cyan-400">
              Transit Types
            </span>
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="text-[9px] font-bold text-gray-400 hover:text-white uppercase tracking-wider"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
            {TRANSPORT_CATEGORIES.map((category) => (
              <TransportFilterChip
                key={category}
                label={category}
                active={activeCategory === category}
                count={getCategoryCount(category)}
                onClick={() =>
                  setActiveCategory(activeCategory === category ? null : category)
                }
              />
            ))}
          </div>
        </div>

        {/* Smart Recommendation Card (AI Recommendation) */}
        {smartRecommendation && !activeCategory && !searchQuery.trim() && (
          <div className="mb-6">
            <span className="block text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2.5">
              ⚡ AI Smart Choice
            </span>
            <div 
              onClick={() => setSelectedOptionId(smartRecommendation.id)}
              className={`glass cursor-pointer rounded-2xl border p-4.5 transition-all duration-300 hover:scale-[1.01] bg-gradient-to-br from-purple-950/20 via-[#0a0a0f]/60 to-cyan-950/20 border-purple-500/30 ${
                selectedOptionId === smartRecommendation.id 
                  ? 'border-cyan-400/40 shadow-[0_0_25px_rgba(168,85,247,0.15)]' 
                  : 'hover:border-purple-500/50'
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[8px] font-black text-purple-400 uppercase tracking-widest border border-purple-500/20">
                    Best Travel Option
                  </span>
                </div>
                <span className="text-[10px] font-black text-cyan-400">Fast & Low Cost</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/25 to-cyan-500/25 text-xl">
                  🚗
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">{smartRecommendation.name}</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">{smartRecommendation.pickupPoint}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs mt-3.5">
                <div className="flex gap-4 text-gray-300 font-semibold">
                  <span>⏱️ {smartRecommendation.travelTime} mins</span>
                  <span>💵 {smartRecommendation.cost}</span>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-md border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[9px] font-black text-purple-400 uppercase">
                    {smartRecommendation.crowdLevel} Crowd
                  </span>
                  <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-black text-emerald-400 uppercase">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Options List */}
        <div className="flex flex-col gap-3.5">
          <span className="block text-[10px] font-black uppercase tracking-widest text-cyan-400">
            Available Transit ({filteredOptions.length})
          </span>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <TransportCard
                key={opt.id}
                option={opt}
                isSelected={selectedOptionId === opt.id}
                onClick={() => setSelectedOptionId(opt.id)}
              />
            ))
          ) : (
            <div className="glass rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-gray-400">
              No transportation options matching your criteria.
            </div>
          )}
        </div>

      </div>

      {/* Right Details Panel */}
      <div className="flex-1 p-6 bg-[#0a0a0f]/10 min-h-[350px] lg:min-h-0">
        <TransportDetailsPanel
          option={selectedOption}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}
