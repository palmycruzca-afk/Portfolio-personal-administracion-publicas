export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  typicalCases: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  summary: string;
  services: ServiceItem[];
}

export const PERSONAL_DATA = {
  name: 'Palmira Cruz',
  title: 'Administración, atención al cliente, RRHH y selección de personal',
  subtitle: 'Experiencia en gestión documental, atención al cliente, actividad inmobiliaria, coordinación de proveedores, gestión de incidencias y organización de equipos.',
  brandMotto: '«Experiencia, iniciativa y compromiso. Las personas conectan oportunidades».',
  email: 'palmy_ruby@hotmail.com',
  phone: '687559537',
  locationPrimary: 'Illescas (Toledo) / Sur de Madrid',
  locationScope: 'Presencial en Toledo y Madrid Sur · Soporte remoto para toda España',
  bioIntro: `Profesional independiente, especialista en gestión, organización y desarrollo de oportunidades de negocio. Mi vocación es aportar orden, serenidad operativa y eficiencia en la administración, atención al cliente, coordinación de proveedores y gestión de equipos.`,
  validationNotice: 'Compromiso profesional basado en soluciones prácticas y resultados medibles.',
};

export const TRAINING_DATA = [
  {
    id: 'rh-nebrija',
    title: 'Recursos Humanos',
    description: 'Curso especializado en gestión de personas, organización de equipos y normativa laboral.',
    endorsement: 'Avalado por la Universidad Nebrija',
  },
  {
    id: 'ia-camara-toledo',
    title: 'Inteligencia Artificial',
    description: 'Aplicación práctica de herramientas de inteligencia artificial para la optimización de procesos y tareas administrativas.',
    endorsement: 'Avalado y financiado por la Cámara de Comercio de Toledo',
  }
];

