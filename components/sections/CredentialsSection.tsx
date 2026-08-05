'use client';

// แสดงใบรับรองวิชาชีพทั้งหมด (11 ใบ) ของ Chanont Wankaew
// แยกออกจาก EvidenceSection เพื่อความชัดเจนของ UI
import GlassCard from '@/components/ui/GlassCard';
import { Award, CheckCircle } from 'lucide-react';

export default function CredentialsSection() {
  // ข้อมูลใบรับรอง (title, issuer, code, tag) – ตรงกับที่แสดงใน index.html
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

  return (
    <section id="credentials" className="relative py-24 px-4 sm:px-8 bg-[#05070B] text-slate-100 border-t border-white/10">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[#00F0FF] text-xs font-mono">
            <Award className="w-3.5 h-3.5" /> Professional Certifications (11 ใบ)
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Certified Expertise
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            รายการใบรับรองทั้งหมดที่ยืนยันความเชี่ยวชาญด้านคลาวด์, AI, Telecom, Data & Security
          </p>
        </div>

        {/* Certificates Grid */}
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
    </section>
  );
}
