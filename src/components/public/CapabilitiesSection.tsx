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
  Compass,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export interface CapabilityItem {
  id: string;
  name: string;
  solutionOutcome: string;
}

export interface CapabilityArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  glowColor: string;
  accentBorder: string;
  capabilities: CapabilityItem[];
  practicalImpact: string;
}

export const CAPABILITIES_AREAS: CapabilityArea[] = [
  {
    id: 'gestion-administrativa',
    number: '01',
    title: 'Gestión administrativa y organización',
    subtitle: 'Estructura, rigor documental y eliminación del desorden operativo',
    icon: FileText,
    glowColor: 'from-violet-600 to-indigo-600',
    accentBorder: 'border-violet-500/40',
    capabilities: [
      {
        id: 'c-1',
        name: 'Gestión documental y administrativa',
        solutionOutcome: 'Control de archivos, expedientes, facturación y contratos para tener cada documento localizado al instante.',
      },
      {
        id: 'c-2',
        name: 'Organización de procesos y tareas',
        solutionOutcome: 'Mapeo y simplificación de las rutinas de trabajo para evitar duplicidades, despistes y fricciones operativas.',
      },
      {
        id: 'c-3',
        name: 'Coordinación y seguimiento de operaciones',
        solutionOutcome: 'Supervisión activa del circuito de trabajo para asegurar que cada compromiso se cumple en tiempo y forma.',
      },
      {
        id: 'c-4',
        name: 'Planificación y organización del trabajo',
        solutionOutcome: 'Priorización diaria y semanal de tareas clave para que la dirección recupere su tiempo estratégico.',
      },
    ],
    practicalImpact: 'Transformo el papeleo disperso y las urgencias en flujos de trabajo claros, medibles y tranquilos.',
  },
  {
    id: 'gestion-personas',
    number: '02',
    title: 'Gestión de personas',
    subtitle: 'Cohesión, horarios equilibrados y resolución ágil de incidencias internas',
    icon: Users,
    glowColor: 'from-cyan-500 to-teal-500',
    accentBorder: 'border-cyan-500/40',
    capabilities: [
      {
        id: 'c-5',
        name: 'Apoyo en selección y contratación',
        solutionOutcome: 'Filtro inicial de candidaturas, comprobación de referencias y recopilación de documentación para altas.',
      },
      {
        id: 'c-6',
        name: 'Organización de horarios y turnos',
        solutionOutcome: 'Diseño equitativo de cuadrantes de trabajo, gestión de permisos, bajas imprevistas y coberturas.',
      },
      {
        id: 'c-7',
        name: 'Coordinación de equipos',
        solutionOutcome: 'Punto de apoyo central para alinear las tareas diarias del personal y canalizar dudas con claridad.',
      },
      {
        id: 'c-8',
        name: 'Comunicación y resolución de incidencias',
        solutionOutcome: 'Intervención templada y empática ante desajustes cotidianos para mantener un clima de confianza.',
      },
    ],
    practicalImpact: 'Conecto personas con criterio y empatía, asegurando cobertura operativa sin generar tensiones en el equipo.',
  },
  {
    id: 'atencion-cliente',
    number: '03',
    title: 'Atención al cliente y gestión comercial',
    subtitle: 'Cuidado del detalle, respuesta inmediata y desarrollo de relaciones de confianza',
    icon: Headphones,
    glowColor: 'from-indigo-500 to-violet-500',
    accentBorder: 'border-indigo-500/40',
    capabilities: [
      {
        id: 'c-9',
        name: 'Atención y asesoramiento al cliente',
        solutionOutcome: 'Trato profesional, educado y cercano que transmite la máxima solvencia de tu negocio desde el primer contacto.',
      },
      {
        id: 'c-10',
        name: 'Seguimiento de clientes',
        solutionOutcome: 'Contacto continuado para mantener informados a clientes e inversores del avance de sus trámites o pedidos.',
      },
      {
        id: 'c-11',
        name: 'Gestión de consultas e incidencias',
        solutionOutcome: 'Respuestas ágiles a dudas y reclamaciones, transformando objeciones en clientes fidelizados.',
      },
      {
        id: 'c-12',
        name: 'Apoyo comercial y desarrollo de relaciones',
        solutionOutcome: 'Dinamización de contactos clave, emisión de propuestas y reactivación de cuentas comerciales.',
      },
    ],
    practicalImpact: 'Protejo la reputación comercial de tu empresa ofreciendo una atención que genera recomendaciones y confianza.',
  },
  {
    id: 'coordinacion-negocios',
    number: '04',
    title: 'Coordinación y desarrollo de negocios',
    subtitle: 'Visión global, enlace de colaboradores y ejecución rigurosa de proyectos',
    icon: Briefcase,
    glowColor: 'from-violet-500 to-cyan-400',
    accentBorder: 'border-cyan-400/40',
    capabilities: [
      {
        id: 'c-13',
        name: 'Organización de operaciones',
        solutionOutcome: 'Alineación de todas las partes involucradas en una operación (proveedores, gestorías, técnicos, clientes).',
      },
      {
        id: 'c-14',
        name: 'Coordinación de colaboradores',
        solutionOutcome: 'Seguimiento de entregas de profesionales externos para garantizar que nada se quede sin hacer.',
      },
      {
        id: 'c-15',
        name: 'Identificación de oportunidades',
        solutionOutcome: 'Detección proactiva de necesidades no cubiertas en clientes existentes y en el mercado local.',
      },
      {
        id: 'c-16',
        name: 'Seguimiento de proyectos y colaboraciones',
        solutionOutcome: 'Control de cronogramas y compromisos adquiridos para asegurar el éxito final de cada iniciativa.',
      },
    ],
    practicalImpact: 'Aporto visión de negocio y constancia para que las buenas ideas se conviertan en operaciones cerradas.',
  },
];

