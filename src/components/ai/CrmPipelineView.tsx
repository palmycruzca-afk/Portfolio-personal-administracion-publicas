import React, { useState } from 'react';
import { 
  KanbanSquare, 
  ListFilter, 
  Plus, 
  MessageSquare, 
  Calendar, 
  ArrowRight, 
  ChevronRight,
  User,
  Sparkles,
  CheckCircle2,
  Trash2,
  FileText
} from 'lucide-react';
import { Opportunity, CrmStatus, CrmNote } from '../../types';

interface CrmPipelineViewProps {
  opportunities: Opportunity[];
  onStatusChange: (opportunityId: string, newStatus: CrmStatus) => void;
  onAddNote: (opportunityId: string, noteText: string) => void;
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onPrepareProposal: (opportunity: Opportunity) => void;
}

export const CrmPipelineView: React.FC<CrmPipelineViewProps> = ({
  opportunities,
  onStatusChange,
  onAddNote,
  onSelectOpportunity,
  onPrepareProposal,
}) => {
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');
  const [selectedOppForNote, setSelectedOppForNote] = useState<Opportunity | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  const CRM_COLUMNS: { id: CrmStatus; label: string; glow: string }[] = [
    { id: 'detectada', label: '1. Detectada', glow: 'border-t-stone-500' },
    { id: 'pendiente_analizar', label: '2. Pendiente analizar', glow: 'border-t-blue-500' },
    { id: 'seleccionada', label: '3. Seleccionada', glow: 'border-t-indigo-500' },
    { id: 'propuesta_preparada', label: '4. Propuesta lista', glow: 'border-t-violet-500' },
    { id: 'contacto_realizado', label: '5. Contacto hecho', glow: 'border-t-amber-500' },
    { id: 'en_negociacion', label: '6. En negociación', glow: 'border-t-purple-500' },
    { id: 'cliente_conseguido', label: '7. Cliente ganado', glow: 'border-t-emerald-400' },
    { id: 'descartada', label: '8. Descartada', glow: 'border-t-stone-700' },
  ];

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOppForNote || !newNoteText.trim()) return;

    onAddNote(selectedOppForNote.id, newNoteText.trim());
    setNewNoteText('');
    setSelectedOppForNote(null);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400 mb-1">
            <KanbanSquare className="w-4 h-4 text-cyan-400" />
            <span>Embudo Comercial & Pipeline especialista en gestión, organización y desarrollo de oportunidades de negociol</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            CRM Comercial de Prospección
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl font-normal">
            Seguimiento de cada oportunidad a través de los 8 estados del ciclo comercial, con registro de notas, contactos y fechas clave.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 p-1 glass-card rounded-xl border border-white/10 text-xs self-start md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('board')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              viewMode === 'board'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Tablero Kanban (8 Fases)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Vista Lista Detallada
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'board' && (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 scrollbar-thin">
          {CRM_COLUMNS.map(col => {
            const oppsInCol = opportunities.filter(o => o.crmStatus === col.id);

            return (
              <div
                key={col.id}
                className={`w-72 shrink-0 flex flex-col rounded-2xl glass-card border border-white/10 overflow-hidden border-t-2 ${col.glow}`}
              >
                {/* Column Header */}
                <div className="p-3.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
                  <div className="font-bold text-xs text-white uppercase tracking-wider">{col.label}</div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 font-bold border border-white/10">
                    {oppsInCol.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="p-3 flex-1 space-y-3 min-h-[350px] max-h-[620px] overflow-y-auto">
                  {oppsInCol.length === 0 ? (
                    <div className="h-28 flex items-center justify-center text-[11px] text-stone-500 border border-dashed border-white/10 rounded-xl">
                      Sin oportunidades
                    </div>
                  ) : (
                    oppsInCol.map(opp => (
                      <div
                        key={opp.id}
                        className="p-4 rounded-xl glass-card glass-card-hover border border-white/10 space-y-2.5 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 
                            onClick={() => onSelectOpportunity(opp)}
                            className="font-bold text-xs text-white hover:text-cyan-300 cursor-pointer line-clamp-1"
                          >
                            {opp.company}
                          </h4>
                          <span className="text-[10px] font-mono font-bold text-cyan-300 shrink-0">
                            {opp.opportunityIndex} pts
                          </span>
                        </div>

                        <p className="text-[11px] text-stone-300 line-clamp-2 font-normal">
                          {opp.title}
                        </p>

                        <div className="text-[10px] text-stone-400 flex items-center justify-between pt-1 border-t border-white/10">
                          <span>{opp.distanceKm} km · {opp.sector}</span>
                          <span className="font-semibold text-stone-200">{opp.estimatedValue}</span>
                        </div>

                        {/* Card Notes Indicator */}
                        {opp.notes && opp.notes.length > 0 && (
                          <div className="text-[10px] text-stone-300 bg-white/[0.03] p-2 rounded-lg flex items-center gap-1.5 border border-white/5">
                            <MessageSquare className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span className="truncate">{opp.notes[opp.notes.length - 1].text}</span>
                          </div>
                        )}

                        {/* Fast Status Mover & Quick Note Trigger */}
                        <div className="flex items-center justify-between gap-1 pt-1.5">
                          <select
                            value={opp.crmStatus}
                            onChange={e => onStatusChange(opp.id, e.target.value as CrmStatus)}
                            className="text-[10px] py-1 px-1.5 rounded-lg bg-slate-900 border border-white/15 text-stone-200 focus:outline-none w-32 cursor-pointer font-medium"
                          >
                            {CRM_COLUMNS.map(c => (
                              <option key={c.id} value={c.id} className="bg-slate-900 text-white">{c.label}</option>
                            ))}
                          </select>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => setSelectedOppForNote(opp)}
                              title="Añadir nota de seguimiento"
                              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-stone-300 cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onPrepareProposal(opp)}
                              title="Preparar propuesta comercial"
                              className="p-1.5 rounded-lg bg-violet-950 hover:bg-violet-900 text-cyan-300 border border-violet-700/50 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/10 text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                  <th className="p-4">Empresa / Proyecto</th>
                  <th className="p-4">Sector</th>
                  <th className="p-4">Ubicación</th>
                  <th className="p-4">Índice</th>
                  <th className="p-4">Estado CRM</th>
                  <th className="p-4">Notas</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {opportunities.map(opp => (
                  <tr key={opp.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4">
                      <div 
                        onClick={() => onSelectOpportunity(opp)}
                        className="font-bold text-white hover:text-cyan-300 cursor-pointer text-sm"
                      >
                        {opp.company}
                      </div>
                      <div className="text-[11px] text-stone-400 line-clamp-1">{opp.title}</div>
                    </td>

                    <td className="p-4 text-stone-300">{opp.sector}</td>

                    <td className="p-4 text-stone-300">
                      <div>{opp.location}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">{opp.distanceKm} km</div>
                    </td>

                    <td className="p-4 font-mono font-bold text-cyan-300 text-sm">
                      {opp.opportunityIndex} pts
                    </td>

                    <td className="p-4">
                      <select
                        value={opp.crmStatus}
                        onChange={e => onStatusChange(opp.id, e.target.value as CrmStatus)}
                        className="py-1 px-2.5 rounded-lg bg-slate-900 border border-white/15 text-xs text-stone-200 font-medium focus:outline-none"
                      >
                        {CRM_COLUMNS.map(c => (
                          <option key={c.id} value={c.id} className="bg-slate-900 text-white">{c.label}</option>
                        ))}
                      </select>
                    </td>

                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => setSelectedOppForNote(opp)}
                        className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{opp.notes.length} notas</span>
                      </button>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => onPrepareProposal(opp)}
                        className="px-3 py-1.5 rounded-lg bg-violet-950 text-cyan-300 hover:bg-violet-900 border border-violet-700/60 font-semibold text-xs cursor-pointer"
                      >
                        Propuesta
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectOpportunity(opp)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-stone-200 hover:bg-white/[0.08] font-semibold text-xs cursor-pointer border border-white/10"
                      >
                        Ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {selectedOppForNote && (
        <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/15 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">
                Notas de {selectedOppForNote.company}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedOppForNote(null)}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Existing notes history */}
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {selectedOppForNote.notes.length === 0 ? (
                <div className="text-xs text-stone-400 text-center py-4">No hay notas registradas aún.</div>
              ) : (
                selectedOppForNote.notes.map(n => (
                  <div key={n.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                      <span className="font-semibold text-cyan-300">{n.author}</span>
                      <span>{n.date}</span>
                    </div>
                    <p className="text-stone-200 font-normal">{n.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* New Note Form */}
            <form onSubmit={handleAddNoteSubmit} className="space-y-3 pt-2">
              <textarea
                rows={3}
                value={newNoteText}
                onChange={e => setNewNoteText(e.target.value)}
                placeholder="Escribe un avance, llamada realizada, fecha de contacto o próximo paso..."
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOppForNote(null)}
                  className="px-3.5 py-2 rounded-xl border border-white/10 text-xs font-semibold text-stone-300 hover:bg-white/[0.05] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  Guardar Nota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
