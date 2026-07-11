import { useState } from 'react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  const languages = ['English', 'Español', 'Français', 'Português', 'Deutsch', 'العربية'];

  const mockNotifications = [
    {
      id: 1,
      title: 'Order Ready',
      desc: 'Your Hotdog & Cola order at Concession B is ready for pickup!',
      time: '3m ago',
      unread: true,
      category: 'food',
    },
    {
      id: 2,
      title: 'Match Advisory',
      desc: 'Teams are heading onto the pitch. Kick-off in 10 minutes!',
      time: '10m ago',
      unread: true,
      category: 'match',
    },
    {
      id: 3,
      title: 'Gate Information',
      desc: 'Gate 4 is experiencing low wait times. Recommended for entry.',
      time: '25m ago',
      unread: false,
      category: 'stadium',
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <header className="glass sticky top-0 z-40 flex h-16 w-full items-center justify-between border-x-0 border-t-0 border-b border-white/10 bg-[#0a0a0f]/65 px-6 backdrop-blur-md">
      {/* Search Bar */}
      <div className="relative w-72 max-w-xs md:w-96 md:max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search stadium services, maps, menus..."
          className="w-full rounded-full border border-white/10 bg-white/5 py-1.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLanguageDropdown(!showLanguageDropdown);
              setShowNotifications(false);
              setShowProfileDropdown(false);
            }}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.003 9.003 0 0 1 8.716 5.253M12 3a9.003 9.003 0 0 0-8.716 5.253M12 12h.01M21 12c0 1.657-3.134 3-7 3s-7-1.343-7-3 3.134-3 7-3 7 1.343 7 3Z" />
            </svg>
            <span className="hidden sm:inline">{currentLang}</span>
            <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {showLanguageDropdown && (
            <div className="glass absolute right-0 mt-2 w-36 rounded-xl border border-white/10 bg-[#0a0a0f]/95 p-1 shadow-2xl backdrop-blur-2xl">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setCurrentLang(lang);
                    setShowLanguageDropdown(false);
                  }}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    lang === currentLang
                      ? 'bg-gradient-to-r from-cyan-400/10 to-blue-500/10 text-cyan-400'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowLanguageDropdown(false);
              setShowProfileDropdown(false);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            {mockNotifications.some((n) => n.unread) && (
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            )}
          </button>

          {showNotifications && (
            <div className="glass absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#0a0a0f]/95 p-4 shadow-2xl backdrop-blur-2xl">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Notifications</span>
                <button className="text-[10px] text-gray-400 hover:text-white">Mark all read</button>
              </div>
              <div className="flex flex-col gap-2.5">
                {mockNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex flex-col rounded-xl border border-white/5 p-3 transition-colors hover:bg-white/5 ${
                      notif.unread ? 'bg-white/5' : 'bg-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{notif.title}</span>
                      <span className="text-[10px] text-gray-500">{notif.time}</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 leading-relaxed">{notif.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifications(false);
              setShowLanguageDropdown(false);
            }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pr-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            {/* Mock User Avatar */}
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-0.5 shadow-[0_0_10px_rgba(34,211,238,0.25)]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0f] text-[10px] font-bold text-white">
                AM
              </div>
            </div>
            <span className="hidden text-xs font-semibold text-gray-200 sm:inline">Alex Morgan</span>
            <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {showProfileDropdown && (
            <div className="glass absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-[#0a0a0f]/95 p-4 shadow-2xl backdrop-blur-2xl">
              <div className="mb-3 border-b border-white/10 pb-3">
                <p className="text-xs font-semibold text-white">Alex Morgan</p>
                <p className="text-[10px] text-gray-400">alex.morgan@fifafan.com</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded-lg bg-white/5 p-2 text-[10px] text-gray-300">
                  <span className="block font-bold text-cyan-400 uppercase tracking-wider mb-1">Ticket Details</span>
                  <p>Stadium: MetLife Stadium</p>
                  <p>Seat: Sec 114, Row 12, Seat 4</p>
                  <p>Category: Round of 16</p>
                </div>
                <button className="mt-2 w-full rounded-lg bg-red-500/10 border border-red-500/20 py-2 text-center text-xs font-medium text-red-400 hover:bg-red-500/20">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
