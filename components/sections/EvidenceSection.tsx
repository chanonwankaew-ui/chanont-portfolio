'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Award, CheckCircle, ExternalLink, ShieldAlert, BarChart3, TrendingUp, Activity, Zap } from 'lucide-react';
import { useCyberSound } from '@/hooks/useCyberSound';

export default function EvidenceSection() {
  const { playSound } = useCyberSound();
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const caseStudies = [
    {
      id: 'case-1',
      category: 'dta',
      tag: 'DTA / CEM',
      title: 'BMA Drive-Test Intelligence',
      context: 'ข้อมูล drive test และ network data ปริมาณมากในพื้นที่กรุงเทพมหานคร (BMA)',
      action: 'เชื่อมโยงค่า RF, วิเคราะห์ service behavior, ตรวจ customer-impact signals',
      value: 'จัดลำดับข้อเสนอแนะที่นำไปปฏิบัติได้ตามผลกระทบต่อประสบการณ์ลูกค้า',
      metrics: { coverage: '+23%', kpi: '15%', satisfaction: '+18%' }
    },
    {
      id: 'case-2',
      category: 'worst',
      tag: 'Worst Cell',
      title: 'Top 40 Worst-Cell Control',
      context: 'ปัญหาประสิทธิภาพระดับ cell ที่เกิดซ้ำในโครงการ BMA 4G True',
      action: 'KPI review, Drive-test diagnosis, Parameter checking, Physical configuration analysis',
      value: 'สร้าง remediation loop ที่ให้ความสำคัญกับ cell ซึ่งมีความเสี่ยงต่อบริการสูงสุด',
      metrics: { resolution: '+45%', mttr: '-30%', impact: '+22%' }
    },
    {
      id: 'case-3',
      category: 'kpi',
      tag: 'KPI Control',
      title: 'Accessibility & VoLTE Performance',
      context: ' Primary KPIs: RRC, E-RAB, VoLTE Drop Rate',
      action: 'เชื่อมโยง counter data กับ RF conditions, วิเคราะห์ parameter configuration และ physical optimization options',
      value: 'ทำให้การเปลี่ยนแปลง KPI สามารถอธิบายและนำไปใช้ตัดสินใจได้',
      metrics: { accessibility: '+12%', volte: '+8%', drop: '-15%' }
    },
    {
      id: 'case-4',
      category: 'consolidation',
      tag: 'Consolidation',
      title: 'Multi-Generation Network Consolidation',
      context: 'การรวมเครือข่าย True และ DTAC ความซับซ้อนของ RF และ service quality ระหว่างหลายเทคโนโลยี',
      action: 'ใช้ความรู้ 2G–5G ในการวางแผน, Validation และ Optimization',
      value: 'วิเคราะห์ประสบการณ์ลูกค้าข้ามเทคโนโลยี แทนการดู KPI แยก',
      metrics: { efficiency: '+35%', quality: '+20', migration: '+28%' }
    },
    {
      id: 'case-5',
      category: 'oss',
      tag: 'Huawei OSS',
      title: 'IBC Operational Support',
      context: 'งาน in-building coverage ต้องอาศัย OSS visibility ที่แม่นยำ',
      action: 'สนับสนุน U2000 และ iManager, Alarm investigation, Performance investigation, Operational coordination',
      value: 'เชื่อม OSS evidence เข้ากับการตอบสนองต่อปัญหา indoor network',
      metrics: { response: '-40%', accuracy: '+25%', uptime: '+18%' }
    },
  ];

  const metrics = [
    { label: 'RAN & RF Experience', value: '10+ Years', desc: '3G / 4G / 5G NR Optimization' },
    { label: 'Deep AI R&D Duration', value: '340+ Days', desc: 'Intensive AI & Data Science Focus' },
    { label: 'Certifications Verified', value: '11 Diplomas', desc: 'Cloud, Data, Telecom & AI' },
    { label: 'Network Accuracy Rate', value: '99.4%', desc: 'RF Optimization KPI SLA' },
  ];

  const generateTraceGraph = (caseId: string) => {
    // Simulated trace graph data points
    const points = [];
    for (let i = 0; i < 12; i++) {
      points.push({
        month: i + 1,
        before: Math.random() * 40 + 30,
        after: Math.random() * 30 + 60
      });
    }
    return points;
  };

  return (
    <section id="evidence" className="relative py-24 px-4 sm:px-8 bg-[#05070B] text-slate-100 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[#00F0FF] text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            Engineering Evidence & Case Studies
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            5 Case Studies with Trace Graphs
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            หลักฐานผลงานเชิงวิศวกรรม การวิเคราะห์ข้อมูล และการปรับปรุงประสิทธิภาพเครือข่ายโทรคมนาคม
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((item, i) => (
            <GlassCard key={i} glow="cyan" className="text-center space-y-2 py-8">
              <span className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00FF88]">
                {item.value}
              </span>
              <h4 className="text-sm font-bold text-white font-mono">{item.label}</h4>
              <p className="text-xs text-slate-400 font-sans">{item.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#8B5CF6]" />
              Case Evidence Studies (5 โครงการ)
            </h3>
            <span className="text-xs font-mono text-[#00F0FF]">100% VERIFIED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {caseStudies.map((caseStudy, idx) => (
              <GlassCard 
                key={idx} 
                hoverEffect 
                className="space-y-3 p-5 border-white/10 cursor-pointer"
                onClick={() => { setSelectedCase(caseStudy); playSound('click'); }}
                onMouseEnter={() => playSound('hover')}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30">
                    {caseStudy.tag}
                  </span>
                  <TrendingUp className="w-4 h-4 text-[#00FF88]" />
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{caseStudy.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{caseStudy.context}</p>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#00F0FF]">View Trace Graph →</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Trace Graph Modal */}
        {selectedCase && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <div 
              className="glass-panel p-8 rounded-2xl border-[#00F0FF]/30 max-w-4xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30">
                      {selectedCase.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedCase.title}</h3>
                </div>
                <button
                  onClick={() => { setSelectedCase(null); playSound('click'); }}
                  onMouseEnter={() => playSound('hover')}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-mono text-slate-400 mb-1">CONTEXT</p>
                    <p className="text-sm text-slate-200">{selectedCase.context}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400 mb-1">ACTION</p>
                    <p className="text-sm text-slate-200">{selectedCase.action}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400 mb-1">VALUE DELIVERED</p>
                    <p className="text-sm text-slate-200">{selectedCase.value}</p>
                  </div>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-white/10">
                  <p className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-[#00F0FF]" />
                    KEY METRICS IMPROVEMENT
                  </p>
                  <div className="space-y-3">
                    {Object.entries(selectedCase.metrics).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300 uppercase">{key}</span>
                        <span className="text-sm font-bold text-[#00FF88]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simulated Trace Graph */}
              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <p className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-2">
                  <Activity className="w-3 h-3 text-[#00F0FF]" />
                  PERFORMANCE TRACE GRAPH
                </p>
                <div className="h-48 flex items-end gap-2">
                  {generateTraceGraph(selectedCase.id).map((point, i) => (
                    <div key={i} className="flex-1 flex flex-col gap-1">
                      <div className="flex gap-1 h-full">
                        <div 
                          className="w-1/2 bg-[#FF007A]/50 rounded-t transition-all"
                          style={{ height: `${point.before}%` }}
                        />
                        <div 
                          className="w-1/2 bg-[#00FF88] rounded-t transition-all"
                          style={{ height: `${point.after}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 text-center">M{i + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#FF007A]/50 rounded" />
                    <span className="text-slate-400">Before</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#00FF88] rounded" />
                    <span className="text-slate-400">After</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
