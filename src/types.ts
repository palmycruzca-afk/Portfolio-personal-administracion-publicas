
export type OpportunityCategory = 
  | 'captacion'         // A. Captación de clientes (B2B Retainers)
  | 'colaboraciones'     // B. Colaboraciones (Inmobiliaria / Despachos / ERIA HOUSE)
  | 'licitaciones'       // C. Proyectos y licitaciones de servicios
  | 'empleo';            // D. Módulo de Empleo Administrativo

export type VerificationStatus = 
  | 'verificada'   // Oportunidad real verificada
  | 'potencial'    // Empresa potencial que podría encajar
  | 'hipotesis'    // Hipótesis comercial
  | 'demo';         // Dato de demostración

export type CrmStatus = 
  | 'detectada'
  | 'pendiente_analizar'
  | 'seleccionada'
  | 'propuesta_preparada'
  | 'contacto_realizado'
  | 'en_negociacion'
  | 'cliente_conseguido'
  | 'descartada';

export interface ScoreFactors {
  fit: number;             // 25% Encaje profesional (0-100)
  profitability: number;   // 25% Rentabilidad potencial (0-100)
  easeOfAccess: number;    // 20% Facilidad estimada de acceso y contratación (0-100)
  costsTime: number;       // 15% Costes y tiempo necesario (0-100)
  locationScore: number;   // 10% Ubicación geográfica (0-100)
  continuity: number;      // 5% Posibilidad de continuidad (0-100)
}

export interface CrmNote {
  id: string;
  date: string;
  author: string;
  text: string;
}

// -------------------------------------------------------------
// Tipos específicos para el Módulo de Empleo Administrativo
// -------------------------------------------------------------
export type EmploymentSectorType = 'administracion_publica' | 'empresa_privada';

export type PublicAdministrationType = 
  | 'ayuntamiento'
  | 'diputacion'
  | 'jccm'
  | 'age'
  | 'organismo_publico'
  | 'universidad';

export type PublicCallStatus = 
  | 'convocatoria_abierta'
  | 'bolsa_vigente'
  | 'proxima_convocatoria'
  | 'proceso_en_curso'
  | 'convocatoria_cerrada';

export type ScheduleCompatibility = 
  | 'intensiva_manana'     // Jornada intensiva de mañana (08:00 - 15:00)
  | 'horario_manana'       // Horario de mañana completo
  | 'parcial_manana'       // Jornada parcial de mañana (ej. 09:00 - 14:00)
  | 'flexible_manana'      // Horario flexible compatible con mañanas
  | 'sin_confirmar'        // Horario sin confirmar (no publicado)
  | 'partida'              // Jornada partida (mañana y tarde) - penalizada
  | 'tarde'                // Turno de tarde - descartada
  | 'rotativo'             // Turnos rotativos - descartada
  | 'noche';               // Turno de noche - descartada

export interface EmploymentScoreFactors {
  adminFit: number;        // 35% Afinidad con funciones administrativas
  morningFit: number;      // 30% Compatibilidad con horario de mañana
  locationFit: number;     // 20% Ubicación y desplazamiento
  requirementsFit: number; // 15% Compatibilidad con requisitos y formación
}

export interface AdministrativeEmploymentData {
  sectorType: EmploymentSectorType;
  subType?: PublicAdministrationType;
  roleTitle: string;
  entityName: string;
  location: string;
  distanceKm?: number;
  scheduleType: ScheduleCompatibility;
  scheduleDetails: string;
  isScheduleConfirmed: boolean;
  workdayType: 'Jornada intensiva de mañana' | 'Jornada completa de mañana' | 'Jornada parcial de mañana' | 'Horario flexible' | 'Jornada partida' | 'Turnos rotativos' | 'Horario sin confirmar';
  salary: string;
  qualificationRequired: string;
  mainFunctions: string[];
  publicationDate: string;
  applicationDeadline: string;
  status: PublicCallStatus | 'oferta_activa' | 'proceso_seleccion' | 'oferta_cerrada';
  officialSourceUrl: string;
  officialSourceName: string;
  scores: EmploymentScoreFactors;
  totalFitScore: number; // 0 - 100 calculado con los 4 factores
  fitReasons: string[];
  isRecommended: boolean; // false si el turno no es de mañana o si el score es bajo
  isExcluded?: boolean;
  exclusionReason?: string;
  notes?: string;
}

export interface Opportunity {
  id: string;
  isTop10: boolean;
  company: string;
  title: string;
  sector: string;
  category: OpportunityCategory;
  location: string;
  distanceKm: number;
  verificationStatus: VerificationStatus;
  opportunityIndex: number; // 0 - 100 calculated by weighting
  scores: ScoreFactors;
  justification: string;
  source: string;
  sourceDate: string;
  description: string;
  businessActivity: string;
  identifiedNeed: string;
  servicesOffered: string[];
  fitReasons: string[];
  advantages: string[];
  risks: string[];
  pendingInfo: string[];
  nextSteps: string[];
  crmStatus: CrmStatus;
  notes: CrmNote[];
  estimatedValue: string;
  timeRequired: string;
  continuityPotential: 'Largo plazo recurrente' | 'Puntual con recurrencia' | 'Proyecto acotado';
  difficultyOfAccess: 'Directo con decisor' | 'Referencia / Red' | 'Concurso público' | 'Intermediario';
  contactPerson?: {
    name: string;
    role: string;
    channel: string;
  };
  proposalDraft?: string;
  // Specific fields for Category D (Empleo administrativo)
  employmentDetails?: {
    salaryYearlyGross: number;
    salaryMonthlyNet: number;
    schedule: string;
    commuteTimeMin: number;
    remotePercent: number;
    stabilityRating: string;
    flexibilityRating: string;
    contractConditions: string;
    opportunityCostVsFreelance: string;
    meetsPalmiraCriteria: boolean;
  };
  adminEmployment?: AdministrativeEmploymentData;
}

export type ActiveAppView = 'public' | 'ai';
export type AiTab = 'dashboard' | 'search' | 'top10' | 'crm' | 'empleo';
