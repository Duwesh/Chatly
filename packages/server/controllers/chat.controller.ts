import { chatService } from '../services/chat.service';
import type { Request, Response } from 'express';
import z from 'zod';

const chatSchema = z.object({
   message: z
      .string()
      .trim()
      .min(1, 'Message is required')
      .max(100, 'Message must be at most 100 characters'),
});

export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const result = chatSchema.safeParse(req.body);
      if (!result.success) {
         return res.status(400).json({ error: result.error.issues });
      }

      try {
         const { message, conversationId } = req.body;
         const response = await chatService.sendMessage(
            message,
            conversationId
         );

         res.json({ message: response.message });
      } catch (error: any) {
         console.log({ error });
         res.status(500).json({
            message: error.message || 'Failed to generate response',
         });
      }
   },
};
