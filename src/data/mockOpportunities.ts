import { Opportunity, ScoreFactors } from '../types';

export function calculateOpportunityIndex(scores: ScoreFactors): number {
  const index = 
    scores.fit * 0.25 + 
    scores.profitability * 0.25 + 
    scores.easeOfAccess * 0.20 + 
    scores.costsTime * 0.15 + 
    scores.locationScore * 0.10 + 
    scores.continuity * 0.05;
  return Math.round(index);
}

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    isTop10: true,
    company: 'Centro especialista en gestión, organización y desarrollo de oportunidades de negociol Iberum Illescas',
    title: 'Soporte Administrativo Externo y Coordinación Documental de Facturación',
    sector: 'Servicios empresariales & Administración',
    category: 'captacion',
    location: 'Plataforma Central Iberum, Illescas (Toledo)',
    distanceKm: 4,
    verificationStatus: 'verificada',
    scores: {
      fit: 94,          // 25% -> 23.5
      profitability: 90, // 25% -> 22.5
      easeOfAccess: 80, // 20% -> 16.0
      costsTime: 88,    // 15% -> 13.2
      locationScore: 98,// 10% -> 9.8
      continuity: 92,   // 5%  -> 4.6
    },
    opportunityIndex: 90, // (23.5 + 22.5 + 16.0 + 13.2 + 9.8 + 4.6 = 89.6 => 90)
    justification: 'Ubicación inmediata en Illescas. Gran volumen de albaranes, CMRs y control de flotas con picos de trabajo. El perfil administrativo riguroso y metódico encaja perfectamente para optimizar la gestión de tráfico.',
    source: 'Registro especialista en gestión, organización y desarrollo de oportunidades de negociol La Sagra & Oferta de soporte auxiliar especialista en gestión, organización y desarrollo de oportunidades de negociol',
    sourceDate: '28 de Octubre de 2026',
    description: 'Empresa logística en expansión que precisa externalizar la validación administrativa de albaranes, comprobación de incidencias de transporte y archivo de documentación de vehículos y conductores.',
    businessActivity: 'Gestión de cross-docking y distribución de mercancías en el eje Madrid-Toledo.',
    identifiedNeed: 'Retrasos en la facturación a clientes finales por falta de validación documental rápida de los servicios de transporte entregados.',
    servicesOffered: [
      'Apoyo administrativo externo',
      'Gestión documental',
      'Organización de procesos',
      'Seguimiento de tareas'
    ],
    fitReasons: [
      'Capacidad acreditada en gestión documental compleja y estándares de alta exigencia.',
      'Proximidad física inmediata (4 km) para reuniones operativas presenciales si se requieren.',
      'Capacidad para organizar flujos sin necesidad de formación interna prolongada.'
    ],
    advantages: [
      'Contrato de prestación de servicios recurrente (retainer mensual).',
      'Interlocución directa con el director de operaciones.',
      'Horario flexible compatible con otras actividades.'
    ],
    risks: [
      'Picos de trabajo estacionales a final de mes que exigirán concentración de horas.',
      'Sistemas informáticos propios (ERP de transporte) que requieren periodo de adaptación.'
    ],
    pendingInfo: [
      'Confirmar volumen semanal exacto de expedientes a revisar.',
      'Definir si requieren acceso remoto VPN o trabajo híbrido puntual en sus instalaciones de Illescas.'
    ],
    nextSteps: [
      'Contactar con el Director de Operaciones vía correo ejecutivo.',
      'Proponer una reunión diagnóstica de 15 minutos en sus oficinas.',
      'Enviar borrador de propuesta de colaboración mensual de 15h/semana.'
    ],
    crmStatus: 'propuesta_preparada',
    notes: [
      {
        id: 'n-1',
        date: '2026-10-30 11:20',
        author: 'Palmira Cruz',
        text: 'Borrador de propuesta preparado con módulo de 15 horas semanales. Contacto identificado: D. Marcos Ruiz (Jefe de Tráfico).'
      }
    ],
    estimatedValue: '1.450 € - 1.800 € / mes',
    timeRequired: '12 - 15 h / semana',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Directo con decisor',
    contactPerson: {
      name: 'Marcos Ruiz',
      role: 'Director de Operaciones & Logística',
      channel: 'LinkedIn especialista en gestión, organización y desarrollo de oportunidades de negociol / Correo corporativo'
    }
  },
  {
    id: 'opp-2',
    isTop10: true,
    company: 'Inmobiliaria Toledo Centro Histórico & Residencial',
    title: 'Coordinación de Operaciones, Notarías y Atención a Compradores',
    sector: 'Inmobiliario',
    category: 'colaboraciones',
    location: 'Toledo Capital',
    distanceKm: 28,
    verificationStatus: 'verificada',
    scores: {
      fit: 96,
      profitability: 88,
      easeOfAccess: 85,
      costsTime: 82,
      locationScore: 88,
      continuity: 90,
    },
    opportunityIndex: 89,
    justification: 'Máxima afinidad con Gestión Inmobiliaria Propia. La agencia busca un colaborador senior de confianza que prepare carpetas notariales, filtre clientes compradores solventes y coordine firmas sin añadir nómina fija.',
    source: 'Colegio de Agentes Inmobiliarios & Red profesional',
    sourceDate: '25 de Octubre de 2026',
    description: 'Agencia inmobiliaria consolidada en Toledo especializada en inmuebles singulares y residencial medio-alto que sufre saturación en la gestión burocrática previa a la firma en notaría.',
    businessActivity: 'Intermediación inmobiliaria, captación de mandatos en exclusiva y asesoramiento patrimonial.',
    identifiedNeed: 'Pérdida de operaciones o retrasos de meses en firmas notariales por expedientes incompletos (herencias, notas simples caducadas, cargas no canceladas).',
    servicesOffered: [
      'Coordinación de operaciones',
      'Colaboración con inmobiliarias',
      'Seguimiento de clientes',
      'Gestión documental'
    ],
    fitReasons: [
      'Conocimiento integral del ciclo inmobiliario adquirido directamente en Gestión Inmobiliaria Propia.',
      'Lenguaje común con notarios, registradores y entidades financieras.',
      'Trato exquisito y empático con clientes en momentos de alta tensión emocional de compra/venta.'
    ],
    advantages: [
      'Modelo híbrido: tarifa fija por expediente completado + retainer mensual de supervisión.',
      'Relación de mutua prescripción de compradores e inmuebles con Gestión Inmobiliaria Propia.'
    ],
    risks: [
      'Dependencia de la agilidad del registro de la propiedad de Toledo en ciertas fincas históricas.'
    ],
    pendingInfo: [
      'Tarifas pactadas por expediente cerrado y volumen medio mensual de escrituras (4 a 8 previstas).'
    ],
    nextSteps: [
      'Reunión personal con la socia fundadora (Dña. Elena Moraleda).',
      'Presentar protocolo de checklist documental Gestión Inmobiliaria Propia como ejemplo de buenas prácticas.'
    ],
    crmStatus: 'en_negociacion',
    notes: [
      {
        id: 'n-2',
        date: '2026-10-27 16:45',
        author: 'Palmira Cruz',
        text: 'Primera llamada telefónica realizada muy positiva. Elena coincide en que la preparación notarial les quita el 60% del tiempo comercial.'
      }
    ],
    estimatedValue: '1.200 € base + 250 € / expediente firmado',
    timeRequired: '10 - 14 h / semana',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Directo con decisor',
    contactPerson: {
      name: 'Elena Moraleda',
      role: 'Socia Directora',
      channel: 'Teléfono directo / Reunión presencial'
    }
  },
  {
    id: 'opp-3',
    isTop10: true,
    company: 'Centro Infantil & Ludoteca La Sagra',
    title: 'Apoyo en Gestión de Turnos, Contrataciones y Coordinación con Familias',
    sector: 'Educación y Servicios Infantiles',
    category: 'captacion',
    location: 'Yuncos / Illescas (Toledo)',
    distanceKm: 6,
    verificationStatus: 'verificada',
    scores: {
      fit: 98,
      profitability: 75,
      easeOfAccess: 92,
      costsTime: 90,
      locationScore: 96,
      continuity: 85,
    },
    opportunityIndex: 88,
    justification: 'Encaje absoluto gracias a la sólida capacidad de Palmira en administración, selección y coordinación de horarios y turnos de personal. Entiende la operativa, los calendarios y el trato empático con equipos y usuarios.',
    source: 'Contacto directo de sector & Consulta comercial',
    sourceDate: '20 de Octubre de 2026',
    description: 'Centro de educación infantil con 9 trabajadoras que necesita un soporte profesionalizado para cuadrar turnos rotativos, gestionar bajas, altas de temporada y atender a familias de nuevo ingreso.',
    businessActivity: 'Servicios de primer ciclo de educación infantil, campamentos y talleres vespertinos.',
    identifiedNeed: 'La directora dedica tardes y fines de semana a rehacer cuadrantes de personal y atender dudas administrativas de los padres, desatendiendo el proyecto pedagógico.',
    servicesOffered: [
      'Apoyo en selección y contratación',
      'Coordinación de personal',
      'Organización de horarios',
      'Atención y seguimiento de clientes'
    ],
    fitReasons: [
      'Amplia experiencia gestionando cuadrantes de personal, turnos rotativos e incidencias.',
      'Conocimiento de ratios educador/alumno según normativa de Castilla-La Mancha.',
      'Resolución cálida y tranquilizadora ante quejas o peticiones de padres.'
    ],
    advantages: [
      'Proximidad extrema a Illescas.',
      'Posibilidad de gestión 80% remota con visitas puntuales de coordinación.',
      'Confianza inmediata de la dirección al conocer la experiencia previa.'
    ],
    risks: [
      'Presupuesto más ajustado que el sector industrial o logístico.'
    ],
    pendingInfo: [
      'Calendario escolar anual y previsión de matriculaciones del segundo trimestre.'
    ],
    nextSteps: [
      'Visitar el centro un viernes por la tarde para revisar el sistema actual de turnos.',
      'Diseñar un cuadrante piloto en Excel/Google Sheets automatizado.'
    ],
    crmStatus: 'seleccionada',
    notes: [
      {
        id: 'n-3',
        date: '2026-10-24 18:00',
        author: 'Palmira Cruz',
        text: 'La directora Carmen Gómez agradece el contacto. Su principal dolor de cabeza son las bajas de última hora y cuadrantes de Navidades.'
      }
    ],
    estimatedValue: '650 € - 850 € / mes',
    timeRequired: '6 - 8 h / semana',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Directo con decisor',
    contactPerson: {
      name: 'Carmen Gómez',
      role: 'Directora y Titular',
      channel: 'Presencial / WhatsApp'
    }
  },
  {
    id: 'opp-4',
    isTop10: true,
    company: 'Ayuntamiento de Comarca de La Sagra (Toledo)',
    title: 'Licitación: Soporte Administrativo Auxiliar para Campaña Municipal y Registro',
    sector: 'Administración Pública',
    category: 'licitaciones',
    location: 'Sagra Alta (Toledo)',
    distanceKm: 12,
    verificationStatus: 'verificada',
    scores: {
      fit: 86,
      profitability: 84,
      easeOfAccess: 70,
      costsTime: 78,
      locationScore: 92,
      continuity: 80,
    },
    opportunityIndex: 81,
    justification: 'Contrato público menor para apoyo en tramitación de expedientes ciudadanos y soporte de ventanilla única. El rigor administrativo metódico y la solvencia con documentación oficial aportan garantías técnicas contrastadas.',
    source: 'Plataforma de Contratación del Sector Público (Exp. 2026/LCON-042)',
    sourceDate: '29 de Octubre de 2026',
    description: 'Contrato de servicios administrativos de apoyo a la secretaría e intervención municipal para digitalización de expedientes históricos y apoyo al padrón municipal.',
    businessActivity: 'Servicio público municipal y atención ciudadana.',
    identifiedNeed: 'Acumulación de expedientes de licencias de obra y actividad con retraso administrativo superior a 4 meses.',
    servicesOffered: [
      'Apoyo administrativo externo',
      'Gestión documental',
      'Organización de procesos'
    ],
    fitReasons: [
      'Metodología ordenada y cumplimiento riguroso de plazos administrativos.',
      'Capacidad de atención al ciudadano con empatía y claridad.',
      'Posibilidad de licitar como profesional independiente (autónoma).'
    ],
    advantages: [
      'Cobro garantizado por la administración local.',
      'Duración contractual de 6 meses prorrogables a otros 6.',
      'Referencia de prestigio para el portfolio público.'
    ],
    risks: [
      'Trámites formales de licitación (declaración responsable, certificado de estar al corriente con AEAT y TGSS).',
      'Plazos rígidos de presentación de la memoria técnica.'
    ],
    pendingInfo: [
      'Fecha límite de presentación de plicas (estimada: 18 de noviembre de 2026).',
      'Ponderación exacta de la oferta económica frente a la memoria de servicios.'
    ],
    nextSteps: [
      'Descargar pliegos técnicos y administrativos completos.',
      'Redactar memoria descriptiva de los métodos de ordenación documental.'
    ],
    crmStatus: 'pendiente_analizar',
    notes: [],
    estimatedValue: '12.400 € (Contrato 6 meses = ~2.060 €/mes)',
    timeRequired: '15 - 20 h / semana',
    continuityPotential: 'Proyecto acotado',
    difficultyOfAccess: 'Concurso público',
    contactPerson: {
      name: 'Mesa de Contratación',
      role: 'Secretaría Municipal',
      channel: 'Plataforma Contratación del Estado'
    }
  },
  {
    id: 'opp-5',
    isTop10: true,
    company: 'Distribuidora de Componentes Industriales Sur',
    title: 'Estandarización de Facturación, Reclamación de Pagos y Atención a Clientes especialista en gestión, organización y desarrollo de oportunidades de negociol',
    sector: 'Comercio Industrial y Mayorista',
    category: 'captacion',
    location: 'Parla / Pinto (Sur de Madrid)',
    distanceKm: 19,
    verificationStatus: 'potencial',
    scores: {
      fit: 88,
      profitability: 82,
      easeOfAccess: 74,
      costsTime: 80,
      locationScore: 85,
      continuity: 85,
    },
    opportunityIndex: 83,
    justification: 'Empresa mediana en el sur de Madrid con fricciones entre el departamento comercial y el administrativo. El perfil de Palmira combina solvencia contable básica y mano izquierda comercial.',
    source: 'Directorio Industrial Comunidad de Madrid & Análisis web',
    sourceDate: '26 de Octubre de 2026',
    description: 'Mayorista de suministros para talleres mecánicos e industria pesada. Cuentan con 18 comerciales en ruta y carecen de un enlace que organice los pedidos especiales y reclame los pagarés pendientes.',
    businessActivity: 'Distribución especialista en gestión, organización y desarrollo de oportunidades de negociol de repuestos, valvulería y herramienta industrial.',
    identifiedNeed: 'Periodo medio de cobro disparado a 85 días por falta de seguimiento telefónico sistemático y amable a clientes morosos.',
    servicesOffered: [
      'Atención y seguimiento de clientes',
      'Apoyo administrativo externo',
      'Seguimiento de tareas',
      'Apoyo comercial'
    ],
    fitReasons: [
      'Combinación de firmeza en el control de cobros con un alto estándar de cortesía y atención al cliente.',
      'Fácil desplazamiento desde Illescas por la A-42.',
      'Enfoque de procesos orientados a resultados medibles.'
    ],
    advantages: [
      'Alto impacto visual inmediato: reducir el plazo de cobro genera un ROI visible el primer mes.',
      'Contrato estable a medio plazo.'
    ],
    risks: [
      'Clientes con cierta resistencia inicial a llamadas de regularización de pagos.'
    ],
    pendingInfo: [
      'Identificar al Director Financiero o Gerente para el primer contacto.',
      'Verificar si utilizan Factusol, SAP o Sage.'
    ],
    nextSteps: [
      'Enviar carta de presentación dirigida a Gerencia.',
      'Realizar seguimiento telefónico a los 3 días.'
    ],
    crmStatus: 'detectada',
    notes: [],
    estimatedValue: '1.100 € - 1.500 € / mes',
    timeRequired: '10 - 12 h / semana',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Directo con decisor',
    contactPerson: {
      name: 'Gerencia General (Pendiente validación)',
      role: 'Director General',
      channel: 'Correo postal certificado / LinkedIn'
    }
  },
  {
    id: 'opp-6',
    isTop10: true,
    company: 'Estudio de Arquitectura e Interiorismo La Sagra',
    title: 'Secretaría Técnica de Proyectos, Licencias Municipales y Presupuestos',
    sector: 'Construcción y Arquitectura',
    category: 'colaboraciones',
    location: 'Illescas (Toledo)',
    distanceKm: 2,
    verificationStatus: 'potencial',
    scores: {
      fit: 85,
      profitability: 80,
      easeOfAccess: 88,
      costsTime: 85,
      locationScore: 100,
      continuity: 82,
    },
    opportunityIndex: 85,
    justification: 'Ubicación inmejorable en el mismo municipio (2 km). Los arquitectos necesitan liberarse del papeleo de visados, seguimiento de licencias en urbanismo y atención telefónica a proveedores de obra.',
    source: 'Registro local de profesionales de Illescas',
    sourceDate: '27 de Octubre de 2026',
    description: 'Estudio de dos arquitectos y un aparejador con fuerte demanda por el boom residencial e industrial de Illescas. Saturados por la burocracia técnica y la coordinación de gremios.',
    businessActivity: 'Diseño arquitectónico, direcciones de obra y proyectos de naves logísticas.',
    identifiedNeed: 'Los técnicos pierden más del 30% de sus horas hábiles en seguimiento de expedientes de licencias municipales y cotizaciones de subcontratas.',
    servicesOffered: [
      'Gestión documental',
      'Apoyo administrativo externo',
      'Coordinación de operaciones',
      'Seguimiento de tareas'
    ],
    fitReasons: [
      'Conocimiento de la tramitación municipal e inmobiliaria en La Sagra.',
      'Proximidad para pasar por el estudio dos mañanas por semana.',
      'Hábito de coordinar profesionales de distintos perfiles técnicos.'
    ],
    advantages: [
      'Sinergias directas con Gestión Inmobiliaria Propia: posibles colaboraciones en proyectos de clientes particulares.',
      'Flexibilidad y cercanía absoluta.'
    ],
    risks: [
      'Complejidad puntual de cierta jerga técnica de planos y memorias.'
    ],
    pendingInfo: [
      'Número de proyectos activos simultáneos.'
    ],
    nextSteps: [
      'Proponer café de trabajo en su estudio de Illescas para conocer sus fricciones operativas.'
    ],
    crmStatus: 'seleccionada',
    notes: [],
    estimatedValue: '850 € - 1.200 € / mes',
    timeRequired: '8 - 10 h / semana',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Directo con decisor',
    contactPerson: {
      name: 'Javier Navarro',
      role: 'Arquitecto Principal',
      channel: 'Reunión en estudio / Teléfono'
    }
  },
  {
    id: 'opp-7',
    isTop10: true,
    company: 'Empresa Agroalimentaria de Toledo (Aceites y Quesos D.O.)',
    title: 'Gestión Comercial, Pedidos para Tiendas Gourmet y Coordinación de Campaña',
    sector: 'Alimentación y Gourmet',
    category: 'captacion',
    location: 'Comarca de Torrijos / Toledo',
    distanceKm: 32,
    verificationStatus: 'hipotesis',
    scores: {
      fit: 82,
      profitability: 84,
      easeOfAccess: 72,
      costsTime: 76,
      locationScore: 80,
      continuity: 78,
    },
    opportunityIndex: 80,
    justification: 'Hipótesis basada en su inicio de campaña de Navidad y expansión a tiendas gourmet de Madrid. Palmira aporta solvencia en atención y asesoramiento al cliente, seguimiento de pedidos y apoyo comercial.',
    source: 'Directorio de Denominaciones de Origen de Castilla-La Mancha',
    sourceDate: '24 de Octubre de 2026',
    description: 'Productor tradicional de aceite de oliva virgen extra y quesos artesanales que desea abrir canal con tiendas delicatessen de Madrid y Toledo sin contratar comercial a nómina completa.',
    businessActivity: 'Elaboración y venta de productos agroalimentarios de calidad diferenciada.',
    identifiedNeed: 'Falta de tiempo para llamar a tiendas de alimentación especializada, enviar muestras, cotizar pedidos y hacer el seguimiento de reposiciones.',
    servicesOffered: [
      'Apoyo comercial',
      'Atención y seguimiento de clientes',
      'Coordinación de operaciones'
    ],
    fitReasons: [
      'Sólido dominio de la operativa comercial, control de pedidos y seguimiento de cuentas cliente.',
      'Don de gentes, paciencia y profesionalidad al teléfono.'
    ],
    advantages: [
      'Posibilidad de pactar fijo reducido + comisión por apertura de puntos de venta estables.'
    ],
    risks: [
      'Campaña concentrada fuertemente en los meses de otoño e invierno.'
    ],
    pendingInfo: [
      'Confirmar catálogo de precios para canal profesional y margen comercial.'
    ],
    nextSteps: [
      'Contactar con el gerente para contrastar si tienen interés en delegar la prospección gourmet.'
    ],
    crmStatus: 'pendiente_analizar',
    notes: [],
    estimatedValue: '800 € / mes + variable por cliente nuevo',
    timeRequired: '8 - 12 h / semana',
    continuityPotential: 'Puntual con recurrencia',
    difficultyOfAccess: 'Referencia / Red',
    contactPerson: {
      name: 'Antonio Santos',
      role: 'Propietario / Gerente',
      channel: 'Correo electrónico'
    }
  },
  {
    id: 'opp-8',
    isTop10: true,
    company: 'Asesoría Laboral y Fiscal Getafe-Leganés',
    title: 'Refuerzo Campaña de Trimestrales, Partes de Nóminas y Archivo de Clientes',
    sector: 'Servicios Profesionales y Asesoría',
    category: 'colaboraciones',
    location: 'Getafe (Sur de Madrid)',
    distanceKm: 24,
    verificationStatus: 'potencial',
    scores: {
      fit: 90,
      profitability: 78,
      easeOfAccess: 80,
      costsTime: 84,
      locationScore: 84,
      continuity: 88,
    },
    opportunityIndex: 84,
    justification: 'Despacho profesional con 140 pymes clientes que se bloquea en los cierres de trimestre fiscal y laboral. El soporte en recopilación documental y contacto amable evita multas y enfados de clientes.',
    source: 'Asociación especialista en gestión, organización y desarrollo de oportunidades de negociol Sur de Madrid & Búsqueda especialista en gestión, organización y desarrollo de oportunidades de negociol',
    sourceDate: '22 de Octubre de 2026',
    description: 'Despacho con 5 graduados sociales y economistas que pierden horas llamando a clientes para que envíen facturas, tickets y justificantes de transferencias antes del día 20.',
    businessActivity: 'Asesoramiento fiscal, contable y laboral a autónomos y pequeñas empresas.',
    identifiedNeed: 'Necesitan una persona externa resolutiva que contacte sistemáticamente con los clientes rezagados, recoja las carpetas y deje el material clasificado para los contables.',
    servicesOffered: [
      'Apoyo administrativo a departamentos de personal',
      'Gestión documental',
      'Seguimiento de tareas',
      'Atención y seguimiento de clientes'
    ],
    fitReasons: [
      'Experiencia y rigor continuado en recopilación documental y preparación de datos para asesorías laborales.',
      'Trato paciente pero perseverante con clientes que se retrasan.',
      'Excelente manejo de expedientes organizados.'
    ],
    advantages: [
      'Trabajo recurrente en los periodos clave de cada mes (días 1 al 20).',
      'Gran respeto profesional mutuo.'
    ],
    risks: [
      'Carga concentrada en ciertas semanas del mes.'
    ],
    pendingInfo: [
      'Validar software de intercambio de archivos (A3, Wolters Kluwer o nube propia).'
    ],
    nextSteps: [
      'Reunión telefónica con el socio director para fijar tarifa mensual cerrada.'
    ],
    crmStatus: 'contacto_realizado',
    notes: [
      {
        id: 'n-8',
        date: '2026-10-29 09:30',
        author: 'Palmira Cruz',
        text: 'Llamada con el socio Antonio Méndez. Le interesa un soporte piloto para el cierre de noviembre/diciembre.'
      }
    ],
    estimatedValue: '900 € - 1.300 € / mes',
    timeRequired: '10 - 15 h / semana en días clave',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Directo con decisor',
    contactPerson: {
      name: 'Antonio Méndez',
      role: 'Socio Director de Área Laboral',
      channel: 'Llamada telefónica / Despacho Getafe'
    }
  },
  {
    id: 'opp-9',
    isTop10: true,
    company: 'Clínica Dental & Medicina Estética La Sagra',
    title: 'Atención a Pacientes, Confirmación de Citas y Cobros Financiados',
    sector: 'Salud y Clínicas Privadas',
    category: 'captacion',
    location: 'Illescas / Yeles (Toledo)',
    distanceKm: 5,
    verificationStatus: 'potencial',
    scores: {
      fit: 84,
      profitability: 80,
      easeOfAccess: 82,
      costsTime: 86,
      locationScore: 98,
      continuity: 84,
    },
    opportunityIndex: 85,
    justification: 'Clínica con tres doctores donde la recepcionista actual está sobrepasada por las llamadas telefónicas mientras atiende el mostrador. Palmira puede gestionar la agenda y confirmaciones en remoto.',
    source: 'Observación directa de mercado & Directorio de Salud La Sagra',
    sourceDate: '23 de Octubre de 2026',
    description: 'Centro médico privado con alto volumen de primeras consultas y tratamientos complejos. Pérdida mensual de citas por incomparecencias no reconfirmadas.',
    businessActivity: 'Odontología integral, implantes y tratamientos estéticos avanzados.',
    identifiedNeed: 'Reducir la tasa de ausencias a consulta mediante recordatorios personalizados y tramitar la documentación de financiaciones bancarias.',
    servicesOffered: [
      'Atención y seguimiento de clientes',
      'Organización de horarios',
      'Apoyo administrativo externo'
    ],
    fitReasons: [
      'Voz profesional, templada y tranquilizadora para pacientes con dudas.',
      'Dominio de gestión de cobros, seguimiento de expedientes y acuerdos de pago.',
      'Cercanía geográfica para acudir en minutos ante cualquier necesidad de archivo.'
    ],
    advantages: [
      'Gestión telemática con centralita virtual desde el propio despacho de Palmira.',
      'Impacto inmediato en la facturación de la clínica.'
    ],
    risks: [
      'Manejo de software de gestión clínica (Gesden o similar).'
    ],
    pendingInfo: [
      'Conocer el porcentaje actual de incomparecencias y horario de centralita deseado.'
    ],
    nextSteps: [
      'Presentar propuesta de "Gestión remota de agenda médica" al doctor titular.'
    ],
    crmStatus: 'detectada',
    notes: [],
    estimatedValue: '750 € - 1.050 € / mes',
    timeRequired: '8 - 10 h / semana',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Directo con decisor',
    contactPerson: {
      name: 'Dr. Fernando Lázaro',
      role: 'Director Médico Titular',
      channel: 'Reunión en clínica'
    }
  },
  {
    id: 'opp-10',
    isTop10: true,
    company: 'Corporación Tecnológica Madrid Sur',
    title: 'Coordinadora de Gestión Administrativa de Oficinas y Régimen Interior',
    sector: 'Servicios Administrativos Corporativos',
    category: 'empleo',
    location: 'Getafe / Madrid Sur (La Carpetania)',
    distanceKm: 22,
    verificationStatus: 'verificada',
    scores: {
      fit: 88,
      profitability: 86,
      easeOfAccess: 65,
      costsTime: 70,
      locationScore: 84,
      continuity: 95,
    },
    opportunityIndex: 81,
    justification: 'Puesto por cuenta ajena con retribución y condiciones excepcionales (39.000 € brutos + horario continuo de 08:00 a 15:30 con 2 días de teletrabajo). Supera holgadamente el coste de oportunidad frente al ejercicio independiente.',
    source: 'Portal de empleo especializado en puestos ejecutivos de operaciones',
    sourceDate: '30 de Octubre de 2026',
    description: 'Empresa tecnológica con sede corporativa en Getafe que busca una persona con alta experiencia organizativa para dirigir el régimen interior, proveedores de servicios, flota y bienestar de oficina.',
    businessActivity: 'Ingeniería de telecomunicaciones y logística de equipos de alta tecnología.',
    identifiedNeed: 'Profesional maduro, con capacidad de resolución inmediata y autonomía probada que asuma la gobernanza de las oficinas centrales sin supervisión constante.',
    servicesOffered: [
      'Coordinación de personal',
      'Gestión documental',
      'Organización de procesos',
      'Soporte operativo a empresas'
    ],
    fitReasons: [
      'Las competencias en gestión documental rigurosa, atención al cliente y coordinación de equipos encajan punto por punto con los requisitos solicitados.',
      'Ubicación muy accesible por A-42 en horario favorable contra-tráfico.'
    ],
    advantages: [
      'Salario superior a la media de la zona.',
      'Jornada continua que preserva la calidad de vida.',
      'Contrato indefinido desde el primer día.'
    ],
    risks: [
      'Pérdida de la plena autonomía como profesional independiente y menor dedicación a Gestión Inmobiliaria Propia.',
      'Proceso de selección con varias fases y entrevista competencial.'
    ],
    pendingInfo: [
      'Posibilidad de compatibilizar con la gestión residual de Gestión Inmobiliaria Propia.',
      'Fecha límite de recepción de candidaturas.'
    ],
    nextSteps: [
      'Revisar si merece la pena postular o si es preferible mantener el foco 100% en clientes independientes.',
      'Si se decide postular, adaptar la presentación destacando las capacidades organizativas y de coordinación de equipos.'
    ],
    crmStatus: 'pendiente_analizar',
    notes: [
      {
        id: 'n-10',
        date: '2026-10-31 10:00',
        author: 'Palmira AI (Análisis Automático)',
        text: 'Esta oportunidad supera el filtro de corte de empleo excepcional (>38.000 € y <30 min de trayecto). Se mantiene en observación.'
      }
    ],
    estimatedValue: '39.000 € / año brutos (~2.450 € netos / mes en 14 pagas)',
    timeRequired: '37,5 h / semana (Jornada completa intensiva)',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Referencia / Red',
    contactPerson: {
      name: 'Departamento de Atracción de Talento',
      role: 'Responsable de Selección Corporativa',
      channel: 'Plataforma de selección directa'
    },
    employmentDetails: {
      salaryYearlyGross: 39000,
      salaryMonthlyNet: 2450,
      schedule: 'Lunes a Viernes de 08:00 a 15:30 (Jornada continua)',
      commuteTimeMin: 22,
      remotePercent: 40, // 2 días teletrabajo
      stabilityRating: 'Muy Alta (Contrato Indefinido)',
      flexibilityRating: 'Alta (Flexibilidad de entrada/salida de 45 min)',
      contractConditions: 'Convenio de empresa propio, seguro médico privado y 24 días laborables de vacaciones.',
      opportunityCostVsFreelance: 'Ingreso neto asegurado de 2.450 €/mes sin incertidumbre comercial. Frente a 3 clientes de consultoría (aprox. 3.200 € facturados brutos menos cuota e IRPF = ~2.300 € netos). El ratio económico es ligeramente favorable por cuenta ajena, pero resta tiempo a Gestión Inmobiliaria Propia.',
      meetsPalmiraCriteria: true
    }
  },
  // Additional demo opportunities for diverse searching
  {
    id: 'opp-11',
    isTop10: false,
    company: 'Distribuidora Farmacéutica La Mancha',
    title: 'Auditoría de Albaranes de Entrega y Control de Trazabilidad',
    sector: 'Farmacéutico y Salud',
    category: 'captacion',
    location: 'Toledo Polígono Industrial',
    distanceKm: 26,
    verificationStatus: 'demo',
    scores: {
      fit: 82,
      profitability: 85,
      easeOfAccess: 65,
      costsTime: 75,
      locationScore: 82,
      continuity: 80,
    },
    opportunityIndex: 78,
    justification: 'Exigencia de máximo rigor en trazabilidad documental aplicada a la normativa sanitaria de medicamentos.',
    source: 'Dato de demostración Palmira AI',
    sourceDate: 'Noviembre 2026',
    description: 'Empresa de distribución de medicamentos a farmacias de Castilla-La Mancha que requiere control de devoluciones y firmas de recepción.',
    businessActivity: 'Distribución farmacéutica.',
    identifiedNeed: 'Pérdida de abonos de laboratorios por fallos en la digitalización de justificantes de entrega.',
    servicesOffered: ['Gestión documental', 'Apoyo administrativo externo'],
    fitReasons: ['Metodología sistemática de comprobación.'],
    advantages: ['Sector muy solvente con puntualidad de pago.'],
    risks: ['Horarios nocturnos en parte de la logística.'],
    pendingInfo: ['Verificar si el puesto permite teletrabajo parcial.'],
    nextSteps: ['Contactar por LinkedIn con el responsable de calidad.'],
    crmStatus: 'detectada',
    notes: [],
    estimatedValue: '950 € / mes',
    timeRequired: '10 h / semana',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Directo con decisor'
  },
  {
    id: 'opp-12',
    isTop10: false,
    company: 'Red de Agentes Inmobiliarios Madrid-Toledo',
    title: 'Externalización de Backoffice y Tramitación de Arrendamientos',
    sector: 'Inmobiliario',
    category: 'colaboraciones',
    location: 'Sur de Madrid y Toledo (Híbrido)',
    distanceKm: 15,
    verificationStatus: 'demo',
    scores: {
      fit: 94,
      profitability: 82,
      easeOfAccess: 80,
      costsTime: 82,
      locationScore: 90,
      continuity: 85,
    },
    opportunityIndex: 86,
    justification: 'Asociación de agentes independientes que buscan una central de soporte administrativo compartida.',
    source: 'Dato de demostración Palmira AI',
    sourceDate: 'Noviembre 2026',
    description: 'Grupo de 6 agentes autónomos que quieren delegar la redacción de contratos tipo, depósito de fianzas en IVIMA/Castilla-La Mancha y control de cobros.',
    businessActivity: 'Red de intermediación residencial.',
    identifiedNeed: 'Falta de uniformidad en los contratos y retrasos en los depósitos de fianzas legales.',
    servicesOffered: ['Colaboración con inmobiliarias', 'Coordinación de operaciones', 'Gestión documental'],
    fitReasons: ['Dominio del sector en Gestión Inmobiliaria Propia.'],
    advantages: ['Tarifa mensual fija repartida entre los 6 agentes (muy asequible para ellos y rentable para Palmira).'],
    risks: ['Poner de acuerdo a profesionales independientes con distintas formas de trabajar.'],
    pendingInfo: ['Reunión previa con el portavoz del grupo.'],
    nextSteps: ['Presentar un modelo de contrato unificado de colaboración.'],
    crmStatus: 'detectada',
    notes: [],
    estimatedValue: '1.500 € / mes (250 € / agente)',
    timeRequired: '12 - 16 h / semana',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Referencia / Red'
  },
  {
    id: 'opp-13',
    isTop10: false,
    company: 'Puesto de Auxiliar Administrativo Presencial Estándar',
    title: 'Auxiliar Administrativo de Recepción (Oferta Tradicional Descartada)',
    sector: 'Servicios Generales',
    category: 'empleo',
    location: 'Madrid Centro (Chamartín)',
    distanceKm: 58,
    verificationStatus: 'demo',
    scores: {
      fit: 80,
      profitability: 40,
      easeOfAccess: 70,
      costsTime: 30,
      locationScore: 35,
      continuity: 70,
    },
    opportunityIndex: 54,
    justification: 'No supera los criterios mínimos de Palmira: Salario de 18.000 € brutos para jornada partida presencial en Madrid Centro (2 horas diarias de atascos + peajes). El coste de oportunidad es nefasto.',
    source: 'Dato de demostración para contraste de filtros',
    sourceDate: 'Noviembre 2026',
    description: 'Oferta habitual del mercado laboral tradicional con salario bajo y exigencia presencial rígida.',
    businessActivity: 'Despacho de administración.',
    identifiedNeed: 'Recepcionista para atender llamadas y correspondencia física.',
    servicesOffered: ['Apoyo administrativo externo'],
    fitReasons: ['Cumple con los requisitos básicos pero infravalora la experiencia de Palmira.'],
    advantages: ['Contrato fijo.'],
    risks: ['Desgaste de desplazamientos (116 km diarios), horario partido incompatible con la vida familiar y proyecto especialista en gestión, organización y desarrollo de oportunidades de negociol propio.'],
    pendingInfo: ['Ninguna. Descartada por sistema.'],
    nextSteps: ['Mantener en archivo de descartadas como referencia comparativa.'],
    crmStatus: 'descartada',
    notes: [
      {
        id: 'n-13',
        date: '2026-11-01 12:00',
        author: 'Palmira AI (Filtro Automático)',
        text: 'Descartada automáticamente por no cumplir el umbral mínimo de rentabilidad y proximidad.'
      }
    ],
    estimatedValue: '18.000 € brutos / año (~1.220 € netos / mes)',
    timeRequired: '40 h / semana (Jornada partida 09:00 - 14:00 y 16:00 - 19:00)',
    continuityPotential: 'Largo plazo recurrente',
    difficultyOfAccess: 'Directo con decisor',
    employmentDetails: {
      salaryYearlyGross: 18000,
      salaryMonthlyNet: 1220,
      schedule: '09:00 - 14:00 y 16:00 - 19:00 (Jornada partida)',
      commuteTimeMin: 70,
      remotePercent: 0,
      stabilityRating: 'Media',
      flexibilityRating: 'Muy Baja',
      contractConditions: 'Convenio oficinas y despachos, sin teletrabajo.',
      opportunityCostVsFreelance: 'Pérdida neta de rentabilidad. El gasto en combustible y tiempo supera los 400 €/mes, dejando un neto real de apenas 800 €. No compensa frente a 2 clientes de consultoría en Illescas.',
      meetsPalmiraCriteria: false
    }
  }
];
