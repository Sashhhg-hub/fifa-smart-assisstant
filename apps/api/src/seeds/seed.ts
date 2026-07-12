import 'dotenv/config';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Match } from '../models/Match.js';
import { Facility } from '../models/Facility.js';
import { FoodVendor } from '../models/FoodVendor.js';
import { Transportation } from '../models/Transportation.js';
import { EmergencyAlert } from '../models/EmergencyAlert.js';
import { LostFoundReport } from '../models/LostFoundReport.js';
import { User } from '../models/User.js';

const SEED_MATCHES = [
  {
    homeTeam: 'United States',
    awayTeam: 'England',
    matchDate: new Date('2026-06-12T20:00:00Z'),
    status: 'live' as const,
    score: { home: 1, away: 1 },
    liveTimeline: [
      { time: "12'", event: 'Goal', detail: 'Christian Pulisic (US)' },
      { time: "55'", event: 'Yellow Card', detail: 'Declan Rice (ENG)' },
      { time: "68'", event: 'Goal', detail: 'Harry Kane (ENG)' },
    ],
  },
  {
    homeTeam: 'Argentina',
    awayTeam: 'France',
    matchDate: new Date('2026-07-12T18:00:00Z'),
    status: 'scheduled' as const,
    score: { home: 0, away: 0 },
    liveTimeline: [],
  },
];

const SEED_FACILITIES = [
  {
    name: 'My Seat (Section 114)',
    category: 'Accessible Washrooms' as const,
    coordinates: { x: 260, y: 440 },
    status: 'Open' as const,
    crowdLevel: 'Low' as const,
    accessibilityContext: 'Level access platform companion seat',
    operatingHours: 'Gate open to exit',
  },
  {
    name: 'Level 1 North Washrooms',
    category: 'Washrooms' as const,
    coordinates: { x: 250, y: 460 },
    status: 'Open' as const,
    crowdLevel: 'Moderate' as const,
    accessibilityContext: 'Male/Female standard and family stall',
    operatingHours: '24/7',
  },
  {
    name: 'First Aid Clinic (Sec 118)',
    category: 'First Aid Center' as const,
    coordinates: { x: 210, y: 430 },
    status: 'Open' as const,
    crowdLevel: 'Low' as const,
    accessibilityContext: 'Doctor, paramedic and stretcher access',
    operatingHours: 'Event gates open',
  },
  {
    name: 'Chase ATM Section 112',
    category: 'ATMs' as const,
    coordinates: { x: 280, y: 480 },
    status: 'Open' as const,
    crowdLevel: 'Low' as const,
    accessibilityContext: 'Braille keypad and audio jack support',
  },
  {
    name: 'Hydration Station Sec 122',
    category: 'Water Stations' as const,
    coordinates: { x: 380, y: 430 },
    status: 'Open' as const,
    crowdLevel: 'Moderate' as const,
  },
];

const SEED_FOOD_VENDORS = [
  {
    name: 'Stadium Burgers & Fries',
    location: 'Section 114',
    coordinates: { x: 230, y: 450 },
    crowdLevel: 'Moderate' as const,
    estimatedWaitTime: 12,
    menu: [
      {
        itemId: 'f-1',
        name: 'Cheeseburger',
        price: 12.99,
        category: 'hot-food' as const,
        isAvailable: true,
      },
      {
        itemId: 'f-2',
        name: 'French Fries',
        price: 5.49,
        category: 'snacks' as const,
        isAvailable: true,
      },
    ],
  },
  {
    name: 'FIFA Official Tacos',
    location: 'Section 122',
    coordinates: { x: 300, y: 470 },
    crowdLevel: 'Heavy' as const,
    estimatedWaitTime: 25,
    menu: [
      {
        itemId: 't-1',
        name: 'Birria Taco Box',
        price: 14.49,
        category: 'hot-food' as const,
        isAvailable: true,
      },
    ],
  },
];

