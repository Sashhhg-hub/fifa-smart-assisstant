import { GoogleGenAI } from '@google/genai';
import { env } from '../../config/env.js';
import { AppError } from '../../middleware/error.js';
import * as prompts from './prompts.js';

export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private modelName = 'gemini-flash-latest';

  constructor() {
    if (env.GEMINI_API_KEY) {
      try {
        this.ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
      } catch (err) {
        console.error('Failed to initialize Google Gen AI SDK:', err);
      }
    } else {
      console.warn(
        'GEMINI_API_KEY environment variable is not defined. AI functions will run in offline fallback mode.'
      );
    }
  }

  private ensureClient(): GoogleGenAI {
    if (!this.ai) {
      throw new AppError(
        'Google Gemini API Key is missing. The AI service is currently running in offline fallback mode.',
        503,
        'AI_UNAVAILABLE'
      );
    }
    return this.ai;
  }

  private logRequest(method: string, promptLength: number) {
    console.log(`[Gemini AI Service] Requesting ${method} - Prompt Length: ${promptLength} chars`);
  }

  private logCompletion(method: string, duration: number) {
    console.log(`[Gemini AI Service] Completed ${method} in ${duration}ms`);
  }

  async generateReply(
    prompt: string,
    context?: unknown
  ): Promise<{ replyText: string; suggestions: string[] }> {
    const start = Date.now();
    this.logRequest('generateReply', prompt.length);

    if (!this.ai) {
      this.logCompletion('generateReply (MOCK)', Date.now() - start);
      return {
        replyText: `[OFFLINE MOCK] This is a fallback reply. Your query: "${prompt}". Please configure GEMINI_API_KEY to activate live AI.`,
        suggestions: ['Find Washrooms', 'Find Burgers', 'Navigation Guide'],
      };
    }

    try {
      const client = this.ensureClient();
      const contextString = context ? JSON.stringify(context) : 'No user context provided';
      const fullPrompt = `${prompts.CONCIERGE_TEMPLATE.replace(
        '${context}',
        contextString
      )}\nUser Query: ${prompt}`;

      const response = await client.models.generateContent({
        model: this.modelName,
        contents: fullPrompt,
      });

      const replyText = response.text || 'No response text generated';
      this.logCompletion('generateReply', Date.now() - start);

      return {
        replyText,
        suggestions: ['Find Washrooms', 'Food Vendors', 'Exit Routes'],
      };
    } catch (error) {
      const err = error as Error & { status?: number };
      console.error('[Gemini AI Service] Error in generateReply:', err);
      throw new AppError(
        err.message || 'Error communicating with Google Gemini API',
        err.status || 500,
        'AI_ERROR'
      );
    }
  }

  async translateText(
    text: string,
    sourceLang: string,
    targetLang: string
  ): Promise<{ translatedText: string }> {
    const start = Date.now();
    this.logRequest('translateText', text.length);

    if (!this.ai) {
      this.logCompletion('translateText (MOCK)', Date.now() - start);
      return {
        translatedText: `[OFFLINE MOCK] Translated to ${targetLang}: ${text}`,
      };
    }

    try {
      const client = this.ensureClient();
      const fullPrompt = prompts.TRANSLATION_TEMPLATE.replace('${sourceLang}', sourceLang)
        .replace('${targetLang}', targetLang)
        .replace('${text}', text);

      const response = await client.models.generateContent({
        model: this.modelName,
        contents: fullPrompt,
      });

      const translatedText = response.text?.trim() || text;
      this.logCompletion('translateText', Date.now() - start);

      return { translatedText };
    } catch (error) {
      const err = error as Error & { status?: number };
      console.error('[Gemini AI Service] Error in translateText:', err);
      throw new AppError(
        err.message || 'Error translating text via Gemini API',
        err.status || 500,
        'AI_ERROR'
      );
    }
  }

  async recommendFood(
    preferences: string,
    vendors: unknown
  ): Promise<{ recommendations: string }> {
    const start = Date.now();
    this.logRequest('recommendFood', preferences.length);

    if (!this.ai) {
      this.logCompletion('recommendFood (MOCK)', Date.now() - start);
      return {
        recommendations: `[OFFLINE MOCK] Food recommendation for: "${preferences}" based on available stands.`,
      };
    }

    try {
      const client = this.ensureClient();
      const vendorsString = JSON.stringify(vendors);
      const fullPrompt = prompts.FOOD_RECOMMENDATION_TEMPLATE.replace(
        '${preferences}',
        preferences
      ).replace('${vendors}', vendorsString);

      const response = await client.models.generateContent({
        model: this.modelName,
        contents: fullPrompt,
      });

      const recommendations = response.text || 'No food recommendations available.';
      this.logCompletion('recommendFood', Date.now() - start);

      return { recommendations };
    } catch (error) {
      const err = error as Error & { status?: number };
      console.error('[Gemini AI Service] Error in recommendFood:', err);
      throw new AppError(
        err.message || 'Error fetching food recommendations via Gemini API',
        err.status || 500,
        'AI_ERROR'
      );
    }
  }

  async generateNavigationAdvice(routeDetails: unknown): Promise<{ advice: string }> {
    const start = Date.now();
    this.logRequest('generateNavigationAdvice', 20);

    if (!this.ai) {
      this.logCompletion('generateNavigationAdvice (MOCK)', Date.now() - start);
      return {
        advice:
          '[OFFLINE MOCK] Take the main concourse stairs. Crowd is moderate, walking time is 5 minutes.',
      };
    }

    try {
      const client = this.ensureClient();
      const routeString = JSON.stringify(routeDetails);
      const fullPrompt = prompts.NAVIGATION_ADVICE_TEMPLATE.replace(
        '${routeDetails}',
        routeString
      );

      const response = await client.models.generateContent({
        model: this.modelName,
        contents: fullPrompt,
      });

      const advice = response.text || 'No safety navigation advice available.';
      this.logCompletion('generateNavigationAdvice', Date.now() - start);

      return { advice };
    } catch (error) {
      const err = error as Error & { status?: number };
      console.error('[Gemini AI Service] Error in generateNavigationAdvice:', err);
      throw new AppError(
        err.message || 'Error generating route advice via Gemini API',
        err.status || 500,
        'AI_ERROR'
      );
    }
  }

  async matchLostItem(
    lostDescription: string,
    foundDescription: string
  ): Promise<{ matchScore: number; matchConfirmed: boolean }> {
    const start = Date.now();
    this.logRequest('matchLostItem', lostDescription.length + foundDescription.length);

    if (!this.ai) {
      this.logCompletion('matchLostItem (MOCK)', Date.now() - start);
      return {
        matchScore: 80,
        matchConfirmed: true,
      };
    }

    try {
      const client = this.ensureClient();
      const fullPrompt = prompts.LOST_FOUND_MATCHING_TEMPLATE.replace(
        '${lostDescription}',
        lostDescription
      ).replace('${foundDescription}', foundDescription);

      const response = await client.models.generateContent({
        model: this.modelName,
        contents: fullPrompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const jsonText = response.text || '{}';
      const result = JSON.parse(jsonText);
      this.logCompletion('matchLostItem', Date.now() - start);

      return {
        matchScore: typeof result.matchScore === 'number' ? result.matchScore : 0,
        matchConfirmed: typeof result.matchConfirmed === 'boolean' ? result.matchConfirmed : false,
      };
    } catch (error) {
      const err = error as Error & { status?: number };
      console.error('[Gemini AI Service] Error in matchLostItem:', err);
      throw new AppError(
        err.message || 'Error semantic matching claims via Gemini API',
        err.status || 500,
        'AI_ERROR'
      );
    }
  }
}
