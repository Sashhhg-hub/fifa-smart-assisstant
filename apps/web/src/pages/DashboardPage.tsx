import { useState } from 'react';
import { Sidebar, type SidebarTab } from '../components/dashboard/Sidebar';
import { Header } from '../components/dashboard/Header';
import { DashboardHome } from '../components/dashboard/DashboardHome';
import { ChatConcierge } from '../components/dashboard/ChatConcierge';
import { StadiumNavigation } from '../components/dashboard/StadiumNavigation';
import { MatchHub } from '../components/dashboard/MatchHub';
import { FoodFinder } from '../components/dashboard/FoodFinder';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Helper to render the active panel content
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome onNavigateTab={setActiveTab} />;
      case 'concierge':
        return <ChatConcierge />;
      case 'navigation':
        return <StadiumNavigation />;
      case 'match':
        return <MatchHub />;
      case 'food':
        return <FoodFinder onNavigateTab={setActiveTab} />;
      default:
        // Render a premium placeholder message for upcoming modules as they are highlighted
        return (
          <div className="flex h-[calc(100vh-12rem)] items-center justify-center p-6">
            <div className="glass max-w-md rounded-2xl p-8 text-center border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl" />
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-2xl text-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                ⚙️
              </div>
              <h3 className="mb-2 text-xl font-bold text-white uppercase tracking-wide">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module Active
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                This item is now highlighted in the sidebar. The dedicated functional interface for this module will be connected in a future implementation phase.
              </p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:brightness-110"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-gray-100 overflow-hidden">
      {/* Sidebar navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main dashboard frame */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header toolbar */}
        <Header />

        {/* Scrollable workspace content */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a0f]/20">
          <div className="mx-auto max-w-7xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
