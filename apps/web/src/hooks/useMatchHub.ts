import { useState, useEffect } from 'react';
import { apiClient } from '../utils/apiClient';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  bgGradient: string;
  borderColor: string;
}

export interface MatchEvent {
  id: string;
  time: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'var';
  player: string;
  teamId: string;
  details?: string;
}

export interface MatchStats {
  possession: number;
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  passAccuracy: [number, number];
}

export interface StadiumInfo {
  weather: string;
  temp: number;
  attendance: number;
  gateStatus: string;
  gateWaitTime: string;
  crowdLevel: 'Low' | 'Moderate' | 'Heavy';
}

export interface UpcomingEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface PlayerProfile {
  name: string;
  teamShort: string;
  number: number;
  position: string;
  rating: number;
  goals: number;
  assists: number;
  keyPasses: number;
  dribbles: number;
}

export const MOCK_TEAM_1: Team = {
  id: 'arg',
  name: 'Argentina',
  shortName: 'ARG',
  bgGradient: 'from-sky-400 via-white to-sky-400',
  borderColor: 'border-sky-400/40',
};

export const MOCK_TEAM_2: Team = {
  id: 'fra',
  name: 'France',
  shortName: 'FRA',
  bgGradient: 'from-blue-700 via-white to-red-600',
  borderColor: 'border-blue-600/40',
};

export const MOCK_TIMELINE_EVENTS: MatchEvent[] = [
  {
    id: 'e1',
    time: 14,
    type: 'goal',
    player: 'Lionel Messi',
    teamId: 'arg',
    details: 'Penalty Kick — coolly slotted into bottom left corner.',
  },
  {
    id: 'e2',
    time: 32,
    type: 'yellow_card',
    player: 'Adrien Rabiot',
    teamId: 'fra',
    details: 'Tactical foul pulling back De Paul in midfield transition.',
  },
  {
    id: 'e3',
    time: 52,
    type: 'goal',
    player: 'Julián Álvarez',
    teamId: 'arg',
    details: 'Clinical finish under Lloris after a beautiful assist by Messi.',
  },
];

export const MOCK_STATS: MatchStats = {
  possession: 54,
  shots: [14, 11],
  shotsOnTarget: [6, 4],
  corners: [5, 4],
  fouls: [8, 12],
  passAccuracy: [88, 84],
};

export const MOCK_STADIUM_INFO: StadiumInfo = {
  weather: 'Clear Sky',
  temp: 24,
  attendance: 75840,
  gateStatus: 'All Gates Operational',
  gateWaitTime: '2 min (Gate 4 Clear)',
  crowdLevel: 'Moderate',
};

export const MOCK_UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'up1',
    time: '75\'',
    title: 'Light Show & Fan Wave',
    description: 'Synchronized stadium-wide light animation and fan wave.',
    icon: '⚡',
  },
  {
    id: 'up2',
    time: '85\'',
    title: 'Fan MVP Voting Closes',
    description: 'Last chance to cast your vote for Match MVP in the Concierge.',
    icon: '🏆',
  },
];

export const MOCK_PLAYER_SPOTLIGHT: PlayerProfile = {
  name: 'Lionel Messi',
  teamShort: 'ARG',
  number: 10,
  position: 'Forward / Playmaker',
  rating: 9.2,
  goals: 1,
  assists: 1,
  keyPasses: 4,
  dribbles: 5,
};

interface BackendMatch {
  minute?: number;
  homeTeam?: string;
  awayTeam?: string;
  timeline?: { time: string; event: string; detail: string }[];
}

export function useMatchHub() {
  const [matchMinutes, setMatchMinutes] = useState(67);
  const [isLive, setIsLive] = useState(true);
  const [team1, setTeam1] = useState<Team>(MOCK_TEAM_1);
  const [team2, setTeam2] = useState<Team>(MOCK_TEAM_2);
  const [timelineEvents, setTimelineEvents] = useState<MatchEvent[]>(MOCK_TIMELINE_EVENTS);

  useEffect(() => {
    async function loadLive() {
      try {
        const response = await apiClient.get<BackendMatch>('/match/live');
        if (response.success && response.data) {
          const d = response.data;
          setMatchMinutes(d.minute ?? 74);
          setTeam1((prev) => ({ ...prev, name: d.homeTeam || prev.name }));
          setTeam2((prev) => ({ ...prev, name: d.awayTeam || prev.name }));
          if (d.timeline) {
            const events: MatchEvent[] = d.timeline.map((evt, idx) => ({
              id: `evt-${idx}`,
              time: parseInt(evt.time) || 0,
              type: evt.event.toLowerCase().includes('card') ? 'yellow_card' : 'goal',
              player: evt.detail,
              teamId: evt.detail.includes('(US)') ? 'arg' : 'fra',
              details: evt.detail,
            }));
            setTimelineEvents(events);
          }
        }
      } catch (err) {
        console.warn('[Match Hub Hook] Failed to load live stats:', err);
      }
    }
    loadLive();

    const interval = setInterval(() => {
      setMatchMinutes((prev) => {
        if (prev >= 90) {
          setIsLive(false);
          clearInterval(interval);
          return 90;
        }
        return prev + 1;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    matchMinutes,
    isLive,
    team1,
    team2,
    timelineEvents,
    stats: MOCK_STATS,
    stadiumInfo: MOCK_STADIUM_INFO,
    upcomingEvents: MOCK_UPCOMING_EVENTS,
    playerSpotlight: MOCK_PLAYER_SPOTLIGHT,
  };
}
