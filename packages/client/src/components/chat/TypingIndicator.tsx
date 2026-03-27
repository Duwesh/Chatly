const TypingIndicator = () => (
   <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
   </div>
);

const Dot = ({ delay }: { delay: number }) => (
   <div
      className="w-2 h-2 bg-gray-800 rounded-full animate-pulse"
      style={{ animationDelay: `${delay}s` }}
   />
);

export default TypingIndicator;
