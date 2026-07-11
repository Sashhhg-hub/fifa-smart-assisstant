import { useState, useEffect, useCallback, useMemo } from 'react';

export interface AccessibilityService {
  id: string;
  name: string;
  emoji: string;
  description: string;
  nearestLocation: string;
  distance: number; // in meters
  walkingTime: number; // in minutes
  status: string;
  guidelines: string;
}

export interface SupportHelper {
  name: string;
  rating: number;
  avatar: string;
  role: string;
}

export const ACCESSIBILITY_SERVICES: AccessibilityService[] = [
  {
    id: 'wheelchair',
    name: 'Wheelchair Navigation',
    emoji: '♿',
    description: 'Complimentary wheelchair escorts and transfer services throughout the stadium concourse.',
    nearestLocation: 'Section 112 Entrance Ramp',
    distance: 90,
    walkingTime: 1,
    status: '5 Escorts available',
    guidelines: 'Steward escorts can meet you at your gate or seat to assist with deck-to-deck transfers.',
  },
  {
    id: 'washrooms',
    name: 'Accessible Washrooms',
    emoji: '🚻',
    description: 'Fully equipped restrooms with wider doors, grab bars, and lowered sinks.',
    nearestLocation: 'North Restrooms (Concourse Level)',
    distance: 250,
    walkingTime: 3,
    status: 'Operational and clear',
    guidelines: 'Restrooms feature push-button doors, emergency alarms, and tactile signage.',
  },
  {
    id: 'elevators',
    name: 'Elevators & Ramps',
    emoji: '🛗',
    description: 'Express elevator priority tags for fans with mobility challenges.',
    nearestLocation: 'Gate 4 Elevator Shaft',
    distance: 150,
    walkingTime: 2,
    status: 'All elevators operational',
    guidelines: 'Show your mobile priority pass to the steward at the elevator gate for express loading.',
  },
  {
    id: 'hearing',
    name: 'Hearing Assistance',
    emoji: '🦻',
    description: 'Assistive listening devices (FM loops) and closed captioning links for match commentary.',
    nearestLocation: 'Guest Services (Section 116)',
    distance: 180,
    walkingTime: 3,
    status: 'Headsets ready for checkout',
    guidelines: 'Devices can be checked out free of charge with a valid photo ID.',
  },
  {
    id: 'sign-language',
    name: 'Sign Language Support',
    emoji: '🤟',
    description: 'On-demand sign language interpreters available for guest queries and event broadcasts.',
    nearestLocation: 'Guest Services (Section 116)',
    distance: 180,
    walkingTime: 3,
    status: 'Interpreters on duty',
    guidelines: 'Interpreter support can be summoned to your seat or accessed at the Guest Services counter.',
  },
  {
    id: 'vision',
    name: 'Vision Assistance',
    emoji: '👓',
    description: 'Tactile maps, audio descriptive matchday commentary, and service animal relief zones.',
    nearestLocation: 'Guest Services (Section 116)',
    distance: 180,
    walkingTime: 3,
    status: 'Guides & Relief Zone open',
    guidelines: 'Audio receivers are tuned to channel 88.5 FM. Relief zone located outside Gate A.',
  },
  {
    id: 'seating',
    name: 'Reserved Seating',
    emoji: '🪑',
    description: 'Designated platforms offering clear sightlines and space for companions.',
    nearestLocation: 'Section 114 Elevated Platform',
    distance: 110,
    walkingTime: 1.5,
    status: 'Companion seating clear',
    guidelines: 'Accessible seating platforms feature dedicated electrical outlets for wheelchair recharging.',
  },
  {
    id: 'elderly',
    name: 'Elderly Assistance',
    emoji: '👵',
    description: 'Mobility helpers and resting bench locations along long concourse corridors.',
    nearestLocation: 'Guest Services (Section 116)',
    distance: 180,
    walkingTime: 3,
    status: 'Helpers ready for assist',
    guidelines: 'Steward-led golf cart shuttle routes operate along external stadium perimeters.',
  },
];

export const MOCK_HELPERS: SupportHelper[] = [
  { name: 'Sarah Jenkins', rating: 4.9, avatar: '👩‍⚕️', role: 'Accessibility Specialist' },
  { name: 'David Miller', rating: 4.8, avatar: '👨‍💼', role: 'Mobility Assistant' },
  { name: 'Elena Rostova', rating: 5.0, avatar: '👩‍💼', role: 'Guest Services Representative' },
  { name: 'Marcus Vance', rating: 4.7, avatar: '👨‍⚕️', role: 'Steward Escort' },
];

export function useAccessibility() {
  const [selectedId, setSelectedId] = useState<string>('wheelchair');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);
  const [assignedHelper, setAssignedHelper] = useState<SupportHelper | null>(null);

  const selectService = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const requestAssistance = useCallback(() => {
    setIsSubmitting(true);
    setIsBooked(false);
    setRequestId(null);
    setCountdownSeconds(null);
    setAssignedHelper(null);

    // Simulate 1.5s helper dispatch registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
      
      // Select random helper
      const randomIdx = Math.floor(Math.random() * MOCK_HELPERS.length);
      setAssignedHelper(MOCK_HELPERS[randomIdx]);
      
      // Generate ID
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setRequestId(`AC-${randomNum}`);
      
      // Set countdown: 180 seconds (3 minutes)
      setCountdownSeconds(180);
    }, 1500);
  }, []);

  const cancelRequest = useCallback(() => {
    setIsSubmitting(false);
    setIsBooked(false);
    setRequestId(null);
    setCountdownSeconds(null);
    setAssignedHelper(null);
  }, []);

  // ETA Countdown Ticker
  useEffect(() => {
    if (!isBooked || countdownSeconds === null) return;

    if (countdownSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [isBooked, countdownSeconds]);

  // Selected Service resolver
  const selectedService = useMemo(() => {
    return ACCESSIBILITY_SERVICES.find((s) => s.id === selectedId) || ACCESSIBILITY_SERVICES[0];
  }, [selectedId]);

  return {
    services: ACCESSIBILITY_SERVICES,
    selectedId,
    selectedService,
    selectService,
    isSubmitting,
    isBooked,
    requestId,
    countdownSeconds,
    assignedHelper,
    requestAssistance,
    cancelRequest,
  };
}
