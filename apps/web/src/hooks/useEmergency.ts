import { useState, useEffect, useCallback, useMemo } from 'react';

export interface EmergencyCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  etaDescription: string;
  locationDescription: string;
  actionGuidance: string;
}

export const EMERGENCY_CATEGORIES: EmergencyCategory[] = [
  {
    id: 'medical',
    name: 'Medical Emergency',
    emoji: '🏥',
    description: 'Chest pain, physical injury, breathing difficulties, or loss of consciousness.',
    etaDescription: 'Under 2 minutes',
    locationDescription: 'Section 118 First Aid Clinic / Mobile Medics',
    actionGuidance: 'Remain calm. Clear the space around the patient. Medics are equipped with defibrillators and trauma kits.',
  },
  {
    id: 'security',
    name: 'Security Assistance',
    emoji: '🚨',
    description: 'Disruptive fan behavior, physical altercation, or safety concerns in your row.',
    etaDescription: 'Under 1.5 minutes',
    locationDescription: 'Zone B Response Team (Gate 4 Patrol)',
    actionGuidance: 'Do not intervene in altercations. Dispatched personnel will de-escalate. Stay clear of the incident.',
  },
  {
    id: 'fire',
    name: 'Fire / Hazard Report',
    emoji: '🚒',
    description: 'Visible fire, electrical sparks, heavy smoke, or chemical/structural hazard.',
    etaDescription: 'Under 3 minutes',
    locationDescription: 'Stadium Fire Safety Crew (Plaza Vault)',
    actionGuidance: 'Move away from the hazard immediately. Warn others nearby. Follow steward instructions.',
  },
  {
    id: 'child',
    name: 'Lost Child Alert',
    emoji: '👶',
    description: 'Report a missing child or separate minor family member immediately.',
    etaDescription: 'Immediate dispatch',
    locationDescription: 'MetLife Family Center (Plaza Level)',
    actionGuidance: 'Keep your position. Stadium stewards will lock down exits for checks and broadcast description.',
  },
  {
    id: 'lost-found',
    name: 'Lost & Found Support',
    emoji: '💼',
    description: 'Report lost bags, phones, keys, wallets, or other personal items.',
    etaDescription: 'Self-pickup',
    locationDescription: 'Main Help Desk (Behind Section 102)',
    actionGuidance: 'Provide detail descriptions of items. You can also view items via the AI Concierge assistant.',
  },
  {
    id: 'accessibility',
    name: 'Accessibility Assistance',
    emoji: '♿',
    description: 'Request wheelchair escort, elevator helper, or sensory room accommodations.',
    etaDescription: 'Under 5 minutes',
    locationDescription: 'Guest Services Escort (Section 116 Portal)',
    actionGuidance: 'Wait at your seat or designated portal. A guest services steward will arrive with transit support.',
  },
  {
    id: 'help-desk',
    name: 'Stadium Help Desk',
    emoji: 'ℹ️',
    description: 'Ticketing questions, stadium directions, or general match day info inquiries.',
    etaDescription: 'Instant response',
    locationDescription: 'Concourse Information Desks (All Decks)',
    actionGuidance: 'Submit inquiries directly or walk to the nearest desk. Stewards are available throughout the decks.',
  },
];

export function useEmergency() {
  const [selectedId, setSelectedId] = useState<string>('medical');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);

  // Select a category
  const selectEmergency = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  // Submit request
  const requestAssistance = useCallback(() => {
    setIsSubmitting(true);
    setIsDispatched(false);
    setTicketNumber(null);
    setCountdownSeconds(null);

    // Simulate 1.5s loader for dispatch registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDispatched(true);
      
      // Generate mock ticket number e.g. EM-49102
      const randomId = Math.floor(10000 + Math.random() * 90000);
      setTicketNumber(`EM-${randomId}`);
      
      // Seed countdown timer: 90 seconds (1m 30s)
      setCountdownSeconds(90);
    }, 1500);
  }, []);

  // Cancel request
  const cancelRequest = useCallback(() => {
    setIsSubmitting(false);
    setIsDispatched(false);
    setTicketNumber(null);
    setCountdownSeconds(null);
  }, []);

  // ETA Countdown Tick
  useEffect(() => {
    if (!isDispatched || countdownSeconds === null) return;

    if (countdownSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [isDispatched, countdownSeconds]);

  // Selected Category helper
  const selectedCategory = useMemo(() => {
    return EMERGENCY_CATEGORIES.find((c) => c.id === selectedId) || EMERGENCY_CATEGORIES[0];
  }, [selectedId]);

  return {
    categories: EMERGENCY_CATEGORIES,
    selectedId,
    selectedCategory,
    selectEmergency,
    isSubmitting,
    isDispatched,
    ticketNumber,
    countdownSeconds,
    requestAssistance,
    cancelRequest,
  };
}
