import { useState, useMemo } from 'react';
import { MOCK_TRANSPORT_OPTIONS, type TransportOption } from '../constants/transportationData';

export function useTransportation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    MOCK_TRANSPORT_OPTIONS.find(o => o.isOpen)?.id || MOCK_TRANSPORT_OPTIONS[0]?.id || null
  );

  // 1. FILTERING LOGIC
  const filteredOptions = useMemo(() => {
    return MOCK_TRANSPORT_OPTIONS.filter((opt) => {
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = opt.name.toLowerCase().includes(query);
        const matchesType = opt.type.toLowerCase().includes(query);
        const matchesPickup = opt.pickupPoint.toLowerCase().includes(query);
        const matchesDetails = opt.details.toLowerCase().includes(query);
        if (!matchesName && !matchesType && !matchesPickup && !matchesDetails) return false;
      }

      // Category filter check
      if (activeCategory) {
        if (opt.type.toLowerCase() !== activeCategory.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, activeCategory]);

  // 2. SMART RECOMMENDATION LOGIC (Best Travel Option)
  // Scores available options based on:
  // - Open status (must be open)
  // - Shortest travel time (lower penalty)
  // - Lowest cost (lower penalty)
  // - Lowest crowd density (Low = 0, Moderate = 10, Heavy = 25)
  const smartRecommendation = useMemo<TransportOption | null>(() => {
    const openOptions = MOCK_TRANSPORT_OPTIONS.filter((opt) => opt.isOpen);
    if (openOptions.length === 0) return null;

    let bestScore = -Infinity;
    let bestOption: TransportOption | null = null;

    openOptions.forEach((opt) => {
      let crowdPenalty = 0;
      if (opt.crowdLevel === 'Moderate') {
        crowdPenalty = 10;
      } else if (opt.crowdLevel === 'Heavy') {
        crowdPenalty = 25;
      }

      const timePenalty = opt.travelTime * 0.8;
      const costPenalty = opt.costValue * 0.8;

      const score = 100 - timePenalty - costPenalty - crowdPenalty;

      if (score > bestScore) {
        bestScore = score;
        bestOption = opt;
      }
    });

    return bestOption;
  }, []);

  // Selected Transport Option resolver
  const selectedOption = useMemo(() => {
    return MOCK_TRANSPORT_OPTIONS.find((opt) => opt.id === selectedOptionId) || null;
  }, [selectedOptionId]);

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    selectedOptionId,
    setSelectedOptionId,
    selectedOption,
    filteredOptions,
    smartRecommendation,
    options: MOCK_TRANSPORT_OPTIONS,
  };
}
