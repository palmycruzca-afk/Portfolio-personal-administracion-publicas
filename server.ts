import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI with provided key:', err);
  }
}

// Helper to produce a high quality deterministic fallback in Spanish
function generateTemplateProposal(params: {
  documentType: string;
  opportunityTitle: string;
  companyName: string;
  sector: string;
  servicesOffered: string[];
  tone?: string;
  weeklyHours?: number;
  workMode?: string;
}) {
  const { documentType, opportunityTitle, companyName, sector, servicesOffered, weeklyHours = 15, workMode = 'Híbrido' } = params;
  const servicesList = servicesOffered.length > 0 ? servicesOffered.join(', ') : 'Apoyo administrativo externo y coordinación operativa';

  switch (documentType) {
    case 'primer_contacto':
      return `Asunto: Colaboración operativa y apoyo en gestión — Palmira Cruz / ${companyName}

Estimado/a responsable de ${companyName},

Me pongo en contacto con ustedes tras seguir de cerca el desarrollo de su actividad en el sector ${sector}. Mi nombre es Palmira Cruz y desarrollo mi labor profesional de forma independiente ofreciendo apoyo operativo, gestión documental y coordinación de procesos para empresas y proyectos en crecimiento.

He identificado que para mantener la agilidad de ${companyName}, la externalización de tareas clave como ${servicesList} puede liberar tiempo de alto valor para su equipo directivo y técnico.

Cuento con una trayectoria sólida en empresas de alta exigencia (inmobiliaria, gran distribución y corporativo) aportando organización metódica, cercanía y una clara orientación a resolver cuellos de botella diarios.

¿Sería posible coordinar una breve conversación de 10 minutos esta semana para explorar si existe encaje de colaboración?

Agradezco de antemano su atención.

Atentamente,
Palmira Cruz
Consultoría Operativa & Coordinación
Contacto: palmycruzca@gmail.com | Illescas (Toledo) / Sur de Madrid`;

    case 'propuesta_colaboracion':
      return `# PROPUESTA DE COLABORACIÓN OPERATIVA
**Para:** ${companyName} (${sector})
**De:** Palmira Cruz — Profesional Independiente
**Fecha:** ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
**Modalidad prevista:** ${workMode} (~${weeklyHours} horas/semana)

---

### 1. OBJETIVO DEL SERVICIO
Proporcionar a ${companyName} un soporte operativo y de gestión ágil, riguroso y adaptado a sus necesidades, asumiendo la carga de ${servicesList} sin comprometer la estructura de costes fijos de la compañía.

### 2. ÁREAS DE INTERVENCIÓN Y SERVICIOS PROPUESTOS
- **Organización y Estandarización Documental:** Estructuración de flujos de expedientes, contratos y seguimiento de tareas pendientes.
- **Coordinación Operativa y de Clientes:** Punto de enlace resolutivo para proveedores, interlocutores y seguimiento de cuentas clave.
- **Soporte Administrativo Flexible:** Atención ágil de gestiones periódicas y optimización de tiempos de respuesta interna.

### 3. BENEFICIOS CLAVE PARA ${companyName.toUpperCase()}
1. **Flexibilidad total:** Contratación por horas o módulo mensual según la carga de trabajo real.
2. **Experiencia contrastada:** Enfoque resolutivo forjado en entornos de alta demanda y volumen.
3. **Disponibilidad inmediata:** Sin procesos de onboarding largos ni costes de contratación directa.
4. **Cercanía geográfica:** Capacidad de soporte presencial en Illescas/Toledo/Sur de Madrid y coordinación remota fluida.

### 4. METODOLOGÍA DE TRABAJO
- **Fase 1 (Semana 1):** Diagnóstico rápido de procesos y alineación de prioridades con el interlocutor asignado.
- **Fase 2 (Semanas 2-4):** Asunción progresiva de la operativa con reportes semanales de avance y estado de tareas.
- **Fase 3 (Mensual):** Revisión de resultados y ajuste de dedicación según los hitos empresariales.

---
*Documento editable generado por Palmira AI. Requiere validación y firma de ambas partes.*`;

    case 'presupuesto_orientativo':
      return `# ESTIMACIÓN ECONÓMICA Y PRESUPUESTO ORIENTATIVO
**Cliente:** ${companyName}
**Servicios:** ${servicesList}
**Elaborado por:** Palmira Cruz

---

### OPCIÓN A — BOLSA DE HORAS FLEXIBLE (Ideal para proyectos puntuales)
- **Volumen:** 20 horas mensuales adaptables
- **Tarifa hora orientativa:** 28 € - 35 € / hora (+ IVA)
- **Compromiso:** Sin permanencia, consumo trimestral
- **Incluye:** Gestión documental, soporte administrativo prioritario y resumen mensual de tareas ejecutadas.

### OPCIÓN B — RETAINER OPERATIVO MENSUAL (Recomendado para continuidad)
- **Dedicación:** ~${weeklyHours} horas semanales (aprox. 60 horas/mes)
- **Inversión mensual estimada:** 1.450 € - 1.850 € / mes (+ IVA)
- **Modalidad:** ${workMode} (Soporte remoto permanente + sesiones presenciales de coordinación en Toledo/Madrid)
- **Ventajas:** Disponibilidad prioritaria garantizada y supervisión integral de procesos.

### CONDICIONES Y VALIDEZ
- Los importes son orientativos y se ajustarán tras definir el alcance exacto de las tareas.
- Facturación mensual mediante factura profesional de servicios independientes.
- Validez de la estimación: 30 días naturales.`;

    default:
      return `# PRESENTACIÓN PROFESIONAL Y RESUMEN EJECUTIVO
**Dirigido a:** ${companyName}
**Especialidad:** ${servicesList}
**Profesional:** Palmira Cruz (palmycruzca@gmail.com)

Palmira Cruz aporta a ${companyName} una combinación probada de rigor administrativo, capacidad de negociación y coordinación interpersonal. Sus fortalezas clave abarcan la gestión documental y de procesos, la coordinación de personas y turnos, la atención al cliente de alto nivel y el desarrollo de operaciones e iniciativas empresariales como ERIA HOUSE, permitiéndole incorporarse de forma inmediata y generar orden operativo desde el primer día.

**Propuesta de valor:** Transformar tareas administrativas complejas y dispersas en flujos sencillos, medibles y desatendidos para la dirección de la empresa.`;
  }
}