const SEED_TRANSPORTATION = [
  {
    name: 'Metro Station Pick-up',
    type: 'Metro' as const,
    travelTime: 20,
    cost: '$2.75',
    costValue: 2.75,
    isOpen: true,
    crowdLevel: 'Heavy' as const,
    departureFrequency: 'Every 5 mins',
    pickupPoint: 'West concourse loop gate 4 exit stairs',
    pickupPointId: 'pickup-metro',
    operatingHours: '6:00 AM - 1:00 AM',
    accessibilitySupport: 'ADA compliant elevator access',
    details: 'Fastest transit back to NYC Penn Station.',
  },
  {
    name: 'FIFA Shuttle Pick-up',
    type: 'Shuttle Bus' as const,
    travelTime: 35,
    cost: 'Free',
    costValue: 0.0,
    isOpen: true,
    crowdLevel: 'Moderate' as const,
    departureFrequency: 'Continuous',
    pickupPoint: 'East Plaza shuttle bay gate D',
    pickupPointId: 'pickup-shuttle',
    operatingHours: '4 hrs pre-game to 2 hrs post-game',
    accessibilitySupport: 'Low floor boarding ramp',
    details: 'Free official shuttle bus loop to hotels.',
  },
];

const SEED_EMERGENCY_ALERTS = [
  {
    type: 'medical' as const,
    locationDetails: 'Section 114 Row 12 Seat 4',
    coordinates: { x: 195, y: 380 },
    status: 'resolved' as const,
    staffNotes: 'Medic team dispatched. Patient treated for minor heat stroke and hydration.',
  },
];

const SEED_LOST_FOUND_REPORTS = [
  {
    claimId: 'CLM-841920',
    name: 'Leather Wallet',
    category: 'Wallet' as const,
    type: 'lost' as const,
    description: 'Black leather tri-fold wallet containing ID and credit cards.',
    contactInfo: 'user1@example.com',
    status: 'Reported' as const,
    collectionLocation: 'Main Help Desk (Section 102)',
    claimInstructions: 'Verify ownership with photo ID.',
  },
];

async function runSeed() {
  console.log('--- Starting MongoDB Database Seeding Script ---');

  await connectDatabase();

  try {
    console.log('Purging existing database collections...');
    await Match.deleteMany({});
    await Facility.deleteMany({});
    await FoodVendor.deleteMany({});
    await Transportation.deleteMany({});
    await EmergencyAlert.deleteMany({});
    await LostFoundReport.deleteMany({});
    await User.deleteMany({});
    console.log('Purging completed successfully.');

    console.log('Seeding Matches collection...');
    await Match.create(SEED_MATCHES);
    console.log(`Seeded ${SEED_MATCHES.length} matches.`);

    console.log('Seeding Facilities collection...');
    await Facility.create(SEED_FACILITIES);
    console.log(`Seeded ${SEED_FACILITIES.length} facilities.`);

    console.log('Seeding Food Vendors collection...');
    await FoodVendor.create(SEED_FOOD_VENDORS);
    console.log(`Seeded ${SEED_FOOD_VENDORS.length} food vendors.`);

    console.log('Seeding Transportation collection...');
    await Transportation.create(SEED_TRANSPORTATION);
    console.log(`Seeded ${SEED_TRANSPORTATION.length} transit hubs.`);

    console.log('Seeding Emergency Alerts collection...');
    await EmergencyAlert.create(SEED_EMERGENCY_ALERTS);
    console.log(`Seeded ${SEED_EMERGENCY_ALERTS.length} emergency alerts.`);

    console.log('Seeding Lost & Found collection...');
    await LostFoundReport.create(SEED_LOST_FOUND_REPORTS);
    console.log(`Seeded ${SEED_LOST_FOUND_REPORTS.length} lost/found claims.`);

    console.log('--- Database Seeding Completed Successfully ---');
  } catch (error) {
    console.error('Fatal error encountered during database seeding:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

runSeed();
