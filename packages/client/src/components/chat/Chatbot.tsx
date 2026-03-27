import axios from 'axios';
import { useCallback, useRef, useState, useEffect } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import TypingIndicator from './TypingIndicator';
import ChatMessages, { type Message } from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';
import popSound from '@/assets/sounds/pop-sound.mp3';
import notificationSound from '@/assets/sounds/notification-sound.mp3';
import { Button } from '../ui/button';

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
   const [showScrollButton, setShowScrollButton] = useState(false);
   const scrollRef = useRef<HTMLDivElement>(null);
   const conversationId = useRef(crypto.randomUUID());

   const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      // Show button if we're not near the bottom
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && scrollHeight > clientHeight);
   };

   const scrollToBottom = () => {
      scrollRef.current?.scrollTo({
         top: scrollRef.current.scrollHeight,
         behavior: 'smooth',
      });
   };

   // Auto-scroll when messages update
   useEffect(() => {
      scrollToBottom();
   }, [messages]);

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
      <div className="flex flex-col w-full h-full relative">
         <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto custom-scrollbar"
         >
            <div className="flex flex-col gap-6 p-4 pb-8 min-h-full">
               {/* Spacer to push messages to bottom if they don't fill the screen */}
               {messages.length > 0 && <div className="flex-1 min-h-0" />}

               <ChatMessages messages={messages} />

               {isBotTyping && <TypingIndicator />}
               {error && (
                  <div className="flex self-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full animate-in fade-in zoom-in duration-300">
                     <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                     </svg>
                     <p className="text-red-400 text-sm font-medium">{error}</p>
                  </div>
               )}
            </div>
         </div>

         {/* Scroll to Bottom FAB */}
         {showScrollButton && (
            <Button
               onClick={scrollToBottom}
               className="absolute bottom-28 right-6 size-12 rounded-2xl bg-slate-900/80 backdrop-blur-lg border border-white/10 text-white shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300"
               size="icon"
            >
               <FaArrowDown className="w-5 h-5" />
            </Button>
         )}

         <div className="pt-6 border-t border-white/5">
            <ChatInput onSubmit={onSubmit} />
         </div>
      </div>
   );
};

export default Chatbot;
