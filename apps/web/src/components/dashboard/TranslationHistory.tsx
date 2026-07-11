import { useState } from 'react';
import { type TranslationLog, type Language } from '../../hooks/useTranslation';

interface TranslationHistoryProps {
  history: TranslationLog[];
  languages: Language[];
  onClearHistory: () => void;
}

export function TranslationHistory({ history, languages, onClearHistory }: TranslationHistoryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getLanguageName = (code: string): string => {
    return languages.find((l) => l.code === code)?.name || code;
  };

  const getLanguageFlag = (code: string): string => {
    return languages.find((l) => l.code === code)?.flag || '🌐';
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3.5 mb-4">
        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
          Translation History
        </label>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-[9.5px] font-bold text-gray-500 hover:text-rose-400 transition-colors uppercase tracking-wider leading-none"
          >
            Clear All
          </button>
        )}
      </div>

      {/* History scroll list */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
        {history.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-500 italic">
            No recent translation logs recorded.
          </div>
        ) : (
          history.map((log) => (
            <div
              key={log.id}
              className="relative group rounded-xl border border-white/5 bg-white/5 p-3.5 transition-all duration-300 hover:border-white/10 hover:bg-white/10"
            >
              {/* Header languages flag banner */}
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/5">
                <div className="flex items-center gap-1.5 text-[9.5px] font-extrabold text-gray-400">
                  <span>{getLanguageFlag(log.sourceLang)}</span>
                  <span>{getLanguageName(log.sourceLang)}</span>
                  <span className="text-gray-600">→</span>
                  <span>{getLanguageFlag(log.targetLang)}</span>
                  <span>{getLanguageName(log.targetLang)}</span>
                </div>
                <span className="text-[8.5px] text-gray-500 font-medium">
                  {log.timestamp}
                </span>
              </div>

              {/* Original vs Translated */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] text-gray-400 font-bold leading-normal italic truncate">
                  "{log.originalText}"
                </p>
                <p className="text-xs text-white font-extrabold leading-tight tracking-tight mt-0.5">
                  {log.translatedText}
                </p>
              </div>

              {/* Hover quick copy floating button */}
              <button
                onClick={() => handleCopyText(log.id, log.translatedText)}
                className="absolute right-3.5 bottom-3.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0a0a0f] border border-white/10 rounded-lg p-1.5 text-xs text-gray-400 hover:text-white hover:border-white/25"
                title="Copy Translation"
              >
                {copiedId === log.id ? '✅' : '📋'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
