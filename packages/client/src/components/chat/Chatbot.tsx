import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from '../ui/button';
import TypingIndicator from './TypingIndicator';
import ChatMessages, { type Message } from './ChatMessages';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   message: string;
   conversationId?: string;
};

const Chatbot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState('');
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = useCallback(
      async ({ prompt }: FormData) => {
         try {
            setError('');
            setIsBotTyping(true);
            setMessages(prev => [
               ...prev,
               {
                  id: crypto.randomUUID(),
                  content: prompt,
                  role: 'user',
               },
            ]);
            reset({ prompt: '' });

            const { data } = await axios.post<ChatResponse>('/api/chat', {
               prompt,
               conversationId: conversationId.current,
            });

            setMessages(prev => [
               ...prev,
               {
                  id: crypto.randomUUID(),
                  content: data.message,
                  role: 'assistant',
               },
            ]);
            setIsBotTyping(false);
         } catch (error: unknown) {
            setError(
               error instanceof Error
                  ? error.message
                  : 'Something went wrong, try again'
            );
         } finally {
            setIsBotTyping(false);
         }
      },
      [reset]
   );

   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <div className="flex flex-col w-full h-full">
         <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
            <ChatMessages messages={messages} />

            {isBotTyping && <TypingIndicator />}
            {error && (
               <div className="flex self-start gap-1 px-3 py-3 bg-red-200 rounded-xl">
                  <p className="text-red-800">{error}</p>
               </div>
            )}
         </div>
         <form
            onSubmit={e => {
               void handleSubmit(onSubmit)(e);
            }}
            onKeyDown={onKeyDown}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl mt-4"
         >
            <textarea
               {...register('prompt', {
                  required: 'Message is required',
                  validate: value => value.trim().length > 0,
                  maxLength: 100,
               })}
               placeholder="Ask me anything..."
               className="w-full border-0 focus:outline-0 resize-none"
            />
            <Button
               disabled={!formState.isValid}
               type="submit"
               size="icon-sm"
               className="rounded-full"
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default Chatbot;
