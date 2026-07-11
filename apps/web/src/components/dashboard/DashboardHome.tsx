import { DashboardCard } from './DashboardCard';
import type { SidebarTab } from './Sidebar';

interface DashboardHomeProps {
  onNavigateTab: (tab: SidebarTab) => void;
}

export function DashboardHome({ onNavigateTab }: DashboardHomeProps) {
  // Mock activity logs
  const activities = [
    { time: '12:45 PM', text: 'Checked in at Gate 4 (Security cleared)' },
    { time: '01:10 PM', text: 'Ordered food from Concession Stand B' },
    { time: '01:25 PM', text: 'Spoke with AI Concierge regarding seat directions' },
    { time: '01:30 PM', text: 'Order picked up at Concession Stand B' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Top Banner Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Welcome Back Card */}
        <div className="lg:col-span-2">
          <DashboardCard
            hoverable={false}
            className="h-full bg-gradient-to-br from-cyan-900/30 via-slate-900/50 to-purple-900/20 border-cyan-500/20"
          >
            <div className="flex flex-col justify-between h-full gap-6 md:flex-row md:items-center">
              <div className="flex flex-col gap-2">
                <span className="inline-flex max-w-fit items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Live Event Mode
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Welcome to MetLife Stadium, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Alex</span>!
                </h2>
                <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                  Your entry at Gate 4 was recorded. Below is your seat guidance. Keep this dashboard handy for live queue monitoring and stadium support.
                </p>
              </div>

              {/* Mock Ticket Stub */}
              <div className="w-full md:w-64 border border-white/10 rounded-2xl bg-white/5 p-4 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl shrink-0">
                <div className="absolute -left-3 top-1/2 h-6 w-6 rounded-full bg-[#0a0a0f] border-r border-white/10 -translate-y-1/2" />
                <div className="absolute -right-3 top-1/2 h-6 w-6 rounded-full bg-[#0a0a0f] border-l border-white/10 -translate-y-1/2" />
                
                <div className="border-b border-white/10 pb-3 mb-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-cyan-400 tracking-wider">FIFA WORLD CUP</span>
                    <span className="text-xs font-semibold text-white">ROUND OF 16</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400">MATCH 52</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center relative z-10">
                  <div className="flex flex-col bg-white/5 rounded-lg py-1.5 border border-white/5">
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Section</span>
                    <span className="text-sm font-bold text-white">114</span>
                  </div>
                  <div className="flex flex-col bg-white/5 rounded-lg py-1.5 border border-white/5">
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Row</span>
                    <span className="text-sm font-bold text-white">12</span>
                  </div>
                  <div className="flex flex-col bg-white/5 rounded-lg py-1.5 border border-white/5">
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Seat</span>
                    <span className="text-sm font-bold text-white">4</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-white/10 flex items-center justify-between">
                  <span className="text-[9px] text-gray-400 font-medium">Gate Entrance: 4</span>
                  <span className="text-[9px] text-cyan-400 font-bold uppercase">Ready to Scan</span>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Today's Match Card */}
        <DashboardCard
          title="Today's Match"
          subtitle="Live Fixture"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.75A1.125 1.125 0 0 1 10.5 12V3.75m3.75 15v-4.5A1.125 1.125 0 0 0 13.125 13h-2.25a1.125 1.125 0 0 0-1.125 1.125v4.5m9-9h-9M12 10.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
            </svg>
          }
          badge={
            <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
              LIVE 67'
            </span>
          }
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-center mt-2">
              <div className="flex flex-col items-center gap-1.5 w-24">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/30 border border-blue-400/30 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                  ARG
                </div>
                <span className="text-xs font-semibold text-gray-200">Argentina</span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-3xl font-extrabold text-white tracking-wider">2 - 1</span>
                <span className="text-[10px] text-gray-500">Goal: Messi (14'), Alvarez (52')</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 w-24">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/30 border border-purple-400/30 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                  FRA
                </div>
                <span className="text-xs font-semibold text-gray-200">France</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col gap-1 text-[11px] text-gray-400">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-white font-medium">MetLife Stadium, NYNJ</span>
              </div>
              <div className="flex justify-between">
                <span>Referee:</span>
                <span className="text-white font-medium">Szymon Marciniak</span>
              </div>
              <div className="flex justify-between">
                <span>Stage:</span>
                <span className="text-white font-medium">Knockout Stage</span>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Main Grid Options */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Stadium Status Card */}
        <DashboardCard
          title="Stadium Status"
          subtitle="Real-time occupancy & services"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12" />
            </svg>
          }
        >
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-gray-400">Stadium Capacity</span>
                <span className="font-semibold text-cyan-400">92% (75,840 fans)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between rounded-lg bg-white/5 border border-white/5 p-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                  <span className="text-xs text-gray-200">Gate 4 Entrance</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Wait Time: 2 min</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-white/5 border border-white/5 p-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
                  <span className="text-xs text-gray-200">Concession Line B</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Wait Time: 12 min</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-white/5 border border-white/5 p-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                  <span className="text-xs text-gray-200">North Restrooms</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Wait Time: 1 min</span>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Quick Actions Card */}
        <DashboardCard
          title="Quick Actions"
          subtitle="Navigate assistant services"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
          }
        >
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              onClick={() => onNavigateTab('concierge')}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-center transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:-translate-y-0.5 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-3.658A8.967 8.967 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-300">Ask Concierge</span>
            </button>

            <button
              onClick={() => onNavigateTab('navigation')}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-center transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:-translate-y-0.5 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25g7.5-9 7.5 9z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-300">Find My Seat</span>
            </button>

            <button
              onClick={() => onNavigateTab('food')}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-center transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:-translate-y-0.5 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-300">Order Food</span>
            </button>

            <button
              onClick={() => onNavigateTab('translation')}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-center transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:-translate-y-0.5 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-300">Translate</span>
            </button>
          </div>
        </DashboardCard>

        {/* Weather Card */}
        <DashboardCard
          title="Weather Forecast"
          subtitle="Match day climate info"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 .375-7.485A5.25 5.25 0 0 0 8.25 9.75 4.5 4.5 0 0 0 2.25 15Z" />
            </svg>
          }
        >
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-yellow-400 text-3xl">
                ☀️
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24°C</div>
                <span className="text-xs text-gray-400 font-medium">Clear Sky — High of 26°C</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-lg bg-white/5 border border-white/5 p-2 flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Humidity</span>
                <span className="text-sm font-bold text-white mt-0.5">45%</span>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/5 p-2 flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Wind</span>
                <span className="text-sm font-bold text-white mt-0.5">12 km/h</span>
              </div>
            </div>

            <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Retractable Roof
              </div>
              <span className="font-bold text-white uppercase tracking-wider">Closed</span>
            </div>
          </div>
        </DashboardCard>

        {/* Emergency Contacts Card */}
        <DashboardCard
          title="Emergency Contacts"
          subtitle="Instant assistance access"
          icon={
            <svg className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622" />
            </svg>
          }
        >
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => onNavigateTab('emergency')}
              className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-left transition-all duration-300 hover:bg-red-500/10 group w-full"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400 group-hover:scale-105 transition-transform">
                  🚨
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Stadium Security</span>
                  <span className="text-[10px] text-gray-400">Response time under 2 mins</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest group-hover:translate-x-0.5 transition-transform">CALL</span>
            </button>

            <button
              onClick={() => onNavigateTab('emergency')}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-left transition-all duration-300 hover:bg-white/10 group w-full"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 group-hover:scale-105 transition-transform">
                  🏥
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">First Aid Clinic</span>
                  <span className="text-[10px] text-gray-400">Located at Section 118</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest group-hover:translate-x-0.5 transition-transform">CALL</span>
            </button>
          </div>
        </DashboardCard>

        {/* Recent Activity Card */}
        <div className="md:col-span-2 lg:col-span-2">
          <DashboardCard
            title="Recent Activity"
            subtitle="Match day timeline logs"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            }
          >
            <div className="relative pl-4 border-l border-white/10 mt-3 flex flex-col gap-4">
              {activities.map((act, index) => (
                <div key={index} className="relative flex justify-between gap-4 text-xs">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border border-[#0a0a0f] bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                  <span className="text-gray-300 font-medium">{act.text}</span>
                  <span className="text-gray-500 font-bold shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
