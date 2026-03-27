import './App.css';
import Chatbot from './components/chat/Chatbot';

function App() {
   return (
      <main className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-slate-950 font-sans selection:bg-purple-500/30">
         {/* Dynamic Background Elements */}
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/5 blur-[150px] rounded-full" />

         {/* Grid Pattern Overlay */}
         <div
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"
            style={{
               backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
               backgroundSize: '40px 40px',
            }}
         />

         {/* Chat Glass Container */}
         <div className="relative z-10 w-full max-w-3xl h-[90vh] mx-4 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
            {/* Header / Top Bar */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/5">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                     <span className="text-white font-bold">C</span>
                  </div>
                  <div>
                     <h1 className="text-white font-semibold text-lg leading-tight">
                        Chatly
                     </h1>
                     <p className="text-slate-400 text-xs flex items-center gap-1.5 focus:outline-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        AI Assistant Online
                     </p>
                  </div>
               </div>
               <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center text-slate-400">
                     <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                     </svg>
                  </div>
               </div>
            </div>

            <div className="flex-1 overflow-hidden p-6 md:p-8">
               <Chatbot />
            </div>
         </div>
      </main>
   );
}

export default App;
