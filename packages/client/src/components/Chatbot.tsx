import { FaArrowUp } from 'react-icons/fa';
import { Button } from './ui/button';

const Chatbot = () => {
   return (
      <div className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl mt-4">
         <textarea
            placeholder="Ask me anything..."
            className="w-full border-0 focus:outline-0 resize-none"
            maxLength={100}
         />
         <Button size="icon-sm" className="rounded-full">
            <FaArrowUp />
         </Button>
      </div>
   );
};

export default Chatbot;
