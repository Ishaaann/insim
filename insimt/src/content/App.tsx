import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 1. Handler to toggle the React state
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    // 2. Listen for the native DOM event fired from index.ts
    window.addEventListener("toggleSignal", handleToggle as EventListener);

    // 3. Clean up the event listener on unmount
    return () => {
      window.removeEventListener("toggleSignal", handleToggle as EventListener);
    };
  }, []);

  // If the extension hasn't been toggled open, render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[550px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-[2147483647]">
      
      {/* Extension Header */}
      <div className="bg-slate-800 text-white p-4 flex justify-between items-center select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="font-semibold text-sm tracking-wide uppercase">Interview Mode</h2>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors text-xs p-1"
        >
          ✕
        </button>
      </div>

      {/* Main Conversation Canvas */}
      <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-sm text-slate-700">
          <p className="font-medium text-slate-900 mb-1">Welcome to your technical interview loop.</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            I am parsing your active tab's problem metadata. Let's begin with the <strong className="text-slate-700">CLARIFYING</strong> stage. Tell me your initial assumptions about the input constraints.
          </p>
        </div>
      </div>

      {/* Interface Input Area */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ask a clarifying question or state your assumptions..." 
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
            disabled
          />
          <button 
            className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
            disabled
          >
            Send
          </button>
        </div>
      </div>

    </div>
  );
};

export default App;