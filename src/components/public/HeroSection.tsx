import React from 'react';
import { ArrowDown, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/personalData';

interface HeroSectionProps {
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
}) => {
  return (
    <section id="inicio" className="relative min-h-[92vh] flex flex-col justify-center pt-8 pb-20 sm:pt-14 sm:pb-28 overflow-hidden bg-cyber-grid">
      {/* Background Ambient Glow Orbs */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[550px] glow-ambient-purple blur-3xl rounded-full pointer-events-none animate-pulse-glow" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-10 right-10 -z-10 w-[550px] h-[450px] glow-ambient-cyan blur-3xl rounded-full pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-10 left-10 -z-10 w-[450px] h-[350px] glow-ambient-lavender blur-3xl rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Floating Badge Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-8 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-950/70 border border-violet-500/40 text-violet-300 font-semibold text-[11px] uppercase tracking-wider">
              <Zap className="w-3 h-3 text-cyan-400" />
              Consultoría Operativa & Crecimiento especialista en gestión, organización y desarrollo de oportunidades de negocio
            </span>
            <span className="text-stone-600 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-stone-400 hidden sm:inline">{PERSONAL_DATA.locationPrimary}</span>
          </div>
        </div>

        {/* 2-Column Split: Powerful Hero Copy + Sophisticated Floating Visual Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headlines & CTA Matrix */}
          <div className="lg:col-span-7 space-y-6">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Administración, atención al cliente, <span className="text-gradient-purple-cyan">IA, RRHH y selección de personal</span>.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-normal">
              Experiencia en gestión documental, atención al cliente, actividad inmobiliaria, coordinación de proveedores, gestión de incidencias y organización de equipos.
            </p>

            {/* Brand Phrase Card in Glassmorphism */}
            <div className="p-4 sm:p-5 rounded-2xl glass-card border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-cyan-400" />
              <p className="text-sm sm:text-base font-medium text-stone-200 italic pl-2">
                «Experiencia, iniciativa y compromiso. Las personas conectan oportunidades».
              </p>
            </div>

            {/* High-Impact CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreServices}
                className="px-7 py-4 rounded-xl text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-300 hover:from-cyan-300 hover:to-violet-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-200 flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02]"
              >
                <span>Descubre cómo puedo ayudarte</span>
                <ArrowDown className="w-4 h-4 text-stone-900" />
              </button>

              <a
                href={PERSONAL_DATA.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900/90 hover:bg-slate-800/90 border border-white/15 hover:border-violet-400/50 shadow-md transition-all duration-200 flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02]"
              >
                <span>Contactar</span>
                <ArrowUpRight className="w-4 h-4 text-violet-300" />
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Sin costes de estructura fija</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                <span>Interlocución directa y resolutiva</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Adaptación inmediata al negocio</span>
              </div>
            </div>
          </div>

          {/* Right Column: Palmira Cruz Official Portrait with Neon Halo Glow Integration */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-[460px] mx-auto">
              {/* Outer Ambient Glow that mirrors the photo's purple-blue neon ring */}
              <div 
                className="absolute -inset-4 bg-gradient-to-tr from-violet-600/50 via-indigo-600/30 to-cyan-400/50 rounded-[2.5rem] blur-2xl opacity-75 animate-pulse-glow" 
                aria-hidden="true" 
              />
              
              {/* Concentric aura ring echoing the internal neon halo */}
              <div 
                className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-violet-500/60 via-cyan-400/50 to-indigo-500/60 blur-sm pointer-events-none" 
                aria-hidden="true"
              />

              {/* Main Portrait Frame - Preserving 100% of the original square composition and glowing ring */}
              <div className="relative rounded-3xl overflow-hidden glass-card border border-white/20 shadow-2xl shadow-violet-950/70 aspect-square group">
                <img
                  src="/assets/images/palmira_cruz_official.jpg"
                  alt="Palmira Cruz — Profesional Independiente & especialista en gestión, organización y desarrollo de oportunidades de negocio"
                  className="w-full h-full object-cover object-center select-none transform group-hover:scale-[1.02] transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                />

                {/* Bottom glassmorphism identification badge - sleek, non-intrusive */}
                <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 p-3 sm:p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 shadow-xl flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">Palmira Cruz</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Activa
                      </span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-violet-300 font-medium mt-0.5">
                      Especialista en Clientes · Gestión de Personal · Administración · Incidencias · Proveedores
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 block font-bold">Toledo · Madrid</span>
                    <span className="text-[10px] text-stone-400">Presencial & Remoto</span>
                  </div>
                </div>
              </div>

              {/* Floating Widget 1 (Top-Right) */}
              <div className="absolute -top-4 -right-3 sm:-right-6 bg-slate-900/90 backdrop-blur-xl border border-violet-500/50 p-3 sm:p-3.5 rounded-xl shadow-2xl max-w-[200px] animate-float z-10">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold">Gestión y Negocio</span>
                </div>
                <div className="text-xs font-bold text-white mt-1">
                  RRHH y Selección
                </div>
                <div className="text-[10px] text-stone-300 mt-0.5">
                  organización y mejora de procesos
                </div>
              </div>

              {/* Floating Widget 2 (Bottom-Left) */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-slate-900/95 backdrop-blur-xl border border-cyan-400/40 p-3 sm:p-3.5 rounded-xl shadow-2xl max-w-[220px] z-10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                  <span className="text-[10px] font-mono uppercase text-violet-300 font-bold">Experiencia Propia</span>
                </div>
                <div className="text-xs font-bold text-white mt-1">
                  Dirección Inmobiliaria
                </div>
                <div className="text-[10px] text-stone-300 mt-0.5">
                  Negociación y control documental
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Proof & Metrics Strip with Tabular Figures */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
              Eficacia Directiva
            </div>
            <div className="text-xs sm:text-sm font-semibold text-stone-200">Enfoque resolutivo y metódico</div>
            <div className="text-xs text-stone-400">Procesos ágiles, sin rodeos y adaptados a cada empresa.</div>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-gradient-electric font-mono tabular-nums tracking-tight">
              Sector Inmobiliario
            </div>
            <div className="text-xs sm:text-sm font-semibold text-stone-200">Dirección y gestión propia</div>
            <div className="text-xs text-stone-400">Operaciones, negociación y rigor documental.</div>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tabular-nums tracking-tight">
              4
            </div>
            <div className="text-xs sm:text-sm font-semibold text-stone-200">Áreas de soluciones clave</div>
            <div className="text-xs text-stone-400">Organización, Personas, Clientes y Desarrollo.</div>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-violet-400 font-mono tabular-nums tracking-tight">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-stone-200">Dedicación independiente</div>
            <div className="text-xs text-stone-400">Orientada al avance ágil de cada negocio.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
