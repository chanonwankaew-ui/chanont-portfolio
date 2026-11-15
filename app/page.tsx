'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import CellTowerCanvasWrapper from '@/components/3d/CellTowerCanvasWrapper';
import CapabilitySection from '@/components/sections/CapabilitySection';
import CredentialsSection from '@/components/sections/CredentialsSection';
import EvidenceSection from '@/components/sections/EvidenceSection';
import TerminalSection from '@/components/sections/TerminalSection';
import TimelineSection from '@/components/sections/TimelineSection';
import { navigation, profile, type SectionId } from '@/lib/data';

function SectionContent({ section }: { section: Exclude<SectionId, 'home'> }) {
  switch (section) {
    case 'capabilities':
      return <CapabilitySection />;
    case 'evidence':
      return <EvidenceSection />;
    case 'timeline':
      return <TimelineSection />;
    case 'credentials':
      return <CredentialsSection />;
    case 'terminal':
      return <TerminalSection />;
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  return (
    <div className="min-h-dvh overflow-hidden bg-black text-white">
      <CellTowerCanvasWrapper />

      <main id="main-content" className="relative z-10">
        {activeSection === 'home' ? (
          <section className="relative flex min-h-dvh items-center justify-center px-5 pb-24 text-center">
            <div className="section-enter w-full">
              <h1 className="text-balance text-5xl font-semibold tracking-[-0.065em] text-white sm:text-7xl md:text-8xl lg:text-9xl">
                {profile.name}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-zinc-400 sm:mt-7 sm:text-xl sm:leading-8">
                {profile.role}
              </p>
            </div>

            <nav
              aria-label="Portfolio sections"
              className="fixed bottom-6 left-1/2 z-20 grid w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 grid-cols-2 gap-1 rounded-3xl border border-white/10 bg-white/[0.05] p-2 backdrop-blur-xl sm:flex sm:w-auto sm:rounded-full"
            >
              {navigation.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className="rounded-full px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </section>
        ) : (
          <section className="fixed inset-0 overflow-y-auto bg-black/45 backdrop-blur-[2px]">
            <div className="pointer-events-none fixed inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/70 to-transparent" />
            <div className="section-enter mx-auto min-h-full w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
              <SectionContent section={activeSection} />
            </div>
            <button
              type="button"
              onClick={() => setActiveSection('home')}
              className="fixed right-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-zinc-200 backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:top-8"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Close
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
