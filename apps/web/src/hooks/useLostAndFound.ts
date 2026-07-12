import { useState, useMemo, useEffect } from 'react';
import { MOCK_LOST_FOUND_ITEMS, type LostFoundItem } from '../constants/lostFoundData';
import { apiClient } from '../utils/apiClient';

interface BackendLostFound {
  _id?: string;
  claimId: string;
  name: string;
  category: string;
  type: string;
  description: string;
  contactInfo: string;
  status: string;
  createdAt?: string;
  collectionLocation?: string;
  claimInstructions?: string;
  matchedReportId?: string;
  matchConfidence?: number;
}

export function useLostAndFound() {
  const [items, setItems] = useState<LostFoundItem[]>(MOCK_LOST_FOUND_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    MOCK_LOST_FOUND_ITEMS[0]?.id || null
  );

  useEffect(() => {
    async function loadReports() {
      try {
        const response = await apiClient.get<BackendLostFound[]>('/lostfound');
        if (response.success && response.data) {
          const apiData = response.data;
          const mapped: LostFoundItem[] = apiData.map((item) => ({
            id: item._id || item.claimId || `lf-item-${Date.now()}`,
            name: item.name,
            category: item.category,
            type: item.type as 'lost' | 'found',
            description: item.description,
            contactInfo: item.contactInfo,
            status: item.status as LostFoundItem['status'],
            claimId: item.claimId,
            dateReported: item.createdAt || new Date().toISOString(),
            collectionLocation: item.collectionLocation || 'Main Help Desk (Section 102)',
            claimInstructions: item.claimInstructions || 'Please verify ownership with ID at pickup location.',
          }));
          setItems(mapped);
          if (mapped.length > 0) {
            setSelectedItemId(mapped[0].id);
          }
        }
      } catch (err) {
        console.warn('[Lost & Found Hook] Failed to load reports:', err);
      }
    }
    loadReports();
  }, []);

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
    const mockId = `lf-item-${Date.now()}`;
    const newItem: LostFoundItem = {
      ...reportData,
      id: mockId,
      dateReported: new Date().toISOString(),
      status: 'Reported',
      claimId,
    };

    setItems((prev) => [newItem, ...prev]);
    setSelectedItemId(newItem.id);

    apiClient
      .post<BackendLostFound>('/lostfound/report', {
        name: reportData.name,
        category: reportData.category,
        description: reportData.description,
        type: reportData.type,
        contactInfo: reportData.contactInfo,
        collectionLocation: reportData.collectionLocation,
        claimInstructions: reportData.claimInstructions,
      })
      .then((response) => {
        if (response.success && response.data) {
          const item = response.data;
          setItems((prev) =>
            prev.map((i) =>
              i.id === mockId
                ? {
                    ...i,
                    id: item._id || item.claimId,
                    status: (item.status as LostFoundItem['status']) || i.status,
                    claimId: item.claimId || i.claimId,
                    matchedReportId: item.matchedReportId,
                    matchConfidence: item.matchConfidence,
                  }
                : i
            )
          );
          setSelectedItemId(item._id || item.claimId);
        }
      })
      .catch((err) => {
        console.error('[Lost & Found Hook] Background matching failed:', err);
      });

    return claimId;
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesClaim = item.claimId.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesClaim) return false;
      }

      if (activeCategory) {
        if (item.category.toLowerCase() !== activeCategory.toLowerCase()) {
          return false;
        }
      }

      if (activeStatus) {
        if (item.status.toLowerCase() !== activeStatus.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [items, searchQuery, activeCategory, activeStatus]);

  const selectedItem = useMemo(() => {
    return items.find((i) => i.id === selectedItemId) || null;
  }, [items, selectedItemId]);

  const possibleMatch = useMemo<LostFoundItem | null>(() => {
    if (!selectedItem) return null;

    const oppositeType = selectedItem.type === 'lost' ? 'found' : 'lost';
    const candidates = items.filter((item) => item.type === oppositeType);

    let bestScore = 0;
    let bestMatch: LostFoundItem | null = null;

    candidates.forEach((candidate) => {
      let score = 0;

      if (candidate.category.toLowerCase() === selectedItem.category.toLowerCase()) {
        score += 50;
      }

      const desc1Words = selectedItem.description
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3);
      const desc2Words = candidate.description
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3);
      const commonWords = desc1Words.filter((w) => desc2Words.includes(w));

      const uniqueCommonWords = Array.from(new Set(commonWords));
      score += uniqueCommonWords.length * 8;

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