export const CAPABILITIES_AREAS = [
  {
    id: 'atencion-cliente',
    title: 'Atención al cliente y gestión comercial',
    description: 'Relación cercana, profesional y resolutiva con clientes y usuarios.',
    items: [
      'Atención y asesoramiento a clientes.',
      'Gestión de consultas, reclamaciones e incidencias.',
      'Seguimiento de clientes y operaciones.',
      'Comunicación y apoyo comercial.'
    ]
  },
  {
    id: 'admin-documental',
    title: 'Administración y gestión documental',
    description: 'Rigor y orden en el tratamiento de archivos, expedientes y bases de datos.',
    items: [
      'Gestión y organización documental.',
      'Archivo, expedientes y registros.',
      'Creación, actualización y mantenimiento de bases de datos.',
      'Organización administrativa y seguimiento de tareas.'
    ]
  },
  {
    id: 'gestion-inmobiliaria',
    title: 'Gestión y coordinación inmobiliaria',
    description: 'Amplia experiencia directiva y operativa gestionando empresas del sector inmobiliario.',
    items: [
      'Gestión y coordinación de actividad empresarial inmobiliaria.',
      'Organización y seguimiento de operaciones.',
      'Atención, asesoramiento y seguimiento de clientes.',
      'Gestión comercial y negociación.',
      'Coordinación de profesionales y colaboradores.',
      'Gestión administrativa y documental.',
      'Desarrollo de negocio y oportunidades.'
    ]
  },
  {
    id: 'incidencias-proveedores',
    title: 'Gestión de incidencias y proveedores',
    description: 'Control de plazos, interlocución fluida y resolución eficaz de incidencias.',
    items: [
      'Recepción y seguimiento de incidencias.',
      'Coordinación y comunicación con proveedores.',
      'Solicitud y seguimiento de servicios.',
      'Resolución de problemas y control de plazos.'
    ]
  },
  {
    id: 'rrhh-equipos',
    title: 'Recursos humanos y coordinación de equipos',
    description: 'Apoyo integral en la organización de plantillas, turnos y comunicación interna.',
    items: [
      'Apoyo en selección y contratación.',
      'Organización de horarios y turnos.',
      'Coordinación de equipos y tareas.',
      'Comunicación y organización de personal.'
    ]
  }
];

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'admin-organizacion',
    title: '1. Administración y Organización',
    summary: 'Estructuración ordenada de la rutina empresarial para que la dirección recupere su tiempo.',
    services: [
      {
        id: 'apoyo-admin-externo',
        title: 'Apoyo administrativo externo',
        description: 'Soporte flexible y continuo en la gestión cotidiana de facturas, correspondencia, trámites y control de cobros/pagos sin coste de estructura fija.',
        deliverables: ['Plan semanal de trámites', 'Control de facturación y archivos', 'Interlocución con gestorías'],
        typicalCases: 'Pymes y autónomos con sobrecarga de papeleo que necesitan liberar fines de semana.'
      },
      {
        id: 'gestion-documental',
        title: 'Gestión documental',
        description: 'Organización integral de archivos digitales y físicos, clasificación de contratos, expedientes de proyectos y protocolos de custodia.',
        deliverables: ['Estructura de carpetas ordenada', 'Nomenclatura homogénea', 'Índice maestro de contratos y pólizas'],
        typicalCases: 'Empresas con documentos dispersos en bandejas de correo y carpetas locales sin control.'
      },
      {
        id: 'organizacion-procesos',
        title: 'Organización de procesos',
        description: 'Mapeo simplificado de los flujos de trabajo diarios para eliminar pasos duplicados, retrasos innecesarios y olvidos operacionales.',
        deliverables: ['Guías paso a paso de tareas repetitivas', 'Checklists de control de calidad interno'],
        typicalCases: 'Negocios en fase de crecimiento donde cada empleado trabaja de forma diferente.'
      },
      {
        id: 'seguimiento-tareas',
        title: 'Seguimiento de tareas',
        description: 'Monitoreo activo de compromisos pendientes con clientes, proveedores y colaboradores para garantizar entregas en plazo.',
        deliverables: ['Tablero de control de compromisos', 'Alertas tempranas de vencimiento', 'Reportes semanales'],
        typicalCases: 'Direcciones generales que no pueden supervisar si los hitos acordados se están ejecutando.'
      },
      {
        id: 'soporte-operativo',
        title: 'Soporte operativo a empresas',
        description: 'Asistencia transversal ante contingencias operativas, preparación de reuniones, gestión de suministros e incidencias generales.',
        deliverables: ['Gestión de incidencias diarias', 'Coordinación de mantenimientos y compras auxiliares'],
        typicalCases: 'Oficinas y centros de trabajo que precisan un punto de apoyo resolutivo constante.'
      }
    ]
  },
  {
    id: 'personas-clientes',
    title: '2. Personas y Clientes',
    summary: 'Coordinación cercana y empática que cohesiona el equipo interno y cuida las relaciones externas.',
    services: [
      {
        id: 'seleccion-contratacion',
        title: 'Apoyo en selección y contratación',
        description: 'Criba preliminar de candidaturas, comprobación de referencias, coordinación de entrevistas y preparación de documentación previa al alta laboral.',
        deliverables: ['Informes de encaje de candidatos', 'Agenda de entrevistas', 'Expediente de incorporación listo'],
        typicalCases: 'Negocios sin departamento formal de recursos humanos que necesitan contratar personal de confianza.'
      },
      {
        id: 'coordinacion-personal',
        title: 'Coordinación de personal',
        description: 'Punto de apoyo para la comunicación interna, recopilación de partes de trabajo, resolución de dudas operativas del personal y clima de equipo.',
        deliverables: ['Canal unificado de peticiones internas', 'Protocolo de acogida de nuevos empleados'],
        typicalCases: 'Plantillas con horarios rotativos o equipos de campo con necesidad de un enlace central.'
      },
      {
        id: 'organizacion-horarios',
        title: 'Organización de horarios y turnos',
        description: 'Diseño equitativo de cuadrantes laborales, gestión de vacaciones, cambios de turno imprevistos y cobertura de bajas.',
        deliverables: ['Cuadrantes mensuales de turnos equilibrados', 'Control de horas y coberturas de emergencia'],
        typicalCases: 'Sectores con atención al público continuada o servicios por turnos.'
      },
      {
        id: 'atencion-seguimiento-clientes',
        title: 'Atención y seguimiento de clientes',
        description: 'Trato profesional y cercano en la recepción de solicitudes, resolución de dudas, encuestas de satisfacción y reactivación de contactos.',
        deliverables: ['Respuestas rápidas a consultas', 'Registro de incidencias atendidas', 'Fidelización proactiva'],
        typicalCases: 'Empresas que pierden oportunidades por no contestar a tiempo el teléfono o el email.'
      },
      {
        id: 'apoyo-admin-personal',
        title: 'Apoyo administrativo a departamentos de personal',
        description: 'Soporte auxiliar en la preparación de partes mensuales para la asesoría laboral, control de absentismos y certificados.',
        deliverables: ['Listados depurados de variables para nóminas', 'Control documental de prevención de riesgos'],
        typicalCases: 'Responsables de personal sobrecargados en cierres de mes.'
      }
    ]
  },
  {
    id: 'comercial-inmobiliaria',
    title: '3. Gestión Comercial e Inmobiliaria',
    summary: 'Impulso al negocio con rigor en la negociación, coordinación de expedientes y dinamización de operaciones.',
    services: [
      {
        id: 'apoyo-comercial',
        title: 'Apoyo comercial y prospección',
        description: 'Identificación de interlocutores clave en empresas potenciales, emisión de presentaciones de servicios y seguimiento de propuestas.',
        deliverables: ['Bases de datos depuradas de contactos', 'Seguimiento sistemático de presupuestos enviados'],
        typicalCases: 'Empresas técnicas que tienen buenos productos pero carecen de constancia en el seguimiento comercial.'
      },
      {
        id: 'coordinacion-operaciones',
        title: 'Coordinación de operaciones complejas',
        description: 'Supervisión del circuito completo de una operación desde el acuerdo inicial hasta la firma y entrega, alineando a todas las partes.',
        deliverables: ['Cronograma de hitos de la operación', 'Checklist documental previo a firmas'],
        typicalCases: 'Operaciones donde intervienen varios profesionales (abogados, técnicos, clientes, entidades).'
      },
      {
        id: 'colaboracion-inmobiliarias',
        title: 'Colaboración con agencias y promotoras',
        description: 'Soporte operativo para inmobiliarias: preparación de carpetas de inmuebles, verificación previa de cargas, concertación de visitas y atención cualificada.',
        deliverables: ['Expedientes de propiedad completos', 'Filtro inicial de solvencia e interés de compradores'],
        typicalCases: 'Agencias inmobiliarias con picos de actividad que requieren apoyo sin costes fijos.'
      },
      {
        id: 'seguimiento-cuentas-clientes',
        title: 'Seguimiento de clientes e inversores',
        description: 'Mantenimiento de contacto estrecho con clientes estratégicos para mantenerlos informados del avance de sus operaciones.',
        deliverables: ['Informes de estado quincenales o mensuales', 'Atención directa y discreta'],
        typicalCases: 'Clientes de perfil exigente que valoran la interlocución directa y resolutiva.'
      },
      {
        id: 'apoyo-proyectos-empresariales',
        title: 'Apoyo a proyectos empresariales e iniciativas',
        description: 'Colaboración en la puesta en marcha de nuevas líneas de actividad, búsqueda de proveedores auxiliares y coordinación de arranque.',
        deliverables: ['Plan de acción inicial', 'Comparativa de opciones y proveedores'],
        typicalCases: 'Emprendedores y profesionales que lanzan una nueva iniciativa y necesitan una mano derecha operativa.'
      }
    ]
  }
];

