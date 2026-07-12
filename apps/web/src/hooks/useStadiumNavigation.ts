import { useState, useCallback, useMemo, useEffect } from 'react';
import type { StadiumMapDestination } from '../components/dashboard/StadiumMap';
import { apiClient } from '../utils/apiClient';

export type NavDestination = StadiumMapDestination;

export interface NavRoute {
  destination: NavDestination;
  walkingTime: string;
  distance: string;
  crowdLevel: 'Low' | 'Moderate' | 'Heavy';
  accessibleRoute: boolean;
  pathPoints: string; // SVG path string
  advice?: string;
}

export const USER_START = { x: 195, y: 380, name: 'Gate 4 (User Position)' };

export const MOCK_STADIUM_DESTINATIONS: NavDestination[] = [
  {
    id: 'seat-114',
    name: 'My Seat (Section 114)',
    type: 'seat',
    x: 260,
    y: 440,
    details: 'Sec 114, Row 12, Seat 4',
  },
  { id: 'gate-4', name: 'Gate 4 Entrance', type: 'gate', x: 195, y: 380, details: 'North-West Gate' },
  { id: 'gate-1', name: 'Gate 1 Entrance', type: 'gate', x: 405, y: 220, details: 'South-East Gate' },
  { id: 'gate-2', name: 'Gate 2 Entrance', type: 'gate', x: 405, y: 380, details: 'North-East Gate' },
  { id: 'gate-3', name: 'Gate 3 Entrance', type: 'gate', x: 195, y: 220, details: 'South-West Gate' },
  {
    id: 'food-b',
    name: 'Concession Stand B (American Grill)',
    type: 'food',
    x: 230,
    y: 450,
    details: 'Wait Time: ~12m',
  },
  { id: 'food-taco', name: 'Taco Hub', type: 'food', x: 300, y: 470, details: 'Wait Time: ~5m' },
  {
    id: 'food-healthy',
    name: 'Healthy Eats stand',
    type: 'food',
    x: 370,
    y: 450,
    details: 'Wait Time: ~2m',
  },
  {
    id: 'washroom-north',
    name: 'North Restrooms',
    type: 'washroom',
    x: 250,
    y: 460,
    details: 'Wait Time: ~1m (Accessible)',
  },
  { id: 'washroom-east', name: 'East Restrooms', type: 'washroom', x: 410, y: 300, details: 'Wait Time: ~8m' },
  {
    id: 'medical-firstaid',
    name: 'First Aid Clinic (Sec 118)',
    type: 'medical',
    x: 210,
    y: 430,
    details: 'Doctor & Nurse on duty',
  },
  {
    id: 'exit-north',
    name: 'Emergency Exit North',
    type: 'exit',
    x: 300,
    y: 110,
    details: 'North Evacuation Tunnel',
  },
  {
    id: 'exit-south',
    name: 'Emergency Exit South',
    type: 'exit',
    x: 300,
    y: 490,
    details: 'South Evacuation Tunnel',
  },
  {
    id: 'facility-washroom-1',
    name: 'Level 1 North Washrooms',
    type: 'washroom',
    x: 250,
    y: 460,
    details: 'Sec 114 Concourse',
  },
  {
    id: 'facility-washroom-2',
    name: 'Level 2 South Washrooms',
    type: 'washroom',
    x: 300,
    y: 120,
    details: 'Sec 142 Concourse',
  },
  {
    id: 'facility-washroom-accessible-1',
    name: 'Level 1 North Accessible Washrooms',
    type: 'washroom',
    x: 250,
    y: 465,
    details: 'Sec 114 Concourse (Accessible)',
  },
  {
    id: 'facility-atm-1',
    name: 'Chase ATM Section 112',
    type: 'facility',
    x: 280,
    y: 480,
    details: 'ATM - Sec 112 Concourse',
  },
  {
    id: 'facility-atm-2',
    name: 'Capital One ATM Gate D',
    type: 'facility',
    x: 180,
    y: 220,
    details: 'ATM - Gate D Plaza',
  },
  {
    id: 'facility-water-1',
    name: 'Hydration Station Sec 122',
    type: 'facility',
    x: 380,
    y: 430,
    details: 'Water Station - Sec 122',
  },
  {
    id: 'facility-charging-1',
    name: 'Charging Zone Sec 108',
    type: 'facility',
    x: 420,
    y: 350,
    details: 'Charging Bar - Sec 108',
  },
  {
    id: 'facility-info-1',
    name: 'Guest Information Desk Gate A',
    type: 'facility',
    x: 210,
    y: 350,
    details: 'Info Desk - Gate A',
  },
  {
    id: 'facility-medical-1',
    name: 'First Aid Clinic (Sec 118)',
    type: 'medical',
    x: 210,
    y: 430,
    details: 'Medical - Section 118',
  },
  {
    id: 'facility-prayer-1',
    name: 'Interfaith Prayer Room Sec 132',
    type: 'facility',
    x: 390,
    y: 260,
    details: 'Prayer Room - Sec 132',
  },
  {
    id: 'facility-store-1',
    name: 'FIFA Official Store Gate C',
    type: 'facility',
    x: 350,
    y: 450,
    details: 'Merch Store - Gate C',
  },
  {
    id: 'facility-baby-1',
    name: 'Baby Care Room Sec 140',
    type: 'facility',
    x: 280,
    y: 140,
    details: 'Baby Care - Sec 140',
  },
  {
    id: 'facility-smoking-1',
    name: 'Smoking Zone Patio B',
    type: 'facility',
    x: 410,
    y: 400,
    details: 'Smoking Area - Patio B',
  },
  {
    id: 'facility-lost-found',
    name: 'Lost & Found Section 124',
    type: 'facility',
    x: 320,
    y: 460,
    details: 'Lost & Found - Sec 124',
  },
  { id: 'pickup-metro', name: 'Metro Station Pick-up', type: 'transport', x: 120, y: 150, details: 'Metro - West Loop' },
  { id: 'pickup-shuttle', name: 'FIFA Shuttle Pick-up', type: 'transport', x: 480, y: 150, details: 'Shuttle - East Plaza' },
  { id: 'pickup-bus', name: 'NJ Transit Bus Stand', type: 'transport', x: 110, y: 420, details: 'Bus - South-West Loop' },
  { id: 'pickup-taxi', name: 'MetLife Taxi Stand', type: 'transport', x: 480, y: 420, details: 'Taxi - South-East Plaza' },
  { id: 'pickup-uber', name: 'Uber Pick-up Zone', type: 'transport', x: 300, y: 540, details: 'Rideshare Zone A' },
  { id: 'pickup-cycling', name: 'Bicycle Lockup Racks', type: 'transport', x: 180, y: 490, details: 'West Gate Racks' },
  { id: 'pickup-parking', name: 'Stadium Parking Lot E', type: 'transport', x: 300, y: 70, details: 'North Lot E' },
  { id: 'pickup-rideshare', name: 'Rideshare Drop Zone B', type: 'transport', x: 300, y: 530, details: 'Rideshare Zone B' },
];

