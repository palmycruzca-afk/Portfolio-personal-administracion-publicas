import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Layers, Zap } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/personalData';
import { TiltCard } from '../shared/TiltCard';

interface ProjectsSectionProps {
  onOpenAi: () => void;
  onContactClick: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenAi, onContactClick }) => {
  const getImageSource = (key: string) => {
    switch (key) {
      case 'eria_house_project':
        return '/src/assets/images/eria_house_project_1793698657127.jpg';
      case 'palmira_ai_concept':
        return '/src/assets/images/palmira_ai_concept_1793698658636.jpg';
      case 'collaboration_workspace':
        return '/src/assets/images/collaboration_workspace_1793698658208.jpg';
      default:
        return '/src/assets/images/eria_house_project_1793698657127.jpg';
    }
  };

  return (
    <section id="proyectos" className="py-20 sm:py-28 bg-[#070913] relative overflow-hidden bg-cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Iniciativas & Emprendimiento</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Proyectos propios e iniciativas tecnológicas
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl font-normal">
              Iniciativas lideradas por Palmira Cruz que combinan experiencia directiva en el sector inmobiliario y gestión sobre el terreno con innovación tecnológica aplicada.
            </p>
          </div>

          <div className="text-xs text-stone-400 font-mono">
            Proyectos reales en activo
          </div>
        </motion.div>

        {/* Feature Bento Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Card: Gestión Inmobiliaria Propia (Col Span 7) */}
          <div className="lg:col-span-7">
            <TiltCard className="h-full glass-card rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-between group hover:border-violet-500/40 transition-all duration-300">
              <div className="relative aspect-[16/9] bg-stone-900 overflow-hidden">
                <img
                  src={getImageSource(PROJECTS_DATA[0].imageKey)}
                  alt="Gestión Inmobiliaria y Operativa — Proyecto de Palmira Cruz"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-cyan-300 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-cyan-500/30">
                  {PROJECTS_DATA[0].tag}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-violet-400">
                    {PROJECTS_DATA[0].subtitle}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {PROJECTS_DATA[0].title}
                  </h3>
                </div>

                <p className="text-sm text-stone-300 leading-relaxed font-normal">
                  {PROJECTS_DATA[0].description}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    Logros y capacidades operativas:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {PROJECTS_DATA[0].highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Colaborar en Gestión Inmobiliaria</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-stone-400 font-mono">La Sagra / Madrid Sur</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column (Col Span 5): PALMIRA AI + Metodología */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* PALMIRA AI Card */}
            <TiltCard className="glass-card rounded-2xl p-7 border border-violet-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
              <div 
                className="absolute -top-12 -right-12 w-48 h-48 bg-violet-600/30 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" 
                aria-hidden="true" 
              />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-violet-300 uppercase tracking-widest">
                      {PROJECTS_DATA[1].tag}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-violet-950 text-cyan-300 border border-violet-700/60 font-semibold">
                    Prototipo Activo
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-white">
                    {PROJECTS_DATA[1].title}
                  </h3>
                  <div className="text-xs text-stone-400">
                    {PROJECTS_DATA[1].subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                  {PROJECTS_DATA[1].description}
                </p>

                <ul className="space-y-1.5 text-xs text-stone-300 pt-2 border-t border-white/10">
                  {PROJECTS_DATA[1].highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onOpenAi}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-violet-900/30"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Probar Asistente Palmira AI Ahora</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </TiltCard>

            {/* Metodología Pymes */}
            <TiltCard className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-widest">
                  {PROJECTS_DATA[2].tag}
                </span>
              </div>

              <h4 className="text-base font-bold text-white">
                {PROJECTS_DATA[2].title}
              </h4>

              <p className="text-xs text-stone-300 leading-relaxed">
                {PROJECTS_DATA[2].description}
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                <span>Aplicado en empresas locales</span>
                <button
                  type="button"
                  onClick={onContactClick}
                  className="text-cyan-300 font-bold hover:text-white cursor-pointer"
                >
                  Ver plantillas →
                </button>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
