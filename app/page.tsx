'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Radio,
  Volume2,
  VolumeX,
  Cpu,
  Download,
  UserCheck,
  TowerControl,
  BarChart3,
  Wrench,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  FileText,
  FileDown,
  CheckCircle2,
  Languages,
} from 'lucide-react';
import * as THREE from 'three';

// Lucide removed brand icons in recent versions, so we define a custom SVG for LinkedIn matching their style.
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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

// ข้อมูลผลงานและ Case Studies
const evidenceData = [
  {
    id: 'ev-1',
    category: 'dta',
    tag: 'DTA / CEM',
    title: 'BMA Drive-Test Intelligence',
    context: 'ข้อมูล drive test และ network data ปริมาณมากในพื้นที่กรุงเทพมหานคร (BMA)',
    action: 'เชื่อมโยงค่า RF, วิเคราะห์ service behavior, ตรวจ customer-impact signals',
    value: 'จัดลำดับข้อเสนอแนะที่นำไปปฏิบัติได้ตามผลกระทบต่อประสบการณ์ลูกค้า',
  },
  {
    id: 'ev-2',
    category: 'worst',
    tag: 'Worst Cell',
    title: 'Top 40 Worst-Cell Control',
    context: 'ปัญหาประสิทธิภาพระดับ cell ที่เกิดซ้ำในโครงการ BMA 4G True',
    action: 'KPI review, Drive-test diagnosis, Parameter checking, Physical configuration analysis',
    value: 'สร้าง remediation loop ที่ให้ความสำคัญกับ cell ซึ่งมีความเสี่ยงต่อบริการสูงสุด',
  },
  {
    id: 'ev-3',
    category: 'kpi',
    tag: 'KPI Control',
    title: 'Accessibility & VoLTE Performance',
    context: ' Primary KPIs: RRC, E-RAB, VoLTE Drop Rate',
    action: 'เชื่อมโยง counter data กับ RF conditions, วิเคราะห์ parameter configuration และ physical optimization options',
    value: 'ทำให้การเปลี่ยนแปลง KPI สามารถอธิบายและนำไปใช้ตัดสินใจได้',
  },
  {
    id: 'ev-4',
    category: 'consolidation',
    tag: 'Consolidation',
    title: 'Multi-Generation Network Consolidation',
    context: 'การรวมเครือข่าย True และ DTAC ความซับซ้อนของ RF และ service quality ระหว่างหลายเทคโนโลยี',
    action: 'ใช้ความรู้ 2G–5G ในการวางแผน, Validation และ Optimization',
    value: 'วิเคราะห์ประสบการณ์ลูกค้าข้ามเทคโนโลยี แทนการดู KPI ของแต่ละระบบแยกจากกัน',
  },
  {
    id: 'ev-5',
    category: 'oss',
    tag: 'Huawei OSS',
    title: 'IBC Operational Support',
    context: 'งาน in-building coverage ต้องอาศัย OSS visibility ที่แม่นยำ',
    action: 'สนับสนุน U2000 และ iManager, Alarm investigation, Performance investigation, Operational coordination',
    value: 'เชื่อม OSS evidence เข้ากับการตอบสนองต่อปัญหา indoor network',
  },
];

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [highPerf, setHighPerf] = useState(true);
  const [certFilter, setCertFilter] = useState<'all' | 'ai' | 'data'>('all');
  const [evFilter, setEvFilter] = useState<'all' | string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Terminal CLI State
  const [terminalLogs, setTerminalLogs] = useState<
    Array<{ type: 'cmd' | 'res'; text: string }>
  >([
    {
      type: 'res',
      text: "System initialized with 100% verified credentials. Type 'help' or click action chips below.",
    },
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Toast System
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sound FX System
  const playCyberSound = (type: string = 'click') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch {
      // Audio context fallbacks
    }
  };

  const copyEmail = (email: string) => {
    playCyberSound('click');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    } else {
      const el = document.createElement('textarea');
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    triggerToast(`✓ คัดลอกอีเมลเรียบร้อยแล้ว: ${email}`);
  };

  // Three.js 3D Engine Setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 24);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x172033, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f0ff, 1.5);
    dirLight.position.set(-8, 12, 10);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xff007a, 2.5, 70);
    pointLight.position.set(11, 9, 5);
    scene.add(pointLight);

    // 1. Procedural 5G Cell Tower Assembly
    const towerGroup = new THREE.Group();

    const trunkGeo = new THREE.CylinderGeometry(0.12, 0.35, 13, 8);
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x26394a,
      metalness: 0.7,
      roughness: 0.35,
      wireframe: true,
    });
    const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
    trunkMesh.position.y = 4;
    towerGroup.add(trunkMesh);

    // Antennas
    [0, 120, 240].forEach((angle) => {
      const rad = (angle * Math.PI) / 180;
      const antennaGeo = new THREE.BoxGeometry(0.35, 2.4, 0.16);
      const antennaMat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.95,
      });
      const antennaMesh = new THREE.Mesh(antennaGeo, antennaMat);
      antennaMesh.position.set(Math.sin(rad) * 0.8, 10.5, Math.cos(rad) * 0.8);
      antennaMesh.rotation.y = -rad;
      towerGroup.add(antennaMesh);
    });

    // Beacon Light
    const beaconGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff007a });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 12;
    towerGroup.add(beaconMesh);

    // Base
    const baseGeo = new THREE.CylinderGeometry(1.4, 1.8, 0.5, 8);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x111820,
      metalness: 0.5,
      roughness: 0.5,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -2.6;
    towerGroup.add(baseMesh);

    towerGroup.position.set(9, -7, -5);
    towerGroup.rotation.y = -Math.PI / 6;
    scene.add(towerGroup);

    // 2. Full-Screen Radio Waves
    const wavesGroup = new THREE.Group();
    wavesGroup.position.set(9, 3.7, -5);
    wavesGroup.rotation.x = Math.PI / 2.4;

    const waveRings: Array<{ mesh: THREE.Mesh; phase: number }> = [];
    for (let i = 0; i < 6; i++) {
      const ringGeo = new THREE.RingGeometry(0.95, 1.02, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0x00ff88,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      wavesGroup.add(ringMesh);
      waveRings.push({ mesh: ringMesh, phase: i * 0.15 });
    }
    scene.add(wavesGroup);

    // 3. Particles
    const pCount = highPerf ? 1000 : 350;
    const pos = new Float32Array(pCount * 3);
    const col = new Float32Array(pCount * 3);
    const palette = [
      new THREE.Color(0x00f0ff),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x00ff88),
      new THREE.Color(0xff007a),
    ];

    for (let i = 0; i < pCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.13,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // 4. RF Signal Spectrum Grid
    const gridPlaneGeo = new THREE.PlaneGeometry(70, 45, 56, 36);
    const gridPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const gridPlaneMesh = new THREE.Mesh(gridPlaneGeo, gridPlaneMat);
    gridPlaneMesh.rotation.x = -Math.PI / 2;
    gridPlaneMesh.position.y = -10;
    scene.add(gridPlaneMesh);

    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', handlePointerMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let animId: number;

    const animate3D = () => {
      animId = requestAnimationFrame(animate3D);
      const t = clock.getElapsedTime();

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.025;
      camera.position.y += (-mouseY * 2 + 2 - camera.position.y) * 0.025;
      camera.lookAt(0, 1.5, 0);

      if (particlePoints) {
        particlePoints.rotation.y = t * 0.018;
        particlePoints.rotation.x = Math.sin(t * 0.12) * 0.04;
      }

      waveRings.forEach(({ mesh, phase }) => {
        const progress = (t * 0.34 + phase) % 1;
        const scale = 0.4 + progress * 10;
        mesh.scale.setScalar(scale);
        (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(
          0,
          0.72 * (1 - progress)
        );
      });

      if (gridPlaneGeo) {
        const positions = gridPlaneGeo.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          const z =
            Math.sin(x * 0.23 + t * 1.2) * 0.7 +
            Math.cos(y * 0.28 + t * 0.9) * 0.45;
          positions.setZ(i, z);
        }
        positions.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate3D();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [highPerf]);

  // Terminal CLI Helper
  const runTerminalCmd = (cmdStr: string) => {
    playCyberSound('click');
    const cmd = cmdStr.trim().toLowerCase();
    const newLogs = [...terminalLogs, { type: 'cmd' as const, text: `> ${cmd}` }];

    let response = '';
    switch (cmd) {
      case 'help':
        response = "Available commands: 'help', 'certs', 'skills', 'whoami', 'contact', 'resume', 'clear'";
        break;
      case 'whoami':
        response = 'Chanont Wankaew (ชาณณฑ์ แว่นแก้ว) | Senior Telecom Data Analyst & AI Solutions Specialist | 10+ Yrs RAN/RF & Huawei Experience';
        break;
      case 'certs':
        response = '11 Verified Certs: Super AI S6 (Theory, Practitioner, Hackathon), Chula MOOC Python for Data Science, AI Ready ASEAN (15 Modules), Power BI Advanced, Data Storytelling, Business Analytics, Excel VBA, Power Query.';
        break;
      case 'skills':
        response = 'Core Skills: RAN/RF Planning, 3G/4G/5G NR, Python (Pandas/NumPy), SQL, Power BI, RAG, FastAPI, Docker, Huawei U2000/PRS, GENEX, Actix, TEMS';
        break;
      case 'contact':
        response = 'Email: chanon.wankaew@icloud.com | Phone: +66 98-285-2659 | Location: Sattahip, Chonburi / BMA | LinkedIn: chanont-wankaew';
        break;
      case 'resume':
        response = 'Downloading Resume PDF...';
        if (typeof window !== 'undefined') window.location.href = 'Chanont_Wankaew_Resume.pdf';
        break;
      case 'clear':
        setTerminalLogs([]);
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }

    setTerminalLogs([...newLogs, { type: 'res' as const, text: response }]);
  };

  const filteredCerts = useMemo(() => {
    return certsData.filter((c) => {
      if (certFilter === 'all') return true;
      return c.category === certFilter;
    });
  }, [certFilter]);

  const filteredEvidence = useMemo(() => {
    return evidenceData.filter((ev) => {
      if (evFilter === 'all') return true;
      return ev.category === evFilter;
    });
  }, [evFilter]);

  return (
    <div className="bg-[#04060A] text-[#F8FAFC] font-sans antialiased selection:bg-[#00F0FF] selection:text-black overflow-x-hidden min-h-screen">
      {/* 3D BACKGROUND CANVAS */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* SCANLINE OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_51%)] bg-[length:100%_4px] opacity-20" />

      <div className="relative z-10">
        {/* HEADER / NAVIGATION */}
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-8">
          <div className="max-w-7xl mx-auto bg-[#0A0F1A]/90 backdrop-blur-xl border border-[#00F0FF]/30 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-2xl">
            {/* Brand Identity */}
            <a
              href="#top"
              onClick={() => playCyberSound('click')}
              className="flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/20 border border-[#00F0FF]/60 flex items-center justify-center text-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-black transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold text-sm tracking-wide text-white group-hover:text-[#00F0FF] transition-colors flex items-center gap-2">
                  Chanont Wankaew
                  <span className="text-[10px] font-mono font-semibold text-[#00F0FF] bg-[#00F0FF]/15 px-2 py-0.5 rounded border border-[#00F0FF]/40">
                    PRO v2.5
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[#718096] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                  Telecom Intelligence · Sattahip, TH
                </div>
              </div>
            </a>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
              <a
                href="#capabilities"
                onClick={() => playCyberSound('click')}
                className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-[#00F0FF] hover:bg-white/5 transition"
              >
                Capabilities
              </a>
              <a
                href="#evidence"
                onClick={() => playCyberSound('click')}
                className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-[#00F0FF] hover:bg-white/5 transition"
              >
                Evidence
              </a>
              <a
                href="#experience"
                onClick={() => playCyberSound('click')}
                className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-[#00F0FF] hover:bg-white/5 transition"
              >
                Experience
              </a>
              <a
                href="#development"
                onClick={() => playCyberSound('click')}
                className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-[#00F0FF] hover:bg-white/5 transition"
              >
                Development
              </a>
              <a
                href="#credentials"
                onClick={() => playCyberSound('click')}
                className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-[#00F0FF] hover:bg-white/5 transition"
              >
                Credentials (11)
              </a>
              <a
                href="#contact"
                onClick={() => playCyberSound('click')}
                className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-[#00F0FF] hover:bg-white/5 transition"
              >
                Contact
              </a>
            </nav>

            {/* System Controls */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  triggerToast(soundEnabled ? '🔇 ปิดเสียง' : '🔊 เปิดใช้งาน Sound FX');
                }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-slate-300 hover:text-white hover:border-[#00F0FF]/50 transition"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setHighPerf(!highPerf);
                  triggerToast(highPerf ? '🍃 โหมด Low 3D Graphics' : '⚡ โหมด High 3D Graphics');
                }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition text-xs font-mono hidden sm:flex items-center gap-1.5"
              >
                <Cpu className="w-4 h-4 text-[#00F0FF]" />
                <span>{highPerf ? 'HIGH 3D' : 'LOW 3D'}</span>
              </button>

              <a
                href="#contact"
                onClick={() => playCyberSound('click')}
                className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00FF88] text-black font-display font-bold text-xs tracking-wider hover:opacity-90 transition shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-1.5"
              >
                <span>CONTACT</span> ↗
              </a>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section id="top" className="relative min-h-screen pt-32 pb-20 px-4 sm:px-8 flex items-center justify-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0A0F1A]/90 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-mono tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_10px_#00F0FF]" />
                Telecom Data Analytics · RF Optimization · CEM Focus
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
                Engineering Signal.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-emerald-300 to-[#8B5CF6]">
                  Intelligent Action.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-display font-medium text-slate-200">
                Senior Telecom Data Analyst & AI Solutions Specialist (CEM Focus)
              </p>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
                วิศวกรโทรคมนาคมและผู้เชี่ยวชาญด้านการวิเคราะห์ข้อมูลที่มีประสบการณ์ภาคสนาม RAN/RF Planning & Optimization (3G/4G/5G NR) มากกว่า 10 ปี ผสานการวิจัยพัฒนา AI เชิงลึก (340+ วัน) เพื่อเปลี่ยนข้อมูล Network Evidence ให้กลายเป็นคุณค่าประสบการณ์ลูกค้า (CEM Value)
              </p>

              <div className="flex flex-wrap gap-3.5 pt-2 font-mono text-xs">
                <a
                  href="#evidence"
                  onClick={() => playCyberSound('click')}
                  className="px-6 py-3.5 rounded-xl bg-[#00F0FF] text-black font-bold hover:bg-white transition shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center gap-2"
                >
                  <span>ดูผลงานวิศวกรรม (Evidence)</span> ↗
                </a>
                <a
                  href="Chanont_Wankaew_Resume.pdf"
                  download
                  onClick={() => playCyberSound('click')}
                  className="px-6 py-3.5 rounded-xl bg-[#0A0F1A]/90 border border-[#00F0FF]/40 text-white hover:bg-white/10 transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#00F0FF]" />
                  <span>ดาวน์โหลด Resume PDF</span> ↘
                </a>
                <a
                  href="#capabilities"
                  onClick={() => playCyberSound('click')}
                  className="px-6 py-3.5 rounded-xl border border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/10 transition flex items-center gap-2"
                >
                  <span>Capability Matrix</span>
                </a>
              </div>

              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 font-mono">
                <div className="bg-[#0A0F1A]/90 p-4 rounded-xl border border-[#00F0FF]/30">
                  <dt className="text-[11px] text-[#718096] uppercase">Telecom Experience</dt>
                  <dd className="text-2xl font-bold text-[#00F0FF] mt-1">10+ Years</dd>
                </div>
                <div className="bg-[#0A0F1A]/90 p-4 rounded-xl border border-white/15">
                  <dt className="text-[11px] text-[#718096] uppercase">Network Tech</dt>
                  <dd className="text-2xl font-bold text-white mt-1">3G – 5G NR</dd>
                </div>
                <div className="bg-[#0A0F1A]/90 p-4 rounded-xl border border-white/15">
                  <dt className="text-[11px] text-[#718096] uppercase">Vendor Domain</dt>
                  <dd className="text-2xl font-bold text-white mt-1">Huawei TH</dd>
                </div>
                <div className="bg-[#0A0F1A]/90 p-4 rounded-xl border border-[#8B5CF6]/40">
                  <dt className="text-[11px] text-[#718096] uppercase">AI Research</dt>
                  <dd className="text-2xl font-bold text-[#8B5CF6] mt-1">340+ Days</dd>
                </div>
              </dl>
            </div>

            {/* Recruiter Fast-Path */}
            <div className="lg:col-span-4 bg-[#0A0F1A]/90 p-6 sm:p-7 rounded-2xl border border-[#00F0FF]/40 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <UserCheck className="w-4.5 h-4.5 text-[#00F0FF]" />
                  Recruiter Fast-Path
                </h3>
                <span className="text-[10px] font-mono text-[#00FF88] bg-[#00FF88]/15 px-2.5 py-0.5 rounded-full border border-[#00FF88]/40 font-bold">
                  AVAILABLE
                </span>
              </div>

              <div className="space-y-3.5 text-xs font-mono">
                <div>
                  <span className="text-[#718096] block text-[10px] uppercase mb-0.5">Role Fit</span>
                  <p className="text-slate-100 font-sans font-medium">Senior Telecom Analytics, RF Optimization & CEM Specialist</p>
                </div>
                <div>
                  <span className="text-[#718096] block text-[10px] uppercase mb-0.5">Core Domain</span>
                  <p className="text-slate-100 font-sans font-medium">RAN/RF, 3G–5G NR & Huawei Ecosystem</p>
                </div>
                <div>
                  <span className="text-[#718096] block text-[10px] uppercase mb-0.5">Location</span>
                  <p className="text-slate-100 font-sans font-medium">Sattahip, Chonburi / BMA, Thailand</p>
                </div>
                <div>
                  <span className="text-[#718096] block text-[10px] uppercase mb-0.5">Key Advantage</span>
                  <p className="text-slate-100 font-sans font-medium">เปลี่ยน Network Evidence เป็น Customer-Impact Priorities ได้แม่นยำ</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono">
                <a href="#evidence" className="text-[#00F0FF] hover:text-white transition flex items-center gap-1 font-bold">Worst Cell Case →</a>
                <span className="text-white/20">•</span>
                <a href="Chanont_Wankaew_Resume.pdf" download className="text-[#00F0FF] hover:text-white transition flex items-center gap-1 font-bold">Resume →</a>
                <span className="text-white/20">•</span>
                <a href="#contact" className="text-[#00F0FF] hover:text-white transition flex items-center gap-1 font-bold">Contact →</a>
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITY MATRIX */}
        <section id="capabilities" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="space-y-10">
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#00F0FF] uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                01 / Capability Matrix
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                Domain depth. <span className="text-[#00F0FF]">Digital leverage.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <article className="bg-[#0A0F1A]/90 p-6 rounded-2xl border border-[#00F0FF]/30 space-y-4">
                <div className="flex items-center justify-between text-[#00F0FF] font-mono text-sm">
                  <span className="font-bold">01</span>
                  <TowerControl className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Telecom & CEM</h3>
                <ul className="space-y-2 text-xs font-mono text-slate-200">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />RAN/RF Planning</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />RF Optimization</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />3G / 4G LTE / 5G NR</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />Drive-Test Analysis (DTA)</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />Worst Cell Remediation</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />KPI Control (RRC, VoLTE)</li>
                </ul>
              </article>

              <article className="bg-[#0A0F1A]/90 p-6 rounded-2xl border border-[#00FF88]/30 space-y-4">
                <div className="flex items-center justify-between text-[#00FF88] font-mono text-sm">
                  <span className="font-bold">02</span>
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Data Analytics</h3>
                <ul className="space-y-2 text-xs font-mono text-slate-200">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full" />Python (Pandas, NumPy)</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full" />SQL Data Extraction</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full" />Power Query & VBA Macro</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full" />Power BI Dashboarding</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full" />Data Storytelling</li>
                </ul>
              </article>

              <article className="bg-[#0A0F1A]/90 p-6 rounded-2xl border border-[#8B5CF6]/30 space-y-4">
                <div className="flex items-center justify-between text-[#8B5CF6] font-mono text-sm">
                  <span className="font-bold">03</span>
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">AI & Cloud</h3>
                <ul className="space-y-2 text-xs font-mono text-slate-200">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full" />Prompt Engineering</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full" />RAG Pipelines</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full" />Vector Databases</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full" />FastAPI & Docker</li>
                </ul>
              </article>

              <article className="bg-[#0A0F1A]/90 p-6 rounded-2xl border border-[#FF007A]/30 space-y-4">
                <div className="flex items-center justify-between text-[#FF007A] font-mono text-sm">
                  <span className="font-bold">04</span>
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Telecom Tools</h3>
                <ul className="space-y-2 text-xs font-mono text-slate-200">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF007A] rounded-full" />Huawei U2000 & PRS</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF007A] rounded-full" />GENEX Assistant</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF007A] rounded-full" />Actix Analyzer</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF007A] rounded-full" />TEMS / Nemo / MapInfo</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ENGINEERING EVIDENCE SECTION */}
        <section id="evidence" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#00F0FF] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                  02 / Engineering Evidence
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                  From network condition <span className="text-[#00F0FF]">to customer value.</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setEvFilter('all')}
                  className={`px-3.5 py-2 rounded-xl transition ${evFilter === 'all' ? 'bg-[#00F0FF] text-black font-bold' : 'bg-[#0A0F1A]/90 text-slate-300 border border-white/10'}`}
                >
                  All Cases (5)
                </button>
                <button
                  type="button"
                  onClick={() => setEvFilter('dta')}
                  className={`px-3.5 py-2 rounded-xl transition ${evFilter === 'dta' ? 'bg-[#00F0FF] text-black font-bold' : 'bg-[#0A0F1A]/90 text-slate-300 border border-white/10'}`}
                >
                  DTA
                </button>
                <button
                  type="button"
                  onClick={() => setEvFilter('worst')}
                  className={`px-3.5 py-2 rounded-xl transition ${evFilter === 'worst' ? 'bg-[#00F0FF] text-black font-bold' : 'bg-[#0A0F1A]/90 text-slate-300 border border-white/10'}`}
                >
                  Worst Cell
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvidence.map((ev) => (
                <article key={ev.id} className="bg-[#0A0F1A]/90 p-6 sm:p-7 rounded-2xl border border-[#00F0FF]/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                    <span className="text-xs font-mono bg-[#00F0FF]/15 text-[#00F0FF] px-2.5 py-1 rounded-full border border-[#00F0FF]/40 font-semibold">
                      {ev.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">{ev.title}</h3>
                  <div className="space-y-3 text-xs font-sans">
                    <div>
                      <span className="font-mono text-[#718096] text-[10px] block uppercase font-semibold">Context</span>
                      <p className="text-slate-200 mt-0.5">{ev.context}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[#718096] text-[10px] block uppercase font-semibold">Engineering Action</span>
                      <p className="text-slate-200 mt-0.5">{ev.action}</p>
                    </div>
                    <div className="bg-[#00F0FF]/10 p-3.5 rounded-xl border border-[#00F0FF]/30">
                      <span className="font-mono text-[#00F0FF] text-[11px] block uppercase font-bold">CEM Value</span>
                      <p className="text-slate-100 mt-0.5 font-medium">{ev.value}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CREDENTIALS SECTION (11 CERTIFICATES) */}
        <section id="credentials" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#00F0FF] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                  05 / Credentials Gallery
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                  Verified learning. <span className="text-[#00F0FF]">11 Certificates.</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setCertFilter('all')}
                  className={`px-3.5 py-2 rounded-xl transition ${certFilter === 'all' ? 'bg-[#00F0FF] text-black font-bold' : 'bg-[#0A0F1A]/90 text-slate-300 border border-white/10'}`}
                >
                  All (11)
                </button>
                <button
                  type="button"
                  onClick={() => setCertFilter('ai')}
                  className={`px-3.5 py-2 rounded-xl transition ${certFilter === 'ai' ? 'bg-[#8B5CF6] text-white font-bold' : 'bg-[#0A0F1A]/90 text-slate-300 border border-white/10'}`}
                >
                  AI & ML (5)
                </button>
                <button
                  type="button"
                  onClick={() => setCertFilter('data')}
                  className={`px-3.5 py-2 rounded-xl transition ${certFilter === 'data' ? 'bg-[#FF007A] text-white font-bold' : 'bg-[#0A0F1A]/90 text-slate-300 border border-white/10'}`}
                >
                  Data & Automation (6)
                </button>
              </div>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCerts.map((cert) => (
                <article
                  key={cert.id}
                  className="bg-[#0A0F1A]/90 p-6 rounded-2xl border border-white/15 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#00F0FF] bg-[#00F0FF]/15 px-2.5 py-0.5 rounded-full border border-[#00F0FF]/40 font-semibold">
                        {cert.tags[0]}
                      </span>
                      <span className="text-[#718096]">{cert.date}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white leading-snug">
                      {cert.title}
                    </h3>

                    <p className="text-xs font-mono text-[#718096]">{cert.issuer}</p>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {cert.description}
                    </p>
                  </div>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#00F0FF] hover:underline inline-flex items-center gap-1.5 pt-3 border-t border-white/10 font-bold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open verified cert ↗
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT & CLI TERMINAL */}
        <section id="contact" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="space-y-10">
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#00F0FF] uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                08 / Contact & Initiation
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                Let’s improve network experience <span className="text-[#00F0FF]">with evidence.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
              <a href="tel:+66982852659" className="bg-[#0A0F1A]/90 p-6 rounded-2xl border border-[#00F0FF]/30 space-y-2 block">
                <div className="flex items-center justify-between text-[#00F0FF]">
                  <span>Phone</span>
                  <Phone className="w-4 h-4" />
                </div>
                <strong className="text-white text-sm block">+66 98-285-2659</strong>
              </a>

              <button
                type="button"
                onClick={() => copyEmail('chanon.wankaew@icloud.com')}
                className="bg-[#0A0F1A]/90 p-6 rounded-2xl border border-[#00F0FF]/30 space-y-2 text-left w-full"
              >
                <div className="flex items-center justify-between text-[#00F0FF]">
                  <span>Email</span>
                  <span className="text-[10px] bg-[#00F0FF]/15 px-2 py-0.5 rounded border border-[#00F0FF]/40 font-bold">Copy</span>
                </div>
                <strong className="text-white text-sm block truncate">chanon.wankaew@icloud.com</strong>
              </button>

              <a href="https://www.linkedin.com/in/chanont-wankaew" target="_blank" rel="noreferrer" className="bg-[#0A0F1A]/90 p-6 rounded-2xl border border-[#00F0FF]/30 space-y-2 block">
                <div className="flex items-center justify-between text-[#00F0FF]">
                  <span>LinkedIn</span>
                  <Linkedin className="w-4 h-4" />
                </div>
                <strong className="text-white text-sm block">chanont-wankaew</strong>
              </a>

              <a href="Chanont_Wankaew_Resume.pdf" download className="bg-[#0A0F1A]/90 p-6 rounded-2xl border border-[#00F0FF]/30 space-y-2 block">
                <div className="flex items-center justify-between text-[#00F0FF]">
                  <span>Resume</span>
                  <FileText className="w-4 h-4" />
                </div>
                <strong className="text-white text-sm block">Download PDF</strong>
              </a>
            </div>

            {/* Terminal */}
            <div className="bg-[#0A0F1A]/90 rounded-2xl overflow-hidden border border-[#00F0FF]/40 shadow-2xl font-mono text-xs">
              <div className="bg-black/85 px-4.5 py-3 border-b border-white/10 flex items-center justify-between text-[#718096]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-bold text-slate-200">chanont-wankaew-terminal ~ v2.5</span>
                </div>
                <span className="text-[10px] text-[#00F0FF] font-bold">CLI Active</span>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2 text-slate-300 max-h-52 overflow-y-auto">
                  {terminalLogs.map((log, idx) => (
                    <p key={idx} className={log.type === 'cmd' ? 'text-[#00FF88] font-bold' : 'text-slate-200'}>
                      {log.text}
                    </p>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <span className="text-[#00FF88] font-bold">&gt;</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        runTerminalCmd(terminalInput);
                        setTerminalInput('');
                      }
                    }}
                    placeholder="Type a command (e.g., help, certs, skills, contact)..."
                    className="bg-transparent text-white focus:outline-none w-full text-xs"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                  {['help', 'certs', 'skills', 'whoami', 'contact', 'clear'].map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => runTerminalCmd(cmd)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 font-bold"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 px-4 sm:px-8 border-t border-white/10 text-xs font-mono text-[#718096]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="Chanont_Wankaew_Resume.pdf" download className="hover:text-[#00F0FF] transition flex items-center gap-1 font-bold">
              <FileDown className="w-4 h-4" /> Download CV PDF
            </a>
            <p className="text-center">© 2026 Chanont Wankaew · Telecom Data Analytics · RF Optimization · CEM Focus</p>
            <a href="#top" className="hover:text-[#00F0FF] transition flex items-center gap-1 font-bold">Back to top ↑</a>
          </div>
        </footer>
      </div>

      {/* TOAST POPUP */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#0A0F1A]/95 border border-[#00FF88]/60 text-[#00FF88] px-5 py-3 rounded-xl font-mono text-xs shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}