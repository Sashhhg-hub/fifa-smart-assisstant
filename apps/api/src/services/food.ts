import { GeminiService } from './ai/gemini.js';

const geminiService = new GeminiService();

export class FoodService {
  async getVendors(): Promise<unknown[]> {
    return [
      {
        id: 'vendor-1',
        name: 'Stadium Burgers & Fries',
        location: 'Section 114',
        crowdLevel: 'Moderate',
        estimatedWaitTime: 12,
      },
      {
        id: 'vendor-2',
        name: 'FIFA Official Tacos',
        location: 'Section 122',
        crowdLevel: 'Heavy',
        estimatedWaitTime: 25,
      },
    ];
  }

  async recommendFood(preferences: string): Promise<{ recommendations: string }> {
    const vendors = await this.getVendors();
    try {
      const response = await geminiService.recommendFood(preferences, vendors);
      return response;
    } catch (error) {
      console.warn('[Food Service] Gemini failed. Falling back to offline food advice:', error);
      return {
        recommendations: `[Offline Fallback] We recommend trying "Stadium Burgers & Fries" at Section 114, which currently has a Moderate wait time of 12 minutes.`,
      };
    }
  }
}
