import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  Search, 
  Award, 
  KanbanSquare, 
  BriefcaseBusiness, 
  ArrowLeft,
  Info,
  Cpu
} from 'lucide-react';
import { AiTab } from '../../types';

interface AiNavbarProps {
  activeTab: AiTab;
  onTabChange: (tab: AiTab) => void;
  onBackToPublic: () => void;
}

export const AiNavbar: React.FC<AiNavbarProps> = ({
  activeTab,
  onTabChange,
  onBackToPublic,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#070913]/95 backdrop-blur-2xl border-b border-white/10 text-white shadow-2xl">
      {/* Top Banner: Greeting & Notice */}
      <div className="bg-gradient-to-r from-violet-950 via-[#0A0D1A] to-indigo-950 px-4 sm:px-6 lg:px-8 py-2 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
          <span className="font-semibold text-stone-100">
            «¡Hola, Palmira! Tu próximo proyecto puede estar aquí»
          </span>
        </div>

        <div className="flex items-center gap-3 text-stone-300">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-950/80 text-violet-300 border border-violet-700/50 text-[11px] font-mono">
            <Info className="w-3 h-3 text-cyan-400" />
            Entorno de demostración y simulación comercial
          </span>

          <button
            type="button"
            onClick={onBackToPublic}
            className="flex items-center gap-1 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Web Pública</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand identity for Palmira AI */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-extrabold text-white shadow-lg shadow-violet-900/40 border border-white/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>PALMIRA AI</span>
              <span className="text-[10px] font-mono uppercase bg-violet-950 px-2 py-0.5 rounded-full text-cyan-300 border border-violet-700/60 font-bold">
                PROSPECCIÓN
              </span>
            </div>
            <div className="text-[11px] text-stone-400">
              Departamento Comercial Inteligente & Búsqueda de Oportunidades
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          <button
            type="button"
            onClick={() => onTabChange('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30'
                : 'text-stone-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-300" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('top10')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'top10'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30'
                : 'text-stone-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Top 10 Oportunidades</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('search')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30'
                : 'text-stone-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Search className="w-4 h-4 text-teal-300" />
            <span>Buscador Multi-Categoría</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('crm')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'crm'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30'
                : 'text-stone-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <KanbanSquare className="w-4 h-4 text-violet-300" />
            <span>CRM Comercial</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('empleo')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'empleo'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30'
                : 'text-stone-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <BriefcaseBusiness className="w-4 h-4 text-cyan-400" />
            <span>Empleo Administrativo</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
