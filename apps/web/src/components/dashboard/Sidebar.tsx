import type { ReactNode } from 'react';

export type SidebarTab =
  | 'dashboard'
  | 'concierge'
  | 'navigation'
  | 'food'
  | 'match'
  | 'emergency'
  | 'translation'
  | 'accessibility'
  | 'settings';

interface SidebarItemProps {
  id: SidebarTab;
  label: string;
  icon: ReactNode;
  active: boolean;
  onClick: (id: SidebarTab) => void;
  isCollapsed: boolean;
}

function SidebarItem({ id, label, icon, active, onClick, isCollapsed }: SidebarItemProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`group relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-cyan-400/10 to-blue-500/10 text-cyan-400 shadow-[inset_0_0_12px_rgba(34,211,238,0.05)] border-l-2 border-cyan-400'
          : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
      }`}
    >
      <div className={`transition-transform duration-300 group-hover:scale-110 ${active ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}`}>
        {icon}
      </div>
      {!isCollapsed && (
        <span className="truncate transition-colors duration-300">
          {label}
        </span>
      )}
      
      {/* Tooltip for collapsed mode */}
      {isCollapsed && (
        <div className="pointer-events-none absolute left-full ml-4 z-50 rounded-md bg-[#0a0a0f] border border-white/10 px-2 py-1 text-xs text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
          {label}
        </div>
      )}
    </button>
  );
}

interface SidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }: SidebarProps) {
  const menuItems: { id: SidebarTab; label: string; icon: ReactNode }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      ),
    },
    {
      id: 'concierge',
      label: 'AI Concierge',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      ),
    },
    {
      id: 'navigation',
      label: 'Stadium Navigation',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.003V4.875c0-.836-.88-1.38-1.628-1.006l-3.869 1.934a1.125 1.125 0 0 1-1.006 0L9.75 3.75 4.502 6.108c-.377.188-.502.627-.502 1.006v4.072c0 .836.88 1.38 1.628 1.006l3.869-1.934a1.125 1.125 0 0 1 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
        </svg>
      ),
    },
    {
      id: 'food',
      label: 'Food Finder',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
        </svg>
      ),
    },
    {
      id: 'match',
      label: 'Match Hub',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.75A1.125 1.125 0 0 1 10.5 12V3.75m3.75 15v-4.5A1.125 1.125 0 0 0 13.125 13h-2.25a1.125 1.125 0 0 0-1.125 1.125v4.5m9-9h-9M12 10.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
        </svg>
      ),
    },
    {
      id: 'emergency',
      label: 'Emergency',
      icon: (
        <svg className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
    },
    {
      id: 'translation',
      label: 'Live Translation',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
        </svg>
      ),
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`glass sticky top-0 flex h-screen flex-col justify-between border-y-0 border-l-0 border-r border-white/10 bg-[#0a0a0f]/50 py-6 transition-all duration-300 ${
        isCollapsed ? 'w-20 px-2' : 'w-64 px-4'
      }`}
    >
      <div className="flex flex-col gap-8">
        {/* Sidebar Header / Logo */}
        <div className={`flex items-center gap-3 px-2 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.25)]">
            F
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wider text-white">FIFA SMART</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">ASSISTANT</span>
            </div>
          )}
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              active={activeTab === item.id}
              onClick={setActiveTab}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>

      {/* Sidebar Collapse Toggle */}
      <div className="px-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/5 py-3 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white"
        >
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          {!isCollapsed && <span className="text-xs font-semibold uppercase tracking-wider">Collapse Menu</span>}
        </button>
      </div>
    </aside>
  );
}
