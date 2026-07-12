export class TranslationService {
  async translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
    return `[Translated from ${sourceLang} to ${targetLang}]: "${text}"`;
  }
}
