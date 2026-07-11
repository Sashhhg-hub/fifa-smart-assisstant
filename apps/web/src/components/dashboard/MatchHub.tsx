import { useMatchHub, type MatchEvent, type UpcomingEvent } from '../../hooks/useMatchHub';
import { DashboardCard } from './DashboardCard';

export function MatchHub() {
  const {
    matchMinutes,
    isLive,
    team1,
    team2,
    timelineEvents,
    stats,
    stadiumInfo,
    upcomingEvents,
    playerSpotlight,
  } = useMatchHub();

  // Helper to render timeline icons and styles
  const getEventIcon = (type: MatchEvent['type']) => {
    switch (type) {
      case 'goal':
        return { emoji: '⚽', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'yellow_card':
        return { emoji: '🟨', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
      case 'red_card':
        return { emoji: '🟥', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' };
      case 'substitution':
        return { emoji: '🔄', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' };
      case 'var':
        return { emoji: '🔍', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* 1. HERO MATCH CARD */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1324]/80 via-[#0f111a]/90 to-[#1c0f2b]/80 p-8 shadow-2xl backdrop-blur-2xl">
        {/* Dynamic Glowing Accent lines */}
        <div className="absolute left-1/4 top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
        <div className="absolute right-1/4 bottom-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
        
        {/* Decorative corner glows */}
        <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-48 w-48 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Team 1 (ARG) */}
          <div className="flex flex-1 flex-col items-center gap-3 text-center md:items-end md:text-right">
            {/* Team Flag Shield */}
            <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl border ${team1.borderColor} bg-[#0a0a0f] p-1.5 shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-transform duration-300 hover:scale-105`}>
              <div className={`h-full w-full rounded-xl bg-gradient-to-r ${team1.bgGradient} flex flex-col justify-between overflow-hidden relative border border-white/5`}>
                {/* Sun logo symbol representation in gold */}
                <div className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight sm:text-2xl">{team1.name}</h2>
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">{team1.shortName}</span>
            </div>
          </div>

          {/* Core Scoreboard Display */}
          <div className="flex flex-col items-center justify-center px-4 py-2 shrink-0">
            {/* Live Indicator / Tournament Info */}
            <div className="mb-4 flex flex-col items-center gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                FIFA World Cup • Round of 16
              </span>
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  Live Match
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Full Time
                </span>
              )}
            </div>

            {/* Score */}
            <div className="flex items-center gap-6">
              <span className="text-5xl font-black tracking-tight text-white sm:text-6xl">{stats.shots[0] > 0 ? 2 : 0}</span>
              <span className="text-2xl font-bold text-gray-500">:</span>
              <span className="text-5xl font-black tracking-tight text-white sm:text-6xl">{stats.shots[1] > 0 ? 1 : 0}</span>
            </div>

            {/* Timer Clock */}
            <div className="mt-4 flex flex-col items-center gap-0.5">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider">
                {matchMinutes}'
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                MetLife Stadium, NYNJ
              </span>
            </div>
          </div>

          {/* Team 2 (FRA) */}
          <div className="flex flex-1 flex-col items-center gap-3 text-center md:items-start md:text-left">
            {/* Team Flag Shield */}
            <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl border ${team2.borderColor} bg-[#0a0a0f] p-1.5 shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-transform duration-300 hover:scale-105`}>
              <div className={`h-full w-full rounded-xl bg-gradient-to-r ${team2.bgGradient} overflow-hidden border border-white/5`} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight sm:text-2xl">{team2.name}</h2>
              <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">{team2.shortName}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Grid Layout for details */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* COLUMN 1: MATCH TIMELINE */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <DashboardCard
            title="Match Timeline"
            subtitle="Chronological match events feed"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            }
            className="flex-1"
          >
            <div className="relative pl-6 border-l border-white/10 flex flex-col gap-5 mt-2">
              {timelineEvents.map((event) => {
                const badgeInfo = getEventIcon(event.type);
                const isArg = event.teamId === 'arg';
                
                return (
                  <div key={event.id} className="relative flex flex-col gap-1 text-xs group">
                    {/* Node Pin Marker */}
                    <div className={`absolute -left-[35px] top-0.5 flex h-7.5 w-7.5 items-center justify-center rounded-lg border bg-[#0a0a0f] text-xs shadow-lg transition-transform group-hover:scale-110 ${badgeInfo?.color}`}>
                      {badgeInfo?.emoji}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-cyan-400 tracking-wider">{event.time}'</span>
                      <span className="font-semibold text-white">{event.player}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[8px] font-extrabold uppercase border ${
                        isArg ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {isArg ? 'ARG' : 'FRA'}
                      </span>
                    </div>

                    {event.details && (
                      <p className="text-[10px] text-gray-400 leading-relaxed max-w-sm">
                        {event.details}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </DashboardCard>

          {/* COLUMN 1 SUB-ITEM: PLAYER SPOTLIGHT */}
          <DashboardCard
            title="Player Spotlight"
            subtitle="Match MVP candidate"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            }
          >
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4">
                {/* Silhouette avatar placeholder with gradient background */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-purple-500/20 border border-white/10 shadow-inner">
                  {/* Glowing halo indicator */}
                  <span className="absolute inset-0 rounded-2xl border border-cyan-400/30 animate-pulse" />
                  <span className="text-3xl">🐐</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white leading-none">{playerSpotlight.name}</h4>
                    <span className="text-[8px] font-black text-amber-400 border border-amber-400/30 bg-amber-400/10 px-1 py-0.5 rounded uppercase leading-none">
                      Captain
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium block mt-1">
                    {playerSpotlight.position} • #{playerSpotlight.number}
                  </span>
                  <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                    {team1.name}
                  </span>
                </div>
                {/* Live rating badge */}
                <div className="ml-auto flex flex-col items-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 px-3 py-2 text-center shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                  <span className="text-[8px] text-gray-400 uppercase font-black tracking-wider leading-none">Rating</span>
                  <span className="text-base font-extrabold text-cyan-400 mt-1 leading-none">{playerSpotlight.rating}</span>
                </div>
              </div>

              {/* Spotlight Stats Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col justify-between">
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider">Goals (Today)</span>
                  <span className="text-lg font-black text-white mt-1">{playerSpotlight.goals}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col justify-between">
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider">Assists (Today)</span>
                  <span className="text-lg font-black text-white mt-1">{playerSpotlight.assists}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col justify-between">
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider">Key Passes</span>
                  <span className="text-lg font-black text-white mt-1">{playerSpotlight.keyPasses}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col justify-between">
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider">Completed Dribbles</span>
                  <span className="text-lg font-black text-white mt-1">{playerSpotlight.dribbles}</span>
                </div>
              </div>
            </div>
          </DashboardCard>

        </div>

        {/* COLUMN 2: MATCH STATISTICS */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <DashboardCard
            title="Match Statistics"
            subtitle="Live team performance comparisons"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
              </svg>
            }
          >
            <div className="flex flex-col gap-5 mt-2">
              
              {/* Possession Stat */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>ARG ({stats.possession}%)</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Possession</span>
                  <span>FRA ({100 - stats.possession}%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                  <div className="h-full bg-sky-400" style={{ width: `${stats.possession}%` }} />
                  <div className="h-full bg-blue-600" style={{ width: `${100 - stats.possession}%` }} />
                </div>
              </div>

              {/* Shots Stat */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>ARG ({stats.shots[0]})</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Shots</span>
                  <span>FRA ({stats.shots[1]})</span>
                </div>
                {/* Visual split progress bar */}
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                  <div className="h-full bg-sky-400" style={{ width: `${(stats.shots[0] / (stats.shots[0] + stats.shots[1])) * 100}%` }} />
                  <div className="h-full bg-blue-600" style={{ width: `${(stats.shots[1] / (stats.shots[0] + stats.shots[1])) * 100}%` }} />
                </div>
              </div>

              {/* Shots on Target Stat */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>ARG ({stats.shotsOnTarget[0]})</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Shots on Target</span>
                  <span>FRA ({stats.shotsOnTarget[1]})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                  <div className="h-full bg-sky-400" style={{ width: `${(stats.shotsOnTarget[0] / (stats.shotsOnTarget[0] + stats.shotsOnTarget[1])) * 100}%` }} />
                  <div className="h-full bg-blue-600" style={{ width: `${(stats.shotsOnTarget[1] / (stats.shotsOnTarget[0] + stats.shotsOnTarget[1])) * 100}%` }} />
                </div>
              </div>

              {/* Corners Stat */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>ARG ({stats.corners[0]})</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Corners</span>
                  <span>FRA ({stats.corners[1]})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                  <div className="h-full bg-sky-400" style={{ width: `${(stats.corners[0] / (stats.corners[0] + stats.corners[1])) * 100}%` }} />
                  <div className="h-full bg-blue-600" style={{ width: `${(stats.corners[1] / (stats.corners[0] + stats.corners[1])) * 100}%` }} />
                </div>
              </div>

              {/* Fouls Stat */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>ARG ({stats.fouls[0]})</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Fouls</span>
                  <span>FRA ({stats.fouls[1]})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                  <div className="h-full bg-sky-400" style={{ width: `${(stats.fouls[0] / (stats.fouls[0] + stats.fouls[1])) * 100}%` }} />
                  <div className="h-full bg-blue-600" style={{ width: `${(stats.fouls[1] / (stats.fouls[0] + stats.fouls[1])) * 100}%` }} />
                </div>
              </div>

              {/* Pass Accuracy Stat */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>ARG ({stats.passAccuracy[0]}%)</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Pass Accuracy</span>
                  <span>FRA ({stats.passAccuracy[1]}%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                  <div className="h-full bg-sky-400" style={{ width: `${stats.passAccuracy[0]}%` }} />
                  <div className="h-full bg-blue-600" style={{ width: `${stats.passAccuracy[1]}%` }} />
                </div>
              </div>

            </div>
          </DashboardCard>

          {/* COLUMN 2 SUB-ITEM: STADIUM INFORMATION */}
          <DashboardCard
            title="Stadium Information"
            subtitle="MetLife Arena operations status"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12" />
              </svg>
            }
          >
            <div className="flex flex-col gap-3.5 mt-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col">
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider">Weather</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-sm">☀️</span>
                    <span className="font-bold text-white">{stadiumInfo.weather}</span>
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col">
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider">Temperature</span>
                  <span className="text-base font-black text-white mt-1">{stadiumInfo.temp}°C</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-3 flex flex-col col-span-2">
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider">Attendance</span>
                  <span className="text-base font-black text-cyan-400 mt-0.5">
                    {stadiumInfo.attendance.toLocaleString()} <span className="text-xs font-semibold text-gray-500">(92% capacity)</span>
                  </span>
                </div>
              </div>

              {/* Gate Status alert */}
              <div className="flex flex-col gap-2 rounded-xl bg-white/5 border border-white/5 p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Gate Security Status:</span>
                  <span className="font-bold text-emerald-400">{stadiumInfo.gateStatus}</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-1">
                  <span className="text-gray-400 font-medium">Entry Average Delay:</span>
                  <span className="font-bold text-white">{stadiumInfo.gateWaitTime}</span>
                </div>
              </div>

              {/* Crowd Density visual indicator */}
              <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 p-3 text-xs">
                <span className="text-gray-400 font-medium">Concourse Density:</span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                  stadiumInfo.crowdLevel === 'Low'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : stadiumInfo.crowdLevel === 'Moderate'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  <span className={`h-1 w-1 rounded-full ${
                    stadiumInfo.crowdLevel === 'Low'
                      ? 'bg-emerald-400'
                      : stadiumInfo.crowdLevel === 'Moderate'
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                  }`} />
                  {stadiumInfo.crowdLevel}
                </span>
              </div>
            </div>
          </DashboardCard>

        </div>

        {/* COLUMN 3: UPCOMING EVENTS & LOGISTICS */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <DashboardCard
            title="Upcoming Events"
            subtitle="Expected Matchday timeline highlights"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
            }
            className="flex-1"
          >
            <div className="flex flex-col gap-4 mt-2">
              {upcomingEvents.map((event: UpcomingEvent) => (
                <div
                  key={event.id}
                  className="group relative flex items-start gap-3 rounded-xl border border-white/5 bg-[#0a0a0f]/40 p-4.5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/5 hover:-translate-y-0.5"
                >
                  {/* Event Icon Block */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-lg group-hover:scale-105 transition-transform">
                    {event.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-white">{event.title}</h4>
                      <span className="text-[10px] font-black text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 px-2 py-0.5 rounded leading-none shrink-0">
                        {event.time}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed mt-1.5">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

      </div>
    </div>
  );
}
