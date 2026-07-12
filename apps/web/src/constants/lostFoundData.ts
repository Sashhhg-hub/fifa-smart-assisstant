export interface LostFoundItem {
  id: string;
  name: string;
  category: string;
  description: string;
  type: 'lost' | 'found';
  dateReported: string;
  status: 'Reported' | 'Processing' | 'Matched' | 'Ready for Pickup' | 'Claimed';
  collectionLocation: string;
  contactInfo: string;
  claimId: string;
  claimInstructions: string;
}

export const LOST_FOUND_CATEGORIES = [
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
];

export const MOCK_LOST_FOUND_ITEMS: LostFoundItem[] = [
  {
    id: 'lf-phone-1',
    name: 'iPhone 15 Pro Max',
    category: 'Phone',
    description: 'Black titanium iPhone 15 Pro Max with a clear silicone case. Lock screen has a picture of a golden retriever.',
    type: 'lost',
    dateReported: '2026-07-12T09:15:00Z',
    status: 'Reported',
    collectionLocation: 'Guest Services Desk - Gate A Lobby',
    contactInfo: 'owner-phone-1@fifa-smart.com',
    claimId: 'CLM-849102',
    claimInstructions: 'To claim, please verify the lock screen wallpaper photo or unlock using your passcode at the Gate A Guest Services Desk.',
  },
  {
    id: 'lf-phone-2',
    name: 'iPhone with Clear Case',
    category: 'Phone',
    description: 'iPhone found in Section 112 under Row 14. Standard transparent bumper case, lock screen photo of a dog.',
    type: 'found',
    dateReported: '2026-07-12T09:30:00Z',
    status: 'Processing',
    collectionLocation: 'Lost & Found Center - Section 124',
    contactInfo: 'lostfound-desk@fifa-smart.com',
    claimId: 'CLM-038291',
    claimInstructions: 'Please present your ID and unlock the device with your passcode to verify ownership.',
  },
  {
    id: 'lf-wallet-1',
    name: 'Brown Leather Bi-fold Wallet',
    category: 'Wallet',
    description: 'Brown leather wallet containing a driver\'s license (State: NJ, Name: John Doe) and stadium ticket stub.',
    type: 'lost',
    dateReported: '2026-07-11T18:45:00Z',
    status: 'Matched',
    collectionLocation: 'Lost & Found Center - Section 124',
    contactInfo: 'john.doe@email.com',
    claimId: 'CLM-110293',
    claimInstructions: 'Match confirmed. Please present your New Jersey Driver\'s License at Section 124 Lost & Found to pick up.',
  },
  {
    id: 'lf-keys-1',
    name: 'Toyota Car Key fob',
    category: 'Keys',
    description: 'Toyota key fob on a black lanyard with a small metal soccer ball charm.',
    type: 'lost',
    dateReported: '2026-07-12T08:00:00Z',
    status: 'Reported',
    collectionLocation: 'Guest Services Desk - Gate C Lobby',
    contactInfo: 'owner-keys-1@fifa-smart.com',
    claimId: 'CLM-552093',
    claimInstructions: 'Please identify the charm or test the remote fob range near the security office to claim.',
  },
  {
    id: 'lf-bag-1',
    name: 'Black Nike Drawstring Bag',
    category: 'Bag',
    description: 'Black Nike drawstring gym bag containing a blue water bottle and a white towel.',
    type: 'found',
    dateReported: '2026-07-12T08:20:00Z',
    status: 'Ready for Pickup',
    collectionLocation: 'Lost & Found Center - Section 124',
    contactInfo: 'lostfound-desk@fifa-smart.com',
    claimId: 'CLM-771290',
    claimInstructions: 'Please verify the brand of the water bottle and details of towel contents to claim at Section 124.',
  },
  {
    id: 'lf-passport-1',
    name: 'German Passport',
    category: 'Passport',
    description: 'German Passport (Reisepass) inside a black protective cover. Belonging to Max Mustermann.',
    type: 'lost',
    dateReported: '2026-07-12T07:10:00Z',
    status: 'Reported',
    collectionLocation: 'Gate A Guest Services',
    contactInfo: 'max.mustermann@travel.de',
    claimId: 'CLM-991203',
    claimInstructions: 'Passport details must match your photographic identification at the Gate A Guest Services Desk.',
  },
  {
    id: 'lf-watch-1',
    name: 'Apple Watch Series 8',
    category: 'Watch',
    description: 'Apple Watch Series 8, 45mm, space grey body with a green sport band.',
    type: 'found',
    dateReported: '2026-07-12T06:30:00Z',
    status: 'Processing',
    collectionLocation: 'Lost & Found Center - Section 124',
    contactInfo: 'lostfound-desk@fifa-smart.com',
    claimId: 'CLM-120489',
    claimInstructions: 'Unlock via paired iPhone or by passcode to claim ownership.',
  },
];
