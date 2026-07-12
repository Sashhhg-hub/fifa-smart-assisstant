import { type LostFoundItem } from '../../constants/lostFoundData';

interface ItemDetailsPanelProps {
  item: LostFoundItem | null;
}

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

export function ItemDetailsPanel({ item }: ItemDetailsPanelProps) {
  if (!item) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-gray-400">
        Select a reported item from the list to view claim instructions and matching details.
      </div>
    );
  }

  const emoji = CATEGORY_EMOJIS[item.category] || '📦';

  const getStatusColor = (status: LostFoundItem['status']) => {
    switch (status) {
      case 'Reported':
        return 'text-amber-400';
      case 'Processing':
        return 'text-blue-400';
      case 'Matched':
        return 'text-purple-400';
      case 'Ready for Pickup':
        return 'text-emerald-400';
      case 'Claimed':
        return 'text-gray-400';
    }
  };

  const getFormattedDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="glass flex h-full flex-col justify-between overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0f]/60 p-6 shadow-2xl relative">
      <div className="absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl" />

      <div>
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{emoji}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`rounded px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider ${
                  item.type === 'lost'
                    ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                    : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
                }`}>
                  {item.type} Report
                </span>
                <span className="text-[10px] font-semibold text-gray-500">ID: {item.claimId}</span>
              </div>
              <h2 className="text-lg font-black text-white leading-tight mt-1.5">
                {item.name}
              </h2>
            </div>
          </div>

          <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
            item.status === 'Ready for Pickup'
              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
              : 'bg-white/5 border-white/10 text-gray-300'
          }`}>
            {item.status}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col">
            <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider">Reported Date</span>
            <span className="text-xs font-semibold text-white mt-1.5 truncate">
              {new Date(item.dateReported).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col">
            <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider">Claim Status</span>
            <span className={`text-xs font-black uppercase mt-1.5 tracking-wider ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          </div>
        </div>

        {/* Detailed Fields */}
        <div className="flex flex-col gap-3 text-xs mb-6">
          {/* Description */}
          <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Description:</span>
            <p className="text-gray-200 mt-1 leading-relaxed font-medium">
              {item.description}
            </p>
          </div>

          {/* Collection Point */}
          <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Collection Location:</span>
            <span className="text-white font-semibold mt-0.5">{item.collectionLocation}</span>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Contact Information:</span>
            <span className="text-cyan-400 font-semibold mt-0.5">{item.contactInfo}</span>
          </div>

          {/* Date Details */}
          <div className="flex flex-col gap-1 rounded-xl bg-white/5 border border-white/5 px-4 py-3.5">
            <span className="text-gray-400 font-medium">Full Report Timestamp:</span>
            <span className="text-white font-semibold mt-0.5">{getFormattedDate(item.dateReported)}</span>
          </div>

          {/* Claim Instructions Banner */}
          <div className="flex flex-col gap-1.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 px-4 py-3.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <span>📋</span>
              <span>Claim & Verification Instructions</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-[11px] mt-0.5 font-medium">
              {item.claimInstructions}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="rounded-xl border border-white/5 bg-[#12121e]/30 p-4 text-center text-[10px] text-gray-500 leading-relaxed">
        If you have found or lost this item, you can reference the unique Claim ID <span className="font-bold text-gray-300">#{item.claimId}</span> at the designated Guest Services desk.
      </div>
    </div>
  );
}