export function useStadiumNavigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations] = useState<NavDestination[]>(MOCK_STADIUM_DESTINATIONS);
  const [activeDest, setActiveDest] = useState<NavDestination | null>(null);
  const [advice, setAdvice] = useState<string>('Please follow marked signs toward portals and concessions.');

  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(query) ||
        dest.type.toLowerCase().includes(query) ||
        dest.details.toLowerCase().includes(query)
    );
  }, [searchQuery, destinations]);

  const selectDestination = useCallback(
    (destId: string | null) => {
      if (!destId) {
        setActiveDest(null);
        return;
      }
      const found = destinations.find((d) => d.id === destId);
      if (found) {
        setActiveDest(found);
        setZoom(1.15);
        setPanOffset({ x: -(found.x - 300) * 0.5, y: -(found.y - 300) * 0.5 });
      }
    },
    [destinations]
  );

  useEffect(() => {
    if (!activeDest) {
      setAdvice('Please follow marked signs toward portals and concessions.');
      return;
    }
    async function loadAdvice() {
      if (!activeDest) return;
      try {
        const response = await apiClient.get<{ advice: string }>(
          `/navigation/route?from=gate-4&to=${activeDest.id}`
        );
        if (response.success && response.data?.advice) {
          setAdvice(response.data.advice);
        }
      } catch (err) {
        console.warn('[Navigation Hook] Failed to load route advice:', err);
      }
    }
    loadAdvice();
  }, [activeDest]);

  const resetNavigation = useCallback(() => {
    setActiveDest(null);
    setSearchQuery('');
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const activeRoute = useMemo<NavRoute | null>(() => {
    if (!activeDest) return null;

    const dx = activeDest.x - USER_START.x;
    const dy = activeDest.y - USER_START.y;
    const distanceVal = Math.sqrt(dx * dx + dy * dy);

    const meters = Math.round(distanceVal * 0.85);
    const minWalking = Math.max(1, Math.round(meters / 80));

    const crowdIndex: 'Low' | 'Moderate' | 'Heavy' =
      meters < 60 ? 'Low' : meters < 150 ? 'Moderate' : 'Heavy';
    const isAccessible = activeDest.type !== 'exit';

    let pathPoints = '';
    const crossesCenter =
      (USER_START.x < 300 && activeDest.x > 300) || (USER_START.x > 300 && activeDest.x < 300);

    if (crossesCenter) {
      const midX = (USER_START.x + activeDest.x) / 2;
      const midY = Math.max(USER_START.y, activeDest.y) + 40;
      pathPoints = `M ${USER_START.x} ${USER_START.y} Q ${midX} ${midY} ${activeDest.x} ${activeDest.y}`;
    } else {
      const midX = (USER_START.x + activeDest.x) / 2 + 15;
      const midY = (USER_START.y + activeDest.y) / 2 - 15;
      pathPoints = `M ${USER_START.x} ${USER_START.y} Q ${midX} ${midY} ${activeDest.x} ${activeDest.y}`;
    }

    return {
      destination: activeDest,
      walkingTime: `${minWalking} min`,
      distance: `${meters} meters`,
      crowdLevel: crowdIndex,
      accessibleRoute: isAccessible,
      pathPoints,
      advice,
    };
  }, [activeDest, advice]);

  return {
    searchQuery,
    setSearchQuery,
    destinations,
    filteredDestinations,
    activeDest,
    selectDestination,
    activeRoute,
    resetNavigation,
    zoom,
    setZoom,
    panOffset,
    setPanOffset,
    userPosition: USER_START,
  };
}
