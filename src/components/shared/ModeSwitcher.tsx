import React from 'react';
import { Sparkles, Globe, ShieldCheck } from 'lucide-react';
import { ActiveAppView } from '../../types';

interface ModeSwitcherProps {
  currentView: ActiveAppView;
  onViewChange: (view: ActiveAppView) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="inline-flex items-center p-1.5 bg-[#0C101F]/90 backdrop-blur-2xl rounded-full shadow-2xl border border-white/20 text-xs font-semibold ring-1 ring-violet-500/20">
      <button
        type="button"
        onClick={() => {
          onViewChange('public');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
          currentView === 'public'
            ? 'bg-gradient-to-r from-white via-stone-100 to-stone-200 text-stone-950 font-extrabold shadow-lg shadow-white/10'
            : 'text-stone-300 hover:text-white hover:bg-white/10'
        }`}
        aria-label="Ver web pública de Palmira Cruz"
      >
        <Globe className={`w-3.5 h-3.5 ${currentView === 'public' ? 'text-violet-700' : 'text-stone-400'}`} />
        <span>PALMIRA CRUZ · Web Pública</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onViewChange('ai');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
          currentView === 'ai'
            ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-extrabold shadow-lg shadow-violet-900/40'
            : 'text-stone-300 hover:text-white hover:bg-white/10'
        }`}
        aria-label="Acceder al asistente privado Palmira AI"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
        <span>PALMIRA AI · Espacio Privado</span>
        <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-violet-950/80 text-cyan-300 border border-violet-700/60 font-mono font-bold">
          Demo
        </span>
      </button>
    </div>
  );
};
