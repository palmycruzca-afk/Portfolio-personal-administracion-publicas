import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

interface PublicNavbarProps {
  onOpenAi: () => void;
  onContactClick: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ onOpenAi, onContactClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-header transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#inicio" 
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-white hover:text-violet-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 group-hover:scale-125 transition-transform" />
          <span>PALMIRA CRUZ</span>
        </a>

        {/* Zone 2: 4–5 concise links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-stone-300">
          <a href="#sobre-mi" className="hover:text-white hover:text-violet-300 transition-colors whitespace-nowrap shrink-0">
            Sobre mí
          </a>
          <a href="#capacidades" className="hover:text-white hover:text-violet-300 transition-colors whitespace-nowrap shrink-0">
            Capacidades
          </a>
          <a href="#servicios" className="hover:text-white hover:text-violet-300 transition-colors whitespace-nowrap shrink-0">
            Servicios
          </a>
          <a href="#proyectos" className="hover:text-white hover:text-violet-300 transition-colors whitespace-nowrap shrink-0">
            Proyectos
          </a>
          <a href="#contacto" className="hover:text-white hover:text-violet-300 transition-colors whitespace-nowrap shrink-0">
            Contacto
          </a>
        </nav>

        {/* Zone 3: Primary Action & Palmira AI Link */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenAi}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-violet-950/60 hover:bg-violet-900/70 text-violet-200 border border-violet-700/50 hover:border-violet-500 transition-all cursor-pointer shadow-sm hover:shadow-violet-900/40"
            title="Abrir plataforma de inteligencia de negocio"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            <span>Palmira AI</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-violet-800/80 text-violet-100 border border-violet-600/40">
              Privado
            </span>
          </button>

          <button
            type="button"
            onClick={onContactClick}
            className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-stone-900 bg-gradient-to-r from-white via-stone-100 to-stone-200 hover:from-stone-100 hover:to-white shadow-lg shadow-white/5 transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:scale-[1.02]"
          >
            <span>Hablemos de tu proyecto</span>
            <ArrowUpRight className="w-4 h-4 text-stone-700" />
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-white cursor-pointer"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-800 bg-[#070913]/95 backdrop-blur-2xl px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-wider text-stone-300">
            <a href="#sobre-mi" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-white">Sobre mí</a>
            <a href="#capacidades" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-white">Capacidades</a>
            <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-white">Servicios</a>
            <a href="#proyectos" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-white">Proyectos</a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-white">Contacto</a>
          </div>

          <div className="pt-4 border-t border-stone-800">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAi();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-xs tracking-wide uppercase"
            >
              <Sparkles className="w-4 h-4 text-violet-200" />
              <span>Acceder a Palmira AI</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
