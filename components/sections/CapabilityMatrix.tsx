'use client';

import GlassCard from '@/components/ui/GlassCard';
import { Cpu, Signal, Database, Terminal, ShieldCheck, Zap } from 'lucide-react';

export default function CapabilityMatrix() {
  const capabilities = [
    {
      title: 'Telecom RAN & RF Optimization',
      subtitle: '3G / 4G LTE / 5G NR Expertise',
      icon: Signal,
      color: '#00F0FF',
      skills: [
        '5G NR Dynamic Spectrum Sharing (DSS)',
        'Beamforming & Massive MIMO Tuning',
        'Drive Test & Log File Analysis (TEMS, Atoll)',
        'KPI Optimization (Drop Rate, Throughput, Latency)',
        'Interference & Coverage Area Planning',
      ],
    },
    {
      title: 'Data Science & Big Data Telemetry',
      subtitle: 'BigQuery & Telecom Analytics',
      icon: Database,
      color: '#8B5CF6',
      skills: [
        'BigQuery SQL & BigFrames Pipeline Integration',
        'Customer Experience Management (CEM) Metrics',
        'Python (Pandas, NumPy, Polars) Data Engineering',
        'Network Performance & Traffic Pattern Analytics',
        'Automated ETL & CDR Data Processing',
      ],
    },
    {
      title: 'AI & ML Engineering (340+ Days)',
      subtitle: 'Predictive & Generative Intelligence',
      icon: Cpu,
      color: '#00FF88',
      skills: [
        'Time-Series Network Anomaly Detection',
        'Predictive Capacity & Traffic Load Forecasting',
        'PyTorch & Scikit-Learn Model Training',
        'LLM & RAG Agent Systems for Engineering Docs',
        'Automated Root Cause Analysis (RCA)',
      ],
    },
    {
      title: 'Automation & Cloud Infrastructure',
      subtitle: 'Modern Web & Cloud Deployment',
      icon: Terminal,
      color: '#FF007A',
      skills: [
        'GCP (Google Cloud Platform) Services',
        'Docker & Microservices Deployment',
        'Interactive Dashboards & Web Visualizations',
        'CI/CD Workflows & Git Version Control',
        'Real-time Alerting Systems',
      ],
    },
  ];

  return (
    <section id="capability" className="relative py-24 px-4 sm:px-8 bg-[#05070B] text-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[#00FF88] text-xs font-mono">
            <Zap className="w-3.5 h-3.5" />
            Core Technical Domain
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Capability Matrix & Engineering Skills
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            การประสานรวมทักษะวิศวกรรมโทรคมนาคมขั้นสูง ร่วมกับวิทยาการข้อมูล (Data Science) และปัญญาประดิษฐ์ (AI/ML)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <GlassCard key={idx} hoverEffect className="space-y-6 border-white/10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-xl glass-panel"
                      style={{ color: cap.color, borderColor: `${cap.color}40` }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                      <span className="text-xs font-mono text-slate-400">{cap.subtitle}</span>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#00FF88]/60" />
                </div>

                <ul className="space-y-2.5 font-mono text-xs text-slate-300">
                  {cap.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
