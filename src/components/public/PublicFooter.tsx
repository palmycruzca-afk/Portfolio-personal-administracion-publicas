import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/personalData';

interface PublicFooterProps {
  onOpenAi: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onOpenAi }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05070E] text-stone-300 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
              <span>PALMIRA CRUZ</span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Apoyo administrativo, coordinación de personas y gestión de clientes para empresas, negocios y despachos que necesitan avanzar con solidez.
            </p>
            <div className="text-xs text-stone-400 pt-1 flex items-center gap-2">
              <span>{PERSONAL_DATA.locationPrimary}</span>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${PERSONAL_DATA.email}`} className="text-cyan-300 hover:text-white underline">
                {PERSONAL_DATA.email}
              </a>
            </div>
          </div>

          {/* Navigation Mirrors */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div className="font-bold text-white uppercase tracking-widest text-[11px]">
                Navegación
              </div>
              <ul className="space-y-2.5 text-stone-400">
                <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#sobre-mi" className="hover:text-white transition-colors">Sobre mí</a></li>
                <li><a href="#capacidades" className="hover:text-white transition-colors">Capacidades</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-white uppercase tracking-widest text-[11px]">
                Iniciativas
              </div>
              <ul className="space-y-2.5 text-stone-400">
                <li><a href="#proyectos" className="hover:text-white transition-colors">Gestión Inmobiliaria Propia</a></li>
                <li>
                  <button 
                    type="button" 
                    onClick={onOpenAi} 
                    className="hover:text-white transition-colors flex items-center gap-1.5 text-cyan-300 font-semibold cursor-pointer"
                  >
                    <span>Palmira AI</span>
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </button>
                </li>
                <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>

          {/* AI Banner Card */}
          <div className="md:col-span-3 glass-card rounded-2xl p-5 border border-violet-500/30 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Espacio Privado Palmira AI</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-normal">
              Entorno inteligente para el análisis de oportunidades de negocio, CRM comercial y generación de propuestas.
            </p>
            <button
              type="button"
              onClick={onOpenAi}
              className="w-full py-2.5 px-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-violet-900/30"
            >
              Abrir Asistente Privado
            </button>
          </div>
        </div>

        {/* Legal & Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {currentYear} Palmira Cruz. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Aviso de rigor: Fechas profesionales sujetas a validación documental</span>
            <span aria-hidden="true">·</span>
            <span>Espacio privado · Palmira AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
