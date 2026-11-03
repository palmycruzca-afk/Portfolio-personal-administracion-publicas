import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  RotateCcw, 
  Briefcase, 
  Building, 
  FileCheck, 
  UserCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Opportunity, OpportunityCategory } from '../../types';
import { OpportunityCard } from './OpportunityCard';

interface OpportunitySearchProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onPrepareProposal: (opp: Opportunity) => void;
}

export const OpportunitySearch: React.FC<OpportunitySearchProps> = ({
  opportunities,
  onSelectOpportunity,
  onPrepareProposal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'todas'>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Geographic zone
  const [geoScope, setGeoScope] = useState<'illescas_toledo_madrid' | 'espana_remoto'>('illescas_toledo_madrid');
  
  // Filter states
  const [sectorFilter, setSectorFilter] = useState('todos');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(100);
  const [continuityFilter, setContinuityFilter] = useState('todos');
  const [accessFilter, setAccessFilter] = useState('todos');
  const [minScore, setMinScore] = useState<number>(0);

  const categories = [
    {
      id: 'todas',
      title: 'Todas las Categorías',
      count: opportunities.length,
      icon: Search,
    },
    {
      id: 'captacion',
      title: 'A. Captación de Clientes',
      subtitle: 'Pymes y logística en Illescas/Madrid',
      count: opportunities.filter(o => o.category === 'captacion').length,
      icon: Building,
    },
    {
      id: 'colaboraciones',
      title: 'B. Colaboraciones',
      subtitle: 'Inmobiliarias, despachos y autónomos',
      count: opportunities.filter(o => o.category === 'colaboraciones').length,
      icon: UserCheck,
    },
    {
      id: 'licitaciones',
      title: 'C. Proyectos y Licitaciones',
      subtitle: 'Contratos públicos y soporte municipal',
      count: opportunities.filter(o => o.category === 'licitaciones').length,
      icon: FileCheck,
    },
    {
      id: 'empleo',
      title: 'D. Empleo Administrativo',
      subtitle: 'Administración pública y empresas (Turno de mañana)',
      count: opportunities.filter(o => o.category === 'empleo').length,
      icon: Briefcase,
    },
  ];

  const handleResetFilters = () => {
    setSelectedCategory('todas');
    setSearchQuery('');
    setGeoScope('illescas_toledo_madrid');
    setSectorFilter('todos');
    setMaxDistanceKm(100);
    setContinuityFilter('todos');
    setAccessFilter('todos');
    setMinScore(0);
  };

  const filteredList = opportunities.filter(opp => {
    if (selectedCategory !== 'todas' && opp.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        opp.company.toLowerCase().includes(q) ||
        opp.title.toLowerCase().includes(q) ||
        opp.sector.toLowerCase().includes(q) ||
        opp.location.toLowerCase().includes(q) ||
        opp.servicesOffered.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (geoScope === 'illescas_toledo_madrid') {
      if (opp.distanceKm > 45) return false;
    }

    if (sectorFilter !== 'todos' && !opp.sector.toLowerCase().includes(sectorFilter.toLowerCase())) {
      return false;
    }

    if (opp.distanceKm > maxDistanceKm) return false;

    if (continuityFilter !== 'todos' && opp.continuityPotential !== continuityFilter) {
      return false;
    }

    if (accessFilter !== 'todos' && opp.difficultyOfAccess !== accessFilter) {
      return false;
    }

    if (opp.opportunityIndex < minScore) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search Header & Category Cards */}
      <div className="space-y-3 pb-4 border-b border-white/10">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Motor de Búsqueda de Oportunidades
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl font-normal">
          Estructurado en cuatro categorías independientes para priorizar la captación de clientes y colaboraciones independientes sobre el empleo tradicional.
        </p>

        {/* 4 Independent Categories with Cyber Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'glass-card border-cyan-400/60 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-violet-400'}`} />
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' : 'bg-white/10 text-stone-300'
                  }`}>
                    {cat.count}
                  </span>
                </div>
                <div className="text-xs font-bold text-white leading-tight line-clamp-1">{cat.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Bar & Geographic Scope */}
      <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 shadow-2xl space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Text Input */}
          <div className="lg:col-span-7 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por empresa, municipio (Illescas, Toledo, Getafe...), servicio o sector..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            />
          </div>

          {/* Geographic Scope Selector */}
          <div className="lg:col-span-5 flex items-center gap-2">
            <span className="text-xs text-stone-400 whitespace-nowrap flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ámbito:</span>
            </span>

            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                type="button"
                onClick={() => setGeoScope('illescas_toledo_madrid')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center ${
                  geoScope === 'illescas_toledo_madrid'
                    ? 'bg-violet-950 text-cyan-300 border border-violet-500/60 shadow-md'
                    : 'bg-white/[0.03] border border-white/10 text-stone-400 hover:text-white'
                }`}
              >
                Illescas, Toledo & Sur Madrid
              </button>

              <button
                type="button"
                onClick={() => setGeoScope('espana_remoto')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center ${
                  geoScope === 'espana_remoto'
                    ? 'bg-violet-950 text-cyan-300 border border-violet-500/60 shadow-md'
                    : 'bg-white/[0.03] border border-white/10 text-stone-400 hover:text-white'
                }`}
              >
                Toda España & Remoto
              </button>
            </div>
          </div>
        </div>

        {/* Filters Matrix */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">
              Sector / Actividad
            </label>
            <select
              value={sectorFilter}
              onChange={e => setSectorFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-stone-200 focus:outline-none"
            >
              <option value="todos">Todos los sectores</option>
              <option value="logistica">Logística y distribución</option>
              <option value="inmobiliario">Inmobiliario</option>
              <option value="educacion">Sector Infantil / Educativo</option>
              <option value="publica">Administración Pública</option>
              <option value="industrial">Comercio Industrial</option>
              <option value="arquitectura">Construcción / Arquitectura</option>
              <option value="asesoria">Servicios Profesionales / Asesoría</option>
              <option value="salud">Salud y Clínicas</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">
              Distancia máxima
            </label>
            <select
              value={maxDistanceKm}
              onChange={e => setMaxDistanceKm(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-stone-200 focus:outline-none"
            >
              <option value={15}>Hasta 15 km (Inmediato)</option>
              <option value={35}>Hasta 35 km (Toledo / Getafe)</option>
              <option value={60}>Hasta 60 km (Madrid Sur)</option>
              <option value={100}>Sin límite (Nacional / Remoto)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">
              Continuidad prevista
            </label>
            <select
              value={continuityFilter}
              onChange={e => setContinuityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-stone-200 focus:outline-none"
            >
              <option value="todos">Cualquier continuidad</option>
              <option value="Largo plazo recurrente">Largo plazo recurrente</option>
              <option value="Puntual con recurrencia">Puntual con recurrencia</option>
              <option value="Proyecto acotado">Proyecto acotado</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">
              Acceso al decisor
            </label>
            <select
              value={accessFilter}
              onChange={e => setAccessFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-stone-200 focus:outline-none"
            >
              <option value="todos">Cualquier vía de acceso</option>
              <option value="Directo con decisor">Directo con decisor</option>
              <option value="Referencia / Red">Referencia / Red</option>
              <option value="Concurso público">Concurso público</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full py-2 px-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-stone-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
              <span>Limpiar filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-400 px-1">
        <div>
          Mostrando <strong className="text-white font-mono">{filteredList.length}</strong> oportunidades detectadas
        </div>
        <div className="text-[11px] text-stone-400 font-mono">
          Ubicación base: Illescas (Toledo) · Radio: {maxDistanceKm === 100 ? 'Sin límite' : `${maxDistanceKm} km`}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredList.length === 0 ? (
        <div className="p-16 text-center glass-card rounded-2xl border border-white/10 space-y-3">
          <Building className="w-9 h-9 text-stone-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No se encontraron resultados</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Prueba a ampliar la distancia máxima o seleccionar "Todas las Categorías".
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-violet-600 hover:bg-violet-500 text-white cursor-pointer uppercase tracking-wider"
          >
            Restablecer todos los filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredList.map(opp => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onSelect={onSelectOpportunity}
              onPrepareProposal={onPrepareProposal}
            />
          ))}
        </div>
      )}
    </div>
  );
};
