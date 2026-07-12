import { useState, useMemo } from 'react';
import { MOCK_LOST_FOUND_ITEMS, type LostFoundItem } from '../constants/lostFoundData';

export function useLostAndFound() {
  const [items, setItems] = useState<LostFoundItem[]>(MOCK_LOST_FOUND_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    MOCK_LOST_FOUND_ITEMS[0]?.id || null
  );

  // 1. REPORT SUBMISSION
  const addReport = (reportData: {
    name: string;
    category: string;
    description: string;
    type: 'lost' | 'found';
    collectionLocation: string;
    contactInfo: string;
    claimInstructions: string;
  }) => {
    const claimId = `CLM-${Math.floor(100000 + Math.random() * 900000)}`;
    const newItem: LostFoundItem = {
      ...reportData,
      id: `lf-item-${Date.now()}`,
      dateReported: new Date().toISOString(),
      status: 'Reported',
      claimId,
    };
    setItems((prev) => [newItem, ...prev]);
    setSelectedItemId(newItem.id);
    return claimId;
  };

  // 2. FILTERING LOGIC
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesClaim = item.claimId.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesClaim) return false;
      }

      // Category filter check
      if (activeCategory) {
        if (item.category.toLowerCase() !== activeCategory.toLowerCase()) {
          return false;
        }
      }

      // Status filter check
      if (activeStatus) {
        if (item.status.toLowerCase() !== activeStatus.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [items, searchQuery, activeCategory, activeStatus]);

  // Selected item resolver
  const selectedItem = useMemo(() => {
    return items.find((i) => i.id === selectedItemId) || null;
  }, [items, selectedItemId]);

  // 3. SMART MATCH RECOMMENDATION LOGIC (Possible Match Found)
  // For the selected item, find the most likely match of the opposite type (lost <=> found)
  const possibleMatch = useMemo<LostFoundItem | null>(() => {
    if (!selectedItem) return null;

    const oppositeType = selectedItem.type === 'lost' ? 'found' : 'lost';
    const candidates = items.filter((item) => item.type === oppositeType);

    let bestScore = 0;
    let bestMatch: LostFoundItem | null = null;

    candidates.forEach((candidate) => {
      let score = 0;

      // Rule 1: Category Match (+50 points)
      if (candidate.category.toLowerCase() === selectedItem.category.toLowerCase()) {
        score += 50;
      }

      // Rule 2: Description keyword similarity (+5 points per match)
      const desc1Words = selectedItem.description.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
      const desc2Words = candidate.description.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
      const commonWords = desc1Words.filter(w => desc2Words.includes(w));
      
      // Deduplicate common words
      const uniqueCommonWords = Array.from(new Set(commonWords));
      score += uniqueCommonWords.length * 8;

      // Rule 3: Report Timing Proximity
      const date1 = new Date(selectedItem.dateReported).getTime();
      const date2 = new Date(candidate.dateReported).getTime();
      const hoursDiff = Math.abs(date1 - date2) / (1000 * 60 * 60);

      if (hoursDiff < 3) {
        score += 30;
      } else if (hoursDiff < 12) {
        score += 15;
      } else if (hoursDiff < 24) {
        score += 5;
      }

      // We only consider it a match if it crosses a baseline threshold of similarity (e.g. 60 points)
      if (score >= 60 && score > bestScore) {
        bestScore = score;
        bestMatch = candidate;
      }
    });

    return bestMatch;
  }, [items, selectedItem]);

  return {
    items,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeStatus,
    setActiveStatus,
    selectedItemId,
    setSelectedItemId,
    selectedItem,
    filteredItems,
    possibleMatch,
    addReport,
  };
}
