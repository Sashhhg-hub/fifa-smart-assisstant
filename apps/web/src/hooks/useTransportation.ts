import { useState, useMemo, useEffect } from 'react';
import { MOCK_TRANSPORT_OPTIONS, type TransportOption } from '../constants/transportationData';
import { apiClient } from '../utils/apiClient';

interface BackendTransport {
  name: string;
  type: string;
  isOpen?: boolean;
  crowdLevel?: string;
  travelTime?: number;
}

export function useTransportation() {
  const [options, setOptions] = useState<TransportOption[]>(MOCK_TRANSPORT_OPTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    MOCK_TRANSPORT_OPTIONS.find((o) => o.isOpen)?.id || MOCK_TRANSPORT_OPTIONS[0]?.id || null
  );

  useEffect(() => {
    async function loadLiveOptions() {
      try {
        const response = await apiClient.get<BackendTransport[]>('/transportation/options');
        if (response.success && response.data) {
          const apiData = response.data;
          setOptions((prev) =>
            prev.map((o) => {
              const match = apiData.find(
                (bo) =>
                  bo.name.includes(o.name) || bo.type.toLowerCase() === o.type.toLowerCase()
              );
              if (match) {
                return {
                  ...o,
                  isOpen: match.isOpen ?? o.isOpen,
                  crowdLevel: (match.crowdLevel as TransportOption['crowdLevel']) || o.crowdLevel,
                  travelTime: match.travelTime || o.travelTime,
                };
              }
              return o;
            })
          );
        }
      } catch (err) {
        console.warn('[Transportation Hook] Failed to load transit options:', err);
      }
    }
    loadLiveOptions();
  }, []);

  // 1. FILTERING LOGIC
  const filteredOptions = useMemo(() => {
    return options.filter((opt) => {
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
  }, [options, searchQuery, activeCategory]);

  // 2. SMART RECOMMENDATION LOGIC
  const smartRecommendation = useMemo<TransportOption | null>(() => {
    const openOptions = options.filter((opt) => opt.isOpen);
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
  }, [options]);

  // Selected Transport Option resolver
  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.id === selectedOptionId) || null;
  }, [options, selectedOptionId]);

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
    options,
  };
}
