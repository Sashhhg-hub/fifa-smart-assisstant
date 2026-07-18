import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "YOUR-API-KEY"
});

try {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "Say hello in one sentence."
          }
        ]
      }
    ]
  });

  console.log(response.text);
} catch (e) {
  console.error(e);
}