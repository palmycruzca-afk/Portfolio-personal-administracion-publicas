import React from 'react';
import { 
  Sparkles, 
  Building2, 
  TrendingUp, 
  FileCheck, 
  PhoneCall, 
  Clock, 
  Award, 
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Activity,
  Cpu,
  Layers,
  Radio,
  Zap
} from 'lucide-react';
import { Opportunity, AiTab } from '../../types';

interface AiDashboardProps {
  opportunities: Opportunity[];
  onNavigateTab: (tab: AiTab) => void;
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onPrepareProposal: (opportunity: Opportunity) => void;
}

export const AiDashboard: React.FC<AiDashboardProps> = ({
  opportunities,
  onNavigateTab,
  onSelectOpportunity,
  onPrepareProposal,
}) => {
  const totalOpportunities = 24;
  const totalCompaniesAnalyzed = 58;
  const top10Opps = opportunities.filter(o => o.isTop10);
  const priorityCount = top10Opps.length;
  const pendingProposalsCount = opportunities.filter(o => o.crmStatus === 'propuesta_preparada').length;
  const contactsMadeCount = opportunities.filter(o => o.crmStatus === 'contacto_realizado' || o.crmStatus === 'en_negociacion' || o.crmStatus === 'cliente_conseguido').length;
  const upcomingFollowUpsCount = 3;

  const categoryStats = {
    captacion: opportunities.filter(o => o.category === 'captacion').length,
    colaboraciones: opportunities.filter(o => o.category === 'colaboraciones').length,
    licitaciones: opportunities.filter(o => o.category === 'licitaciones').length,
    empleo: opportunities.filter(o => o.category === 'empleo').length,
  };

  const verifiedCount = opportunities.filter(o => o.verificationStatus === 'verificada').length;
  const potentialCount = opportunities.filter(o => o.verificationStatus === 'potencial').length;

  return (
    <div className="space-y-8">
      {/* AI Agent Console Hero Banner */}
      <div className="relative rounded-3xl glass-card border border-violet-500/30 p-7 sm:p-9 text-white overflow-hidden shadow-2xl">
        {/* Glow Spheres */}
        <div 
          className="absolute -right-16 -top-16 w-80 h-80 bg-violet-600/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" 
          aria-hidden="true" 
        />
        <div 
          className="absolute right-1/4 -bottom-16 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/60 text-xs text-cyan-300 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
              <span>MOTOR DE PROSPECCIÓN PALMIRA AI · V2.4</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-stone-300 border border-white/10">
              Castilla-La Mancha & Madrid Sur
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            ¡Hola, Palmira! Tu próximo proyecto puede estar aquí.
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            El sistema de inteligencia comercial ha analizado <strong>58 empresas</strong> en el eje logístico de La Sagra (Illescas), Toledo capital y el sur de Madrid. Tienes <strong>{priorityCount} oportunidades prioritarias</strong> con alto encaje en gestión documental, coordinación de personal y soporte operativo independiente.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('top10')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-violet-900/40 hover:scale-[1.02]"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Ver Top 10 Oportunidades</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('search')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-stone-200 border border-white/15 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Explorar Buscador Multi-Categoría</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Key Metrics Cards Grid with Neon Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl glass-card glass-card-hover border border-white/10 space-y-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>Detectadas</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
            {totalOpportunities}
          </div>
          <div className="text-[10px] text-stone-400 font-medium">En comarca y entorno</div>
        </div>

        <div className="p-4 rounded-2xl glass-card glass-card-hover border border-white/10 space-y-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
            <Building2 className="w-3 h-3 text-violet-400" />
            <span>Empresas</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
            {totalCompaniesAnalyzed}
          </div>
          <div className="text-[10px] text-stone-400 font-medium">BBDD activa analizada</div>
        </div>

        <div className="p-4 rounded-2xl glass-card glass-card-hover border border-cyan-400/50 space-y-1 bg-cyan-950/20">
          <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-3 h-3 text-amber-400" />
            <span>Prioritarias</span>
          </div>
          <div className="text-3xl font-extrabold text-cyan-300 font-mono tabular-nums">
            {priorityCount}
          </div>
          <div className="text-[10px] text-cyan-400 font-medium font-semibold">Top 10 en ranking</div>
        </div>

        <div className="p-4 rounded-2xl glass-card glass-card-hover border border-white/10 space-y-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
            <FileCheck className="w-3 h-3 text-amber-400" />
            <span>Propuestas</span>
          </div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
            {pendingProposalsCount}
          </div>
          <div className="text-[10px] text-stone-400 font-medium">Listas para revisar</div>
        </div>

        <div className="p-4 rounded-2xl glass-card glass-card-hover border border-white/10 space-y-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span>Contactos</span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
            {contactsMadeCount}
          </div>
          <div className="text-[10px] text-stone-400 font-medium">Registrados en CRM</div>
        </div>

        <div className="p-4 rounded-2xl glass-card glass-card-hover border border-white/10 space-y-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-indigo-400" />
            <span>Seguimientos</span>
          </div>
          <div className="text-3xl font-extrabold text-indigo-300 font-mono tabular-nums">
            {upcomingFollowUpsCount}
          </div>
          <div className="text-[10px] text-stone-400 font-medium">Programados esta semana</div>
        </div>
      </div>

      {/* Visual Analytics & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Distribution Chart */}
        <div className="lg:col-span-6 glass-card p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Distribución por Categorías Comerciales</span>
            </h3>
            <span className="text-xs text-stone-400 font-mono">Prioridad B2B</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">A. Captación de Clientes (Pymes/Logística)</span>
                <span className="font-mono text-cyan-300 font-bold">{categoryStats.captacion} empresas</span>
              </div>
              <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">B. Colaboraciones (Inmobiliarias / Despachos)</span>
                <span className="font-mono text-cyan-300 font-bold">{categoryStats.colaboraciones} acuerdos</span>
              </div>
              <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">C. Proyectos & Licitaciones Públicas</span>
                <span className="font-mono text-amber-300 font-bold">{categoryStats.licitaciones} contratos</span>
              </div>
              <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">D. Empleo Administrativo (Prioridad mañana)</span>
                <span className="font-mono text-teal-300 font-bold">{categoryStats.empleo} analizadas</span>
              </div>
              <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{verifiedCount} verificadas</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{potentialCount} potenciales</span>
            </span>
          </div>
        </div>

        {/* Priority Action Card: Recommended Immediate Actions */}
        <div className="lg:col-span-6 glass-card p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Acciones Recomendadas por el Asistente</span>
              </h3>
              <span className="text-xs text-cyan-300 font-semibold font-mono">Prioridad Alta</span>
            </div>

            <div className="space-y-3 mt-3">
              <div 
                onClick={() => onSelectOpportunity(opportunities[0])}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{opportunities[0].company}</span>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">Índice: 90/100</span>
                </div>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1 font-normal">
                  Propuesta mensual preparada. Conectar con D. Marcos Ruiz para coordinar reunión de 15 minutos en Illescas.
                </p>
              </div>

              <div 
                onClick={() => onSelectOpportunity(opportunities[1])}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{opportunities[1].company}</span>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">Índice: 89/100</span>
                </div>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1 font-normal">
                  En negociación. Enviar protocolo documental ERIA HOUSE como referencia a Elena Moraleda.
                </p>
              </div>

              <div 
                onClick={() => onSelectOpportunity(opportunities[2])}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{opportunities[2].company}</span>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">Índice: 88/100</span>
                </div>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1 font-normal">
                  Soporte en turnos de educadoras para picos de Navidad en Yuncos.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-stone-400 font-mono text-[11px]">
              Simulación comercial en tiempo real
            </span>
            <button
              type="button"
              onClick={() => onNavigateTab('crm')}
              className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors uppercase tracking-wider"
            >
              <span>Ir al CRM completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
