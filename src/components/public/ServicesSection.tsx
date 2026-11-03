import React, { useState } from 'react';
import { FileText, Users, Briefcase, Check, ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../../data/personalData';

interface ServicesSectionProps {
  onSelectServiceToContact: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToContact }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState<number>(0);
  const activeArea = SERVICES_DATA[activeAreaIndex];

  return (
    <section id="servicios" className="py-20 sm:py-28 bg-[#090D18] border-y border-white/10 relative overflow-hidden">
      {/* Background glow orbs */}
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] glow-ambient-cyan blur-3xl rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Catálogo de Servicios Profesionales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Soluciones operativas adaptadas a las necesidades de tu empresa
          </h2>
          <p className="text-stone-300 text-base sm:text-lg mt-3">
            Tres áreas de apoyo complementarias para pymes, profesionales y departamentos que precisan descargar volumen de trabajo y ganar serenidad en su día a día.
          </p>
        </div>

        {/* 3 Area Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {SERVICES_DATA.map((area, idx) => {
            const isActive = activeAreaIndex === idx;
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setActiveAreaIndex(idx)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'glass-card border-violet-500/60 shadow-xl shadow-violet-950/40 ring-1 ring-violet-500/30'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-cyan-400' : 'text-stone-400'}`}>
                    Área 0{idx + 1}
                  </span>
                  {idx === 0 && <FileText className={`w-5 h-5 ${isActive ? 'text-violet-400' : 'text-stone-500'}`} />}
                  {idx === 1 && <Users className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-stone-500'}`} />}
                  {idx === 2 && <Briefcase className={`w-5 h-5 ${isActive ? 'text-teal-400' : 'text-stone-500'}`} />}
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {area.title.replace(/^[0-9]\.\s*/, '')}
                </h3>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  {area.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Services Grid for Active Area */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Servicios disponibles en {activeArea.title} ({activeArea.services.length})</span>
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">
              Modalidad flexible · Sin ataduras fijas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeArea.services.map((service: ServiceItem) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl glass-card glass-card-hover border border-white/10 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block">
                      Entregables y acciones:
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-stone-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Typical Case */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-stone-300 leading-normal">
                    <span className="font-semibold text-cyan-300">Cuándo encaja: </span>
                    {service.typicalCases}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => onSelectServiceToContact(service.title)}
                    className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-slate-800/80 hover:bg-violet-600 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10 hover:border-violet-500/50 shadow-sm"
                  >
                    <span>Solicitar información sobre este servicio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-8 rounded-2xl glass-card border border-violet-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">¿Tienes una necesidad operativa específica?</h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Diseñamos una bolsa de horas flexible o un plan de relevo temporal para cubrir picos de actividad o bajas en tu plantilla.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectServiceToContact('Propuesta personalizada a medida')}
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 to-violet-400 hover:from-cyan-300 hover:to-violet-300 text-stone-950 transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-lg shadow-cyan-500/20"
          >
            Consultar propuesta a medida
          </button>
        </div>
      </div>
    </section>
  );
};
