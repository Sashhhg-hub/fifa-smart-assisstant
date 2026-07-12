import { Schema, model } from 'mongoose';

export interface ILostFoundReport {
  claimId: string;
  name: string;
  category:
    | 'Wallet'
    | 'Phone'
    | 'Passport'
    | 'Keys'
    | 'Bag'
    | 'Watch'
    | 'Camera'
    | 'Clothing'
    | 'Tickets'
    | 'Other';
  type: 'lost' | 'found';
  description: string;
  locationText?: string;
  contactInfo: string;
  status: 'Reported' | 'Processing' | 'Matched' | 'Ready for Pickup' | 'Claimed';
  collectionLocation?: string;
  claimInstructions?: string;
  matchedReportId?: Schema.Types.ObjectId;
  matchConfidence?: number;
}

const lostFoundReportSchema = new Schema<ILostFoundReport>(
  {
    claimId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      index: true,
      enum: [
        'Wallet',
        'Phone',
        'Passport',
        'Keys',
        'Bag',
        'Watch',
        'Camera',
        'Clothing',
        'Tickets',
        'Other',
      ],
    },
    type: { type: String, required: true, index: true, enum: ['lost', 'found'] },
    description: { type: String, required: true },
    locationText: { type: String },
    contactInfo: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['Reported', 'Processing', 'Matched', 'Ready for Pickup', 'Claimed'],
      default: 'Reported',
    },
    collectionLocation: { type: String },
    claimInstructions: { type: String },
    matchedReportId: { type: Schema.Types.ObjectId, ref: 'LostFoundReport', index: true },
    matchConfidence: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const LostFoundReport = model<ILostFoundReport>('LostFoundReport', lostFoundReportSchema);
