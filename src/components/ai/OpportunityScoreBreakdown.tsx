import React from 'react';
import { ScoreFactors } from '../../types';
import { AlertCircle, ShieldCheck } from 'lucide-react';

interface OpportunityScoreBreakdownProps {
  scores: ScoreFactors;
  totalIndex: number;
  showExplanation?: boolean;
}

export const OpportunityScoreBreakdown: React.FC<OpportunityScoreBreakdownProps> = ({
  scores,
  totalIndex,
  showExplanation = true,
}) => {
  const factors = [
    {
      key: 'fit',
      name: 'Encaje profesional',
      weight: '25%',
      factorValue: scores.fit,
      weighted: (scores.fit * 0.25).toFixed(1),
      description: 'Afinidad directa con la experiencia previa en SEAT, sector infantil, retail y ERIA HOUSE.',
    },
    {
      key: 'profitability',
      name: 'Rentabilidad potencial',
      weight: '25%',
      factorValue: scores.profitability,
      weighted: (scores.profitability * 0.25).toFixed(1),
      description: 'Volumen económico estimado, tarifa horaria viable y capacidad de pago del cliente.',
    },
    {
      key: 'easeOfAccess',
      name: 'Facilidad de acceso y contratación',
      weight: '20%',
      factorValue: scores.easeOfAccess,
      weighted: (scores.easeOfAccess * 0.20).toFixed(1),
      description: 'Cercanía al decisor (contacto directo vs concurso público o filtros de intermediarios).',
    },
    {
      key: 'costsTime',
      name: 'Costes y tiempo necesario',
      weight: '15%',
      factorValue: scores.costsTime,
      weighted: (scores.costsTime * 0.15).toFixed(1),
      description: 'Compatibilidad de la dedicación horaria semanal con la gestión de ERIA HOUSE y calidad de vida.',
    },
    {
      key: 'locationScore',
      name: 'Ubicación geográfica',
      weight: '10%',
      factorValue: scores.locationScore,
      weighted: (scores.locationScore * 0.10).toFixed(1),
      description: 'Proximidad inmediata (Illescas / La Sagra / Toledo / Sur de Madrid) o teletrabajo.',
    },
    {
      key: 'continuity',
      name: 'Posibilidad de continuidad',
      weight: '5%',
      factorValue: scores.continuity,
      weighted: (scores.continuity * 0.05).toFixed(1),
      description: 'Potencial de convertirse en retainer mensual recurrente o relación duradera.',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header with main score */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-violet-400">
            Índice de Oportunidad Multicriterio
          </div>
          <div className="text-xs text-stone-300 mt-0.5">
            Ponderación objetiva según los 6 factores estratégicos establecidos por Palmira
          </div>
        </div>

        <div className="text-right flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-violet-950/80 border border-violet-500/50 font-mono font-extrabold text-2xl text-cyan-300 tabular-nums shadow-lg shadow-violet-950/50">
            {totalIndex} <span className="text-sm text-stone-400 font-normal">/ 100</span>
          </div>
        </div>
      </div>

      {/* Progress Bars Table */}
      <div className="space-y-4">
        {factors.map(f => (
          <div key={f.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{f.name}</span>
                <span className="text-[11px] text-cyan-400 font-mono">({f.weight})</span>
              </div>
              <div className="flex items-center gap-3 font-mono tabular-nums text-xs">
                <span className="text-stone-400">{f.factorValue}/100</span>
                <span className="font-bold text-cyan-300">+{f.weighted} pts</span>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-2.5 bg-white/[0.05] rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700 shadow-sm shadow-cyan-400/40"
                style={{ width: `${f.factorValue}%` }}
              />
            </div>

            {showExplanation && (
              <div className="text-[11px] text-stone-400 leading-tight">
                {f.description}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-[11px] text-stone-400 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <span>
          <strong>Nota metodológica:</strong> La puntuación es un índice orientativo de prioridad comercial. No representa una probabilidad estadística de conseguir un cliente. Los factores se basan en datos contrastados; cuando faltan datos, se indica expresamente en la ficha.
        </span>
      </div>
    </div>
  );
};
