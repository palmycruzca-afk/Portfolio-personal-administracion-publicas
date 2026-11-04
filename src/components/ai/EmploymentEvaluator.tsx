import React, { useState } from 'react';
import { 
  Building2, 
  Landmark, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  SlidersHorizontal, 
  Search, 
  ArrowRight,
  PlusCircle,
  HelpCircle,
  Filter,
  Ban,
  GraduationCap,
  Calendar,
  Euro,
  Info
} from 'lucide-react';
import { 
  Opportunity, 
  AdministrativeEmploymentData, 
  PublicCallStatus, 
  ScheduleCompatibility,
  EmploymentScoreFactors
} from '../../types';
import { 
  PUBLIC_ADMIN_OPPORTUNITIES, 
  PRIVATE_ADMIN_OPPORTUNITIES, 
  TARGET_ADMIN_ROLES, 
  MANDATORY_EXCLUSIONS,
  calculateAdminFitScore
} from '../../data/administrativeEmploymentData';

interface EmploymentEvaluatorProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onPrepareProposal: (opportunity: Opportunity) => void;
}

export const EmploymentEvaluator: React.FC<EmploymentEvaluatorProps> = ({
  opportunities,
  onSelectOpportunity,
  onPrepareProposal,
}) => {
  // Navigation between the 2 main categories + the Smart Analyzer + Exclusions
  const [activeSubView, setActiveSubView] = useState<'publica' | 'privada' | 'analizador' | 'exclusiones'>('publica');

  // Filters for Administraciones Públicas
  const [publicStatusFilter, setPublicStatusFilter] = useState<string>('todas');
  const [publicEntityFilter, setPublicEntityFilter] = useState<string>('todas');
  const [onlyMorningPublic, setOnlyMorningPublic] = useState<boolean>(true);

  // Filters for Empresas Privadas
  const [onlyRecommendedPrivate, setOnlyRecommendedPrivate] = useState<boolean>(true);
  const [privateSearchQuery, setPrivateSearchQuery] = useState<string>('');

  // Interactive Live Analyzer State
  const [inputUrl, setInputUrl] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [inputEntity, setInputEntity] = useState<string>('');
  const [inputRole, setInputRole] = useState<string>('');
  const [inputLocation, setInputLocation] = useState<string>('Illescas (Toledo)');
  const [inputSchedule, setInputSchedule] = useState<string>('');
  const [inputCategory, setInputCategory] = useState<'administracion_publica' | 'empresa_privada'>('administracion_publica');
  const [analyzedResult, setAnalyzedResult] = useState<AdministrativeEmploymentData | null>(null);

  // Stored user custom analyzed opportunities
  const [customOpportunities, setCustomOpportunities] = useState<AdministrativeEmploymentData[]>([]);

  // Combining system verified + user saved
  const allPublicOpportunities = [
    ...PUBLIC_ADMIN_OPPORTUNITIES,
    ...customOpportunities.filter(o => o.sectorType === 'administracion_publica')
  ];

  const allPrivateOpportunities = [
    ...PRIVATE_ADMIN_OPPORTUNITIES,
    ...customOpportunities.filter(o => o.sectorType === 'empresa_privada')
  ];

  // Filter public opportunities
  const filteredPublicList = allPublicOpportunities.filter(opp => {
    if (publicStatusFilter !== 'todas' && opp.status !== publicStatusFilter) return false;
    if (publicEntityFilter !== 'todas' && opp.subType !== publicEntityFilter) return false;
    if (onlyMorningPublic && opp.scheduleType !== 'intensiva_manana' && opp.scheduleType !== 'horario_manana' && opp.scheduleType !== 'parcial_manana') {
      return false;
    }
    return true;
  });

  // Filter private opportunities
  const filteredPrivateList = allPrivateOpportunities.filter(opp => {
    if (opp.isExcluded) return false; // Strictly filter out excluded
    if (onlyRecommendedPrivate && !opp.isRecommended) return false;
    if (privateSearchQuery.trim()) {
      const q = privateSearchQuery.toLowerCase();
      const match = 
        opp.roleTitle.toLowerCase().includes(q) ||
        opp.entityName.toLowerCase().includes(q) ||
        opp.location.toLowerCase().includes(q) ||
        opp.mainFunctions.some(f => f.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Excluded opportunities for audit/inspection tab
  const excludedList = allPrivateOpportunities.filter(opp => opp.isExcluded);

  // Status Badge Helper
  const getPublicStatusBadge = (status: PublicCallStatus | string) => {
    switch (status) {
      case 'convocatoria_abierta':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            <span>Convocatoria abierta</span>
          </span>
        );
      case 'bolsa_vigente':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Bolsa vigente</span>
          </span>
        );
      case 'proxima_convocatoria':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/80 text-violet-300 border border-violet-500/50 text-xs font-bold font-mono">
            <Clock className="w-3 h-3 text-violet-400" />
            <span>Próxima convocatoria anunciada</span>
          </span>
        );
      case 'proceso_en_curso':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/50 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Proceso en curso</span>
          </span>
        );
      case 'convocatoria_cerrada':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-stone-400 border border-white/10 text-xs font-semibold font-mono">
            <span className="w-2 h-2 rounded-full bg-stone-500" />
            <span>Convocatoria cerrada</span>
          </span>
        );
    }
  };

  // Schedule Tag Helper with strict "Horario sin confirmar" rule
  const getScheduleBadge = (scheduleType: ScheduleCompatibility, isConfirmed: boolean, details: string) => {
    if (!isConfirmed || scheduleType === 'sin_confirmar') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/70 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Horario sin confirmar</span>
        </span>
      );
    }

    if (scheduleType === 'intensiva_manana' || scheduleType === 'horario_manana' || scheduleType === 'parcial_manana') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-950/80 text-teal-300 border border-teal-500/40 text-xs font-bold font-mono">
          <Clock className="w-3.5 h-3.5 text-teal-400" />
          <span>Turno de mañana prioritario</span>
        </span>
      );
    }

    if (scheduleType === 'partida') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-950/80 text-orange-300 border border-orange-500/40 text-xs font-bold font-mono">
          <XCircle className="w-3.5 h-3.5 text-orange-400" />
          <span>Jornada partida (Penalizada)</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-950/80 text-red-300 border border-red-500/40 text-xs font-bold font-mono">
        <Ban className="w-3.5 h-3.5 text-red-400" />
        <span>Turno rotativo / tarde (Descartada)</span>
      </span>
    );
  };

  // Run Real-Time Analyzer
  const handleAnalyzePosting = () => {
    if (!inputRole.trim() && !inputText.trim()) return;

    const fullText = `${inputRole} ${inputEntity} ${inputText} ${inputSchedule}`.toLowerCase();

    // Check exclusion keywords
    let detectedExclusion = '';
    for (const kw of MANDATORY_EXCLUSIONS) {
      if (fullText.includes(kw)) {
        detectedExclusion = kw;
        break;
      }
    }

    // Schedule detection
    let scheduleType: ScheduleCompatibility = 'sin_confirmar';
    let isConfirmed = false;
    let scheduleText = 'Horario sin confirmar';

    if (
      fullText.includes('mañana') || 
      fullText.includes('intensiva') || 
      fullText.includes('08:00') || 
      fullText.includes('08:30') || 
      fullText.includes('07:30') ||
      fullText.includes('09:00 a 15:00') ||
      fullText.includes('08:00 a 15:00')
    ) {
      if (fullText.includes('partida') || (fullText.includes('tarde') && fullText.includes('16:00') && fullText.includes('19:00'))) {
        scheduleType = 'partida';
        isConfirmed = true;
        scheduleText = 'Jornada partida mañana y tarde';
      } else {
        scheduleType = 'intensiva_manana';
        isConfirmed = true;
        scheduleText = inputSchedule || 'Lunes a Viernes (Turno de mañana)';
      }
    } else if (fullText.includes('rotativo') || fullText.includes('turnos rotativos')) {
      scheduleType = 'rotativo';
      isConfirmed = true;
      scheduleText = 'Turnos rotativos (Mañana / Tarde / Noche)';
    } else if (fullText.includes('tarde')) {
      scheduleType = 'tarde';
      isConfirmed = true;
      scheduleText = 'Turno de tarde';
    } else if (inputSchedule.trim()) {
      scheduleText = inputSchedule;
      isConfirmed = true;
      scheduleType = 'flexible_manana';
    }

    // Location scoring
    const isNearby = fullText.includes('illescas') || fullText.includes('toledo') || fullText.includes('yuncos') || fullText.includes('seseña') || fullText.includes('parla') || fullText.includes('getafe');
    const locationFit = isNearby ? 95 : 70;

    // Admin affinity scoring
    let adminFit = 40;
    if (TARGET_ADMIN_ROLES.some(r => fullText.includes(r.toLowerCase())) || fullText.includes('administra') || fullText.includes('documental') || fullText.includes('expediente')) {
      adminFit = 95;
    }

    // Morning fit scoring
    let morningFit = 40;
    const sType = scheduleType as ScheduleCompatibility;
    if (sType === 'intensiva_manana' || sType === 'horario_manana') {
      morningFit = 100;
    } else if (sType === 'parcial_manana' || sType === 'flexible_manana') {
      morningFit = 90;
    } else if (sType === 'partida') {
      morningFit = 20;
    } else if (sType === 'rotativo' || sType === 'tarde' || sType === 'noche') {
      morningFit = 0;
    }

    const requirementsFit = 90;

    const scores: EmploymentScoreFactors = {
      adminFit,
      morningFit,
      locationFit,
      requirementsFit
    };

    const evaluation = calculateAdminFitScore(scores, scheduleType, inputRole, inputText);

    const newOpp: AdministrativeEmploymentData = {
      sectorType: inputCategory,
      roleTitle: inputRole || 'Puesto administrativo analizado',
      entityName: inputEntity || 'Entidad convocante / Empresa',
      location: inputLocation || 'Illescas / La Sagra / Toledo',
      scheduleType,
      scheduleDetails: scheduleText,
      isScheduleConfirmed: isConfirmed,
      workdayType: scheduleType === 'intensiva_manana' ? 'Jornada intensiva de mañana' : (isConfirmed ? 'Jornada completa de mañana' : 'Horario sin confirmar'),
      salary: 'Según bases de convocatoria o convenio aplicable',
      qualificationRequired: 'Graduado en ESO, FPI Administrativo o titulación exigida en bases',
      mainFunctions: inputText.trim() 
        ? inputText.split('\n').filter(l => l.trim().length > 5).slice(0, 4) 
        : ['Gestión administrativa y documental', 'Atención al público o clientes', 'Manejo de expedientes y registros'],
      publicationDate: 'Recientemente analizada',
      applicationDeadline: 'Verificar en enlace oficial adjunto',
      status: inputCategory === 'administracion_publica' ? 'convocatoria_abierta' : 'oferta_activa',
      officialSourceUrl: inputUrl || 'https://illescas.sedelectronica.es',
      officialSourceName: inputUrl ? 'Enlace aportado por Palmira' : 'Análisis manual de texto',
      scores,
      totalFitScore: evaluation.totalScore,
      isRecommended: evaluation.isRecommended,
      isExcluded: evaluation.isExcluded,
      exclusionReason: evaluation.exclusionReason,
      fitReasons: [
        `Puntuación de encaje calculada: ${evaluation.totalScore}/100.`,
        isConfirmed && (sType === 'intensiva_manana' || sType === 'horario_manana')
          ? 'Cumple con el criterio prioritario de jornada intensiva de mañana.'
          : (sType === 'sin_confirmar' ? 'Horario sin confirmar: requiere comprobación con la entidad.' : 'Horario penalizado por no ser continuo matinal.'),
        `Afinidad administrativa: ${adminFit}%.`
      ],
      notes: evaluation.scheduleAlert || 'Oportunidad evaluada mediante el motor de filtrado inteligente de Palmira AI.'
    };

    setAnalyzedResult(newOpp);
  };

  const handleSaveAnalyzedOpportunity = () => {
    if (!analyzedResult) return;
    setCustomOpportunities(prev => [analyzedResult, ...prev]);
    // Switch to the target tab so user sees it right away
    if (analyzedResult.sectorType === 'administracion_publica') {
      setActiveSubView('publica');
    } else {
      setActiveSubView('privada');
    }
  };

  return (
    <div className="space-y-8">
      {/* Strategic Header: Objective Separation Notice */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>MÓDULO SECUNDARIO: EMPLEO ADMINISTRATIVO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Filtrado Inteligente de Puestos Administrativos & Sector Público
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              <strong>Separación de objetivos:</strong> El fin primordial de Palmira AI es captar clientes independientes, retainers especialista en gestión, organización y desarrollo de oportunidades de negociol y proyectos para Gestión Inmobiliaria Propia. Este módulo secundario localiza con estricto rigor únicamente vacantes <strong>administrativas</strong> con <strong>prioridad turno de mañana</strong> en Administraciones Públicas y empresas privadas en Illescas, Toledo y sur de Madrid.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 text-stone-300 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Prioridad Turno Mañana</span>
                <span className="text-[11px] text-stone-400">Jornada intensiva 08:00 - 15:00</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 text-stone-300 flex items-center gap-2.5">
              <Ban className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Exclusión Estricta</span>
                <span className="text-[11px] text-stone-400">0% logística, almacén o fábrica</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Bar: The 4 dedicated spaces */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setActiveSubView('publica')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubView === 'publica'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/40 ring-1 ring-violet-400/50'
              : 'text-stone-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/10'
          }`}
        >
          <Landmark className="w-4 h-4 text-cyan-300" />
          <span>1. Administraciones Públicas ({allPublicOpportunities.filter(o => o.isRecommended).length} activas)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubView('privada')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubView === 'privada'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/40 ring-1 ring-violet-400/50'
              : 'text-stone-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/10'
          }`}
        >
          <Building2 className="w-4 h-4 text-teal-300" />
          <span>2. Empresas & Gestión ({allPrivateOpportunities.filter(o => o.isRecommended).length} recomendadas)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubView('analizador')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubView === 'analizador'
              ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-cyan-900/40'
              : 'text-cyan-300 hover:text-white bg-cyan-950/40 border border-cyan-500/30'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Analizador de Enlaces & Convocatorias</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubView('exclusiones')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ml-auto ${
            activeSubView === 'exclusiones'
              ? 'bg-red-950 text-red-300 border border-red-500/60'
              : 'text-stone-400 hover:text-stone-200 bg-white/[0.02] border border-white/5'
          }`}
        >
          <Ban className="w-3.5 h-3.5 text-red-400" />
          <span>Filtro de Exclusiones ({MANDATORY_EXCLUSIONS.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: ADMINISTRACIONES PÚBLICAS                                       */}
      {/* ========================================================================= */}
      {activeSubView === 'publica' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-stone-400 font-semibold">Organismo:</span>
                <select
                  value={publicEntityFilter}
                  onChange={e => setPublicEntityFilter(e.target.value)}
                  className="bg-slate-900 border border-white/20 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="todas">Todos los organismos</option>
                  <option value="ayuntamiento">Ayuntamientos (Illescas, Yuncos, Toledo, Seseña)</option>
                  <option value="diputacion">Diputación Provincial de Toledo</option>
                  <option value="jccm">Junta de Comunidades (JCCM)</option>
                  <option value="universidad">Universidades Públicas (UCLM)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-stone-400 font-semibold">Estado:</span>
                <select
                  value={publicStatusFilter}
                  onChange={e => setPublicStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-white/20 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="todas">Todos los estados</option>
                  <option value="convocatoria_abierta">Convocatorias abiertas</option>
                  <option value="bolsa_vigente">Bolsas vigentes</option>
                  <option value="proxima_convocatoria">Próximas convocatorias</option>
                  <option value="proceso_en_curso">Procesos en curso</option>
                  <option value="convocatoria_cerrada">Convocatorias cerradas</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 text-stone-200 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={onlyMorningPublic}
                onChange={e => setOnlyMorningPublic(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-white/20 cursor-pointer"
              />
              <span>Solo turno de mañana garantizado (08:00 - 15:00)</span>
            </label>
          </div>

          {/* Opportunities Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredPublicList.map((opp, idx) => (
              <div
                key={`pub-${idx}`}
                className="glass-card rounded-2xl border border-white/10 hover:border-violet-500/40 p-6 sm:p-7 shadow-xl space-y-5 transition-all"
              >
                {/* Header row: Entity, status, score */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-cyan-300 font-mono uppercase">{opp.entityName}</span>
                      <span className="text-stone-600">·</span>
                      <span className="text-stone-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-violet-400" />
                        {opp.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white">{opp.roleTitle}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {getPublicStatusBadge(opp.status)}

                    {/* 4-Factor Fit Score Badge */}
                    <div className="px-3.5 py-1.5 rounded-xl bg-violet-950/80 border border-violet-500/50 text-right">
                      <div className="text-[10px] font-mono uppercase text-violet-300 font-bold">Encaje Palmira</div>
                      <div className="text-lg font-black text-cyan-300 font-mono tabular-nums leading-none">
                        {opp.totalFitScore}<span className="text-xs text-stone-400">/100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key metadata grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                  <div>
                    <span className="text-stone-400 block font-medium">Horario verificado:</span>
                    <div className="mt-1">{getScheduleBadge(opp.scheduleType, opp.isScheduleConfirmed, opp.scheduleDetails)}</div>
                    <p className="text-[11px] text-stone-300 mt-1 font-mono">{opp.scheduleDetails}</p>
                  </div>

                  <div>
                    <span className="text-stone-400 block font-medium">Retribución mensual:</span>
                    <div className="flex items-center gap-1.5 font-bold text-white mt-1">
                      <Euro className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{opp.salary}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Retribución pública oficial</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block font-medium">Titulación exigida:</span>
                    <div className="flex items-center gap-1.5 text-stone-200 mt-1">
                      <GraduationCap className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      <span className="line-clamp-2">{opp.qualificationRequired}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-stone-400 block font-medium">Plazo de inscripción:</span>
                    <div className="flex items-center gap-1.5 text-cyan-300 font-bold mt-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{opp.applicationDeadline}</span>
                    </div>
                  </div>
                </div>

                {/* Functions */}
                <div>
                  <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Funciones principales del puesto:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-300">
                    {opp.mainFunctions.map((func, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Score breakdown (The 4 factors) */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-stone-400 font-bold flex items-center justify-between">
                    <span>Desglose del algoritmo de encaje (4 factores oficiales)</span>
                    <span className="text-cyan-300">Fórmula de ponderación</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2 rounded-lg bg-white/[0.02]">
                      <span className="text-stone-400 block text-[10px]">Afinidad funciones (35%)</span>
                      <span className="font-bold text-white font-mono">{opp.scores.adminFit}/100</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.02]">
                      <span className="text-stone-400 block text-[10px]">Horario de mañana (30%)</span>
                      <span className="font-bold text-teal-300 font-mono">{opp.scores.morningFit}/100</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.02]">
                      <span className="text-stone-400 block text-[10px]">Ubicación (20%)</span>
                      <span className="font-bold text-violet-300 font-mono">{opp.scores.locationFit}/100</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.02]">
                      <span className="text-stone-400 block text-[10px]">Requisitos (15%)</span>
                      <span className="font-bold text-cyan-300 font-mono">{opp.scores.requirementsFit}/100</span>
                    </div>
                  </div>
                </div>

                {/* Footer: Source link & Official Reference */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2 text-stone-400">
                    <span className="font-semibold text-stone-300">Fuente oficial verificada:</span>
                    <span className="font-mono text-cyan-300">{opp.officialSourceName}</span>
                  </div>

                  <a
                    href={opp.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-950/70 hover:bg-violet-900 border border-violet-500/50 text-cyan-300 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Ver convocatoria en sede oficial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: EMPRESAS Y PUESTOS ADMINISTRATIVOS                               */}
      {/* ========================================================================= */}
      {activeSubView === 'privada' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por puesto (Facturación, Expedientes, Recepción...)"
                value={privateSearchQuery}
                onChange={e => setPrivateSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 rounded-xl pl-9 pr-3 py-2 text-white placeholder-stone-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>

            <label className="flex items-center gap-2 text-stone-200 font-semibold cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={onlyRecommendedPrivate}
                onChange={e => setOnlyRecommendedPrivate(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-white/20 cursor-pointer"
              />
              <span>Ocultar ofertas penalizadas o con horario sin confirmar</span>
            </label>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredPrivateList.map((opp, idx) => (
              <div
                key={`priv-${idx}`}
                className={`glass-card rounded-2xl border p-6 sm:p-7 shadow-xl space-y-5 transition-all ${
                  opp.isRecommended
                    ? 'border-teal-500/40 ring-1 ring-teal-500/20'
                    : 'border-white/10 opacity-75'
                }`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-white text-sm">{opp.entityName}</span>
                      <span className="text-stone-600">·</span>
                      <span className="text-stone-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-violet-400" />
                        {opp.location} ({opp.distanceKm} km)
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white">{opp.roleTitle}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {opp.isRecommended ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-500/50 text-xs font-bold font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                        <span>RECOMENDADA (TURNO MAÑANA)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/50 text-xs font-bold font-mono">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>NO RECOMENDADA / EN OBSERVACIÓN</span>
                      </span>
                    )}

                    <div className="px-3.5 py-1.5 rounded-xl bg-violet-950/80 border border-violet-500/50 text-right">
                      <div className="text-[10px] font-mono uppercase text-violet-300 font-bold">Puntuación</div>
                      <div className="text-lg font-black text-cyan-300 font-mono tabular-nums leading-none">
                        {opp.totalFitScore}<span className="text-xs text-stone-400">/100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                  <div>
                    <span className="text-stone-400 block font-medium">Horario y jornada:</span>
                    <div className="mt-1">{getScheduleBadge(opp.scheduleType, opp.isScheduleConfirmed, opp.scheduleDetails)}</div>
                    <p className="text-[11px] text-stone-300 mt-1 font-mono">{opp.scheduleDetails}</p>
                  </div>

                  <div>
                    <span className="text-stone-400 block font-medium">Salario publicado:</span>
                    <div className="flex items-center gap-1.5 font-bold text-white mt-1">
                      <Euro className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{opp.salary}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-stone-400 block font-medium">Requisitos formativos:</span>
                    <div className="flex items-center gap-1.5 text-stone-200 mt-1">
                      <GraduationCap className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      <span>{opp.qualificationRequired}</span>
                    </div>
                  </div>
                </div>

                {/* Functions */}
                <div>
                  <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Funciones principales:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-300">
                    {opp.mainFunctions.map((func, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fit justification */}
                <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs">
                  <span className="font-bold text-violet-300 block mb-1">Motivos de encaje con Palmira:</span>
                  <ul className="space-y-1 text-stone-300">
                    {opp.fitReasons.map((reason, rIdx) => (
                      <li key={rIdx}>• {reason}</li>
                    ))}
                  </ul>
                  {opp.notes && (
                    <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-stone-400 font-mono">
                      {opp.notes}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="text-stone-400">
                    <span>Fuente original: </span>
                    <span className="text-stone-200 font-mono">{opp.officialSourceName}</span>
                  </div>

                  <a
                    href={opp.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>Ver publicación original</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 3: ANALIZADOR INTELIGENTE DE ENLACES Y TEXTO                       */}
      {/* ========================================================================= */}
      {activeSubView === 'analizador' && (
        <div className="space-y-8">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Análisis en Tiempo Real de Ofertas Externas</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Analizador de Enlaces, Convocatorias y Boletines Oficiales
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                Pega el enlace de una oferta (BOE, DOCM, BOP Toledo, InfoJobs, LinkedIn, sedes electrónicas) o copia directamente el texto del anuncio. El motor aplicará de inmediato el filtro de exclusiones obligatorias, verificará si el horario es de mañana y calculará la puntuación de 0 a 100 con la fórmula oficial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-2">
                <label className="font-bold text-stone-200 block">Categoría de destino:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInputCategory('administracion_publica')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      inputCategory === 'administracion_publica'
                        ? 'bg-violet-950 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-900 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    Administración Pública
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputCategory('empresa_privada')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      inputCategory === 'empresa_privada'
                        ? 'bg-violet-950 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-900 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    Empresa Privada
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-stone-200 block">Enlace original (URL oficial o portal):</label>
                <input
                  type="text"
                  placeholder="https://docm.castillalamancha.es/portales/empleo/..."
                  value={inputUrl}
                  onChange={e => setInputUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-white/20 rounded-xl px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-stone-200 block">Título del puesto:</label>
                <input
                  type="text"
                  placeholder="Ej: Auxiliar Administrativo de Registro"
                  value={inputRole}
                  onChange={e => setInputRole(e.target.value)}
                  className="w-full bg-slate-900 border border-white/20 rounded-xl px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-stone-200 block">Organismo / Empresa:</label>
                <input
                  type="text"
                  placeholder="Ej: Ayuntamiento de Toledo / Gestoría La Sagra"
                  value={inputEntity}
                  onChange={e => setInputEntity(e.target.value)}
                  className="w-full bg-slate-900 border border-white/20 rounded-xl px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-stone-200 block">Localidad:</label>
                <input
                  type="text"
                  placeholder="Ej: Illescas (Toledo)"
                  value={inputLocation}
                  onChange={e => setInputLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-white/20 rounded-xl px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-stone-200 block">Horario indicado (si aparece):</label>
                <input
                  type="text"
                  placeholder="Ej: 08:00 a 15:00 (Dejar vacío si no se confirma)"
                  value={inputSchedule}
                  onChange={e => setInputSchedule(e.target.value)}
                  className="w-full bg-slate-900 border border-white/20 rounded-xl px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-stone-200 block">
                Texto del anuncio o funciones descritas:
              </label>
              <textarea
                rows={4}
                placeholder="Pega aquí el texto completo del boletín o anuncio de empleo..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 rounded-xl p-3 text-white placeholder-stone-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="text-[11px] text-stone-400">
                El sistema comprobará incompatibilidades con mozo de almacén, operario, turnos rotativos y calculará la compatibilidad matinal.
              </div>

              <button
                type="button"
                onClick={handleAnalyzePosting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/50"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Analizar y Calificar Oferta</span>
              </button>
            </div>
          </div>

          {/* Analysis Result Box */}
          {analyzedResult && (
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-5 animate-fade-in">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    Diagnóstico de Filtrado Inteligente
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    {analyzedResult.roleTitle} — {analyzedResult.entityName}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-cyan-300 font-mono">
                    {analyzedResult.totalFitScore}<span className="text-xs text-stone-400">/100</span>
                  </div>
                  <span className="text-[10px] text-stone-400 uppercase font-mono">Encaje calculado</span>
                </div>
              </div>

              {/* Exclusion Alert if detected */}
              {analyzedResult.isExcluded ? (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-3">
                  <Ban className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5 text-sm">
                      OFERTA EXCLUIDA AUTOMÁTICAMENTE
                    </span>
                    <p>{analyzedResult.exclusionReason}</p>
                    <p className="mt-1 text-stone-400">
                      Esta posición no se guardará ni se recomendará porque vulnera las preferencias estrictas de Palmira Cruz.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Status Banner */}
                  <div className="flex flex-wrap items-center gap-3">
                    {analyzedResult.isRecommended ? (
                      <span className="px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-500/50 text-xs font-bold font-mono flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                        <span>OFERTA RECOMENDADA (TURNO DE MAÑANA VÁLIDO)</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/50 text-xs font-bold font-mono flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>NO RECOMENDADA O EN OBSERVACIÓN</span>
                      </span>
                    )}

                    {getScheduleBadge(analyzedResult.scheduleType, analyzedResult.isScheduleConfirmed, analyzedResult.scheduleDetails)}
                  </div>

                  {/* 4 factors score breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Afinidad funciones (35%)</span>
                      <span className="font-bold text-white font-mono text-sm">{analyzedResult.scores.adminFit}/100</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Horario de mañana (30%)</span>
                      <span className="font-bold text-teal-300 font-mono text-sm">{analyzedResult.scores.morningFit}/100</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Ubicación (20%)</span>
                      <span className="font-bold text-violet-300 font-mono text-sm">{analyzedResult.scores.locationFit}/100</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Requisitos (15%)</span>
                      <span className="font-bold text-cyan-300 font-mono text-sm">{analyzedResult.scores.requirementsFit}/100</span>
                    </div>
                  </div>

                  {/* Justification */}
                  <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/30 text-xs text-stone-200 space-y-1">
                    <span className="font-bold text-cyan-300 block">Evaluación de encaje:</span>
                    <ul className="space-y-1 text-stone-300">
                      {analyzedResult.fitReasons.map((r, i) => (
                        <li key={i}>• {r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Save button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleSaveAnalyzedOpportunity}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <PlusCircle className="w-4 h-4 text-cyan-300" />
                      <span>Guardar en {analyzedResult.sectorType === 'administracion_publica' ? 'Administraciones Públicas' : 'Empresas y Puestos Administrativos'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 4: FILTRO DE EXCLUSIONES ACTIVAS                                    */}
      {/* ========================================================================= */}
      {activeSubView === 'exclusiones' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-red-500/30 shadow-2xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-400">
              <Ban className="w-4 h-4 text-red-400" />
              <span>Reglas de Bloqueo Incondicional</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              Puestos y Sectores Estrictamente Excluidos
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              De acuerdo con las instrucciones de Palmira, el sistema descarta completamente estas categorías de los resultados recomendados. No se limitan a recibir una puntuación baja: quedan <strong>totalmente bloqueados</strong> para evitar saturación de ofertas no deseadas.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-2">
              {MANDATORY_EXCLUSIONS.map((kw, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/20 text-red-300 text-xs font-mono flex items-center gap-2"
                >
                  <Ban className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span className="capitalize">{kw}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audit: Discarded Offers Log */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Registro de Ofertas Descartadas por el Filtro Automático</span>
            </h4>
            <div className="space-y-3">
              {excludedList.map((opp, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-stone-300">{opp.roleTitle}</span>
                    <span className="text-stone-500 block text-[11px]">{opp.entityName} · {opp.location}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-red-950/80 text-red-300 border border-red-500/40 text-[11px] font-mono">
                    {opp.exclusionReason || 'Descartada por función física o industrial'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
