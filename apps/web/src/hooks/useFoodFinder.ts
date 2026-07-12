import { useState, useMemo, useEffect } from 'react';
import { MOCK_RESTAURANTS, type Restaurant } from '../constants/foodData';
import { apiClient } from '../utils/apiClient';

interface BackendVendor {
  id: string;
  vendorId?: string;
  name: string;
  crowdLevel?: string;
  estimatedWaitTime?: number;
}

export function useFoodFinder() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(MOCK_RESTAURANTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(
    MOCK_RESTAURANTS[0]?.id || null
  );

  useEffect(() => {
    async function loadLiveTimes() {
      try {
        const response = await apiClient.get<BackendVendor[]>('/food/vendors');
        if (response.success && response.data) {
          const apiData = response.data;
          setRestaurants((prev) =>
            prev.map((rest) => {
              const match = apiData.find(
                (v) =>
                  v.id === rest.id || v.vendorId === rest.id || v.name.includes(rest.name)
              );
              if (match) {
                return {
                  ...rest,
                  queueTime: match.estimatedWaitTime ?? rest.queueTime,
                  crowdStatus: (match.crowdLevel as Restaurant['crowdStatus']) || rest.crowdStatus,
                };
              }
              return rest;
            })
          );
        }
      } catch (err) {
        console.warn('[Food Finder Hook] Failed to load live vendor statistics:', err);
      }
    }
    loadLiveTimes();
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  // 1. FILTERING LOGIC
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((rest) => {
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = rest.name.toLowerCase().includes(query);
        const matchesCuisine = rest.cuisine.toLowerCase().includes(query);
        const matchesItem = rest.popularItems.some(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesCuisine && !matchesItem) return false;
      }

      // Category chip check
      if (activeCategory) {
        if (activeCategory === 'Vegetarian') {
          if (!rest.isVegetarian) return false;
        } else {
          const hasCategory = rest.categories.some(
            (c) => c.toLowerCase() === activeCategory.toLowerCase()
          );
          if (!hasCategory) return false;
        }
      }

      // Quick filters check
      for (const filter of activeFilters) {
        if (filter === 'Near Me' && rest.distance > 180) return false;
        if (filter === 'No Queue' && rest.queueTime >= 5) return false;
        if (filter === 'Vegetarian' && !rest.isVegetarian) return false;
        if (filter === 'Halal' && !rest.isHalal) return false;
        if (filter === 'Fastest Service' && rest.queueTime + rest.walkingTime > 8) return false;
        if (filter === 'Highest Rated' && rest.rating < 4.5) return false;
      }

      return true;
    });
  }, [restaurants, searchQuery, activeCategory, activeFilters]);

  // 2. RECOMMENDATION SCORING LOGIC
  const smartRecommendation = useMemo<Restaurant | null>(() => {
    if (restaurants.length === 0) return null;

    let bestScore = -Infinity;
    let bestRest: Restaurant | null = null;

    restaurants.forEach((rest) => {
      if (!rest.isOpen) return;

      const ratingWeight = rest.rating * 15;
      const timePenalty = (rest.queueTime + rest.walkingTime) * 1.5;
      const distancePenalty = rest.distance * 0.03;

      const score = ratingWeight - timePenalty - distancePenalty;

      if (score > bestScore) {
        bestScore = score;
        bestRest = rest;
      }
    });

    return bestRest;
  }, [restaurants]);

  // Selected Restaurant details resolver
  const selectedRestaurant = useMemo(() => {
    return restaurants.find((r) => r.id === selectedRestaurantId) || null;
  }, [restaurants, selectedRestaurantId]);

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeFilters,
    toggleFilter,
    selectedRestaurantId,
    setSelectedRestaurantId,
    selectedRestaurant,
    filteredRestaurants,
    smartRecommendation,
    restaurants,
  };
}
