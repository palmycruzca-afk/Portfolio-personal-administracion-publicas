/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveAppView, AiTab, Opportunity, CrmStatus, CrmNote } from './types';
import { INITIAL_OPPORTUNITIES } from './data/mockOpportunities';

// Public Space Components
import { PublicNavbar } from './components/public/PublicNavbar';
import { HeroSection } from './components/public/HeroSection';
import { AboutSection } from './components/public/AboutSection';
import { CapabilitiesSection } from './components/public/CapabilitiesSection';
import { ServicesSection } from './components/public/ServicesSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { ContactSection } from './components/public/ContactSection';
import { PublicFooter } from './components/public/PublicFooter';

// AI Space Components
import { AiNavbar } from './components/ai/AiNavbar';
import { AiDashboard } from './components/ai/AiDashboard';
import { Top10Opportunities } from './components/ai/Top10Opportunities';
import { OpportunitySearch } from './components/ai/OpportunitySearch';
import { CrmPipelineView } from './components/ai/CrmPipelineView';
import { EmploymentEvaluator } from './components/ai/EmploymentEvaluator';
import { OpportunityDetailModal } from './components/ai/OpportunityDetailModal';
import { ProposalGeneratorModal } from './components/ai/ProposalGeneratorModal';

// Shared Components
import { ModeSwitcher } from './components/shared/ModeSwitcher';

const LOCAL_STORAGE_KEY = 'palmira_cruz_opportunities_v1';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveAppView>('public');
  const [aiTab, setAiTab] = useState<AiTab>('dashboard');

  // Load opportunities from localStorage or fallback to INITIAL_OPPORTUNITIES
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load opportunities from localStorage', e);
    }
    return INITIAL_OPPORTUNITIES;
  });

  // Modal states
  const [detailOpportunity, setDetailOpportunity] = useState<Opportunity | null>(null);
  const [proposalOpportunity, setProposalOpportunity] = useState<Opportunity | null>(null);
  const [contactServicePrefill, setContactServicePrefill] = useState<string>('');

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(opportunities));
    } catch (e) {
      console.warn('Could not save opportunities to localStorage', e);
    }
  }, [opportunities]);

  // Handlers for CRM updates
  const handleStatusChange = (oppId: string, newStatus: CrmStatus) => {
    setOpportunities(prev =>
      prev.map(opp => {
        if (opp.id === oppId) {
          const statusNote: CrmNote = {
            id: 'n-' + Date.now(),
            date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            author: 'Palmira Cruz',
            text: `Estado cambiado a: ${newStatus.replace('_', ' ')}`,
          };
          return {
            ...opp,
            crmStatus: newStatus,
            notes: [...opp.notes, statusNote],
          };
        }
        return opp;
      })
    );
  };

  const handleAddNote = (oppId: string, noteText: string) => {
    const newNote: CrmNote = {
      id: 'n-' + Date.now(),
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      author: 'Palmira Cruz',
      text: noteText,
    };

    setOpportunities(prev =>
      prev.map(opp => (opp.id === oppId ? { ...opp, notes: [...opp.notes, newNote] } : opp))
    );
  };

  const handleSaveProposal = (oppId: string, updatedDraft: string, noteText: string) => {
    const newNote: CrmNote = {
      id: 'n-' + Date.now(),
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      author: 'Palmira AI (Propuesta)',
      text: noteText,
    };

    setOpportunities(prev =>
      prev.map(opp => {
        if (opp.id === oppId) {
          return {
            ...opp,
            proposalDraft: updatedDraft,
            crmStatus: opp.crmStatus === 'detectada' || opp.crmStatus === 'pendiente_analizar' || opp.crmStatus === 'seleccionada'
              ? 'propuesta_preparada'
              : opp.crmStatus,
            notes: [...opp.notes, newNote],
          };
        }
        return opp;
      })
    );
  };

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
      {/* View 1: Public Brand Space */}
      {currentView === 'public' && (
        <div className="flex-1 flex flex-col">
          <PublicNavbar
            onOpenAi={() => {
              setCurrentView('ai');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContactClick={() => scrollToContact()}
          />

          <main className="flex-1">
            <HeroSection
              onExploreServices={scrollToServices}
              onContactClick={() => scrollToContact()}
              onOpenAi={() => {
                setCurrentView('ai');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <AboutSection />

            <CapabilitiesSection onSelectAreaToContact={(title) => scrollToContact(title)} />

            <ServicesSection
              onSelectServiceToContact={(serviceTitle) => {
                scrollToContact(serviceTitle);
              }}
            />

            <ProjectsSection
              onOpenAi={() => {
                setCurrentView('ai');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onContactClick={() => scrollToContact('Colaboración en Gestión y Negocio Inmobiliario')}
            />

            <ContactSection preselectedService={contactServicePrefill} />
          </main>

          <PublicFooter
            onOpenAi={() => {
              setCurrentView('ai');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* View 2: Private AI Space */}
      {currentView === 'ai' && (
        <div className="flex-1 flex flex-col bg-[#070913]">
          <AiNavbar
            activeTab={aiTab}
            onTabChange={setAiTab}
            onBackToPublic={() => {
              setCurrentView('public');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {aiTab === 'dashboard' && (
              <AiDashboard
                opportunities={opportunities}
                onNavigateTab={setAiTab}
                onSelectOpportunity={setDetailOpportunity}
                onPrepareProposal={setProposalOpportunity}
              />
            )}

            {aiTab === 'top10' && (
              <Top10Opportunities
                opportunities={opportunities}
                onSelectOpportunity={setDetailOpportunity}
                onPrepareProposal={setProposalOpportunity}
              />
            )}

            {aiTab === 'search' && (
              <OpportunitySearch
                opportunities={opportunities}
                onSelectOpportunity={setDetailOpportunity}
                onPrepareProposal={setProposalOpportunity}
              />
            )}

            {aiTab === 'crm' && (
              <CrmPipelineView
                opportunities={opportunities}
                onStatusChange={handleStatusChange}
                onAddNote={handleAddNote}
                onSelectOpportunity={setDetailOpportunity}
                onPrepareProposal={setProposalOpportunity}
              />
            )}

            {aiTab === 'empleo' && (
              <EmploymentEvaluator
                opportunities={opportunities}
                onSelectOpportunity={setDetailOpportunity}
                onPrepareProposal={setProposalOpportunity}
              />
            )}
          </main>
        </div>
      )}

      {/* Floating Bottom View Toggle Bar for effortless navigation */}
      <aside aria-label="Selector de espacio" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
        <ModeSwitcher currentView={currentView} onViewChange={setCurrentView} />
      </aside>

      {/* Modals */}
      <OpportunityDetailModal
        opportunity={detailOpportunity}
        onClose={() => setDetailOpportunity(null)}
        onPrepareProposal={(opp) => {
          setDetailOpportunity(null);
          setProposalOpportunity(opp);
        }}
      />

      <ProposalGeneratorModal
        opportunity={proposalOpportunity}
        isOpen={Boolean(proposalOpportunity)}
        onClose={() => setProposalOpportunity(null)}
        onSaveToCrm={handleSaveProposal}
      />
    </div>
  );
}
