'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Toast from '@/components/ui/Toast';
import { Terminal, Copy, Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function ContactTerminal() {
  const [copied, setCopied] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = {
    email: 'chanont.wankaew@email.com',
    phone: '+66 8X-XXX-XXXX',
    location: 'Sattahip, Chonburi / Bangkok, Thailand',
  };

  const handleCopy = (text: string, label: string) => {
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

      <div className="max-w-5xl mx-auto space-y-12">
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
          <div className="lg:col-span-5 space-y-4">
            <GlassCard glow="cyan" className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF]">
                  <span className="w-3 h-3 rounded-full bg-[#FF007A]" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-[#00FF88]" />
                  <span className="ml-2 font-bold">contact_node.sh</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">v2.4</span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3 rounded-xl glass-panel flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#00F0FF]" />
                    <span className="text-slate-300">{contactInfo.email}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(contactInfo.email, 'Email')}
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

          {/* Right Message Terminal */}
          <div className="lg:col-span-7">
            <GlassCard className="space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-[#00F0FF]" />
                Direct Message Terminal
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
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="พิมพ์รายละเอียดข้อความของคุณที่นี่..."
                    className="w-full px-4 py-3 rounded-xl glass-panel text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00F0FF] text-black font-bold hover:bg-white transition shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitted ? 'Message Sent Successfully!' : 'Execute Send Command'}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
