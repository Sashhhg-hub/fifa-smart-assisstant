import { useFoodFinder } from '../../hooks/useFoodFinder';
import { FilterChip } from './FilterChip';
import { FoodCard, type CardMetric } from './FoodCard';
import { FOOD_CATEGORIES, type Restaurant } from '../../constants/foodData';
import type { SidebarTab } from './Sidebar';

interface FoodFinderProps {
  onNavigateTab: (tab: SidebarTab) => void;
}

export function FoodFinder({ onNavigateTab }: FoodFinderProps) {
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeFilters,
    toggleFilter,
    selectedRestaurant,
    setSelectedRestaurantId,
    filteredRestaurants,
    smartRecommendation,
  } = useFoodFinder();

  // Helper to generate metrics for FoodCard
  const getRestaurantMetrics = (rest: Restaurant): CardMetric[] => [
    { label: 'Distance', value: `${rest.distance}m` },
    { label: 'Walk Time', value: `${rest.walkingTime}m` },
    { label: 'Queue Time', value: `${rest.queueTime}m` },
  ];

  // Helper to get a description text for why a restaurant is recommended
  const getRecommendationReason = (rest: Restaurant): string => {
    if (rest.queueTime <= 3) {
      return `Recommended for lightning-fast service with only a ${rest.queueTime} min wait!`;
    }
    if (rest.distance <= 100) {
      return `Closest premium dining option, just a ${rest.walkingTime} min walk away.`;
    }
    if (rest.rating >= 4.7) {
      return `Fan favorite with a stellar ${rest.rating.toFixed(1)} rating.`;
    }
    return `Balanced choice with a short queue and convenient location.`;
  };

  const quickFilters = [
    'Near Me',
    'No Queue',
    'Vegetarian',
    'Halal',
    'Fastest Service',
    'Highest Rated',
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden lg:flex-row">
      
      {/* LEFT AREA: SEARCH, FILTERS, LIST (Main panel) */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#0a0a0f]/10">
        
        {/* Title Header */}
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
            METLIFE STADIUM CONCESSIONS
          </span>
          <h2 className="text-2xl font-black text-white mt-0.5 tracking-tight">Food Finder</h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Locate concessions, monitor queue sizes, and order directly to bypass queue lines.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by restaurant name, cuisine type, or dish..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-sm text-white placeholder-gray-400 transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Scroller */}
        <div className="mb-5">
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mb-2">
            Categories
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <FilterChip
              label="All Dishes"
              active={activeCategory === null}
              onClick={() => setActiveCategory(null)}
            />
            {FOOD_CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mb-6">
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mb-2">
            Quick Filters
          </label>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <FilterChip
                key={filter}
                label={filter}
                active={activeFilters.includes(filter)}
                onClick={() => toggleFilter(filter)}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Smart Recommendation Banner */}
        {smartRecommendation && !searchQuery && !activeCategory && activeFilters.length === 0 && (
          <div className="glass mb-8 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-950/20 via-slate-900/50 to-purple-950/20 p-5 shadow-xl transition-all duration-300 hover:border-cyan-400/40 relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10">
              <div className="flex flex-col gap-1.5">
                <span className="inline-flex max-w-fit items-center gap-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 px-3 py-0.5 text-[9px] font-black uppercase tracking-widest text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.15)]">
                  ⭐ BEST CHOICE RIGHT NOW
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {smartRecommendation.name} • {smartRecommendation.emoji}
                </h3>
                <p className="text-xs text-gray-400 max-w-md leading-relaxed">
                  {getRecommendationReason(smartRecommendation)}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/5 px-4 py-2.5 min-w-20">
                  <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Wait Time</span>
                  <span className="text-sm font-black text-cyan-400 mt-1">{smartRecommendation.queueTime} min</span>
                </div>
                <button
                  onClick={() => setSelectedRestaurantId(smartRecommendation.id)}
                  className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:brightness-110"
                >
                  View Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Concessions Grid */}
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mb-3.5">
            Concession Stands ({filteredRestaurants.length})
          </label>
          {filteredRestaurants.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredRestaurants.map((rest) => (
                <FoodCard
                  key={rest.id}
                  title={rest.name}
                  subtitle={rest.cuisine}
                  emoji={rest.emoji}
                  rating={rest.rating}
                  priceRange={rest.priceRange}
                  statusBadge={
                    rest.isOpen
                      ? { text: 'Open Now', type: 'success' }
                      : { text: 'Closed', type: 'danger' }
                  }
                  metrics={getRestaurantMetrics(rest)}
                  tags={rest.categories}
                  active={selectedRestaurant?.id === rest.id}
                  onClick={() => setSelectedRestaurantId(rest.id)}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl border border-dashed border-white/10 p-10 text-center text-xs text-gray-400">
              No concession stands match your search or filter configuration.
            </div>
          )}
        </div>

      </div>

      {/* RIGHT SIDEBAR: DETAILS PANEL */}
      <div className="w-full flex flex-col bg-[#0a0a0f]/40 p-6 lg:w-[420px] lg:shrink-0 lg:overflow-y-auto border-l border-white/10">
        {selectedRestaurant ? (
          <div className="flex flex-col gap-6">
            
            {/* Stand header block */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/20 to-slate-900/40 p-5 shadow-lg">
              {/* Background ambient glow */}
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 relative z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0a0a0f] border border-white/10 text-3xl shadow-inner">
                  {selectedRestaurant.emoji}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">{selectedRestaurant.name}</h3>
                  <span className="text-[10px] text-gray-400 mt-1 block">{selectedRestaurant.cuisine}</span>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="inline-flex rounded bg-yellow-500/10 border border-yellow-500/25 px-1.5 py-0.5 text-[9px] font-black text-yellow-400">
                      ⭐ {selectedRestaurant.rating.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold">{selectedRestaurant.priceRange}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Queue and Prep details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3.5 flex flex-col">
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Queue Status</span>
                <span className={`text-sm font-black mt-1 ${
                  selectedRestaurant.queueTime <= 3
                    ? 'text-emerald-400'
                    : selectedRestaurant.queueTime <= 10
                      ? 'text-amber-400'
                      : 'text-rose-400'
                }`}>
                  {selectedRestaurant.queueTime} min wait
                </span>
                <span className="text-[8.5px] text-gray-500 mt-0.5 font-medium">
                  {selectedRestaurant.crowdStatus} traffic load
                </span>
              </div>
              <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3.5 flex flex-col">
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Est. Prep Time</span>
                <span className="text-sm font-black text-cyan-400 mt-1">
                  ~{selectedRestaurant.prepTime} min
                </span>
                <span className="text-[8.5px] text-gray-500 mt-0.5 font-medium">
                  Fresh made to order
                </span>
              </div>
            </div>

            {/* Popular Menu Items */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mb-3">
                Popular Menu Items
              </label>
              <div className="flex flex-col gap-2.5">
                {selectedRestaurant.popularItems.map((item, i) => (
                  <div
                    key={i}
                    className="group rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3.5 transition-all duration-300 hover:border-white/10 hover:bg-white/5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white truncate leading-none">{item.name}</h4>
                          {item.isVegetarian && (
                            <span className="text-[8px] font-black text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-1 py-0.5 rounded leading-none shrink-0" title="Vegetarian">
                              VEG
                            </span>
                          )}
                          {item.isVegan && (
                            <span className="text-[8px] font-black text-green-400 border border-green-500/20 bg-green-500/10 px-1 py-0.5 rounded leading-none shrink-0" title="Vegan">
                              VEGAN
                            </span>
                          )}
                        </div>
                        <p className="text-[9.5px] text-gray-400 leading-relaxed mt-1.5">{item.description}</p>
                      </div>
                      <span className="text-xs font-black text-cyan-400 shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Allergens warning */}
                    {item.allergens.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-1.5">
                        <span className="text-[8px] font-bold text-rose-400/80 uppercase">Allergens:</span>
                        <div className="flex flex-wrap gap-1">
                          {item.allergens.map((alg) => (
                            <span key={alg} className="rounded-full bg-rose-500/10 px-1.5 py-0.5 text-[7.5px] font-bold text-rose-400">
                              {alg}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Direct tab navigation trigger */}
            <button
              onClick={() => onNavigateTab('navigation')}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3.5 text-xs font-bold text-white shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:brightness-110 active:scale-98"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25g7.5-9 7.5 9z" />
              </svg>
              Navigate to Concession Stand
            </button>

          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-xs text-gray-400 p-6">
            Select a concession stand card on the left to explore its popular menu items and allergen details.
          </div>
        )}
      </div>

    </div>
  );
}
