import { type LostFoundItem } from '../../constants/lostFoundData';

interface LostItemCardProps {
  item: LostFoundItem;
  isSelected: boolean;
  onClick: () => void;
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

export function LostItemCard({ item, isSelected, onClick }: LostItemCardProps) {
  const emoji = CATEGORY_EMOJIS[item.category] || '📦';

  const getStatusStyle = (status: LostFoundItem['status']) => {
    switch (status) {
      case 'Reported':
        return 'bg-amber-500/10 border-amber-500/25 text-amber-400';
      case 'Processing':
        return 'bg-blue-500/10 border-blue-500/25 text-blue-400';
      case 'Matched':
        return 'bg-purple-500/10 border-purple-500/25 text-purple-400';
      case 'Ready for Pickup':
        return 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]';
      case 'Claimed':
        return 'bg-gray-500/10 border-white/10 text-gray-400';
    }
  };

  const getFormattedDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`glass group relative cursor-pointer rounded-2xl border p-4.5 transition-all duration-300 hover:scale-[1.01] ${
        isSelected
          ? 'bg-gradient-to-br from-cyan-950/20 to-slate-900/40 border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
          : 'border-white/5 bg-[#12121e]/20 hover:border-white/15 hover:bg-[#12121e]/40'
      }`}
    >
      {/* Type indicator vertical band */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
        item.type === 'lost' ? 'bg-rose-500' : 'bg-cyan-400'
      }`} />

      {/* Header Info */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 pl-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg">
            {emoji}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`rounded px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider ${
                item.type === 'lost'
                  ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                  : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
              }`}>
                {item.type}
              </span>
              <span className="text-[10px] text-gray-500">#{item.claimId}</span>
            </div>
            <h3 className="text-sm font-bold text-white transition-colors group-hover:text-cyan-300 mt-1">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${getStatusStyle(item.status)}`}>
          {item.status}
        </span>
      </div>

      {/* Body Description snippet */}
      <p className="pl-1 text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
        {item.description}
      </p>

      {/* Date Footer */}
      <div className="pl-1 border-t border-white/5 pt-2.5 flex items-center justify-between text-[10px] text-gray-500">
        <span className="font-semibold">{item.category}</span>
        <span>{getFormattedDate(item.dateReported)}</span>
      </div>
    </div>
  );
}
