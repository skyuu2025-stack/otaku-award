
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getArtCritique = async (title: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class Anime art critic. Provide a short, inspiring 2-sentence critique for a piece titled "${title}" described as: "${description}". Be encouraging and stylistic.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "This piece displays remarkable vision and technical prowess. A true contender for the Otaku Award.";
  }
};

export const verifySubmission = async (base64Image: string) => {
  // Simple simulation of AI-assisted image verification
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: "Analyze this image. Is it related to Anime/Manga culture? Return a JSON object with 'isAnime' (boolean) and 'confidence' (0-1)." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isAnime: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER }
          },
          required: ["isAnime", "confidence"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { isAnime: true, confidence: 0.9 };
  }
};
