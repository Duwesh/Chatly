import fs from 'fs';
import path from 'path';

import { conversationRepository } from '../repositories/conversation.repository';
import { geminiProvider } from '../providers/gemini.provider';
import { openaiProvider } from '../providers/openai.provider';

// Load park info and system instructions
const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);

// Note: Loading a .txt template usually would use a reader,
// I'll stick to a simple load for now.
const templatePath = path.join(__dirname, '..', 'prompts', 'chatbot.txt');
const template = fs.readFileSync(templatePath, 'utf-8');
const systemInstruction = template.replace('{{parkInfo}}', parkInfo);

type ChatResponse = {
   id: string;
   message: string;
   provider: string;
};

// Public interface
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string,
      providerOverride?: string
   ): Promise<ChatResponse> {
      const history = conversationRepository.getHistory(conversationId);
      const provider =
         providerOverride || process.env.DEFAULT_AI_PROVIDER || 'gemini';

      let text = '';

      if (provider === 'openai') {
         text = await openaiProvider.generateContent(
            prompt,
            history,
            systemInstruction
         );
      } else {
         text = await geminiProvider.generateContent(
            prompt,
            history,
            systemInstruction
         );
      }

      // Track interaction in history
      conversationRepository.addMessage(conversationId, {
         role: 'user',
         parts: [{ text: prompt }],
      });
      conversationRepository.addMessage(conversationId, {
         role: 'model',
         parts: [{ text }],
      });

      return {
         id: crypto.randomUUID(),
         message: text,
         provider,
      };
   },
};
