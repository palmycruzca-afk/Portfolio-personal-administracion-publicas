/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

// Public Space Components
import { PublicNavbar } from './components/public/PublicNavbar';
import { HeroSection } from './components/public/HeroSection';
import { AboutSection } from './components/public/AboutSection';
import { CapabilitiesSection } from './components/public/CapabilitiesSection';
import { ServicesSection } from './components/public/ServicesSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { ContactSection } from './components/public/ContactSection';
import { PublicFooter } from './components/public/PublicFooter';

export default function App() {
  const [contactServicePrefill, setContactServicePrefill] = useState<string>('');

  const scrollToContact = (prefillService?: string) => {
    if (prefillService) {
      setContactServicePrefill(prefillService);
    }
    const elem = document.getElementById('contacto');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const elem = document.getElementById('servicios');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] text-[#F8FAFC] flex flex-col selection:bg-cyan-500/30 selection:text-white">
      <div className="flex-1 flex flex-col">
        <PublicNavbar />

        <main className="flex-1">
          <HeroSection
            onExploreServices={scrollToServices}
          />

          <AboutSection />

          <CapabilitiesSection onSelectAreaToContact={(title) => scrollToContact(title)} />

          <ServicesSection
            onSelectServiceToContact={(serviceTitle) => {
              scrollToContact(serviceTitle);
            }}
          />

          <ProjectsSection
            onContactClick={() => scrollToContact('Colaboración en Gestión y Negocio Inmobiliario')}
          />

          <ContactSection preselectedService={contactServicePrefill} />
        </main>

        <PublicFooter />
      </div>
    </div>
  );
}
