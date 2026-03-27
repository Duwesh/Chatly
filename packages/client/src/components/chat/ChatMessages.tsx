import React from 'react';
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
   return (
      <div className="flex flex-col gap-6">
         {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-700">
               <div className="w-14 h-14 bg-linear-to-tr from-purple-600/20 to-blue-500/20 rounded-full flex items-center justify-center mb-3">
                  <svg
                     className="w-7 h-7 text-purple-400 opacity-50"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                     />
                  </svg>
               </div>
               <h3 className="text-slate-200 text-xl font-medium mb-2">
                  Welcome to Chatly
               </h3>
               <p className="text-slate-500 max-w-xs">
                  I'm your AI assistant. Ask me anything about Wonder World or
                  help with your tasks.
               </p>
            </div>
         )}
         {messages.map(message => (
            <div
               key={message.id}
               onCopy={onCopyMessage}
               className={`group flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
            >
               <div
                  className={`relative px-5 py-3.5 max-w-[85%] md:max-w-[75%] rounded-3xl transition-all duration-300 animate-in slide-in-from-bottom-2 ${
                     message.role === 'user'
                        ? 'bg-linear-to-tr from-purple-600 to-indigo-500 text-white rounded-br-none shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20'
                        : 'bg-white/5 backdrop-blur-md border border-white/10 text-slate-200 rounded-bl-none hover:bg-white/10'
                  }`}
               >
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-950/50">
                     <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>

                  {/* Message Timestamp (Subtle) */}
                  <span
                     className={`absolute -bottom-5 text-[10px] font-medium tracking-wider uppercase opacity-0 group-hover:opacity-40 transition-opacity ${message.role === 'user' ? 'right-1' : 'left-1'}`}
                  >
                     {new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                     })}
                  </span>
               </div>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
