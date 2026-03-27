const Copyright = () => {
   return (
      <p className="mt-2 text-[10px] text-center text-slate-500/40 font-medium">
         © {new Date().getFullYear()} Chatly • Developed with ❤️ by{' '}
         <span className="text-slate-400/80 hover:text-purple-400 transition-colors cursor-default">
            Duwesh Kumar
         </span>
      </p>
   );
};

export default Copyright;
