import { Schema, model } from 'mongoose';

export interface IMatchTimeline {
  time: string;
  event: string;
  detail: string;
}

export interface IMatch {
  homeTeam: string;
  awayTeam: string;
  matchDate: Date;
  status: 'scheduled' | 'live' | 'completed';
  score: {
    home: number;
    away: number;
  };
  liveTimeline: IMatchTimeline[];
}

const matchTimelineSchema = new Schema<IMatchTimeline>({
  time: { type: String, required: true },
  event: { type: String, required: true },
  detail: { type: String, required: true },
});

const matchSchema = new Schema<IMatch>(
  {
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    matchDate: { type: Date, required: true, index: true },
    status: {
      type: String,
      required: true,
      enum: ['scheduled', 'live', 'completed'],
      default: 'scheduled',
    },
    score: {
      home: { type: Number, required: true, default: 0 },
      away: { type: Number, required: true, default: 0 },
    },
    liveTimeline: [matchTimelineSchema],
  },
  {
    timestamps: true,
  }
);

export const Match = model<IMatch>('Match', matchSchema);
