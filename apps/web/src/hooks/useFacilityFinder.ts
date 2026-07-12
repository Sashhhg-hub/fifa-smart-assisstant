import { useState, useMemo, useEffect } from 'react';
import { MOCK_FACILITIES, type Facility } from '../constants/facilityData';
import { apiClient } from '../utils/apiClient';

interface BackendFacility {
  name: string;
  category: string;
  status: string;
  crowdLevel?: string;
}

export function useFacilityFinder() {
  const [facilities, setFacilities] = useState<Facility[]>(MOCK_FACILITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    MOCK_FACILITIES.find((f) => f.isOpen)?.id || MOCK_FACILITIES[0]?.id || null
  );

  useEffect(() => {
    async function loadLiveFacilities() {
      try {
        const response = await apiClient.get<BackendFacility[]>('/facilities');
        if (response.success && response.data) {
          const apiData = response.data;
          setFacilities((prev) =>
            prev.map((f) => {
              const match = apiData.find(
                (bf) =>
                  bf.name.includes(f.name) ||
                  bf.category.toLowerCase() === f.category.toLowerCase()
              );
              if (match) {
                return {
                  ...f,
                  isOpen: match.status === 'Open',
                  crowdLevel: (match.crowdLevel as Facility['crowdLevel']) || f.crowdLevel,
                };
              }
              return f;
            })
          );
        }
      } catch (err) {
        console.warn('[Facility Finder Hook] Failed to load facilities:', err);
      }
    }
    loadLiveFacilities();
  }, []);

  // 1. FILTERING LOGIC
  const filteredFacilities = useMemo(() => {
    return facilities.filter((facility) => {
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
  }, [facilities, searchQuery, activeCategory]);

  // 2. SMART RECOMMENDATION LOGIC
  const smartRecommendation = useMemo<Facility | null>(() => {
    const openFacilities = facilities.filter((f) => f.isOpen);
    if (openFacilities.length === 0) return null;

    let bestScore = -Infinity;
    let bestFacility: Facility | null = null;

    openFacilities.forEach((facility) => {
      let crowdPenalty = 0;
      if (facility.crowdLevel === 'Moderate') {
        crowdPenalty = 15;
      } else if (facility.crowdLevel === 'Heavy') {
        crowdPenalty = 40;
      }

      const distancePenalty = facility.distance * 0.15;
      const score = 100 - distancePenalty - crowdPenalty;

      if (score > bestScore) {
        bestScore = score;
        bestFacility = facility;
      }
    });

    return bestFacility;
  }, [facilities]);

  // Selected Facility resolver
  const selectedFacility = useMemo(() => {
    return facilities.find((f) => f.id === selectedFacilityId) || null;
  }, [facilities, selectedFacilityId]);

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
    facilities,
  };
}
