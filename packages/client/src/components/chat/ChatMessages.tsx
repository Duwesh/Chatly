import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
   id: string;
   content: string;
   role: 'user' | 'assistant';
};

type Props = {
   messages: Message[];
};

const onCopyMessage = (e: React.ClipboardEvent<HTMLDivElement>) => {
   const selection = window.getSelection()?.toString().trim();

   if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
   }
};

const ChatMessages = ({ messages }: Props) => {
   const lastMessageRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   return (
      <div className="flex flex-col gap-2">
         {messages.map((message, index) => (
            <div
               key={message.id}
               onCopy={onCopyMessage}
               ref={index === messages.length - 1 ? lastMessageRef : null}
               className={`px-3 py-1 max-w-md rounded-xl  ${message.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-500 text-black self-start'}`}
            >
               <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
