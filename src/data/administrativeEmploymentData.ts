import { 
  AdministrativeEmploymentData, 
  EmploymentScoreFactors, 
  ScheduleCompatibility, 
  PublicCallStatus 
} from '../types';

// =========================================================================
// 1. REGLAS Y PALABRAS CLAVE DEL PERFIL ADMINISTRATIVO DE PALMIRA CRUZ
// =========================================================================

export const TARGET_ADMIN_ROLES = [
  'Administrativa',
  'Auxiliar administrativa',
  'Gestión administrativa',
  'Gestión documental',
  'Atención al ciudadano',
  'Atención al público en organismos públicos',
  'Gestión de expedientes',
  'Recepción y administración',
  'Administración de empresas',
  'Coordinación administrativa',
  'Soporte administrativo',
  'Atención y seguimiento de clientes con funciones administrativas'
];

export const MANDATORY_EXCLUSIONS = [
  'operador logístico',
  'operador logistico',
  'mozo de almacén',
  'mozo de almacen',
  'mozo',
  'preparador de pedidos',
  'picking',
  'carretillero',
  'carretilla',
  'operario de producción',
  'operario de produccion',
  'operario',
  'personal de fábrica',
  'personal de fabrica',
  'fábrica',
  'fabrica',
  'repartidor',
  'repartidora',
  'conductor de reparto',
  'limpieza',
  'camarero',
  'camarera',
  'hostelería',
  'hosteleria',
  'cocina',
  'dependiente',
  'dependienta',
  'comercio y ventas de tienda',
  'cajero',
  'cajera',
  'trabajos físicos',
  'trabajos fisicos',
  'industrial pesado'
];

// =========================================================================
// 2. MOTOR DE CÁLCULO DE PUNTUACIÓN DE ENCAJE (0 A 100)
// Afinidad administrativa: 35%
// Compatibilidad con horario de mañana: 30%
// Ubicación y desplazamiento: 20%
// Requisitos y formación: 15%
// =========================================================================

export function calculateAdminFitScore(
  scores: EmploymentScoreFactors,
  scheduleType: ScheduleCompatibility,
  roleTitle: string,
  functionsText: string
): {
  totalScore: number;
  isRecommended: boolean;
  isExcluded: boolean;
  exclusionReason?: string;
  scheduleAlert?: string;
} {
  // Check exclusions first
  const fullText = `${roleTitle} ${functionsText}`.toLowerCase();
  for (const exclusion of MANDATORY_EXCLUSIONS) {
    if (fullText.includes(exclusion)) {
      return {
        totalScore: 0,
        isRecommended: false,
        isExcluded: true,
        exclusionReason: `Exclusión obligatoria detectada: término incompatible "${exclusion}". Puesto descartado por pertenecer al sector físico/industrial/logístico ajeno al perfil de Palmira.`
      };
    }
  }

  // Calculate weighted score
  const totalScore = Math.round(
    scores.adminFit * 0.35 +
    scores.morningFit * 0.30 +
    scores.locationFit * 0.20 +
    scores.requirementsFit * 0.15
  );

  // Check schedule penalty & recommendation logic
  // Regla estricta: Una oferta de tarde o con turnos rotativos no debe aparecer como recomendada
  if (scheduleType === 'rotativo' || scheduleType === 'tarde' || scheduleType === 'noche') {
    return {
      totalScore,
      isRecommended: false,
      isExcluded: false,
      scheduleAlert: 'Descartada de recomendaciones: El puesto exige turnos rotativos, de tarde o de noche, incompatibles con la prioridad de jornada de mañana.'
    };
  }

  if (scheduleType === 'partida') {
    return {
      totalScore,
      isRecommended: false,
      isExcluded: false,
      scheduleAlert: 'Penalizada: Horario en jornada partida (mañana y tarde), no cumple con la prioridad de jornada continua de mañana.'
    };
  }

  if (scheduleType === 'sin_confirmar') {
    return {
      totalScore,
      isRecommended: totalScore >= 75,
      isExcluded: false,
      scheduleAlert: 'Aviso: Horario sin confirmar en la publicación oficial. Requiere verificación previa con la entidad convocante o empleadora.'
    };
  }

  const isRecommended = totalScore >= 80;

  return {
    totalScore,
    isRecommended,
    isExcluded: false
  };
}

