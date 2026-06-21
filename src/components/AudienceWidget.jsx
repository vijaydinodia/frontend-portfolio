import React from 'react';
import { motion } from 'framer-motion';

const AudienceWidget = ({ activeMode, setActiveMode }) => {
  const modes = [
    { id: 'developer', label: '💻 Dev Mode', theme: 'from-primary/20 to-primary/40 border-primary/40 text-primary' },
    { id: 'recruiter', label: '💼 Recruiter', theme: 'from-accent/20 to-accent/40 border-accent/40 text-accent' },
    { id: 'client', label: '🚀 Client', theme: 'from-secondary/20 to-secondary/40 border-secondary/40 text-secondary' },
  ];

  return (
    <div className="fixed left-6 bottom-6 z-[9999] hidden sm:block">
      <div className="glass p-2.5 rounded-2xl flex flex-col gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 w-[150px]">
        <div className="text-[9px] font-black tracking-widest text-textMuted text-center uppercase border-b border-white/5 pb-1">
          Customize View
        </div>
        <div className="flex flex-col gap-1">
          {modes.map((mode) => {
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 text-left border flex items-center justify-between ${
                  isActive
                    ? `bg-gradient-to-r ${mode.theme} border-white/20 text-textMain shadow-[0_4px_12px_rgba(0,0,0,0.25)]`
                    : 'bg-transparent border-transparent text-textMuted hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{mode.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeWidgetDot"
                    className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,1)] ml-2"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AudienceWidget;
