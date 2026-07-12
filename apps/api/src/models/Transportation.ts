import { Schema, model } from 'mongoose';

export interface ITransportation {
  name: string;
  type:
    | 'Metro'
    | 'Shuttle Bus'
    | 'Public Bus'
    | 'Taxi'
    | 'Uber'
    | 'Walking'
    | 'Cycling'
    | 'Parking'
    | 'Ride Sharing';
  travelTime: number;
  cost: string;
  costValue: number;
  isOpen: boolean;
  crowdLevel: 'Low' | 'Moderate' | 'Heavy';
  departureFrequency: string;
  pickupPoint: string;
  pickupPointId: string;
  operatingHours: string;
  accessibilitySupport: string;
  details: string;
}

const transportationSchema = new Schema<ITransportation>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      index: true,
      enum: [
        'Metro',
        'Shuttle Bus',
        'Public Bus',
        'Taxi',
        'Uber',
        'Walking',
        'Cycling',
        'Parking',
        'Ride Sharing',
      ],
    },
    travelTime: { type: Number, required: true },
    cost: { type: String, required: true },
    costValue: { type: Number, required: true, default: 0 },
    isOpen: { type: Boolean, required: true, default: true },
    crowdLevel: {
      type: String,
      required: true,
      enum: ['Low', 'Moderate', 'Heavy'],
      default: 'Low',
    },
    departureFrequency: { type: String, required: true },
    pickupPoint: { type: String, required: true },
    pickupPointId: { type: String, required: true, index: true },
    operatingHours: { type: String, required: true },
    accessibilitySupport: { type: String, required: true },
    details: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Transportation = model<ITransportation>('Transportation', transportationSchema);
