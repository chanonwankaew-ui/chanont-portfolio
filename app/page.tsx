'use client';

import HeroSection from '@/components/sections/HeroSection';
import CapabilityMatrix from '@/components/sections/CapabilityMatrix';
import EvidenceSection from '@/components/sections/EvidenceSection';
import ContactTerminal from '@/components/sections/ContactTerminal';
import { Signal, Award, Zap, Terminal, ChevronUp } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#05070B] text-slate-100 overflow-x-hidden">
      {/* Navigation Header HUD */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
        <nav className="glass-panel px-6 py-3.5 rounded-2xl flex items-center justify-between border-[#00F0FF]/30 shadow-2xl">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm font-bold text-white hover:text-[#00F0FF] transition">
            <Signal className="w-4 h-4 text-[#00F0FF]" />
            <span>CHANONT.W</span>
          </a>

          <div className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-300">
            <a href="#capability" className="hover:text-[#00F0FF] transition flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00FF88]" />
              Capability
            </a>
            <a href="#evidence" className="hover:text-[#00F0FF] transition flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Evidence & Certs
            </a>
            <a href="#contact" className="hover:text-[#00F0FF] transition flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#FF007A]" />
              Contact Terminal
            </a>
          </div>

          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/40 text-xs font-mono font-bold hover:bg-[#00F0FF] hover:text-black transition"
          >
            Hire Fast-Path ↗
          </a>
        </nav>
      </header>

      {/* Main Page Sections */}
      <HeroSection />
      <CapabilityMatrix />
      <EvidenceSection />
      <ContactTerminal />

      {/* Footer HUD */}
      <footer className="py-8 px-4 border-t border-white/10 text-center font-mono text-xs text-slate-500 bg-[#05070B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Chanont Wankaew. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Next.js 14+</span>
            <span>·</span>
            <span>Three.js WebGL</span>
            <span>·</span>
            <span>Glassmorphism HUD</span>
          </div>
          <a
            href="#top"
            className="p-2 rounded-lg glass-panel hover:bg-white/10 text-slate-300 transition flex items-center gap-1"
            title="Back to top"
          >
            <ChevronUp className="w-4 h-4 text-[#00F0FF]" />
            Top
          </a>
        </div>
      </footer>
    </main>
  );
}
