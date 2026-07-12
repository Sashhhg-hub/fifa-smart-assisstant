import { useState, useCallback } from 'react';
import { apiClient } from '../utils/apiClient';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface TranslationLog {
  id: string;
  sourceLang: string;
  targetLang: string;
  originalText: string;
  translatedText: string;
  timestamp: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
];

export function useTranslation() {
  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('es');
  const [inputText, setInputText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [history, setHistory] = useState<TranslationLog[]>([
    {
      id: 'h-1',
      sourceLang: 'en',
      targetLang: 'es',
      originalText: 'Where is the elevator?',
      translatedText: '¿Dónde está el ascensor?',
      timestamp: '10 mins ago',
    },
    {
      id: 'h-2',
      sourceLang: 'es',
      targetLang: 'en',
      originalText: '¿Dónde está la clínica médica más cercana?',
      translatedText: 'Where is the nearest medical clinic?',
      timestamp: '25 mins ago',
    },
  ]);

  const selectSourceLang = useCallback((code: string) => {
    setSourceLang(code);
  }, []);

  const selectTargetLang = useCallback((code: string) => {
    setTargetLang(code);
  }, []);

  const swapLanguages = useCallback(() => {
    setSourceLang((prevSource) => {
      setTargetLang(prevSource);
      return targetLang;
    });
    setInputText((prevInput) => {
      setTranslatedText(prevInput);
      return translatedText;
    });
  }, [targetLang, translatedText]);

  const clearText = useCallback(() => {
    setInputText('');
    setTranslatedText('');
  }, []);

  const translateText = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);

    try {
      const response = await apiClient.post<{ translatedText: string }>('/translation/translate', {
        text: inputText,
        sourceLang,
        targetLang,
      });

      const resultText =
        response.success && response.data?.translatedText
          ? response.data.translatedText
          : `[Translation Error]: ${inputText}`;

      setTranslatedText(resultText);

      const newLog: TranslationLog = {
        id: `h-${Date.now()}`,
        sourceLang,
        targetLang,
        originalText: inputText,
        translatedText: resultText,
        timestamp: 'Just now',
      };
      setHistory((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error('[Translation Hook] Request failed:', err);
    } finally {
      setIsTranslating(false);
    }
  }, [inputText, sourceLang, targetLang]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    languages: SUPPORTED_LANGUAGES,
    sourceLang,
    targetLang,
    inputText,
    translatedText,
    isTranslating,
    history,
    selectSourceLang,
    selectTargetLang,
    setInputText,
    translateText,
    swapLanguages,
    clearText,
    clearHistory,
  };
}
