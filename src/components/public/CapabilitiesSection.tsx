import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  Headphones, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Target,
  Zap,
  Building2,
  ShieldCheck
} from 'lucide-react';

export interface CapabilityArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  items: string[];
  practicalImpact: string;
}

export const CAPABILITIES_AREAS_PUBLIC: CapabilityArea[] = [
  {
    id: 'atencion-cliente',
    number: '01',
    title: 'Atención al cliente y gestión comercial',
    subtitle: 'Relación cercana, profesional y resolutiva con clientes y usuarios',
    icon: Headphones,
    items: [
      'Atención y asesoramiento a clientes.',
      'Gestión de consultas, reclamaciones e incidencias.',
      'Seguimiento de clientes y operaciones.',
      'Comunicación y apoyo comercial.'
    ],
    practicalImpact: 'Protejo la reputación comercial de tu empresa ofreciendo una atención que genera confianza y fidelización.'
  },
  {
    id: 'admin-documental',
    number: '02',
    title: 'Administración y gestión documental',
    subtitle: 'Rigor y orden en el tratamiento de archivos, expedientes y bases de datos',
    icon: FileText,
    items: [
      'Gestión y organización documental.',
      'Archivo, expedientes y registros.',
      'Creación, actualización y mantenimiento de bases de datos.',
      'Organización administrativa y seguimiento de tareas.'
    ],
    practicalImpact: 'Transformo el papeleo disperso en flujos de trabajo claros, ordenados y de acceso inmediato.'
  },
  {
    id: 'gestion-inmobiliaria',
    number: '03',
    title: 'Gestión y coordinación inmobiliaria',
    subtitle: 'Experiencia directa en la dirección y gestión de empresas del sector inmobiliario',
    icon: Building2,
    items: [
      'Gestión y coordinación de actividad empresarial inmobiliaria.',
      'Organización y seguimiento de operaciones.',
      'Atención, asesoramiento y seguimiento de clientes.',
      'Gestión comercial y negociación.',
      'Coordinación de profesionales y colaboradores.',
      'Gestión administrativa y documental.',
      'Desarrollo de negocio y oportunidades.'
    ],
    practicalImpact: 'Aporto rigor directivo, dominio del ciclo inmobiliario y control exhaustivo de cada expediente de compraventa o arrendamiento.'
  },
  {
    id: 'incidencias-proveedores',
    number: '04',
    title: 'Gestión de incidencias y proveedores',
    subtitle: 'Control de plazos, interlocución fluida y resolución eficaz de incidencias',
    icon: ShieldCheck,
    items: [
      'Recepción y seguimiento de incidencias.',
      'Coordinación y comunicación con proveedores.',
      'Solicitud y seguimiento de servicios.',
      'Resolución de problemas y control de plazos.'
    ],
    practicalImpact: 'Despreocupación operativa: centralizo la relación con proveedores y aseguro que cada incidencia se resuelva sin retrasos.'
  },
  {
    id: 'rrhh-equipos',
    number: '05',
    title: 'Recursos humanos y coordinación de equipos',
    subtitle: 'Apoyo integral en la organización de plantillas, turnos y comunicación interna',
    icon: Users,
    items: [
      'Apoyo en selección y contratación.',
      'Organización de horarios y turnos.',
      'Coordinación de equipos y tareas.',
      'Comunicación y organización de personal.'
    ],
    practicalImpact: 'Cohesión y equilibrio en los equipos de trabajo, asegurando coberturas óptimas y un clima laboral ordenado.'
  }
];

interface CapabilitiesSectionProps {
  onSelectAreaToContact?: (areaTitle: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onSelectAreaToContact }) => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>(CAPABILITIES_AREAS_PUBLIC[0].id);

  const activeArea = CAPABILITIES_AREAS_PUBLIC.find(a => a.id === selectedAreaId) || CAPABILITIES_AREAS_PUBLIC[0];

  return (
    <section id="capacidades" className="py-20 sm:py-28 bg-[#070913] relative overflow-hidden bg-cyber-dots">
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] glow-ambient-purple blur-3xl rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Habilidades & Experiencia Profesional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Lo que sé hacer y cómo puedo ayudarte
          </h2>
          <p className="text-stone-300 text-base sm:text-lg mt-3 font-normal leading-relaxed">
            Áreas de competencia profesional diseñadas para aportar valor inmediato en empresas, negocios y despachos.
          </p>
        </div>

        {/* 5 Interactive Area Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {CAPABILITIES_AREAS_PUBLIC.map((area) => {
            const isSelected = selectedAreaId === area.id;
            const Icon = area.icon;

            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setSelectedAreaId(area.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'glass-card border-cyan-400/60 shadow-2xl shadow-cyan-950/40 ring-1 ring-cyan-400/40 -translate-y-1'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-indigo-600" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-cyan-300' : 'text-stone-500'}`}>
                    {area.number}
                  </span>
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-violet-950/80 text-cyan-300 border border-violet-700/60' : 'bg-white/5 text-stone-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                  {area.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Area Deep Dive Box */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold uppercase tracking-widest">
                <span>Área {activeArea.number}</span>
                <span className="text-stone-600">·</span>
                <span>Competencias Detalladas</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeArea.title}
              </h3>
              <p className="text-sm text-stone-300">
                {activeArea.subtitle}
              </p>
            </div>

            {onSelectAreaToContact && (
              <button
                type="button"
                onClick={() => onSelectAreaToContact(activeArea.title)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md self-start md:self-auto shrink-0"
              >
                <span>Consultar esta área</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeArea.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.04] transition-all flex items-start gap-3"
              >
                <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm text-white font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Impact Statement Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/50 via-[#0A0D1A] to-indigo-950/50 border border-violet-500/30 flex items-start gap-4 text-xs sm:text-sm text-stone-200">
            <div className="p-2 rounded-xl bg-violet-900/60 border border-violet-500/40 text-cyan-300 shrink-0 mt-0.5">
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <span className="font-bold text-white block mb-0.5 text-xs uppercase tracking-wider">
                Aportación de valor:
              </span>
              <p className="text-stone-300 leading-relaxed font-normal">
                {activeArea.practicalImpact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
