'use client';

import { useState, useEffect, useRef } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Toast from '@/components/ui/Toast';
import { Terminal, Copy, Mail, Phone, MapPin, Send, Check, Cpu, User, Award, Briefcase, Download } from 'lucide-react';
import { useCyberSound } from '@/hooks/useCyberSound';

export default function ContactTerminal() {
  const { playSound } = useCyberSound();
  const [copied, setCopied] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  // CLI Terminal State
  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: 'cmd' | 'res' | 'error' | 'success'; text: string }>>([
    { type: 'res', text: "System initialized with 100% verified credentials. Type 'help' for available commands." },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const contactInfo = {
    email: 'chanont.wankaew@email.com',
    phone: '+66 8X-XXX-XXXX',
    location: 'Sattahip, Chonburi / Bangkok, Thailand',
  };

  const commands: Record<string, () => { type: 'cmd' | 'res' | 'error' | 'success'; text: string } | null> = {
    help: () => ({
      type: 'res' as const,
      text: `Available commands:
  help     - Show this help message
  whoami   - Display profile information
  skills   - List technical skills
  certs    - Show 11 verified certificates
  exp      - Work experience (10+ years)
  contact  - Contact information
  clear    - Clear terminal
  download - Download resume PDF`
    }),
    whoami: () => ({
      type: 'success' as const,
      text: `Name: Chanont Wankaew
Role: Senior Telecom Data Analyst & AI Solutions Specialist
Focus: RAN/RF Planning & Optimization (3G/4G/5G NR)
Location: Sattahip, Chonburi / Bangkok, Thailand
Experience: 10+ years in telecommunications
AI R&D: 340+ days intensive research`
    }),
    skills: () => ({
      type: 'success' as const,
      text: `Technical Skills:
  • RAN/RF Planning & Optimization (3G/4G/5G NR)
  • Data Analytics & Visualization (Power BI, Excel)
  • AI & Machine Learning (Python, TensorFlow)
  • Network Performance Analysis
  • Customer Experience Management (CEM)
  • OSS Integration (Huawei U2000, iManager)
  • Drive Test Analysis & Diagnosis`
    }),
    certs: () => ({
      type: 'success' as const,
      text: `11 Verified Certificates:
  AI & ML (5): Foundation AI, AI Practitioner, AI Hackathon, AI Ready ASEAN, Python for Data Science
  Data & Automation (6): Power BI Advanced, Data Storytelling, Business Analytics, Excel Pro, Power Query, VBA Automation
  Issuers: AIAT, Chula MOOC, ASEAN Foundation, Google.org, FutureSkill`
    }),
    exp: () => ({
      type: 'success' as const,
      text: `Work Experience (10+ years, 9 positions):
  Current: Senior Telecom Data Analyst & AI Solutions Specialist
  Previous: RF Optimization Engineer, Network Performance Analyst
  Focus: BMA projects, True-DTAC consolidation, CEM analytics
  Key Projects: BMA Drive-Test Intelligence, Worst Cell Control, Multi-Generation Network Consolidation`
    }),
    contact: () => ({
      type: 'success' as const,
      text: `Contact Information:
  Email: chanont.wankaew@email.com
  Phone: +66 8X-XXX-XXXX
  Location: Sattahip, Chonburi / Bangkok, Thailand
  LinkedIn: https://www.linkedin.com/in/chanont-wankaew`
    }),
    clear: () => {
      setTerminalLogs([{ type: 'res', text: 'Terminal cleared.' }]);
      return null;
    },
    download: () => ({
      type: 'success' as const,
      text: 'Opening resume PDF download...'
    })
  };

  const runTerminalCmd = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    playSound('typing');
    setTerminalLogs(prev => [...prev, { type: 'cmd', text: `> ${cmd}` }]);
    
    if (trimmedCmd === 'clear') {
      commands.clear();
      setTerminalInput('');
      return;
    }

    const commandFunc = commands[trimmedCmd as keyof typeof commands];
    if (commandFunc) {
      const result = commandFunc();
      if (result) {
        playSound(result.type === 'error' ? 'error' : 'success');
        setTerminalLogs(prev => [...prev, result]);
      }
      if (trimmedCmd === 'download') {
        window.open('/Chanont_Wankaew_Resume.pdf', '_blank');
      }
    } else {
      playSound('error');
      setTerminalLogs(prev => [...prev, { type: 'error', text: `Command not found: ${cmd}. Type 'help' for available commands.` }]);
    }
    
    setTerminalInput('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const handleCopy = (text: string, label: string) => {
    playSound('success');
    navigator.clipboard.writeText(text);
    setCopied(label);
    setToastMessage(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setToastMessage('ขอบคุณสำหรับการติดต่อ! ข้อความถูกส่งเรียบร้อยแล้ว');
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 bg-[#05070B] text-slate-100 border-t border-white/10">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[#FF007A] text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            Interactive Contact Terminal
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Connect & Initiate Communication
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-sans">
            ช่องทางการติดต่อสอบถาม ปรึกษาโครงการ หรือพิจารณาเข้าร่วมงาน
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Terminal Details */}
          <div className="lg:col-span-4 space-y-4">
            <GlassCard glow="cyan" className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF]">
                  <span className="w-3 h-3 rounded-full bg-[#FF007A]" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-[#00FF88]" />
                  <span className="ml-2 font-bold">contact_node.sh</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">v2.5</span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3 rounded-xl glass-panel flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#00F0FF]" />
                    <span className="text-slate-300">{contactInfo.email}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(contactInfo.email, 'Email')}
                    onMouseEnter={() => playSound('hover')}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
                    title="Copy Email"
                  >
                    {copied === 'Email' ? <Check className="w-4 h-4 text-[#00FF88]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl glass-panel flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#00FF88]" />
                    <span className="text-slate-300">{contactInfo.phone}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(contactInfo.phone, 'Phone')}
                    onMouseEnter={() => playSound('hover')}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
                    title="Copy Phone"
                  >
                    {copied === 'Phone' ? <Check className="w-4 h-4 text-[#00FF88]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl glass-panel flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="text-slate-300">{contactInfo.location}</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Center CLI Terminal */}
          <div className="lg:col-span-4">
            <GlassCard className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF]">
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="font-bold">chanont-terminal</span>
                </div>
                <span className="text-[10px] font-mono text-[#00FF88]">CLI Active</span>
              </div>

              <div className="space-y-3">
                <div className="bg-black/50 rounded-lg p-3 space-y-2 max-h-64 overflow-y-auto font-mono text-xs">
                  {terminalLogs.map((log, idx) => (
                    <p key={idx} className={
                      log.type === 'cmd' ? 'text-[#00FF88] font-bold' :
                      log.type === 'error' ? 'text-[#FF007A]' :
                      log.type === 'success' ? 'text-[#00F0FF]' :
                      'text-slate-200'
                    }>
                      {log.text}
                    </p>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#00FF88] font-bold font-mono text-xs">&gt;</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        runTerminalCmd(terminalInput);
                      }
                    }}
                    placeholder="Type command..."
                    className="bg-transparent text-white focus:outline-none w-full text-xs font-mono"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['help', 'whoami', 'skills', 'certs', 'exp', 'contact', 'download'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => runTerminalCmd(cmd)}
                      onMouseEnter={() => playSound('hover')}
                      className="px-2 py-1 rounded bg-white/5 hover:bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 font-mono text-[10px] transition"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Message Terminal */}
          <div className="lg:col-span-4">
            <GlassCard className="space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-[#00F0FF]" />
                Direct Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 uppercase text-[10px]">Your Name / Company</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Somchai (Telecom Recruiter)"
                    className="w-full px-4 py-3 rounded-xl glass-panel text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 uppercase text-[10px]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. contact@company.com"
                    className="w-full px-4 py-3 rounded-xl glass-panel text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 uppercase text-[10px]">Message Details</label>
                  <textarea
                    rows={3}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="พิมพ์รายละเอียดข้อความของคุณที่นี่..."
                    className="w-full px-4 py-3 rounded-xl glass-panel text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('click')}
                  className="w-full py-3 rounded-xl bg-[#00F0FF] text-black font-bold hover:bg-white transition shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitted ? 'Sent!' : 'Execute'}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
