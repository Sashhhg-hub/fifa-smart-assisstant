import { Schema, model } from 'mongoose';

export interface IMenuItem {
  itemId: string;
  name: string;
  price: number;
  category: 'beverage' | 'hot-food' | 'snacks' | 'merchandise';
  isAvailable: boolean;
}

export interface IFoodVendor {
  name: string;
  location: string;
  coordinates: {
    x: number;
    y: number;
  };
  menu: IMenuItem[];
  crowdLevel: 'Low' | 'Moderate' | 'Heavy';
  estimatedWaitTime: number; // in minutes
}

const menuItemSchema = new Schema<IMenuItem>({
  itemId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['beverage', 'hot-food', 'snacks', 'merchandise'],
  },
  isAvailable: { type: Boolean, required: true, default: true },
});

const foodVendorSchema = new Schema<IFoodVendor>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    coordinates: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    menu: [menuItemSchema],
    crowdLevel: {
      type: String,
      required: true,
      enum: ['Low', 'Moderate', 'Heavy'],
      default: 'Low',
    },
    estimatedWaitTime: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const FoodVendor = model<IFoodVendor>('FoodVendor', foodVendorSchema);
