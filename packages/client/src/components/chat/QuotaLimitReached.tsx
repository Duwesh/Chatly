import { FaClock } from 'react-icons/fa';
const QuotaLimitReached = () => {
   return (
      <div className="flex flex-col items-center gap-4 p-8 bg-slate-900/60 backdrop-blur-3xl border border-white/5 rounded-[2rem] animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-2xl">
         <div className="size-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-inner">
            <FaClock className="size-7 text-amber-500 animate-pulse" />
         </div>
         <div className="text-center space-y-2">
            <h3 className="text-white font-bold text-lg tracking-tight">
               Daily Limit Reached
            </h3>
            <p className="text-slate-400 text-sm md:text-base max-w-[320px] leading-relaxed">
               Chatly has reached its daily message capacity for now. Please
               come back a bit later and we can continue our chat! ❤️
            </p>
         </div>
      </div>
   );
};

export default QuotaLimitReached;
