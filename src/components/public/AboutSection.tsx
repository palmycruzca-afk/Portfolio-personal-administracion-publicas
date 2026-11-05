import React from 'react';
import { Target, Compass, Users2, Shield, Sparkles, CheckCircle2, GraduationCap, Building2 } from 'lucide-react';
import { TRAINING_DATA, WHAT_I_CAN_OFFER } from '../../data/personalData';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-mi" className="py-20 sm:py-28 bg-[#090D18] border-y border-white/10 relative overflow-hidden">
      {/* Subtle glow orb */}
      <div 
        className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96 glow-ambient-purple blur-3xl rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Perfil & Compromiso Profesional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Criterio organizativo, serenidad operativa y respuesta inmediata
          </h2>
          <p className="text-stone-300 text-base sm:text-lg mt-3">
            Una forma de trabajar basada en entender el negocio, ordenar sus rutinas y liberar tiempo de alto valor a la dirección.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Main narrative text */}
          <div className="lg:col-span-7 space-y-6 text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              Entiendo el apoyo operativo como una pieza estratégica: detrás de cada empresa que crece hay procesos bien estructurados, personas coordinadas y clientes atendidos con rigor y calidez. Mi trabajo consiste en aportar orden donde hay sobrecarga y serenidad donde surgen fricciones diarias.
            </p>

            <p>
              He aprendido que el verdadero valor de la organización radica en el factor humano: saber escuchar a los equipos, anticipar necesidades, gestionar imprevistos con templanza y asegurar que la documentación, los plazos y las tareas clave se cumplan con precisión.
            </p>

            <p>
              Como profesional independiente y especialista en gestión, organización y desarrollo de oportunidades de negocio, cuento con amplia trayectoria directiva en la gestión de negocios y el sector inmobiliario, conociendo en primera persona la exigencia de coordinar operaciones complejas, negociar acuerdos, cuidar la atención al cliente y resolver trámites críticos sin margen para el error.
            </p>

            {/* Quote Card */}
            <div className="p-5 rounded-2xl glass-card border border-violet-500/30 relative">
              <div className="text-cyan-400 text-3xl font-serif leading-none mb-1">“</div>
              <p className="text-base text-stone-100 italic font-medium">
                No ofrezco fórmulas teóricas ni consultoría abstracta. Ofrezco manos expertas, criterio probado y disponibilidad para asumir la carga diaria que frena el crecimiento de tu proyecto.
              </p>
            </div>
          </div>

          {/* Right Column: Formación Complementaria & What I Can Offer */}
          <div className="lg:col-span-5 space-y-6">
            {/* Formación Complementaria */}
            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-violet-500/30 shadow-xl space-y-4">
              <h3 className="text-xs font-bold text-violet-300 uppercase tracking-widest flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>Formación Complementaria</span>
              </h3>

              <div className="space-y-3">
                {TRAINING_DATA.map((training) => (
                  <div key={training.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{training.title}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-950 text-cyan-300 border border-violet-700/50">
                        {training.endorsement}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {training.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Qué Puedo Aportar a una Empresa */}
            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 shadow-xl space-y-4">
              <h3 className="text-xs font-bold text-violet-300 uppercase tracking-widest flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Qué Puedo Aportar a una Empresa</span>
              </h3>

              <ul className="space-y-2.5 text-xs text-stone-300">
                {WHAT_I_CAN_OFFER.map((offer, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{offer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
