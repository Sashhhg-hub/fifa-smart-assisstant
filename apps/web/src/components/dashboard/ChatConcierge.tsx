import { useEffect, useRef, useState } from 'react';
import { useChatSession } from '../../hooks/useChatSession';

// Simple text formatter for rich text responses
function formatMessage(text: string) {
  // Split by double newlines or single newlines
  return text.split('\n').map((line, index) => {
    let formattedLine = line;
    
    // Bold markers: **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    formattedLine = formattedLine.replace(boldRegex, '<strong>$1</strong>');

    // Bullet points: - text
    if (formattedLine.trim().startsWith('- ')) {
      return (
        <li
          key={index}
          className="ml-4 list-disc text-sm text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedLine.trim().substring(2) }}
        />
      );
    }

    return (
      <p
        key={index}
        className="text-sm leading-relaxed mb-1.5 last:mb-0"
        dangerouslySetInnerHTML={{ __html: formattedLine }}
      />
    );
  });
}

export function ChatConcierge() {
  const { messages, isTyping, sendMessage } = useChatSession();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: 'Find my seat', icon: '🎫' },
    { text: 'Nearest food court', icon: '🍔' },
    { text: 'Translate this sign', icon: '🗣️' },
    { text: 'Where is Gate B?', icon: '🚪' },
    { text: 'Medical emergency', icon: '🚨' },
    { text: 'Accessible route', icon: '♿' },
  ];

  // Auto Scroll to Bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleQuickPromptClick = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Left Chat Area */}
      <div className="flex flex-1 flex-col justify-between border-r border-white/10 bg-[#0a0a0f]/20">
        
        {/* Chat Header Status Indicator */}
        <div className="glass flex items-center justify-between border-x-0 border-t-0 border-b border-white/5 bg-[#0a0a0f]/40 px-6 py-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-white">Gemini Concierge</h2>
              <span className="text-[10px] text-gray-400 font-medium">Active Matchday Assistant</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
            <span>MetLife Live</span>
          </div>
        </div>

        {/* Conversation Viewport */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {messages.length === 0 ? (
            /* Welcome State */
            <div className="flex h-full flex-col justify-center max-w-2xl mx-auto py-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-3xl text-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.15)] animate-pulse">
                🤖
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-2 sm:text-3xl">
                FIFA Smart Assistant Concierge
              </h1>
              <p className="text-sm text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
                Your AI companion for FIFA matches. Ask questions about seat maps, concessions, navigation, translations, or safety alerts.
              </p>

              {/* Quick Prompt Cards */}
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.text}
                    onClick={() => handleQuickPromptClick(prompt.text)}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-left transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:-translate-y-0.5"
                  >
                    <span className="text-lg">{prompt.icon}</span>
                    <span className="text-xs font-semibold text-gray-300">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Chat Bubbles List */
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-tr-none'
                        : 'glass border-white/5 bg-white/5 text-gray-200 rounded-tl-none'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                    ) : (
                      <div className="space-y-1">{formatMessage(msg.text)}</div>
                    )}
                    <span className="mt-1 block text-[9px] text-right opacity-60">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex w-full justify-start">
                  <div className="glass rounded-2xl rounded-tl-none border-white/5 bg-white/5 px-4 py-3 shadow-lg">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-white/10 bg-[#0a0a0f]/45 px-6 py-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
            
            {/* Attachment Button (UI Only) */}
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m0 0l-5.656-5.656" />
              </svg>
            </button>

            {/* Microphone Button (UI Only) */}
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </button>

            {/* Input Element */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about the stadium, food, or seats..."
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-sm text-white placeholder-gray-400 transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 disabled:shadow-none"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Right Side Info Panel (hides on mobile, showing on desktop) */}
      <aside className="hidden w-80 overflow-y-auto bg-[#0a0a0f]/40 p-6 lg:block border-l border-white/10">
        <div className="space-y-6">
          
          {/* Status section */}
          <div className="glass rounded-2xl p-4 border border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">AI Agent Status</h3>
            <div className="flex flex-col gap-2.5 text-xs text-gray-300">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Model Profile:</span>
                <span className="text-white font-semibold">Gemini 1.5 Flash</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>System Latency:</span>
                <span className="text-green-400 font-semibold">120ms</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Active Channels:</span>
                <span className="text-white font-semibold">Live GPS / Concessions</span>
              </div>
            </div>
          </div>

          {/* Languages section */}
          <div className="glass rounded-2xl p-4 border border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">Supported Languages</h3>
            <div className="flex flex-wrap gap-1.5">
              {['English', 'Español', 'Français', 'Português', 'Deutsch', 'العربية', '日本語'].map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-[10px] text-gray-300"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Stadium Specs section */}
          <div className="glass rounded-2xl p-4 border border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">Stadium Information</h3>
            <div className="flex flex-col gap-2 text-xs text-gray-300">
              <div>
                <span className="block text-[10px] text-gray-400 font-bold uppercase">Name</span>
                <span className="text-sm font-semibold text-white">MetLife Stadium</span>
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 font-bold uppercase">Location</span>
                <span className="text-sm font-semibold text-white">East Rutherford, NJ</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase">Wi-Fi SSID</span>
                  <span className="text-xs font-semibold text-white">MetLife_Guest_WiFi</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase">Remaining Matches</span>
                  <span className="text-xs font-semibold text-white">4 Fixtures</span>
                </div>
              </div>
            </div>
          </div>

          {/* Help Tips section */}
          <div className="glass rounded-2xl p-4 border border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">Quick Chat Tips</h3>
            <ul className="space-y-2 text-xs text-gray-400 leading-relaxed">
              <li className="flex gap-2">
                <span>📍</span>
                <span>Type <strong>"seat"</strong> or <strong>"section"</strong> to get instant navigation maps.</span>
              </li>
              <li className="flex gap-2">
                <span>🍔</span>
                <span>Type <strong>"food"</strong> or <strong>"hungry"</strong> to find concession line wait times.</span>
              </li>
              <li className="flex gap-2">
                <span>🚨</span>
                <span>Type <strong>"emergency"</strong> for medic contact details.</span>
              </li>
            </ul>
          </div>

        </div>
      </aside>
    </div>
  );
}