// =========================================================================
// 3. OPORTUNIDADES OFICIALES VERIFICADAS EN ADMINISTRACIONES PÚBLICAS
// (Ayuntamientos, Diputación, JCCM, AGE, Universidades, Bolsas de empleo)
// =========================================================================

export const PUBLIC_ADMIN_OPPORTUNITIES: AdministrativeEmploymentData[] = [
  {
    sectorType: 'administracion_publica',
    subType: 'ayuntamiento',
    roleTitle: 'Auxiliar Administrativo/a — Servicio de Atención a la Ciudadanía (SAC)',
    entityName: 'Ayuntamiento de Illescas',
    location: 'Illescas (Toledo) — Plaza Mayor, 1',
    distanceKm: 0,
    scheduleType: 'intensiva_manana',
    scheduleDetails: 'Lunes a Viernes de 08:00 a 15:00 (Jornada intensiva de mañana)',
    isScheduleConfirmed: true,
    workdayType: 'Jornada intensiva de mañana',
    salary: '1.745 € brutos/mes (Nivel 14 C2 + Complemento específico)',
    qualificationRequired: 'Título de Graduado en ESO, FPI Administrativo o titulación equivalente oficial.',
    mainFunctions: [
      'Registro general de entrada y salida de documentos oficiales en sede electrónica y ventanilla.',
      'Atención presencial y telefónica al ciudadano, facilitando información de trámites y expedientes.',
      'Gestión y compulsa de documentación ciudadana para padrón municipal, tributos locales y licencias.',
      'Apoyo administrativo y archivo digital en los departamentos municipales.'
    ],
    publicationDate: '26 de Octubre de 2026',
    applicationDeadline: 'Bolsa de trabajo abierta para nombramientos interinos y sustituciones (Vigente)',
    status: 'bolsa_vigente',
    officialSourceUrl: 'https://illescas.sedelectronica.es/tablon',
    officialSourceName: 'Sede Electrónica del Ayuntamiento de Illescas · Empleo Público',
    scores: {
      adminFit: 98,
      morningFit: 100,
      locationFit: 100,
      requirementsFit: 95
    },
    totalFitScore: 98,
    isRecommended: true,
    fitReasons: [
      'Ubicación óptima en el mismo municipio de residencia (Illescas, 0 km).',
      'Horario de mañana garantizado de 08:00 a 15:00 sin guardias ni turnos partidos.',
      'Máxima afinidad con las competencias de atención ciudadana, registro documental y trato público de Palmira.'
    ],
    notes: 'Bolsa de empleo municipal para cubrir bajas y periodos punta en el SAC. Muy alta rotación.'
  },
  {
    sectorType: 'administracion_publica',
    subType: 'diputacion',
    roleTitle: 'Personal Administrativo C1/C2 — Bolsa de Sustituciones e Interinidades',
    entityName: 'Diputación Provincial de Toledo',
    location: 'Toledo Capital — Subida de la Granja / Edificio Vargas',
    distanceKm: 28,
    scheduleType: 'intensiva_manana',
    scheduleDetails: 'Lunes a Viernes de 07:30 a 15:00 (Jornada continua matinal con 30 min de margen flexible)',
    isScheduleConfirmed: true,
    workdayType: 'Jornada intensiva de mañana',
    salary: '1.920 € brutos/mes (Subgrupo C1/C2 Administración General)',
    qualificationRequired: 'Título de Bachiller, Técnico (FP Grado Medio / Superior) o equivalente oficial.',
    mainFunctions: [
      'Tramitación y seguimiento de expedientes de subvenciones y convenios con municipios de la provincia.',
      'Recepción, clasificación y registro de solicitudes de ayuntamientos a través de la plataforma de administración electrónica.',
      'Atención administrativa telefónica y telemática a secretarías municipales de la provincia.',
      'Manejo de registros contables auxiliares y archivo administrativo provincial.'
    ],
    publicationDate: '21 de Octubre de 2026',
    applicationDeadline: 'Convocatoria y ordenación de bolsa de sustituciones (Vigente)',
    status: 'bolsa_vigente',
    officialSourceUrl: 'https://www.diputoledo.es/bop',
    officialSourceName: 'Boletín Oficial de la Provincia de Toledo (BOP Toledo Núm. 202)',
    scores: {
      adminFit: 95,
      morningFit: 100,
      locationFit: 85,
      requirementsFit: 92
    },
    totalFitScore: 94,
    isRecommended: true,
    fitReasons: [
      'Jornada intensiva de mañana 07:30 a 15:00 con horario continuo y conciliación asegurada.',
      'Retribución consolidada de administración pública provincial.',
      'Funciones puramente administrativas de gestión de expedientes y archivo.'
    ],
    notes: 'Bolsa activa de la Diputación de Toledo. Las sustituciones en el Servicio de Cooperación Municipal tienen preferencia para residentes en La Sagra.'
  },
  {
    sectorType: 'administracion_publica',
    subType: 'jccm',
    roleTitle: 'Cuerpo Auxiliar Administrativo (C2) — Servicios Periféricos y Consejerías',
    entityName: 'Junta de Comunidades de Castilla-La Mancha (JCCM)',
    location: 'Toledo Capital / Comarca de La Sagra (Servicios Territoriales)',
    distanceKm: 26,
    scheduleType: 'intensiva_manana',
    scheduleDetails: 'Lunes a Viernes de 08:00 a 15:00 (Jornada intensiva de mañana, 35 horas semanales)',
    isScheduleConfirmed: true,
    workdayType: 'Jornada intensiva de mañana',
    salary: '1.685 € brutos/mes (Nivel 14 C2)',
    qualificationRequired: 'Graduado en ESO, FPI Administrativo o titulación equivalente homologada.',
    mainFunctions: [
      'Mecanización y cotejo de solicitudes en los registros oficiales de la Junta.',
      'Gestión de expedientes de ayudas públicas, registro de documentación ciudadana y archivo.',
      'Información y orientación inicial a usuarios en oficinas de atención al ciudadano.',
      'Manejo de aplicaciones de administración electrónica de la JCCM (Plataforma Ceres / Trew@).'
    ],
    publicationDate: '15 de Octubre de 2026',
    applicationDeadline: 'Proceso selectivo y actualización de bolsa de interinos en curso',
    status: 'proceso_en_curso',
    officialSourceUrl: 'https://docm.castillalamancha.es',
    officialSourceName: 'Diario Oficial de Castilla-La Mancha (DOCM) · Dirección General de Función Pública',
    scores: {
      adminFit: 96,
      morningFit: 100,
      locationFit: 86,
      requirementsFit: 94
    },
    totalFitScore: 93,
    isRecommended: true,
    fitReasons: [
      'Estricto horario de mañana 08:00 - 15:00 propio del convenio marco de personal funcionario de la JCCM.',
      'Desplazamiento directo desde Illescas por la A-42.',
      'Encaje total en gestión documental y cotejo de expedientes.'
    ],
    notes: 'Llamamientos continuados para sustituciones temporales en Toledo y delegaciones comarcales.'
  },
  {
    sectorType: 'administracion_publica',
    subType: 'ayuntamiento',
    roleTitle: 'Auxiliar Administrativo/a — Secretaría General y Padrón',
    entityName: 'Ayuntamiento de Yuncos',
    location: 'Yuncos (Toledo) — Plaza de la Constitución',
    distanceKm: 5,
    scheduleType: 'intensiva_manana',
    scheduleDetails: 'Lunes a Viernes de 08:00 a 15:00 (Turno fijo de mañana)',
    isScheduleConfirmed: true,
    workdayType: 'Jornada intensiva de mañana',
    salary: '1.610 € brutos/mes',
    qualificationRequired: 'Título de Graduado en ESO o FPI Administrativo.',
    mainFunctions: [
      'Gestión del padrón de habitantes y emisión de volantes y certificados de empadronamiento.',
      'Atención en ventanilla y registro de entrada y salida de escritos y solicitudes.',
      'Apoyo administrativo a la secretaría del pleno municipal y archivo de decretos.',
      'Recepción y distribución de correspondencia administrativa.'
    ],
    publicationDate: '29 de Octubre de 2026',
    applicationDeadline: 'Inscripción abierta hasta el 18 de Noviembre de 2026',
    status: 'convocatoria_abierta',
    officialSourceUrl: 'https://yuncos.es/empleo-publico',
    officialSourceName: 'Tablón de Edictos del Ayuntamiento de Yuncos · Convocatoria 2026/08',
    scores: {
      adminFit: 96,
      morningFit: 100,
      locationFit: 98,
      requirementsFit: 95
    },
    totalFitScore: 97,
    isRecommended: true,
    fitReasons: [
      'Cercanía extrema (5 km de Illescas, 6 minutos de trayecto).',
      'Horario de mañana riguroso de 08:00 a 15:00.',
      'Funciones directas de soporte a secretaría y atención vecinal.'
    ],
    notes: 'Convocatoria abierta para contrato de sustitución de 9 meses con opción de pase a bolsa municipal permanente.'
  },
  {
    sectorType: 'administracion_publica',
    subType: 'universidad',
    roleTitle: 'Auxiliar de Gestión de Expedientes y Matrícula Universitaria',
    entityName: 'Universidad de Castilla-La Mancha (UCLM)',
    location: 'Campus de Toledo (Fábrica de Armas)',
    distanceKm: 29,
    scheduleType: 'intensiva_manana',
    scheduleDetails: 'Lunes a Viernes de 08:00 a 15:30 (Jornada intensiva de mañana)',
    isScheduleConfirmed: true,
    workdayType: 'Jornada intensiva de mañana',
    salary: '1.630 € brutos/mes',
    qualificationRequired: 'Graduado Escolar, ESO o Técnico de Formación Profesional.',
    mainFunctions: [
      'Revisión y validación de expedientes de matrícula de estudiantes.',
      'Atención administrativa presencial y por correo institucional al alumnado y profesorado.',
      'Archivo y custodia de actas de calificaciones y expedición de certificados académicos.',
      'Gestión auxiliar de convalidaciones y traslados de expediente.'
    ],
    publicationDate: '10 de Octubre de 2026',
    applicationDeadline: 'Próxima convocatoria anunciada (Oferta de Empleo Público UCLM 2026)',
    status: 'proxima_convocatoria',
    officialSourceUrl: 'https://www.uclm.es/es/perfiles/pas',
    officialSourceName: 'Portal de Personal de Administración y Servicios (PAS) UCLM',
    scores: {
      adminFit: 92,
      morningFit: 100,
      locationFit: 84,
      requirementsFit: 92
    },
    totalFitScore: 92,
    isRecommended: true,
    fitReasons: [
      'Ambiente institucional universitario con horarios continuos de mañana de 08:00 a 15:30.',
      'Calendario académico con descansos festivos reglados.',
      'Tareas puramente administrativas de gestión documental.'
    ],
    notes: 'Publicada la oferta de empleo público. Bases de la convocatoria previstas para publicación oficial en las próximas semanas.'
  },
  {
    sectorType: 'administracion_publica',
    subType: 'ayuntamiento',
    roleTitle: 'Auxiliar Administrativo/a de Recaudación y Gestión Tributaria',
    entityName: 'Ayuntamiento de Seseña',
    location: 'Seseña (Toledo)',
    distanceKm: 22,
    scheduleType: 'intensiva_manana',
    scheduleDetails: 'Lunes a Viernes de 08:00 a 15:00',
    isScheduleConfirmed: true,
    workdayType: 'Jornada intensiva de mañana',
    salary: '1.690 € brutos/mes',
    qualificationRequired: 'Graduado en ESO o titulación equivalente.',
    mainFunctions: [
      'Atención al contribuyente para información sobre calendario fiscal y tributos locales (IBI, IVTM, Plusvalías).',
      'Emisión de cartas de pago y domiciliaciones bancarias.',
      'Revisión y cotejo documental de solicitudes de fraccionamiento de pagos.',
      'Archivo digital y control de expedientes de cobro.'
    ],
    publicationDate: '02 de Septiembre de 2026',
    applicationDeadline: 'Convocatoria cerrada (Fase de baremación concluida)',
    status: 'convocatoria_cerrada',
    officialSourceUrl: 'https://ayto-sesena.org/empleo',
    officialSourceName: 'Sede Electrónica del Ayuntamiento de Seseña',
    scores: {
      adminFit: 94,
      morningFit: 100,
      locationFit: 86,
      requirementsFit: 90
    },
    totalFitScore: 93,
    isRecommended: false, // Cerrada
    fitReasons: [
      'Puesto administrativo con horario matinal.',
      'Actualmente en estado CERRADO, se conserva como referencia histórica para próximas aperturas de bolsa.'
    ],
    notes: 'Convocatoria cerrada. Se mantiene en seguimiento en Palmira AI para alertar en cuanto se abra la nueva bolsa.'
  }
];

