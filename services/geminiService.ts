
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateFortuneAnalysis = async (prompt: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
      topP: 0.95,
      systemInstruction: "당신은 한국의 정통 사주 전문가이자 심리 상담가입니다. 사용자의 생년월일시 정보를 바탕으로 깊이 있는 조언과 격려를 제공하세요. 전문적이면서도 따뜻한 어조를 유지하세요."
    }
  });
  return response.text;
};

export const generateAmuletImage = async (theme: string, message: string) => {
  const ai = getAIClient();
  const prompt = `A highly aesthetic, mystical Korean traditional amulet (Talismans/Bujeok) for ${theme}. 
                  Style: Modern glassmorphism, neon green accents on dark obsidian background. 
                  Incorporate symbolic elements like ${theme === 'wealth' ? 'gold coins and waves' : theme === 'love' ? 'intertwining threads' : 'rising sun and mountains'}. 
                  High resolution, cinematic lighting, 4k. No text in the image, just pure symbolic art.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{ text: prompt }],
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const createChatSession = (systemInstruction: string) => {
  const ai = getAIClient();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
  });
};
