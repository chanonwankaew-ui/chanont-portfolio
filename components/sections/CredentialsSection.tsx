'use client';

import React, { useState } from 'react';
import { ExternalLink, Award, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useCyberSound } from '@/hooks/useCyberSound';

// ข้อมูลใบประกาศนียบัตรทั้ง 11 ใบอย่างเป็นทางการของคุณชาณณฑ์ แว่นแก้ว
const certsData = [
  {
    id: 'cert-1',
    title: 'Python for Data Science',
    issuer: 'Chulalongkorn University (Chula MOOC)',
    date: '31 May 2026',
    category: 'data',
    tags: ['Chula MOOC', 'Python', 'Data Science'],
    description: 'ผ่านหลักสูตรทฤษฎีและปฏิบัติการพัฒนาโปรแกรมและการจัดการข้อมูลเชิงลึกด้วยภาษา Python',
    link: 'Screenshot 2569-08-05 at 01.06.40.png',
  },
  {
    id: 'cert-2',
    title: 'Foundation AI (Theory)',
    issuer: 'Artificial Intelligence Association of Thailand (AIAT)',
    date: '18 Apr 2026',
    category: 'ai',
    tags: ['Super AI S6', 'Theory', '13 Domains'],
    description: 'ผ่านการวัดความรู้ภาคทฤษฎีขั้นต้น ครอบคลุม 13 รายวิชาหลัก (ML, Deep Learning, RAG, NLP)',
    link: 'certificate-584c7437-7b81-4399-91a4-c2102901880d.png',
  },
  {
    id: 'cert-3',
    title: 'AI Practitioner',
    issuer: 'Artificial Intelligence Association of Thailand (AIAT)',
    date: '1 Apr 2026',
    category: 'ai',
    tags: ['Super AI S6', 'AI Practitioner'],
    description: 'ผ่านเกณฑ์คะแนนขั้นพื้นฐานด้านปัญญาประดิษฐ์และการประยุกต์ใช้ในงานจริง',
    link: 'Screenshot 2569-08-05 at 00.57.12.png',
  },
  {
    id: 'cert-4',
    title: 'AI Online Hackathon (Practice)',
    issuer: 'AIAT — "From Data to Insight"',
    date: '21 Mar 2026',
    category: 'ai',
    tags: ['Super AI S6', 'Hackathon', 'Practice'],
    description: 'ผ่านเกณฑ์คะแนนขั้นพื้นฐาน การแข่งขันภาคปฏิบัติการนำข้อมูลมาวิเคราะห์หา Insight',
    link: 'Screenshot 2569-08-05 at 00.59.21.png',
  },
  {
    id: 'cert-5',
    title: 'AI Ready ASEAN (15 Modules)',
    issuer: 'ASEAN Foundation with Google.org',
    date: '22 Mar 2026',
    category: 'ai',
    tags: ['ASEAN & Google', '15 Modules Complete'],
    description: 'เรียนรู้สำเร็จทั้ง 15 โมดูล ครอบคลุม Generative AI, Prompt Engineering 101, Data Privacy และ AI Safety',
    link: 'certificate.pdf',
  },
  {
    id: 'cert-6',
    title: 'Advanced Reports with Power BI',
    issuer: 'FutureSkill',
    date: '26 Feb 2025',
    category: 'data',
    tags: ['FutureSkill', 'Power BI', 'Advanced'],
    description: 'พิชิตการตลาดและงานขาย หา Insight สบายๆ ด้วย Advance Report จาก Power BI',
    link: '20250226_Insight_Advanced_Report_PowerBI_Chanont.png',
  },
  {
    id: 'cert-7',
    title: 'Data Storytelling',
    issuer: 'FutureSkill',
    date: '28 Jan 2025',
    category: 'data',
    tags: ['FutureSkill', 'Data Storytelling'],
    description: 'นำเสนอข้อมูลให้น่าสนใจ อย่างตรงประเด็นและมีประสิทธิภาพด้วย Data Storytelling',
    link: '20250128_Data_Storytelling_Chanont.png',
  },
  {
    id: 'cert-8',
    title: 'Data Analytics for Business',
    issuer: 'FutureSkill',
    date: '24 Jan 2025',
    category: 'data',
    tags: ['FutureSkill', 'Business Analytics'],
    description: 'การวิเคราะห์ข้อมูลเพื่อประกอบการตัดสินใจทางธุรกิจอย่างแม่นยำ',
    link: '20250124_Data_analytics_for_Business_Chanont.png',
  },
  {
    id: 'cert-9',
    title: 'Excel for Business Professional',
    issuer: 'FutureSkill',
    date: '12 Jan 2025',
    category: 'data',
    tags: ['FutureSkill', 'Excel Pro'],
    description: 'เจาะลึกการใช้ Excel เพื่อธุรกิจแบบมืออาชีพ',
    link: '20241218_Excel_for_Business_Chanont.png',
  },
  {
    id: 'cert-10',
    title: 'Power Query for Power BI',
    issuer: 'FutureSkill',
    date: '22 Dec 2024',
    category: 'data',
    tags: ['FutureSkill', 'Power Query'],
    description: 'การใช้เครื่องมือ Power Query ปรับแต่งข้อมูลใน Power BI',
    link: '20241222_Power_Query_Chanont.png',
  },
  {
    id: 'cert-11',
    title: 'Excel Advance: Macro & VBA Automation',
    issuer: 'FutureSkill',
    date: '18 Dec 2024',
    category: 'data',
    tags: ['FutureSkill', 'Macro & VBA'],
    description: 'เจาะลึกเทคนิคการทำงานให้ง่ายขึ้นด้วย Macro และ VBA',
    link: '20241218_Excel_Advance_Macro_VBA_Chanont.png',
  },
];