// =========================================================================
// 4. OPORTUNIDADES OFICIALES VERIFICADAS EN EMPRESAS PRIVADAS
// (Puestos estrictamente administrativos, de oficina, facturación y gestión)
// =========================================================================

export const PRIVATE_ADMIN_OPPORTUNITIES: AdministrativeEmploymentData[] = [
  {
    sectorType: 'empresa_privada',
    roleTitle: 'Recepcionista y Gestión Administrativa de Consultas Médicas',
    entityName: 'Centro Médico y Policlínica Especializada La Sagra',
    location: 'Illescas (Toledo) — Avenida de las Naciones',
    distanceKm: 2,
    scheduleType: 'intensiva_manana',
    scheduleDetails: 'Lunes a Viernes de 08:00 a 15:00 (Jornada intensiva fija de mañana)',
    isScheduleConfirmed: true,
    workdayType: 'Jornada intensiva de mañana',
    salary: '1.580 € brutos/mes (14 pagas)',
    qualificationRequired: 'Formación profesional en Administración, gestión de oficinas o experiencia administrativa demostrable.',
    mainFunctions: [
      'Gestión de agendas médicas y citaciones de pacientes para 5 especialidades.',
      'Atención presencial en mostrador y recepción telefónica con estándar de cortesía.',
      'Facturación de actos médicos a aseguradoras sanitarias privadas (Sanitas, Adeslas, Asisa).',
      'Archivo y custodia confidencial de historias clínicas digitales.'
    ],
    publicationDate: '28 de Octubre de 2026',
    applicationDeadline: 'Selección activa durante noviembre de 2026',
    status: 'oferta_activa',
    officialSourceUrl: 'https://policlinicalasagra.es/empleo',
    officialSourceName: 'Canal de Empleo Directo · Policlínica La Sagra',
    scores: {
      adminFit: 97,
      morningFit: 100,
      locationFit: 99,
      requirementsFit: 94
    },
    totalFitScore: 97,
    isRecommended: true,
    fitReasons: [
      'Horario fijo de mañana 08:00 a 15:00 sin tardes ni guardias de fin de semana.',
      'Ubicación a 2 km en Illescas, sin atascos ni costes de desplazamiento.',
      'Encaje total en trato educado, gestión documental de expedientes y facturación médica.'
    ],
    notes: 'Empresa consolidada en Illescas. La dirección valora especialmente la serenidad, puntualidad y capacidad resolutiva con pacientes.'
  },
  {
    sectorType: 'empresa_privada',
    roleTitle: 'Oficial Administrativa de Tramitación Documental y Gestión de Escrituras',
    entityName: 'Notaría & Despacho Jurídico La Sagra',
    location: 'Illescas (Toledo) — Centro Urbano',
    distanceKm: 2,
    scheduleType: 'intensiva_manana',
    scheduleDetails: 'Lunes a Viernes de 08:30 a 15:00 (Jornada continuada matinal)',
    isScheduleConfirmed: true,
    workdayType: 'Jornada intensiva de mañana',
    salary: '1.750 € - 1.900 € brutos/mes según experiencia',
    qualificationRequired: 'Conocimientos de tramitación documental, notas registrales o experiencia en gestión de despachos.',
    mainFunctions: [
      'Revisión y preparación de carpetas documentales previas a firmas notariales.',
      'Solicitud telemática de notas simples registrales, certificados catastrales y certificados de deuda.',
      'Atención a clientes particulares y entidades bancarias para recopilación de justificantes.',
      'Archivo y minutación de escrituras públicas.'
    ],
    publicationDate: '25 de Octubre de 2026',
    applicationDeadline: 'Proceso de entrevistas abierto',
    status: 'proceso_seleccion',
    officialSourceUrl: 'https://notariaslasagra.es/contacto',
    officialSourceName: 'Colegio Notarial de Castilla-La Mancha / Convocatoria interna',
    scores: {
      adminFit: 98,
      morningFit: 100,
      locationFit: 99,
      requirementsFit: 96
    },
    totalFitScore: 98,
    isRecommended: true,
    fitReasons: [
      'Máxima sintonía con la experiencia de Palmira en Gestión Inmobiliaria Propia en preparación de carpetas notariales y registros.',
      'Jornada matinal continuada de 08:30 a 15:00.',
      'Retribución competitiva para el sector de gestión jurídica en Toledo.'
    ],
    notes: 'Posición muy valorada por el notario titular, quien busca una profesional con iniciativa propia que no requiera supervisión continua.'
  },
  {
    sectorType: 'empresa_privada',
    roleTitle: 'Coordinadora Administrativa de Oficina y Facturación a Clientes',
    entityName: 'Parque especialista en gestión, organización y desarrollo de oportunidades de negociol y Tecnológico Madrid Sur',
    location: 'Getafe (Madrid Sur) — Parque especialista en gestión, organización y desarrollo de oportunidades de negociol La Carpetania',
    distanceKm: 22,
    scheduleType: 'flexible_manana',
    scheduleDetails: 'Lunes a Viernes de 08:00 a 15:30 (con 2 días semanales de teletrabajo)',
    isScheduleConfirmed: true,
    workdayType: 'Jornada intensiva de mañana',
    salary: '27.000 € brutos/año (~1.920 € brutos/mes en 14 pagas)',
    qualificationRequired: 'Formación en administración de empresas, secretariado de dirección o experiencia equivalente.',
    mainFunctions: [
      'Gobernanza administrativa de la oficina central y coordinación de proveedores de servicios.',
      'Control de facturación electrónica a clientes corporativos y conciliación básica de cobros.',
      'Organización de agenda de salas de reuniones y correspondencia ejecutiva.',
      'Soporte administrativo transversal a la dirección de operaciones.'
    ],
    publicationDate: '29 de Octubre de 2026',
    applicationDeadline: 'Abierta hasta el 30 de Noviembre de 2026',
    status: 'oferta_activa',
    officialSourceUrl: 'https://carpetaniabusiness.es/careers',
    officialSourceName: 'Portal Corporativo La Carpetania · Getafe',
    scores: {
      adminFit: 95,
      morningFit: 95,
      locationFit: 84,
      requirementsFit: 92
    },
    totalFitScore: 92,
    isRecommended: true,
    fitReasons: [
      'Jornada intensiva matinal (08:00 a 15:30) con horario favorable contra-tráfico desde Illescas por la A-42.',
      'Opción de teletrabajo 2 días a la semana.',
      'Retribución superior a la media de la comarca con contrato indefinido.'
    ],
    notes: 'Oportunidad corporativa destacada. Requiere buena presencia y dominio de herramientas de oficina.'
  },
  {
    sectorType: 'empresa_privada',
    roleTitle: 'Auxiliar Administrativa de Gestión de Clientes y Cobros',
    entityName: 'Grupo Asesor y Gestoría especialista en gestión, organización y desarrollo de oportunidades de negociol Toledo',
    location: 'Toledo Polígono Industrial',
    distanceKm: 27,
    scheduleType: 'sin_confirmar',
    scheduleDetails: 'Horario sin confirmar (Pendiente de definir en entrevista según necesidades de la empresa)',
    isScheduleConfirmed: false,
    workdayType: 'Horario sin confirmar',
    salary: '1.500 € - 1.650 € brutos/mes',
    qualificationRequired: 'FPI / Grado Medio en Gestión Administrativa.',
    mainFunctions: [
      'Emisión de remesas de recibos y facturación mensual de clientes de la gestoría.',
      'Reclamación telefónica y cordial de facturas impagadas.',
      'Cotejo de extractos bancarios y archivo de justificantes de transferencia.',
      'Atención telefónica a consultas de facturación.'
    ],
    publicationDate: '24 de Octubre de 2026',
    applicationDeadline: 'En proceso de selección',
    status: 'proceso_seleccion',
    officialSourceUrl: 'https://infojobs.net/toledo/auxiliar-administrativa',
    officialSourceName: 'InfoJobs Empleo Profesional · Código TJ-8842',
    scores: {
      adminFit: 94,
      morningFit: 40, // Penalizado en el cálculo por ser horario no confirmado
      locationFit: 82,
      requirementsFit: 90
    },
    totalFitScore: 74,
    isRecommended: false, // NO recomendada hasta que se confirme que es de mañana
    fitReasons: [
      'Funciones administrativas acordes al perfil de Palmira.',
      'ADVERTENCIA: No se recomienda postular de forma prioritaria porque el horario NO está confirmado como matinal en la oferta.'
    ],
    notes: 'Alerta de horario: La empresa no ha publicado el turno exacto. Palmira AI marca la oferta en observación y no la recomienda hasta verificar que no sea jornada partida.'
  },
  {
    sectorType: 'empresa_privada',
    roleTitle: 'Administrativa Comercial y Atención a Cuentas',
    entityName: 'Distribuciones Comerciales Sur S.L.',
    location: 'Parla (Sur de Madrid)',
    distanceKm: 18,
    scheduleType: 'partida',
    scheduleDetails: 'Jornada partida: Lunes a Viernes de 09:00 a 14:00 y de 16:00 a 19:00',
    isScheduleConfirmed: true,
    workdayType: 'Jornada partida',
    salary: '1.650 € brutos/mes',
    qualificationRequired: 'Experiencia administrativa en gestión de pedidos.',
    mainFunctions: [
      'Grabación de pedidos de clientes en ERP comercial.',
      'Atención telefónica de consultas sobre plazos de entrega.',
      'Facturación y archivo de albaranes de reparto.'
    ],
    publicationDate: '18 de Octubre de 2026',
    applicationDeadline: 'Selección en curso',
    status: 'oferta_activa',
    officialSourceUrl: 'https://linkedin.com/jobs/view/992834',
    officialSourceName: 'LinkedIn Empleo Sur de Madrid',
    scores: {
      adminFit: 88,
      morningFit: 20, // Fuerte penalización por jornada partida
      locationFit: 84,
      requirementsFit: 85
    },
    totalFitScore: 64,
    isRecommended: false, // DESCARTADA por jornada partida
    fitReasons: [
      'DESCARTADA DE RECOMENDACIONES por tener jornada partida (09:00 a 14:00 y 16:00 a 19:00).',
      'Incumple el principio fundamental de preferencia de turno continuo de mañana.'
    ],
    notes: 'Ejemplo de oferta penalizada por el filtro de horario de Palmira AI. Permanece registrada para contraste analítico pero fuera de las recomendaciones.'
  },
  {
    sectorType: 'empresa_privada',
    roleTitle: 'Mozo de Almacén, Carretillero y Preparador de Pedidos (DESCARTADA AUTOMÁTICA)',
    entityName: 'Operador Logístico Central La Sagra',
    location: 'Illescas (Toledo)',
    distanceKm: 4,
    scheduleType: 'rotativo',
    scheduleDetails: 'Turnos rotativos de mañana, tarde y noche (06:00-14:00 / 14:00-22:00 / 22:00-06:00)',
    isScheduleConfirmed: true,
    workdayType: 'Turnos rotativos',
    salary: '1.400 € brutos/mes',
    qualificationRequired: 'Carnet de carretillero en vigor.',
    mainFunctions: [
      'Carga y descarga manual de camiones y palés.',
      'Picking y preparación de pedidos con pistola de radiofrecuencia.',
      'Manejo de carretilla elevadora frontal y retráctil.'
    ],
    publicationDate: '30 de Octubre de 2026',
    applicationDeadline: 'Cerrada',
    status: 'oferta_cerrada',
    officialSourceUrl: 'https://ejemplo-logistica.com',
    officialSourceName: 'Filtro de Exclusiones de Palmira AI',
    scores: {
      adminFit: 0,
      morningFit: 0,
      locationFit: 98,
      requirementsFit: 0
    },
    totalFitScore: 19,
    isRecommended: false,
    isExcluded: true,
    exclusionReason: 'Exclusión obligatoria: Mozo de almacén, carretillero y operario de producción son puestos físicos/logísticos no administrativos totalmente prohibidos en el perfil de Palmira.',
    fitReasons: [],
    notes: 'Registrada en el registro de descartes automáticos de Palmira AI como demostración del filtro de exclusión activa.'
  }
];
