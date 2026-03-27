import OpenAI from 'openai';

/**
 * Common configuration for the OpenAI model.
 */
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY!,
});

export const openaiProvider = {
   /**
    * Sends a message to the OpenAI model and returns the text response.
    */
   async generateContent(
      prompt: string,
      history: any[],
      systemInstruction: string
   ): Promise<string> {
      const response = await client.chat.completions.create({
         model: process.env.OPENAI_MODEL || 'gpt-4o',
         messages: [
            { role: 'system', content: systemInstruction },
            ...history,
            { role: 'user', content: prompt },
         ],
         temperature: 0.2,
         max_tokens: 1000,
      });

      return response.choices[0]?.message?.content || '';
   },
};
