import { type Language } from '../../hooks/useTranslation';

interface LanguageSelectorProps {
  languages: Language[];
  selectedCode: string;
  onSelect: (code: string) => void;
  label: string;
}

export function LanguageSelector({ languages, selectedCode, onSelect, label }: LanguageSelectorProps) {

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-cyan-400">
        {label}
      </span>
      
      <div className="relative">
        <select
          value={selectedCode}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-white shadow-sm outline-none transition-all duration-300 hover:border-white/20 focus:border-cyan-400/50 focus:bg-[#0a0a0f]"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-[#0a0a0f] text-white">
              {lang.flag} &nbsp; {lang.name}
            </option>
          ))}
        </select>
        
        {/* Custom Dropdown Chevron Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
