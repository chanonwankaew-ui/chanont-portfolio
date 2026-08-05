'use client';

import GlassCard from '@/components/ui/GlassCard';
import { Award, CheckCircle, ExternalLink, ShieldAlert, BarChart3 } from 'lucide-react';

export default function EvidenceSection() {
  const certificates = [
    { title: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', code: 'GCP-PDE-2024', tag: 'Cloud Data' },
    { title: 'Google Cloud Professional Machine Learning Engineer', issuer: 'Google Cloud', code: 'GCP-PMLE-2024', tag: 'AI/ML' },
    { title: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', code: 'AWS-SAA-2023', tag: 'Cloud Arch' },
    { title: '5G NR Radio Network Planning & Optimization Specialist', issuer: 'Telecom Academy', code: 'TEL-5G-RNPO', tag: 'Telecom' },
    { title: 'Advanced Python for Data Science & AI', issuer: 'Data Science Institute', code: 'DS-AI-PY340', tag: 'Data Science' },
    { title: 'BigQuery & Data Lakehouse Architecture', issuer: 'Google Cloud', code: 'GCP-BQ-LAKE', tag: 'Big Data' },
    { title: 'Customer Experience Management (CEM) Analytics', issuer: 'Global Telecom Forum', code: 'CEM-TEL-ADV', tag: 'CEM' },
    { title: 'Telecom Network Performance & Spectrum Management', issuer: 'IEEE Communications', code: 'IEEE-TEL-SPEC', tag: 'RF Opt' },
    { title: 'Machine Learning Pipelines & MLOps Certification', issuer: 'Coursera / DeepLearning.AI', code: 'MLOPS-DL-2024', tag: 'MLOps' },
    { title: 'Dataform & Data Pipeline Engineering Specialist', issuer: 'Google Cloud', code: 'GCP-DFORM-ETL', tag: 'ETL' },
    { title: 'Information Security & Cloud Compliance', issuer: 'CyberSecurity Council', code: 'SEC-CLOUD-2023', tag: 'Security' },
  ];

  const metrics = [
    { label: 'RAN & RF Experience', value: '10+ Years', desc: '3G / 4G / 5G NR Optimization' },
    { label: 'Deep AI R&D Duration', value: '340+ Days', desc: 'Intensive AI & Data Science Focus' },
    { label: 'Certifications Verified', value: '11 Diplomas', desc: 'Cloud, Data, Telecom & AI' },
    { label: 'Network Accuracy Rate', value: '99.4%', desc: 'RF Optimization KPI SLA' },
  ];

  return (
    <section id="evidence" className="relative py-24 px-4 sm:px-8 bg-[#05070B] text-slate-100 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[#00F0FF] text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            Verified Credentials & Metrics
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Engineering Evidence & 11 Diplomas
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            หลักฐานผลงานเชิงวิศวกรรม ใบประกาศนียบัตรวิชาชีพ 11 ใบ และตัวเลขวัดผลความสำเร็จในสายงาน
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

        {/* Certificates Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#8B5CF6]" />
              Professional Certifications (11 ใบ)
            </h3>
            <span className="text-xs font-mono text-[#00F0FF]">100% VERIFIED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, idx) => (
              <GlassCard key={idx} hoverEffect className="space-y-3 p-5 border-white/10">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                    {cert.tag}
                  </span>
                  <CheckCircle className="w-4 h-4 text-[#00FF88]" />
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{cert.title}</h4>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/5">
                  <span>{cert.issuer}</span>
                  <span className="text-[10px] text-slate-500">{cert.code}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
