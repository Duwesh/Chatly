import React from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from '../ui/button';

export type ChatFormData = {
   prompt: string;
};

interface ChatInputProps {
   onSubmit: (data: ChatFormData) => Promise<void>;
}

const ChatInput = ({ onSubmit }: ChatInputProps) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

   const submit = handleSubmit(data => {
      reset({ prompt: '' });
      onSubmit(data);
   });

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         submit();
      }
   };

   return (
      <form
         onSubmit={submit}
         className="relative group transition-all duration-300"
      >
         <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-10 group-focus-within:opacity-30 transition duration-1000 group-hover:duration-200"></div>
         <div className="relative flex items-center bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-[1.5rem] p-1.5 shadow-2xl">
            <textarea
               {...register('prompt', {
                  required: 'Message is required',
                  validate: value => value.trim().length > 0,
                  maxLength: 1000,
               })}
               onKeyDown={handleKeyDown}
               rows={1}
               placeholder="How can I help you today?"
               className="flex-1 bg-transparent px-4 py-4 text-slate-100 placeholder-slate-500 focus:outline-none resize-none min-h-[60px] max-h-[200px] text-sm md:text-base"
            />
            <Button
               disabled={!formState.isValid}
               type="submit"
               size="icon-lg"
               className="size-11 rounded-2xl bg-linear-to-tr from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale disabled:scale-100"
            >
               <FaArrowUp className="w-5 h-5" />
            </Button>
         </div>
      </form>
   );
};

export default ChatInput;