// POST endpoint for AI generation
app.post('/api/gemini/generate-proposal', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      opportunityTitle = '',
      companyName = 'Empresa Colaboradora',
      sector = 'Servicios Empresariales',
      servicesOffered = [],
      documentType = 'propuesta_colaboracion',
      tone = 'ejecutivo',
      weeklyHours = 15,
      workMode = 'Híbrido',
      customNotes = '',
    } = req.body;

    // If Gemini API Key is available, use official @google/genai SDK
    if (aiClient && process.env.GEMINI_API_KEY) {
      try {
        const prompt = `Eres un redactor comercial senior y asesor de desarrollo de negocio especializado en consultoría B2B y servicios independientes para Palmira Cruz.
Palmira Cruz es una profesional independiente y empresaria con capacidades consolidadas en 4 áreas clave:
- Gestión administrativa y organización: control documental, procesos, seguimiento de operaciones y planificación del trabajo.
- Gestión de personas: apoyo en selección y contratación, cuadrantes y turnos, coordinación de equipos y resolución de incidencias.
- Atención al cliente y gestión comercial: seguimiento de clientes, resolución de consultas, fidelización y relaciones profesionales.
- Coordinación y desarrollo de negocios: organización de operaciones, coordinación de colaboradores e iniciativa empresarial en ERIA HOUSE.

Debes redactar un documento profesional en español impecable, sin clichés artificiales ("supercharge", "elevar", etc.), con tono ${tone}, directo, estructurado y de alto impacto empresarial.

DATOS DE LA OPORTUNIDAD:
- Tipo de documento solicitado: ${documentType} (opciones: primer_contacto, propuesta_colaboracion, presentacion_comercial, presupuesto_orientativo, correo_seguimiento)
- Empresa objetivo: ${companyName}
- Sector: ${sector}
- Título de la oportunidad: ${opportunityTitle}
- Servicios específicos que ofrece Palmira: ${servicesOffered.join(', ') || 'Apoyo administrativo externo y coordinación operativa'}
- Dedicación estimada: ${weeklyHours} horas/semana en modalidad ${workMode}
- Notas adicionales / contexto: ${customNotes || 'Ninguna'}

REGLAS DE FORMATO:
- En español formal, natural y elegante.
- Enfocado en la utilidad directa para la empresa cliente y en cómo Palmira resuelve sus cuellos de botella.
- No inventar titulaciones oficiales ni acreditaciones inexistentes.
- Todos los precios deben ser presentados como orientativos y pendientes de validación.
- Incluir un pie indicando que el texto es un borrador de trabajo editable para revisión previa al envío.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'Actúa como consultor de comunicación B2B para la marca personal de Palmira Cruz. No uses lenguaje robótico ni frases vacías.',
          },
        });

        const generatedText = response.text;
        if (generatedText && generatedText.trim().length > 50) {
          res.json({
            success: true,
            source: 'gemini-3.8-flash',
            content: generatedText.trim(),
          });
          return;
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to smart template:', geminiError?.message || geminiError);
      }
    }

    // High fidelity template fallback
    const fallbackText = generateTemplateProposal({
      documentType,
      opportunityTitle,
      companyName,
      sector,
      servicesOffered,
      tone,
      weeklyHours,
      workMode,
    });

    res.json({
      success: true,
      source: 'template_engine',
      content: fallbackText,
    });
  } catch (error: any) {
    console.error('Error handling /api/gemini/generate-proposal:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno al generar el documento.',
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Palmira Cruz + Palmira AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
