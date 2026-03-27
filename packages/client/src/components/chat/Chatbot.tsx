import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import ChatMessages, { type Message } from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';
import popSound from '@/assets/sounds/pop-sound.mp3';
import notificationSound from '@/assets/sounds/notification-sound.mp3';

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

type ChatResponse = {
   message: string;
   conversationId?: string;
};

const Chatbot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState('');
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = useCallback(async ({ prompt }: ChatFormData) => {
      try {
         setIsBotTyping(true);
         setMessages(prev => [
            ...prev,
            {
               id: crypto.randomUUID(),
               content: prompt,
               role: 'user',
            },
         ]);
         setError('');
         popAudio.play();

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
         notificationAudio.play();
      } catch (error: unknown) {
         setError(
            error instanceof Error
               ? error.message
               : 'Something went wrong, try again'
         );
      } finally {
         setIsBotTyping(false);
      }
   }, []);

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
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default Chatbot;
