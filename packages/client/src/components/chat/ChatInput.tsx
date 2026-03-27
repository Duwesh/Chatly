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
         className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl mt-4"
      >
         <textarea
            {...register('prompt', {
               required: 'Message is required',
               validate: value => value.trim().length > 0,
               maxLength: 100,
            })}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="w-full border-0 focus:outline-0 resize-none ml-2"
         />
         <Button
            disabled={!formState.isValid}
            type="submit"
            size="icon-sm"
            className="rounded-full bg-black text-white"
         >
            <FaArrowUp />
         </Button>
      </form>
   );
};

export default ChatInput;
