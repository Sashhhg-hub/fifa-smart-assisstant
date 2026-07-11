import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSelector } from './LanguageSelector';
import { TranslationCard } from './TranslationCard';
import { TranslationHistory } from './TranslationHistory';

export function LiveTranslation() {
  const {
    languages,
    sourceLang,
    targetLang,
    inputText,
    translatedText,
    isTranslating,
    history,
    selectSourceLang,
    selectTargetLang,
    setInputText,
    translateText,
    swapLanguages,
    clearText,
    clearHistory,
  } = useTranslation();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<string>('');

  const startVoiceRecording = () => {
    if (isRecording) return;
    setIsRecording(true);
    setRecordProgress('Listening...');

    // Simulate voice capturing
    setTimeout(() => {
      setRecordProgress('Processing voice audio...');
      
      setTimeout(() => {
        // Pre-populate a common stadium voice request
        setInputText('Where is the nearest medical clinic?');
        setIsRecording(false);
        setRecordProgress('');
      }, 1500);

    }, 2000);
  };

  const handleSuggest = (text: string) => {
    setInputText(text);
  };

  const suggestions = [
    "Where is the nearest medical clinic?",
    "How do I get to Section 118?",
    "When does the second half start?",
    "Goaaal! What a fantastic game!",
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden lg:flex-row">
      
      {/* LEFT CONTENT: TRANSLATOR WORKSPACE */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#0a0a0f]/10">
        
        {/* Header */}
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
            FIFA STADIUM TRANSLATION CENTER
          </span>
          <h2 className="text-2xl font-black text-white mt-0.5 tracking-tight flex items-center gap-2">
            Live Translation <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Translate matchday questions, guidelines, and conversation signs instantly.
          </p>
        </div>

        {/* Translation Card Input/Controls panel */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0d12]/80 to-[#100d17]/80 p-6 shadow-xl backdrop-blur-xl mb-6">
          
          {/* Languages Selector Row */}
          <div className="flex flex-col sm:flex-row items-end gap-4 mb-5 pb-5 border-b border-white/5">
            <LanguageSelector
              languages={languages}
              selectedCode={sourceLang}
              onSelect={selectSourceLang}
              label="Source Language"
            />
            
            {/* Swap button */}
            <button
              onClick={swapLanguages}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white mb-0.5"
              title="Swap Languages"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>

            <LanguageSelector
              languages={languages}
              selectedCode={targetLang}
              onSelect={selectTargetLang}
              label="Target Language"
            />
          </div>

          {/* Text Input area */}
          <div className="flex flex-col gap-2 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type matching stadium questions or click mic to dictate..."
              className="w-full h-32 rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-4 text-xs text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 resize-none pr-12 font-medium leading-relaxed"
            />

            {/* Mic button */}
            <button
              onClick={startVoiceRecording}
              disabled={isRecording}
              className={`absolute right-4.5 top-4.5 flex h-9.5 w-9.5 items-center justify-center rounded-xl transition-all shadow-inner border ${
                isRecording
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Voice Dictation Simulator"
            >
              🎤
            </button>

            {/* Simulated Recording Speech Box Overlay */}
            {isRecording && (
              <div className="absolute inset-0 bg-[#0a0a0f]/90 rounded-xl flex flex-col items-center justify-center gap-3 animate-fade-in z-10 p-4">
                {/* Wave animation */}
                <div className="flex items-center gap-1 h-6">
                  <span className="w-1.5 bg-rose-500 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 bg-rose-500 rounded-full animate-bounce h-5" style={{ animationDelay: '100ms' }} />
                  <span className="w-1.5 bg-rose-500 rounded-full animate-bounce h-3" style={{ animationDelay: '200ms' }} />
                  <span className="w-1.5 bg-rose-500 rounded-full animate-bounce h-6" style={{ animationDelay: '300ms' }} />
                  <span className="w-1.5 bg-rose-500 rounded-full animate-bounce h-4" style={{ animationDelay: '400ms' }} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">{recordProgress}</span>
                <span className="text-[9px] text-gray-500">Simulating microphone voice capture...</span>
              </div>
            )}
          </div>

          {/* Submit Actions row */}
          <div className="flex items-center justify-between gap-3 mt-5">
            {inputText && (
              <button
                onClick={clearText}
                className="text-xs font-bold text-gray-500 hover:text-gray-300 transition-colors"
              >
                Clear Text
              </button>
            )}
            
            <button
              onClick={translateText}
              disabled={isTranslating || !inputText.trim()}
              className="ml-auto rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-xs font-bold text-white shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:brightness-110 active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isTranslating ? 'Translating...' : 'Translate'}
            </button>
          </div>

        </div>

        {/* Translation Output Card */}
        <div className="mb-6">
          <TranslationCard
            originalText={inputText}
            translatedText={translatedText}
            isTranslating={isTranslating}
            sourceLang={sourceLang}
            targetLang={targetLang}
            languages={languages}
          />
        </div>

        {/* Suggestion list Chips */}
        <div className="mt-8">
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mb-3">
            Popular Phrases
          </label>
          <div className="flex flex-wrap gap-2.5">
            {suggestions.map((suggest) => (
              <button
                key={suggest}
                onClick={() => handleSuggest(suggest)}
                className="rounded-lg bg-white/5 border border-white/5 px-3 py-2 text-[10.5px] font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                {suggest}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR: RECENT HISTORY RECORDINGS */}
      <div className="w-full flex flex-col bg-[#0a0a0f]/40 p-6 lg:w-[380px] lg:shrink-0 lg:overflow-y-auto border-l border-white/10">
        <TranslationHistory
          history={history}
          languages={languages}
          onClearHistory={clearHistory}
        />
      </div>

    </div>
  );
}
