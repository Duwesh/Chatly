import { chatService } from '../services/chat.service';
import type { Request, Response } from 'express';
import z from 'zod';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(100, 'Prompt must be at most 100 characters'),
});

export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const result = chatSchema.safeParse(req.body);
      if (!result.success) {
         return res.status(400).json({ error: result.error.issues });
      }

      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId);

         res.json({ message: response.message });
      } catch (err: unknown) {
         const error = err as any;

         // Check for quota or rate limit errors (Gemini/OpenAI)
         const isQuotaError =
            error?.status === 429 ||
            error?.message?.toLowerCase().includes('quota') ||
            error?.message?.toLowerCase().includes('rate limit') ||
            error?.response?.status === 429;

         if (isQuotaError) {
            return res.status(429).json({
               message:
                  "I've reached my message limit for now. Please come back a bit later and we can continue our chat! ❤️",
               type: 'QUOTA_EXCEEDED',
            });
         }

         res.status(500).json({
            message: error?.message || 'Failed to generate response',
         });
      }
   },
};
