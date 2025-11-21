import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generatePoeticCaption = async (location: string, baseCaption: string): Promise<string> => {
  if (!ai) {
    console.warn("API Key is missing. Returning default message.");
    return "API Key missing. Cannot generate enhanced caption.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Write a short, very artistic, and evocative 2-sentence description for a photograph taken at ${location}. The vibe is: ${baseCaption}. Do not use hashtags.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Lost for words...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The silence of the image speaks for itself.";
  }
};
