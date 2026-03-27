import { GoogleGenAI } from '@google/genai';

/**
 * Common configuration for the Gemini model.
 */
const client = new GoogleGenAI({
   apiKey: process.env.GOOGLE_API_KEY!,
});

export const geminiProvider = {
   /**
    * Sends a message to the Gemini model and returns the text response.
    */
   async generateContent(
      prompt: string,
      history: any[],
      systemInstruction: string
   ): Promise<string> {
      const response = await client.models.generateContent({
         model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
         contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
         config: {
            systemInstruction,
            temperature: 0.2,
            maxOutputTokens: 1000,
         },
      });

      return (
         response.text ||
         response.candidates?.[0]?.content?.parts?.[0]?.text ||
         ''
      );
   },
};