export const PROJECTS_DATA = [
  {
    id: 'gestion-inmobiliaria-propia',
    title: 'Gestión y Dirección de Negocio Inmobiliario',
    subtitle: 'Gestión Inmobiliaria y Operativa',
    tag: 'Experiencia Profesional Activa',
    period: 'En curso',
    description: 'Iniciativa independiente fundada y dirigida por Palmira Cruz dedicada a la intermediación, dirección y coordinación integral de operaciones en el sector inmobiliario. Destaca por la sólida experiencia directiva, el trato personal, la discreción y el exhaustivo control documental previo a cada transacción.',
    highlights: [
      'Dirección y coordinación directa de compraventas y arrendamientos en La Sagra y Madrid.',
      'Control riguroso de expedientes jurídicos, notas registrales, tasaciones y contratos.',
      'Fidelización de clientes e inversores locales gracias a una sólida experiencia directiva y comercial.'
    ],
    imageKey: 'eria_house_project'
  },
  {
    id: 'palmira-ai-lab',
    title: 'PALMIRA AI',
    subtitle: 'Plataforma Inteligente de Prospección y Gestión de Oportunidades',
    tag: 'Iniciativa Tecnológica',
    period: '2026',
    description: 'Sistema privado de inteligencia empresarial diseñado para detectar oportunidades de externalización de servicios, colaboraciones y ofertas administrativas en Toledo, La Sagra y la zona sur de Madrid, evaluando cada oportunidad con una fórmula matemática multicriterio transparente.',
    highlights: [
      'Motor de prospección con ponderación multicriterio objetiva (Índice 0-100).',
      'Generador de propuestas comerciales y presupuestos asistido por inteligencia artificial.',
      'Sistema de gestión comercial para un seguimiento riguroso y humano.'
    ],
    imageKey: 'palmira_ai_concept'
  },
  {
    id: 'optimizacion-pymes',
    title: 'Protocolos de Estandarización para Pequeños Negocios',
    subtitle: 'Metodología Operativa para Pymes y Comercios',
    tag: 'Metodología Profesional',
    period: 'Continuo',
    description: 'Conjunto de plantillas y dinámicas de trabajo aplicables para organizar en cuestión de días la administración dispersa de pequeños negocios familiares o despachos profesionales.',
    highlights: [
      'Manuales sencillos de relevo de puestos administrativos.',
      'Circuitos de validación rápida de pagos y archivo digital.',
      'Implantación sin software complejo ni curvas de aprendizaje lentas.'
    ],
    imageKey: 'collaboration_workspace'
  }
];

export const WHAT_I_CAN_OFFER = [
  'Administración y gestión documental.',
  'Atención al cliente.',
  'Gestión de bases de datos.',
  'Gestión de incidencias y proveedores.',
  'Coordinación de operaciones y equipos.',
  'Gestión y coordinación inmobiliaria.',
  'Apoyo comercial y seguimiento de clientes.'
];