interface CapabilitiesSectionProps {
  onSelectAreaToContact?: (areaTitle: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onSelectAreaToContact }) => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>(CAPABILITIES_AREAS[0].id);

  const activeArea = CAPABILITIES_AREAS.find(a => a.id === selectedAreaId) || CAPABILITIES_AREAS[0];

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
            <span>Fortalezas & Soluciones Profesionales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Lo que sé hacer y cómo puedo ayudarte
          </h2>
          <p className="text-stone-300 text-base sm:text-lg mt-3 font-normal leading-relaxed">
            Capacidades operativas probadas para resolver problemas reales en el día a día de empresas, negocios y profesionales independientes.
          </p>
        </div>

        {/* Highlighted Quote Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl glass-card border border-violet-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-400 via-violet-500 to-indigo-600" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pl-2 sm:pl-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-300 font-bold block">
                Filosofía de colaboración
              </span>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-snug">
                «No se trata solo de hacer tareas, sino de entender lo que necesita cada negocio, organizarlo y ayudarle a avanzar».
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-stone-300 bg-white/[0.04] px-4 py-2.5 rounded-xl border border-white/10">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Enfoque resolutivo y práctico</span>
            </div>
          </div>
        </div>

        {/* 4 Interactive Area Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {CAPABILITIES_AREAS.map((area) => {
            const isSelected = selectedAreaId === area.id;
            const Icon = area.icon;

            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setSelectedAreaId(area.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
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

                <h3 className="text-base font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                  {area.title}
                </h3>
                <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {area.subtitle}
                </p>
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
                <span>Soluciones Aplicadas</span>
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

          {/* 4 Capabilities Grid with Solution Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeArea.capabilities.map((cap) => (
              <div
                key={cap.id}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.04] transition-all space-y-2 group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cap.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-1 font-normal">
                      {cap.solutionOutcome}
                    </p>
                  </div>
                </div>
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
                Impacto operativo en tu negocio:
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
