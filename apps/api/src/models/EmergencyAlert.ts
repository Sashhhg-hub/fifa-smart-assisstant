import { Schema, model } from 'mongoose';

export interface IEmergencyAlert {
  userId?: Schema.Types.ObjectId;
  type: 'medical' | 'security';
  locationDetails: string;
  coordinates: {
    x: number;
    y: number;
  };
  status: 'received' | 'dispatched' | 'resolved';
  staffNotes?: string;
}

const emergencyAlertSchema = new Schema<IEmergencyAlert>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    type: { type: String, required: true, index: true, enum: ['medical', 'security'] },
    locationDetails: { type: String, required: true },
    coordinates: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    status: {
      type: String,
      required: true,
      enum: ['received', 'dispatched', 'resolved'],
      default: 'received',
    },
    staffNotes: { type: String },
  },
  {
    timestamps: true,
  }
);

export const EmergencyAlert = model<IEmergencyAlert>('EmergencyAlert', emergencyAlertSchema);
