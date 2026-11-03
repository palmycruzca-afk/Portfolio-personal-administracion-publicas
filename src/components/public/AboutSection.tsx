import React from 'react';
import { Target, Compass, Users2, Shield, AlertCircle, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/personalData';

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main narrative text */}
          <div className="lg:col-span-7 space-y-6 text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              Entiendo el apoyo operativo como una pieza estratégica: detrás de cada empresa que crece hay procesos bien estructurados, personas coordinadas y clientes atendidos con rigor y calidez. Mi trabajo consiste en aportar orden donde hay sobrecarga y serenidad donde surgen fricciones diarias.
            </p>

            <p>
              He aprendido que el verdadero valor de la organización radica en el factor humano: saber escuchar a los equipos, anticipar necesidades, gestionar imprevistos con templanza y asegurar que la documentación, los plazos y las tareas clave se cumplan con precisión.
            </p>

            <p>
              Como profesional independiente y empresaria al frente de <strong>ERIA HOUSE</strong>, conozco en primera persona la exigencia de coordinar operaciones complejas, negociar acuerdos, cuidar la atención al cliente y resolver trámites críticos sin margen para el error.
            </p>

            {/* Quote Card */}
            <div className="p-5 rounded-2xl glass-card border border-violet-500/30 relative">
              <div className="text-cyan-400 text-3xl font-serif leading-none mb-1">“</div>
              <p className="text-base text-stone-100 italic font-medium">
                No ofrezco fórmulas teóricas ni consultoría abstracta. Ofrezco manos expertas, criterio probado y disponibilidad para asumir la carga diaria que frena el crecimiento de tu proyecto.
              </p>
            </div>
          </div>

          {/* Right Column: How I Can Help Your Business */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              <h3 className="text-xs font-bold text-violet-300 uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>¿Cómo puedo ayudar a tu empresa?</span>
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4 items-start p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="p-2 rounded-lg bg-violet-950 text-violet-300 shrink-0 border border-violet-800/40">
                    <Target className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Liberando tiempo a la dirección</h4>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Asumo el control documental, la gestión de turnos y el papeleo que consume tus tardes y fines de semana.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-300 shrink-0 border border-indigo-800/40">
                    <Compass className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Autonomía e iniciativa resolutiva</h4>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Sin necesidad de microgestión. Localizo dónde está el atasco operativo y aplico la solución más directa.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="p-2 rounded-lg bg-teal-950 text-teal-300 shrink-0 border border-teal-800/40">
                    <Users2 className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Coordinación empática con personas</h4>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Interlocución cordial y firme con empleados, colaboradores externos y clientes finales.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="p-2 rounded-lg bg-stone-900 text-stone-300 shrink-0 border border-white/10">
                    <Shield className="w-5 h-5 text-stone-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Confidencialidad y compromiso estricto</h4>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Máxima reserva en el manejo de documentación sensible, contratos mercantiles y acuerdos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                <span className="font-semibold text-stone-300">Zona de actuación:</span>
                <span>Illescas · Toledo · Madrid Sur · Remoto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
