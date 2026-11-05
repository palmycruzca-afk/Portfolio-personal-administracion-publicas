import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/personalData';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceInterest: '',
    location: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceInterest: preselectedService }));
    }
  }, [preselectedService]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Por favor, introduce tu nombre o el de tu empresa.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Introduce una dirección de correo válida para responderte.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Describe brevemente en qué podemos colaborar (mínimo 10 caracteres).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      serviceInterest: '',
      location: '',
      message: '',
    });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contacto" className="py-20 sm:py-28 bg-[#090D18] border-t border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="absolute bottom-0 right-1/4 w-[600px] h-[500px] glow-ambient-purple blur-3xl rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info & Value */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Contacto Directo & Colaboraciones</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Hablemos de tu proyecto o necesidad operativa
              </h2>
              <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed font-normal">
                Si buscas externalizar tareas administrativas, requieres soporte en coordinación de personas o deseas explorar una colaboración inmobiliaria o comercial, conversemos sin compromiso.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-xl glass-card border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-violet-950 border border-violet-800/40 text-violet-300 shrink-0">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                    Correo electrónico directo
                  </div>
                  <a 
                    href={`mailto:${PERSONAL_DATA.email}`} 
                    className="font-bold text-white hover:text-cyan-300 transition-colors text-base"
                  >
                    {PERSONAL_DATA.email}
                  </a>
                  <div className="text-[11px] text-stone-400 mt-0.5">Respuesta habitualmente en menos de 24 horas laborables.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl glass-card border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-indigo-950 border border-indigo-800/40 text-indigo-300 shrink-0">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                    Ubicación y cobertura
                  </div>
                  <div className="font-bold text-white text-base">
                    Illescas, Toledo y Sur de Madrid
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Modalidad presencial, híbrida o soporte remoto para toda España.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl glass-card border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-stone-900 border border-white/10 text-stone-300 shrink-0">
                  <Clock className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                    Disponibilidad y horario
                  </div>
                  <div className="text-stone-200 text-sm mt-1 leading-relaxed font-medium">
                    «Preferencia por oportunidades profesionales en horario de mañana, con especial interés en jornadas intensivas o parciales que permitan una buena organización y continuidad en el trabajo».
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-700/40 text-xs text-stone-300">
              <span className="font-bold text-cyan-300">Compromiso de confidencialidad: </span>
              Toda la información compartida sobre tu empresa se trata con estricta reserva profesional.
            </div>
          </div>

          {/* Right Column: Modern Glass Form */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-9 border border-white/15 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-cyan-950 border border-cyan-500/40 text-cyan-300 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-cyan-900/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  ¡Mensaje preparado y registrado!
                </h3>
                <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                  Gracias por tu interés, <strong>{formData.name}</strong>. He recibido los detalles de tu consulta sobre <strong>{formData.serviceInterest || 'colaboración operativa'}</strong>. Me pondré en contacto contigo en breve para revisar tu proyecto.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-widest mb-1.5">
                      Nombre y apellidos *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Carmen Rodríguez"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 ${
                        errors.name ? 'border-red-500' : 'border-white/10'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-widest mb-1.5">
                      Empresa o proyecto
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ej. Distribuidora Sur S.L."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-widest mb-1.5">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="carmen@empresa.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-widest mb-1.5">
                      Teléfono de contacto
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="600 000 000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-widest mb-1.5">
                      Área o servicio de interés
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={e => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                    >
                      <option value="" className="bg-slate-900 text-white">Selecciona un área...</option>
                      <option value="Apoyo administrativo externo" className="bg-slate-900 text-white">Apoyo administrativo externo</option>
                      <option value="Gestión documental" className="bg-slate-900 text-white">Gestión documental y archivo</option>
                      <option value="Organización de procesos" className="bg-slate-900 text-white">Organización de procesos</option>
                      <option value="Coordinación de personal y turnos" className="bg-slate-900 text-white">Coordinación de personal y turnos</option>
                      <option value="Atención y seguimiento de clientes" className="bg-slate-900 text-white">Atención y seguimiento de clientes</option>
                      <option value="Colaboración inmobiliaria (Gestión Inmobiliaria Propia)" className="bg-slate-900 text-white">Colaboración inmobiliaria (Gestión Inmobiliaria Propia)</option>
                      <option value="Propuesta personalizada a medida" className="bg-slate-900 text-white">Propuesta personalizada a medida</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-widest mb-1.5">
                      Localización del negocio
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ej. Illescas, Toledo, Getafe, Remoto..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-widest mb-1.5">
                    ¿En qué situación u operativa necesitas apoyo? *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntame brevemente el reto actual de tu empresa (horas estimadas, tipo de tareas o proyecto a desatascar)..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 ${
                      errors.message ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl text-sm font-bold text-stone-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-300 hover:from-cyan-300 hover:to-violet-200 shadow-lg shadow-cyan-500/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                  >
                    {isSubmitting ? (
                      <span>Procesando solicitud...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-stone-900" />
                        <span>Enviar solicitud de información</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-stone-400 text-center mt-2.5">
                    Sin compromiso comercial inicial. Revisión directa y personalizada por Palmira Cruz.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
