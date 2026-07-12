export class MatchService {
  async getLiveMatchStats(): Promise<unknown> {
    return {
      matchId: 'match-fifa-2026-01',
      homeTeam: 'United States',
      awayTeam: 'England',
      score: { home: 1, away: 1 },
      minute: 74,
      timeline: [
        { time: "12'", event: 'Goal', detail: 'Christian Pulisic (US)' },
        { time: "55'", event: 'Yellow Card', detail: 'Declan Rice (ENG)' },
        { time: "68'", event: 'Goal', detail: 'Harry Kane (ENG)' },
      ],
    };
  }
}
