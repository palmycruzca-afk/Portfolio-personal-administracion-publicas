import React, { useState } from 'react';
import { Award, Filter, ArrowUpDown, Info, Sparkles } from 'lucide-react';
import { Opportunity } from '../../types';
import { OpportunityCard } from './OpportunityCard';

interface Top10OpportunitiesProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onPrepareProposal: (opp: Opportunity) => void;
}

export const Top10Opportunities: React.FC<Top10OpportunitiesProps> = ({
  opportunities,
  onSelectOpportunity,
  onPrepareProposal,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterVerification, setFilterVerification] = useState<string>('all');

  const top10List = opportunities
    .filter(o => o.isTop10)
    .sort((a, b) => b.opportunityIndex - a.opportunityIndex);

  const displayedList = top10List.filter(o => {
    if (filterCategory !== 'all' && o.category !== filterCategory) return false;
    if (filterVerification !== 'all' && o.verificationStatus !== filterVerification) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Ranking Estratégico Palmira AI</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Las 10 Mejores Oportunidades
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl font-normal">
            Priorizadas rigurosamente según el Índice de Oportunidad (0-100), combinando encaje profesional directo, rentabilidad, facilidad de contratación y cercanía geográfica.
          </p>
        </div>

        {/* Priority criteria notice */}
        <div className="p-3 rounded-xl glass-card border border-white/10 text-xs text-stone-300 max-w-xs self-start md:self-auto">
          <span className="font-bold text-cyan-300">Criterio de ordenación: </span>
          Prioridad alta para servicios recurrentes en La Sagra y Toledo.
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 glass-card rounded-2xl border border-white/10 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-stone-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Categoría:</span>
          </span>
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
              filterCategory === 'all'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Todas ({top10List.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('captacion')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
              filterCategory === 'captacion'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            A. Captación B2B
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('colaboraciones')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
              filterCategory === 'colaboraciones'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            B. Colaboraciones
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('licitaciones')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
              filterCategory === 'licitaciones'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            C. Licitaciones
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('empleo')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
              filterCategory === 'empleo'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            D. Empleo Administrativo
          </button>
        </div>

        {/* Verification Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-stone-400">Verificación:</span>
          <select
            value={filterVerification}
            onChange={e => setFilterVerification(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/15 text-stone-200 text-xs focus:outline-none"
          >
            <option value="all">Todos los estados</option>
            <option value="verificada">Oportunidades reales verificadas</option>
            <option value="potencial">Empresas potenciales que encajan</option>
            <option value="hipotesis">Hipótesis comerciales</option>
          </select>
        </div>
      </div>

      {/* Grid of 10 Opportunities */}
      {displayedList.length === 0 ? (
        <div className="p-16 text-center glass-card rounded-2xl border border-white/10 space-y-3">
          <Info className="w-9 h-9 text-stone-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No hay oportunidades con ese filtro</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Prueba a seleccionar "Todas" o "Todos los estados" para ver el top 10 completo.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayedList.map((opp, idx) => (
            <div key={opp.id} className="relative">
              {/* Ranking Badge Top-Right */}
              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-mono font-extrabold text-xs shadow-lg shadow-violet-950/50 border border-white/20">
                #{idx + 1}
              </div>
              <OpportunityCard
                opportunity={opp}
                onSelect={onSelectOpportunity}
                onPrepareProposal={onPrepareProposal}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
