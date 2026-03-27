const TypingIndicator = () => (
   <div className="flex self-start gap-1.5 px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
   </div>
);

const Dot = ({ delay }: { delay: number }) => (
   <div
      className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
      style={{ animationDelay: `${delay}s` }}
   />
);

export default TypingIndicator;
