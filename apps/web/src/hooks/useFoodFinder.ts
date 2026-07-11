import { useState, useMemo } from 'react';
import { MOCK_RESTAURANTS, type Restaurant } from '../constants/foodData';

export function useFoodFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(MOCK_RESTAURANTS[0]?.id || null);

  // Toggle filter selections
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  // 1. FILTERING LOGIC
  const filteredRestaurants = useMemo(() => {
    return MOCK_RESTAURANTS.filter((rest) => {
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
        // Special mapping for 'Vegetarian' category since it maps to the boolean flag
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
  }, [searchQuery, activeCategory, activeFilters]);

  // 2. RECOMMENDATION SCORING LOGIC (Isolated here inside useFoodFinder)
  const smartRecommendation = useMemo<Restaurant | null>(() => {
    if (MOCK_RESTAURANTS.length === 0) return null;

    let bestScore = -Infinity;
    let bestRest: Restaurant | null = null;

    MOCK_RESTAURANTS.forEach((rest) => {
      if (!rest.isOpen) return;

      // Score formula weighting higher ratings, shorter queues, shorter walking time, closer distance
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
  }, []);

  // Selected Restaurant details resolver
  const selectedRestaurant = useMemo(() => {
    return MOCK_RESTAURANTS.find((r) => r.id === selectedRestaurantId) || null;
  }, [selectedRestaurantId]);

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
    restaurants: MOCK_RESTAURANTS,
  };
}