export default function CredentialsSection() {
  const { playSound } = useCyberSound();
  const [filter, setFilter] = useState<'all' | 'ai' | 'data'>('all');
  const [selectedCert, setSelectedCert] = useState<typeof certsData[0] | null>(null);

  const filteredCerts = certsData.filter((cert) => {
    if (filter === 'all') return true;
    return cert.category === filter;
  });

  return (
    <section id="credentials" className="relative py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10 text-slate-100">
      <div className="space-y-12">

        {/* Header & Category Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#00F0FF] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF]"></span>
              05 / Credentials Gallery
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Verified learning. <span className="text-[#00F0FF] shadow-[#00F0FF]/50 drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">11 Certificates.</span>
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl font-sans leading-relaxed">
              การศึกษาและใบประกาศนียบัตรวิชาชีพที่ได้รับการรับรอง ครอบคลุมด้าน AI & Machine Learning, Data Analytics และการทำงานอัตโนมัติ
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={() => { setFilter('all'); playSound('click'); }}
              onMouseEnter={() => playSound('hover')}
              className={`px-4 py-2 rounded-xl transition font-bold ${filter === 'all'
                  ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'glass-panel text-slate-300 hover:text-white border-white/10'
                }`}
            >
              All (11)
            </button>
            <button
              onClick={() => { setFilter('ai'); playSound('click'); }}
              onMouseEnter={() => playSound('hover')}
              className={`px-4 py-2 rounded-xl transition font-bold ${filter === 'ai'
                  ? 'bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                  : 'glass-panel text-slate-300 hover:text-white border-white/10'
                }`}
            >
              AI & ML (5)
            </button>
            <button
              onClick={() => { setFilter('data'); playSound('click'); }}
              onMouseEnter={() => playSound('hover')}
              className={`px-4 py-2 rounded-xl transition font-bold ${filter === 'data'
                  ? 'bg-[#FF007A] text-white shadow-[0_0_15px_rgba(255,0,122,0.4)]'
                  : 'glass-panel text-slate-300 hover:text-white border-white/10'
                }`}
            >
              Data & Automation (6)
            </button>
          </div>
        </div>

        {/* Academic Education Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border-[#00F0FF]/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-[#00F0FF]" />
                Academic Education
              </h3>
              <span className="text-xs font-mono text-[#00F0FF] font-bold">DEGREE</span>
            </div>
            <div className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <strong className="text-white text-sm block font-bold">Bachelor of Engineering (B.Eng.) in Telecommunications Engineering</strong>
                <p className="text-[#64748B] font-mono">Rajamangala University of Technology Thanyaburi (RMUTT)</p>
              </div>
              <div className="space-y-1 pt-3 border-t border-white/5">
                <strong className="text-white text-sm block font-bold">Higher Technical Certificate in Electrical & Electronics</strong>
                <p className="text-[#64748B] font-mono">Thai-Austrian Technical College</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-7 rounded-2xl border-[#00FF88]/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#00FF88]" />
                Continuous AI Mastery (340+ Days)
              </h3>
              <span className="text-xs font-mono text-[#00FF88] font-bold">RESEARCH</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              มุ่งมั่นค้นคว้าและทดลองใช้งาน AI / Machine Learning ต่อเนื่องมากกว่า 340 วัน เพื่อประยุกต์ใช้ AI ในการเพิ่มประสิทธิภาพการวิเคราะห์ข้อมูลโทรคมนาคม (RAN/RF) และระบบอัตโนมัติ
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
              <span className="px-2.5 py-1 rounded bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30">Super AI S6</span>
              <span className="px-2.5 py-1 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">Chula MOOC</span>
              <span className="px-2.5 py-1 rounded bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30">ASEAN AI & Google</span>
            </div>
          </div>
        </div>

        <!-- Credentials Gallery Cards Grid -->
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <article
              key={cert.id}
              className="glass-panel p-6 rounded-2xl glass-panel-hover space-y-4 flex flex-col justify-between border-white/15"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span
                    className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${cert.category === 'ai'
                        ? 'text-[#8B5CF6] bg-[#8B5CF6]/15 border-[#8B5CF6]/40'
                        : 'text-[#00F0FF] bg-[#00F0FF]/15 border-[#00F0FF]/40'
                      }`}
                  >
                    {cert.tags[0]}
                  </span>
                  <span className="text-[#718096]">{cert.date}</span>
                </div>

                <h3 className="font-display font-bold text-lg text-white leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs font-mono text-[#718096]">
                  {cert.issuer}
                </p>

                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {cert.tags.slice(1).map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => { setSelectedCert(cert); playSound('click'); }}
                  onMouseEnter={() => playSound('hover')}
                  className="text-xs font-mono text-[#00F0FF] hover:underline inline-flex items-center gap-1 font-bold shrink-0 ml-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View ↗
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Certificate Detail Modal */}
        {selectedCert && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <div 
              className="glass-panel p-8 rounded-2xl border-[#00F0FF]/30 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${selectedCert.category === 'ai'
                          ? 'text-[#8B5CF6] bg-[#8B5CF6]/15 border-[#8B5CF6]/40'
                          : 'text-[#00F0FF] bg-[#00F0FF]/15 border-[#00F0FF]/40'
                        }`}
                    >
                      {selectedCert.tags[0]}
                    </span>
                    <span className="text-slate-400">{selectedCert.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedCert.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-mono text-slate-400 mb-1">ISSUER</p>
                  <p className="text-sm text-white font-semibold">{selectedCert.issuer}</p>
                </div>

                <div>
                  <p className="text-xs font-mono text-slate-400 mb-1">DESCRIPTION</p>
                  <p className="text-sm text-slate-200 leading-relaxed">{selectedCert.description}</p>
                </div>

                <div>
                  <p className="text-xs font-mono text-slate-400 mb-2">TAGS</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 text-slate-300 text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00F0FF] text-black font-bold hover:bg-white transition shadow-[0_0_25px_rgba(0,240,255,0.4)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Certificate
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}