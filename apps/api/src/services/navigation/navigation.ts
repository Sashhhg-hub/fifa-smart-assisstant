import { GeminiService } from '../ai/gemini.js';

const geminiService = new GeminiService();

export class NavigationService {
  async calculateRoute(
    fromId: string,
    toId: string
  ): Promise<{ route: string[]; eta: number; distance: number; advice?: string }> {
    const route = [fromId, 'concourse-north', 'portal-114', toId];
    const eta = 4;
    const distance = 120; // in meters

    let advice = 'Please follow marked signs toward portals and concessions.';

    try {
      const response = await geminiService.generateNavigationAdvice({
        fromId,
        toId,
        route,
        eta,
        distance,
      });
      advice = response.advice;
    } catch (error) {
      console.warn('[Navigation Service] Gemini failed. Falling back to local advice:', error);
    }

    return {
      route,
      eta,
      distance,
      advice,
    };
  }
}
