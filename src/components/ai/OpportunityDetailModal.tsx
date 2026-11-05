import React from 'react';
import { 
  X, 
  Sparkles, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight,
  CheckCircle,
  FileText,
  User,
  Calendar,
  Layers
} from 'lucide-react';
import { Opportunity } from '../../types';
import { OpportunityScoreBreakdown } from './OpportunityScoreBreakdown';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onPrepareProposal: (opportunity: Opportunity) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  onPrepareProposal,
}) => {
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="glass-card rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-white/15 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-violet-950 via-[#0C101F] to-indigo-950 text-white flex items-start justify-between gap-4 border-b border-white/10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-cyan-300 uppercase tracking-widest font-bold">
                Ficha Técnica de Oportunidad
              </span>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <span className="text-stone-300">{opportunity.sector}</span>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <span className="font-mono text-cyan-400">{opportunity.location} ({opportunity.distanceKm} km)</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {opportunity.company}
            </h3>

            <div className="text-xs sm:text-sm text-stone-300 font-medium">
              {opportunity.title}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar ficha"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-stone-200 text-sm">
          {/* Quick Context Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs">
            <div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Valor Estimado</div>
              <div className="font-bold text-white mt-0.5 text-sm">{opportunity.estimatedValue}</div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Dedicación</div>
              <div className="font-bold text-white mt-0.5 text-sm">{opportunity.timeRequired}</div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Continuidad</div>
              <div className="font-bold text-white mt-0.5 text-sm">{opportunity.continuityPotential}</div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Acceso al Decisor</div>
              <div className="font-bold text-cyan-300 mt-0.5 text-sm">{opportunity.difficultyOfAccess}</div>
            </div>
          </div>

          {/* Section 1: Business Activity & Identified Need */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-violet-400">
                1. Actividad de la Empresa y Contexto
              </h4>
              <p className="text-stone-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/10">
                {opportunity.businessActivity}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                2. Necesidad Identificada o Hipótesis Comercial
              </h4>
              <p className="text-stone-300 leading-relaxed bg-cyan-950/20 p-4 rounded-xl border border-cyan-500/30">
                {opportunity.identifiedNeed}
              </p>
            </div>
          </div>

          {/* Section 2: Services Offered by Palmira */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300">
              3. Servicios Específicos que Palmira Podría Ofrecer
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {opportunity.servicesOffered.map((svc, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-medium text-stone-200">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{svc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Fit Reasons & Advantages vs Risks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Motivos de encaje */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-violet-400" />
                <span>Motivos de encaje</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                {opportunity.fitReasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ventajas */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ventajas clave</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                {opportunity.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Riesgos o Retos */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Riesgos detectados</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                {opportunity.risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 4: Pending Info & Recommended Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
                <span>Información pendiente de contrastar:</span>
              </h4>
              <ul className="space-y-1 text-xs text-stone-300">
                {opportunity.pendingInfo.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                <span>Próximos pasos recomendados:</span>
              </h4>
              <ul className="space-y-1 text-xs text-stone-300">
                {opportunity.nextSteps.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5: Exact Multi-criteria Opportunity Index Breakdown */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 shadow-xl">
            <OpportunityScoreBreakdown
              scores={opportunity.scores}
              totalIndex={opportunity.opportunityIndex}
              showExplanation={true}
            />
          </div>
        </div>

        {/* Modal Footer with Primary Action */}
        <div className="p-5 bg-slate-950/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-400 text-center sm:text-left">
            Estado actual en CRM: <strong className="text-cyan-300 capitalize font-mono">{opportunity.crmStatus.replace('_', ' ')}</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-stone-300 hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              Cerrar Ficha
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onPrepareProposal(opportunity);
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-violet-950/50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>ANALIZAR Y PREPARAR PROPUESTA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
