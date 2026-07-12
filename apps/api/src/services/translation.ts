import { GeminiService } from './ai/gemini.js';

const geminiService = new GeminiService();

export class TranslationService {
  async translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
    try {
      const result = await geminiService.translateText(text, sourceLang, targetLang);
      return result.translatedText;
    } catch (error) {
      console.warn('[Translation Service] Gemini failed. Falling back to local template:', error);
      return `[Offline Translation from ${sourceLang} to ${targetLang}]: "${text}"`;
    }
  }
}
