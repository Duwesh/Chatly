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
      } catch (error: any) {
         console.log({ error });
         res.status(500).json({
            message: error.message || 'Failed to generate response',
         });
      }
   },
};
