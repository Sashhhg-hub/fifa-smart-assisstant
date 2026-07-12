import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  passwordHash: string;
  role: 'fan' | 'staff' | 'admin';
  ticket?: {
    matchId?: Schema.Types.ObjectId;
    section?: string;
    row?: string;
    seat?: string;
    assignedGate?: string;
  };
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ['fan', 'staff', 'admin'], default: 'fan' },
    ticket: {
      matchId: { type: Schema.Types.ObjectId, ref: 'Match' },
      section: { type: String },
      row: { type: String },
      seat: { type: String },
      assignedGate: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', userSchema);
