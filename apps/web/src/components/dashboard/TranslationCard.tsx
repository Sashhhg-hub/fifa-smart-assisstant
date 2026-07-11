import { useState } from 'react';
import { type Language } from '../../hooks/useTranslation';

interface TranslationCardProps {
  originalText: string;
  translatedText: string;
  isTranslating: boolean;
  sourceLang: string;
  targetLang: string;
  languages: Language[];
}

export function TranslationCard({
  originalText,
  translatedText,
  isTranslating,
  sourceLang,
  targetLang,
  languages,
}: TranslationCardProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);

  const sourceLangName = languages.find((l) => l.code === sourceLang)?.name || 'Original';
  const targetLangName = languages.find((l) => l.code === targetLang)?.name || 'Translation';

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!translatedText || speaking) return;
    setSpeaking(true);
    
    // Simulate text-to-speech synthesis playing
    setTimeout(() => {
      setSpeaking(false);
    }, 2500);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0d12]/80 to-[#100d17]/80 p-6 shadow-xl backdrop-blur-xl">
      {/* Visual warning backdrop glow for translation context */}
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Inputs vs Outputs split */}
      <div className="flex flex-col gap-5">
        
        {/* 1. ORIGINAL TEXT ROW */}
        {originalText && (
          <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4.5 animate-fade-in">
            <span className="text-[9.5px] font-black text-gray-500 uppercase tracking-widest leading-none">
              Input Text ({sourceLangName})
            </span>
            <p className="text-sm font-bold text-gray-300 mt-1 leading-relaxed">
              {originalText}
            </p>
          </div>
        )}

        {/* 2. TRANSLATION CONSOLE CHUNK */}
        <div className="flex flex-col gap-1.5 relative">
          <span className="text-[9.5px] font-black text-cyan-400 uppercase tracking-widest leading-none">
            Translated Text ({targetLangName})
          </span>

          {/* Translating loader state */}
          {isTranslating ? (
            <div className="flex items-center gap-3 py-6 animate-pulse">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
              <span className="text-xs font-bold text-gray-400">Processing translation dictionary...</span>
            </div>
          ) : translatedText ? (
            <div className="mt-2.5 animate-fade-in">
              <p className="text-base font-black text-white leading-relaxed tracking-tight">
                {translatedText}
              </p>

              {/* Action Buttons row */}
              <div className="flex items-center gap-2 mt-5 border-t border-white/5 pt-4">
                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/5 px-3.5 py-2 text-xs font-bold text-gray-300 transition-all hover:bg-white/10 hover:text-white"
                >
                  <span>{copied ? '✅' : '📋'}</span>
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                {/* Speech audio simulator button */}
                <button
                  onClick={handleSpeak}
                  disabled={speaking}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-bold transition-all ${
                    speaking
                      ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400 animate-pulse'
                      : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{speaking ? '🔊' : '🔈'}</span>
                  <span>{speaking ? 'Speaking...' : 'Speak'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-xs text-gray-500 italic leading-none">
              Translations will appear here once you enter text and click Translate.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
