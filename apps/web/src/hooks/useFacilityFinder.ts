import { useState, useMemo } from 'react';
import { MOCK_FACILITIES, type Facility } from '../constants/facilityData';

export function useFacilityFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    MOCK_FACILITIES.find(f => f.isOpen)?.id || MOCK_FACILITIES[0]?.id || null
  );

  // 1. FILTERING LOGIC
  const filteredFacilities = useMemo(() => {
    return MOCK_FACILITIES.filter((facility) => {
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = facility.name.toLowerCase().includes(query);
        const matchesCategory = facility.category.toLowerCase().includes(query);
        const matchesDetails = facility.details.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDetails) return false;
      }

      // Category filter check
      if (activeCategory) {
        if (facility.category.toLowerCase() !== activeCategory.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, activeCategory]);

  // 2. SMART RECOMMENDATION LOGIC
  // Recommends the best facility based on:
  // - Open status (must be open)
  // - Shortest distance
  // - Lowest crowd level (Low > Moderate > Heavy)
  const smartRecommendation = useMemo<Facility | null>(() => {
    const openFacilities = MOCK_FACILITIES.filter((f) => f.isOpen);
    if (openFacilities.length === 0) return null;

    let bestScore = -Infinity;
    let bestFacility: Facility | null = null;

    openFacilities.forEach((facility) => {
      // Crowd level base penalties
      let crowdPenalty = 0;
      if (facility.crowdLevel === 'Moderate') {
        crowdPenalty = 15;
      } else if (facility.crowdLevel === 'Heavy') {
        crowdPenalty = 40;
      }

      // Distance penalty (e.g. 0.1 score point per meter)
      const distancePenalty = facility.distance * 0.15;

      // Base score starts at 100
      const score = 100 - distancePenalty - crowdPenalty;

      if (score > bestScore) {
        bestScore = score;
        bestFacility = facility;
      }
    });

    return bestFacility;
  }, []);

  // Selected Facility resolver
  const selectedFacility = useMemo(() => {
    return MOCK_FACILITIES.find((f) => f.id === selectedFacilityId) || null;
  }, [selectedFacilityId]);

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    selectedFacilityId,
    setSelectedFacilityId,
    selectedFacility,
    filteredFacilities,
    smartRecommendation,
    facilities: MOCK_FACILITIES,
  };
}
