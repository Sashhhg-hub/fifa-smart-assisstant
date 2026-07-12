import { useState } from 'react';
import { LOST_FOUND_CATEGORIES } from '../../constants/lostFoundData';

interface ReportFormProps {
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    category: string;
    description: string;
    type: 'lost' | 'found';
    collectionLocation: string;
    contactInfo: string;
    claimInstructions: string;
  }) => void;
}

export function ReportForm({ onClose, onSubmit }: ReportFormProps) {
  const [type, setType] = useState<'lost' | 'found'>('lost');
  const [name, setName] = useState('');
  const [category, setCategory] = useState(LOST_FOUND_CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !contact.trim()) return;

    // Calculate realistic defaults based on lost vs found type
    const collectionLocation = type === 'lost'
      ? 'Lost & Found Center - Section 124'
      : `Guest Services Desk near ${location || 'Main Lobby'}`;

    const claimInstructions = type === 'lost'
      ? `To claim, please present your photographic identification matching the report details at ${collectionLocation}.`
      : `Item is registered in processing. Please drop off the item at ${collectionLocation} as soon as possible.`;

    onSubmit({
      name,
      category,
      description: `${description}. Location context: ${location || 'Not specified'}.`,
      type,
      collectionLocation,
      contactInfo: contact,
      claimInstructions,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="glass max-w-lg w-full rounded-2xl border border-white/10 bg-[#0a0a0f]/95 p-6 shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

        {/* Modal Header */}
        <div className="mb-5 flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="text-base font-black tracking-wide text-white uppercase">
            File Lost & Found Report
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          
          {/* Report Type Toggle */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">
              Report Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('lost')}
                className={`py-2.5 rounded-xl border text-center font-bold tracking-wider transition-all ${
                  type === 'lost'
                    ? 'bg-rose-500/15 border-rose-500/40 text-rose-400 shadow-[0_0_12px_rgba(239,68,68,0.1)]'
                    : 'border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                🚨 I Lost Something
              </button>
              <button
                type="button"
                onClick={() => setType('found')}
                className={`py-2.5 rounded-xl border text-center font-bold tracking-wider transition-all ${
                  type === 'found'
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.1)]'
                    : 'border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                🔎 I Found Something
              </button>
            </div>
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1.5">
              Item Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. iPhone 15 Pro, Black Leather Wallet"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-white placeholder-gray-500 transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] py-2.5 px-4 text-white transition-all focus:border-cyan-400/50 focus:outline-none"
            >
              {LOST_FOUND_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1.5">
              Item Description
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe color, size, branding, stickers or lock screens..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-white placeholder-gray-500 transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none resize-none"
            />
          </div>

          {/* Location details */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1.5">
              Location details (Where?)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Near Section 114 Row 15, or Plaza B Concessions"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-white placeholder-gray-500 transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none"
            />
          </div>

          {/* Contact Details */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1.5">
              Your Contact Information
            </label>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="e.g. email@domain.com or phone number"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-white placeholder-gray-500 transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4 border-t border-white/5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 font-bold text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3 font-black uppercase tracking-wider text-white shadow-xl hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Submit Report
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
