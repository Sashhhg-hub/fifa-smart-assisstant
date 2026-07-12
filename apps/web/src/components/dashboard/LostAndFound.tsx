import { useState } from 'react';
import { useLostAndFound } from '../../hooks/useLostAndFound';
import { LostItemCard } from './LostItemCard';
import { ItemDetailsPanel } from './ItemDetailsPanel';
import { ReportForm } from './ReportForm';
import { LOST_FOUND_CATEGORIES } from '../../constants/lostFoundData';

const CATEGORY_EMOJIS: Record<string, string> = {
  'Wallet': '💼',
  'Phone': '📱',
  'Passport': '📖',
  'Keys': '🔑',
  'Bag': '🎒',
  'Watch': '⌚',
  'Camera': '📷',
  'Clothing': '👕',
  'Tickets': '🎫',
  'Other': '📦',
};

export function LostAndFound() {
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeStatus,
    setActiveStatus,
    selectedItemId,
    setSelectedItemId,
    selectedItem,
    filteredItems,
    possibleMatch,
    addReport,
  } = useLostAndFound();

  // Tab filter: 'all' | 'lost' | 'found'
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all');
  const [showForm, setShowForm] = useState(false);
  const [successClaimId, setSuccessClaimId] = useState<string | null>(null);

  // Apply tab filter on top of the search/filters
  const displayedItems = filteredItems.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const handleFormSubmit = (data: {
    name: string;
    category: string;
    description: string;
    type: 'lost' | 'found';
    collectionLocation: string;
    contactInfo: string;
    claimInstructions: string;
  }) => {
    const claimId = addReport(data);
    setSuccessClaimId(claimId);
    setShowForm(false);

    // Auto-clear success message after 5 seconds
    setTimeout(() => {
      setSuccessClaimId(null);
    }, 6000);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden lg:flex-row relative">
      {/* Success Notification Alert */}
      {successClaimId && (
        <div className="absolute right-6 top-6 z-50 animate-bounce rounded-xl border border-emerald-500/30 bg-[#0a0a0f] p-4 text-xs shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <div>
              <span className="block font-black text-emerald-400">Report Submitted Successfully!</span>
              <span className="text-gray-400">Your unique Claim ID is <span className="font-bold text-white">#{successClaimId}</span>. Please keep this ID for collection verification.</span>
            </div>
          </div>
        </div>
      )}

      {/* Left List Pane */}
      <div className="flex w-full flex-col bg-[#0a0a0f]/40 p-6 lg:w-[480px] lg:shrink-0 lg:overflow-y-auto border-r border-white/10">
        
        {/* Header section with Report CTA */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-wide text-white uppercase bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Lost & Found
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Search reported belongings, file lost claims, or register items you found.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-xl hover:brightness-110 active:scale-[0.98] transition-all"
          >
            File Report
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-5">
          <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">
            Search Item or Claim ID
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keys, phone models, Claim IDs..."
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

        {/* Tab Filters (All, Lost, Found) */}
        <div className="mb-5 flex gap-2 border-b border-white/5 pb-3">
          {(['all', 'lost', 'found'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-white/10 text-white border border-white/15'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'all' ? 'All Reports' : tab === 'lost' ? 'Lost' : 'Found'}
            </button>
          ))}
        </div>

        {/* Filters Panel (Category Carousel & Status Selector) */}
        <div className="mb-6 flex flex-col gap-4">
          {/* Category carousel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="block text-[10px] font-black uppercase tracking-widest text-cyan-400">
                Filter Category
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
              {LOST_FOUND_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-cyan-500/10 border-cyan-400/50 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                      : 'border-white/5 bg-[#12121e]/40 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{CATEGORY_EMOJIS[cat] || '📦'}</span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status filter selector */}
          <div className="flex items-center justify-between gap-4">
            <span className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 shrink-0">
              Claim Status
            </span>
            <select
              value={activeStatus || ''}
              onChange={(e) => setActiveStatus(e.target.value || null)}
              className="rounded-lg border border-white/10 bg-[#0a0a0f] py-1 px-3 text-xs text-white transition-all focus:border-cyan-400/50 focus:outline-none"
            >
              <option value="">All Statuses</option>
              <option value="Reported">Reported</option>
              <option value="Processing">Processing</option>
              <option value="Matched">Matched</option>
              <option value="Ready for Pickup">Ready for Pickup</option>
              <option value="Claimed">Claimed</option>
            </select>
          </div>
        </div>

        {/* AI Possible Match Highlight Card */}
        {possibleMatch && (
          <div className="mb-6">
            <span className="block text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2.5">
              🔮 AI Matching Suggestion
            </span>
            <div 
              onClick={() => setSelectedItemId(possibleMatch.id)}
              className={`glass cursor-pointer rounded-2xl border p-4 bg-gradient-to-br from-purple-950/20 via-[#0a0a0f]/60 to-cyan-950/20 border-purple-500/30 transition-all duration-300 hover:scale-[1.01] ${
                selectedItemId === possibleMatch.id
                  ? 'border-cyan-400/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                  : 'hover:border-purple-500/50'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[8px] font-black text-purple-400 uppercase tracking-widest border border-purple-500/20">
                  Possible Match Found
                </span>
                <span className="text-[10px] font-bold text-gray-500">Cross-Referenced</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-base">
                  {CATEGORY_EMOJIS[possibleMatch.category] || '📦'}
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">{possibleMatch.name}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                    {possibleMatch.description}
                  </p>
                </div>
              </div>

              <div className="mt-3 border-t border-white/5 pt-2 flex items-center justify-between text-[9px] text-gray-500">
                <span>Ref: #{possibleMatch.claimId}</span>
                <span className="font-black text-purple-400 uppercase">View matched report →</span>
              </div>
            </div>
          </div>
        )}

        {/* Listing Grid */}
        <div className="flex flex-col gap-3.5">
          <span className="block text-[10px] font-black uppercase tracking-widest text-cyan-400">
            Reports ({displayedItems.length})
          </span>
          {displayedItems.length > 0 ? (
            displayedItems.map((item) => (
              <LostItemCard
                key={item.id}
                item={item}
                isSelected={selectedItemId === item.id}
                onClick={() => setSelectedItemId(item.id)}
              />
            ))
          ) : (
            <div className="glass rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-gray-400">
              No reported items found matching search queries or filters.
            </div>
          )}
        </div>

      </div>

      {/* Right Details Panel */}
      <div className="flex-1 p-6 bg-[#0a0a0f]/10 min-h-[350px] lg:min-h-0">
        <ItemDetailsPanel item={selectedItem} />
      </div>

      {/* Report Modal */}
      {showForm && (
        <ReportForm
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
