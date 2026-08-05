'use client';

import CellTowerCanvas from '@/components/3d/CellTowerCanvas';
import CyberHUD from '@/components/ui/CyberHUD';
import { Download, UserCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen pt-36 pb-24 px-4 sm:px-8 flex items-center justify-center bg-[#05070B] text-slate-100 overflow-hidden">
      {/* 3D WebGL Canvas Layer */}
      <CellTowerCanvas />
      
      {/* Glassmorphic Cyber HUD */}
      <CyberHUD />

      {/* Hero UI Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* ข้อความหลักด้านซ้าย */}
        <div className="lg:col-span-8 space-y-7">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel text-[#00F0FF] text-xs font-mono uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
            Telecom Data Analytics · RF Optimization · CEM Focus
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
            Engineering signal.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-emerald-300 to-[#8B5CF6]">
              Intelligent action.
            </span>
          </h1>

          <p className="text-xl text-slate-200 font-semibold">
            Senior Telecom Data Analyst & AI Solutions Specialist (CEM Focus)
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            วิศวกรโทรคมนาคมและผู้เชี่ยวชาญด้านการวิเคราะห์ข้อมูลที่มีประสบการณ์ RAN/RF Planning & Optimization (3G/4G/5G NR) มากกว่า 10 ปี ผสานการวิจัยพัฒนา AI เชิงลึก (340+ วัน)
          </p>

          <div className="flex flex-wrap gap-3.5 font-mono text-xs">
            <a href="#evidence" className="px-6 py-3.5 rounded-xl bg-[#00F0FF] text-black font-bold hover:bg-white transition shadow-[0_0_25px_rgba(0,240,255,0.4)]">
              View Engineering Evidence ↗
            </a>
            <a href="/Chanont_Wankaew_Resume.pdf" download className="px-6 py-3.5 rounded-xl glass-panel text-white hover:bg-white/10 transition flex items-center gap-2">
              <Download className="w-4 h-4 text-[#00F0FF]" />
              Download Resume PDF ↘
            </a>
          </div>
        </div>

        {/* Recruiter Fast-Path Card ด้านขวา */}
        <div className="lg:col-span-4 glass-panel p-7 rounded-2xl border-[#00F0FF]/30 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#00F0FF]" />
              Recruiter Fast-Path
            </h3>
            <span className="text-[10px] font-mono text-[#00FF88] bg-[#00FF88]/10 px-2.5 py-0.5 rounded-full border border-[#00FF88]/30 font-semibold">AVAILABLE</span>
          </div>

          <div className="space-y-3.5 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Role Fit</span>
              <p className="text-slate-200 font-sans font-medium">Senior Telecom Analytics, RF Optimization & CEM Specialist</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Location</span>
              <p className="text-slate-200 font-sans font-medium">Sattahip, Chonburi / BMA, Thailand</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
