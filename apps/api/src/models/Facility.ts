import { Schema, model } from 'mongoose';

export interface IFacility {
  name: string;
  category:
    | 'Washrooms'
    | 'Accessible Washrooms'
    | 'ATMs'
    | 'Water Stations'
    | 'Charging Stations'
    | 'Information Desk'
    | 'First Aid Center'
    | 'Prayer Room'
    | 'Merchandise Store'
    | 'Smoking Zone'
    | 'Baby Care Room';
  coordinates: {
    x: number;
    y: number;
  };
  status: 'Open' | 'Closed';
  crowdLevel: 'Low' | 'Moderate' | 'Heavy';
  accessibilityContext?: string;
  operatingHours?: string;
}

const facilitySchema = new Schema<IFacility>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      index: true,
      enum: [
        'Washrooms',
        'Accessible Washrooms',
        'ATMs',
        'Water Stations',
        'Charging Stations',
        'Information Desk',
        'First Aid Center',
        'Prayer Room',
        'Merchandise Store',
        'Smoking Zone',
        'Baby Care Room',
      ],
    },
    coordinates: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    status: { type: String, required: true, enum: ['Open', 'Closed'], default: 'Open' },
    crowdLevel: {
      type: String,
      required: true,
      enum: ['Low', 'Moderate', 'Heavy'],
      default: 'Low',
    },
    accessibilityContext: { type: String },
    operatingHours: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Facility = model<IFacility>('Facility', facilitySchema);
