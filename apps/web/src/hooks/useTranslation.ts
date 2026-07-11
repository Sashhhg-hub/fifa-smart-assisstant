import { useState, useCallback } from 'react';

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

// Pre-defined high-fidelity translations for key stadium statements
const DICTIONARY: Record<string, Record<string, string>> = {
  "where is the nearest medical clinic?": {
    en: "Where is the nearest medical clinic?",
    es: "¿Dónde está la clínica médica más cercana?",
    fr: "Où se trouve la clinique médicale la plus proche?",
    de: "Wo ist die nächste medizinische Klinik?",
    pt: "Onde fica a clínica médica mais próxima?",
    ar: "أين هي أقرب عيادة طبية؟",
    hi: "निकटतम चिकित्सा क्लिनिक कहाँ है?",
    ja: "最寄りの医療クリニックはどこですか？",
  },
  "how do i get to section 118?": {
    en: "How do I get to Section 118?",
    es: "¿Cómo llego a la Sección 118?",
    fr: "Comment puis-je me rendre à la section 118?",
    de: "Wie komme ich zu Sektor 118?",
    pt: "Como chego à Seção 118?",
    ar: "كيف أصل إلى القسم 118؟",
    hi: "मैं सेक्शन 118 में कैसे जाऊं?",
    ja: "セクション118にはどうやって行けばいいですか？",
  },
  "where can i buy a hot dog?": {
    en: "Where can I buy a hot dog?",
    es: "¿Dónde puedo comprar un hot dog?",
    fr: "Où puis-je acheter un hot-dog?",
    de: "Wo kann ich einen Hotdog kaufen?",
    pt: "Onde posso comprar um cachorro-quente?",
    ar: "أين يمكنني شراء الهوت دوغ؟",
    hi: "मैं हॉट डॉग कहाँ से खरीद सकता हूँ?",
    ja: "ホットドッグはどこで買えますか？",
  },
  "when does the second half start?": {
    en: "When does the second half start?",
    es: "¿Cuándo empieza el segundo tiempo?",
    fr: "Quand commence la seconde mi-temps?",
    de: "Wann beginnt die zweite Halbzeit?",
    pt: "Quando começa o segundo tempo?",
    ar: "متى يبدأ الشوط الثاني؟",
    hi: "दूसरा हाफ कब शुरू होता है?",
    ja: "後半はいつ始まりますか？",
  },
  "goaaal! what a fantastic game!": {
    en: "Goaaal! What a fantastic game!",
    es: "¡Golaaazo! ¡Qué partido tan fantástico!",
    fr: "But! Quel match fantastique!",
    de: "Tor! Was für ein fantastisches Spiel!",
    pt: "Golaço! Que jogo fantástico!",
    ar: "هدف! يا لها من مباراة رائعة!",
    hi: "गोओओॉल! कितना शानदार खेल है!",
    ja: "ゴーーール！なんて素晴らしい試合だ！",
  },
  "can you help me find my seat?": {
    en: "Can you help me find my seat?",
    es: "¿Me puede ayudar a encontrar mi asiento?",
    fr: "Pouvez-vous m'aider à trouver mon siège?",
    de: "Können Sie mir helfen, meinen Platz zu finden?",
    pt: "Você pode me ajudar a encontrar meu assento?",
    ar: "هل يمكنك مساعدتي في العثور على مقعدي؟",
    hi: "क्या आप मुझे अपनी सीट ढूंढने में मदद कर सकते हैं?",
    ja: "席を探すのを手伝ってくれませんか？",
  },
  "where is the elevator?": {
    en: "Where is the elevator?",
    es: "¿Dónde está el ascensor?",
    fr: "Où se trouve l'ascenseur?",
    de: "Wo ist der Aufzug?",
    pt: "Onde fica o elevador?",
    ar: "أين المصعد؟",
    hi: "लिफ्ट कहाँ है?",
    ja: "エレベーターはどこですか？",
  },
};

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

  const translateText = useCallback(() => {
    if (!inputText.trim()) return;

    setIsTranslating(true);

    // Simulate AI translation processing delay of 1s
    setTimeout(() => {
      setIsTranslating(false);
      
      const normalizedInput = inputText.trim().toLowerCase();
      let translationResult = '';

      // Match dictionary
      if (DICTIONARY[normalizedInput] && DICTIONARY[normalizedInput][targetLang]) {
        translationResult = DICTIONARY[normalizedInput][targetLang];
      } else {
        // Fallback simulated translation response
        const targetLanguageName = SUPPORTED_LANGUAGES.find(l => l.code === targetLang)?.name || 'Target Language';
        translationResult = `[${targetLanguageName} Translation]: "${inputText.trim()}"`;
      }

      setTranslatedText(translationResult);

      // Add to log history
      const newLog: TranslationLog = {
        id: `h-${Date.now()}`,
        sourceLang,
        targetLang,
        originalText: inputText,
        translatedText: translationResult,
        timestamp: 'Just now',
      };
      setHistory((prev) => [newLog, ...prev]);
    }, 1000);
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
