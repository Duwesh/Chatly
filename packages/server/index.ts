import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import z from 'zod';
import { chatService } from './services/chat.service';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World!' });
});

const chatSchema = z.object({
   message: z
      .string()
      .trim()
      .min(1, 'Message is required')
      .max(100, 'Message must be at most 100 characters'),
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const result = chatSchema.safeParse(req.body);
   if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
   }

   try {
      const { message, conversationId } = req.body;
      const response = await chatService.sendMessage(message, conversationId);

      res.json({ message: response.message });
   } catch (error: any) {
      console.log({ error });
      res.status(500).json({
         message: error.message || 'Internal server error',
      });
   }
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
