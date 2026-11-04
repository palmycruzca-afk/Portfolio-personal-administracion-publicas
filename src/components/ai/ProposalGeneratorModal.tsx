import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Download, 
  Check, 
  Save, 
  Printer, 
  AlertTriangle,
  FileText,
  RotateCcw,
  Sliders,
  SendHorizontal,
  Bot
} from 'lucide-react';
import { Opportunity } from '../../types';

interface ProposalGeneratorModalProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveToCrm: (opportunityId: string, updatedDraft: string, noteText: string) => void;
}

export const ProposalGeneratorModal: React.FC<ProposalGeneratorModalProps> = ({
  opportunity,
  isOpen,
  onClose,
  onSaveToCrm,
}) => {
  if (!isOpen || !opportunity) return null;

  const [documentType, setDocumentType] = useState<string>('propuesta_colaboracion');
  const [tone, setTone] = useState<string>('ejecutivo y resolutivo');
  const [weeklyHours, setWeeklyHours] = useState<number>(15);
  const [workMode, setWorkMode] = useState<string>('Híbrido (Presencial Toledo/Madrid + Remoto)');
  const [customNotes, setCustomNotes] = useState<string>('');
  
  const [generatedContent, setGeneratedContent] = useState<string>(opportunity.proposalDraft || '');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [generationSource, setGenerationSource] = useState<string>('');

  const documentOptions = [
    { id: 'propuesta_colaboracion', label: 'Propuesta de colaboración' },
    { id: 'primer_contacto', label: 'Mensaje de primer contacto (Email / especialista en gestión, organización y desarrollo de oportunidades de negociol)' },
    { id: 'presupuesto_orientativo', label: 'Presupuesto orientativo desglosado' },
    { id: 'presentacion_comercial', label: 'Presentación ejecutiva de capacidades' },
    { id: 'correo_seguimiento', label: 'Correo personalizado de seguimiento' },
  ];

  useEffect(() => {
    if (!generatedContent) {
      handleGenerate();
    }
  }, [opportunity.id]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCopied(false);
    setSaved(false);

    try {
      const response = await fetch('/api/gemini/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityTitle: opportunity.title,
          companyName: opportunity.company,
          sector: opportunity.sector,
          servicesOffered: opportunity.servicesOffered,
          documentType,
          tone,
          weeklyHours,
          workMode,
          customNotes,
        }),
      });

      const data = await response.json();
      if (data.success && data.content) {
        setGeneratedContent(data.content);
        setGenerationSource(data.source === 'gemini-3.8-flash' ? 'Generado con Gemini 3.8 Flash' : 'Motor de plantillas comerciales de alta fidelidad');
      }
    } catch (err) {
      console.error('Error generating document:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    const blob = new Blob([generatedContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanCompanyName = opportunity.company.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `Propuesta_${cleanCompanyName}_Palmira_Cruz.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    const noteText = `Documento "${documentType}" generado y guardado en la ficha. (${new Date().toLocaleDateString('es-ES')})`;
    onSaveToCrm(opportunity.id, generatedContent, noteText);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xl flex items-center justify-center p-2 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="glass-card rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-white/15 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="p-5 bg-gradient-to-r from-violet-950 via-[#0C101F] to-indigo-950 text-white flex items-center justify-between gap-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-violet-600/40 border border-violet-500/50 shadow-md">
              <Bot className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                Generador de Propuestas & Comunicaciones con IA
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{opportunity.company}</span>
                <span className="text-xs text-stone-400 font-normal hidden sm:inline">
                  ({opportunity.sector})
                </span>
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar generador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Area: Settings (left) + Live Editor (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: Generation Parameters */}
          <div className="lg:col-span-4 bg-slate-950/70 p-6 border-r border-white/10 overflow-y-auto space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-300 uppercase tracking-widest mb-1.5 text-[11px]">
                Tipo de documento a redactar
              </label>
              <select
                value={documentType}
                onChange={e => setDocumentType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/30 font-medium"
              >
                {documentOptions.map(opt => (
                  <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-300 uppercase tracking-widest mb-1.5 text-[11px]">
                Tono de comunicación
              </label>
              <select
                value={tone}
                onChange={e => setTone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              >
                <option value="ejecutivo y resolutivo" className="bg-slate-900 text-white">Ejecutivo, directo y resolutivo</option>
                <option value="cercano y comercial" className="bg-slate-900 text-white">Cercano, empático y comercial</option>
                <option value="tecnico y de procesos" className="bg-slate-900 text-white">Técnico, formal y de procesos</option>
                <option value="breve y para red profesional" className="bg-slate-900 text-white">Breve para mensaje en LinkedIn / WhatsApp</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-stone-300 uppercase tracking-widest mb-1.5 text-[11px]">
                  Dedicación (h/sem)
                </label>
                <input
                  type="number"
                  min={2}
                  max={40}
                  value={weeklyHours}
                  onChange={e => setWeeklyHours(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-300 uppercase tracking-widest mb-1.5 text-[11px]">
                  Modalidad
                </label>
                <select
                  value={workMode}
                  onChange={e => setWorkMode(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                >
                  <option value="Híbrido" className="bg-slate-900 text-white">Híbrido</option>
                  <option value="100% Remoto" className="bg-slate-900 text-white">100% Remoto</option>
                  <option value="Presencial" className="bg-slate-900 text-white">Presencial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-300 uppercase tracking-widest mb-1.5 text-[11px]">
                Instrucciones o matices adicionales
              </label>
              <textarea
                rows={3}
                value={customNotes}
                onChange={e => setCustomNotes(e.target.value)}
                placeholder="Ej. Incidir en experiencia previa de SEAT o sugerir reunión de 10 min..."
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 text-xs"
              />
            </div>

            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerate}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-violet-900/30"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Redactando propuesta...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Regenerar con IA</span>
                </>
              )}
            </button>

            {/* Mandatory Safeguard Warning */}
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Supervisión humana requerida</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-300/90 font-normal">
                <strong>Nunca enviar comunicaciones automáticamente.</strong> Revisa el texto, ajústalo con tus palabras y contrasta los datos antes de emitirlo al cliente.
              </p>
            </div>
          </div>

          {/* Right Column: Live Rich Textarea Editor */}
          <div className="lg:col-span-8 flex flex-col bg-[#070913] overflow-hidden">
            {/* Editor Toolbar */}
            <div className="p-3.5 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-stone-400 font-mono text-[11px]">
                <span>{generatedContent.split(/\s+/).filter(Boolean).length} palabras</span>
                <span aria-hidden="true">·</span>
                <span>{generatedContent.length} caracteres</span>
                {generationSource && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-300 font-semibold">{generationSource}</span>
                  </>
                )}
              </div>

              {/* Action Buttons: Copy, Download, Save, Print */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold text-xs"
                  title="Copiar texto al portapapeles"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-400" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold text-xs"
                  title="Guardar borrador en el CRM"
                >
                  {saved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">¡Guardado!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 text-stone-400" />
                      <span>Guardar en CRM</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold text-xs"
                  title="Descargar documento en Markdown (.md)"
                >
                  <Download className="w-3.5 h-3.5 text-stone-400" />
                  <span>Descargar</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold text-xs no-print"
                  title="Imprimir o guardar en PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-400" />
                  <span>Imprimir</span>
                </button>
              </div>
            </div>

            {/* Editable Text Area with Monospace Cyber Feel */}
            <div className="flex-1 p-5 sm:p-7 overflow-y-auto">
              <textarea
                value={generatedContent}
                onChange={e => setGeneratedContent(e.target.value)}
                placeholder="El documento generado aparecerá aquí..."
                className="w-full h-full min-h-[360px] p-4 font-mono text-xs sm:text-sm text-stone-200 bg-white/[0.01] rounded-2xl border border-white/10 focus:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-cyan-400/30 leading-relaxed resize-none"
              />
            </div>

            {/* Bottom Footer Tip */}
            <div className="p-3.5 bg-white/[0.02] border-t border-white/10 text-center text-xs text-stone-400">
              Todos los textos son 100% editables en tiempo real antes de copiar o descargar.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
