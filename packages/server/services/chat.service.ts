import { GoogleGenAI } from '@google/genai';
import { conversationRepository } from '../repositories/conversation.repository';

// Implement detail
const client = new GoogleGenAI({
   apiKey: process.env.GOOGLE_API_KEY,
});

type ChatResponse = {
   id: string;
   message: string;
};

// Public interface
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const history = conversationRepository.getHistory(conversationId);

      const response = await client.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
         config: {
            temperature: 0.2,
            maxOutputTokens: 100,
            thinkingConfig: {
               thinkingBudget: 0,
            },
         },
      });

      const text =
         response.text ||
         response.candidates?.[0]?.content?.parts?.[0]?.text ||
         '';

      conversationRepository.addMessage(conversationId, {
         role: 'user',
         parts: [{ text: prompt }],
      });
      conversationRepository.addMessage(conversationId, {
         role: 'model',
         parts: [{ text }],
      });

      console.log('Gemini text:', text);

      return {
         id: response.responseId!,
         message: text,
      };
   },
};
