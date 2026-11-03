import React from 'react';
import { 
  Building2, 
  MapPin, 
  Tag, 
  Sparkles, 
  FileText, 
  Calendar, 
  ArrowUpRight,
  ShieldCheck,
  HelpCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import { Opportunity, VerificationStatus } from '../../types';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSelect: (opp: Opportunity) => void;
  onPrepareProposal: (opp: Opportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onSelect,
  onPrepareProposal,
}) => {
  const getVerificationBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'verificada':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" aria-hidden="true" />
            <span>Oportunidad real verificada</span>
          </span>
        );
      case 'potencial':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400" aria-hidden="true" />
            <span>Empresa potencial que podría encajar</span>
          </span>
        );
      case 'hipotesis':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" aria-hidden="true" />
            <span>Hipótesis comercial</span>
          </span>
        );
      case 'demo':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-400">
            <span className="w-2 h-2 rounded-full bg-stone-500" aria-hidden="true" />
            <span>Dato de demostración</span>
          </span>
        );
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'captacion':
        return 'A. Captación de Clientes';
      case 'colaboraciones':
        return 'B. Colaboraciones';
      case 'licitaciones':
        return 'C. Proyectos & Licitaciones';
      case 'empleo':
        return 'D. Empleo Administrativo';
      default:
        return cat;
    }
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl border border-white/10 shadow-xl flex flex-col justify-between overflow-hidden group">
      {/* Card Header & Verification Status */}
      <div className="p-5 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span className="font-bold text-violet-300 uppercase tracking-wider">{getCategoryLabel(opportunity.category)}</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>{opportunity.sector}</span>
          </div>

          <div>{getVerificationBadge(opportunity.verificationStatus)}</div>
        </div>

        {/* Company and Opportunity Title */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug">
              {opportunity.company}
            </h3>

            {/* Score Ring */}
            <div className="shrink-0 text-right">
              <div className="text-xs font-bold text-cyan-300 font-mono tabular-nums px-3 py-1 bg-violet-950/80 border border-violet-500/50 rounded-xl shadow-md">
                Índice: {opportunity.opportunityIndex}/100
              </div>
            </div>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-stone-200">
            {opportunity.title}
          </div>
        </div>

        {/* Location & Distance metadata */}
        <div className="flex items-center gap-2.5 text-xs text-stone-400">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{opportunity.location}</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="font-mono text-stone-300 font-semibold">{opportunity.distanceKm} km</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="font-medium text-stone-300">{opportunity.estimatedValue}</span>
        </div>

        {/* Services that Palmira could offer */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
            Servicios aplicables de Palmira:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {opportunity.servicesOffered.map((svc, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] text-stone-200 border border-white/10 font-medium"
              >
                {svc}
              </span>
            ))}
          </div>
        </div>

        {/* Justification snippet */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-stone-300 leading-relaxed font-normal">
          <span className="font-bold text-white">Justificación: </span>
          {opportunity.justification}
        </div>

        {/* Source and Consultation Date */}
        <div className="text-[11px] text-stone-400 flex items-center justify-between pt-1">
          <div className="truncate max-w-[280px]">
            <span>Fuente: </span>
            <span className="text-stone-300">{opportunity.source}</span>
          </div>
          <div className="font-mono text-stone-400 shrink-0">
            {opportunity.sourceDate}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 bg-slate-950/60 border-t border-white/10 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onSelect(opportunity)}
          className="px-4 py-2 text-xs font-semibold text-stone-300 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/10 rounded-xl transition-all cursor-pointer"
        >
          Ver Ficha Completa
        </button>

        <button
          type="button"
          onClick={() => onPrepareProposal(opportunity)}
          className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-violet-900/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Analizar y Preparar Propuesta</span>
        </button>
      </div>
    </div>
  );
};
