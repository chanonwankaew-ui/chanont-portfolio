'use client';

import { useState, useEffect } from 'react';
import { Activity, Cpu, Wifi, Zap, Signal, Globe } from 'lucide-react';

export default function CyberHUD() {
  const [telemetry, setTelemetry] = useState({
    frequency: 0,
    latency: 0,
    bandwidth: 0,
    signalStrength: 0,
    activeConnections: 0
  });

  const [logs, setLogs] = useState([
    { time: '00:00:01', message: 'System initialized', type: 'info' },
    { time: '00:00:02', message: '5G tower connection established', type: 'success' },
    { time: '00:00:03', message: 'Data nodes synchronized', type: 'info' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        frequency: 2800 + Math.random() * 400,
        latency: Math.floor(10 + Math.random() * 20),
        bandwidth: Math.floor(800 + Math.random() * 400),
        signalStrength: Math.floor(85 + Math.random() * 15),
        activeConnections: Math.floor(100 + Math.random() * 50)
      }));

      // Add random log entries
      if (Math.random() > 0.7) {
        const messages = [
          'Signal packet transmitted',
          'RF optimization check passed',
          'Data node heartbeat received',
          'Frequency calibration updated',
          'Bandwidth allocation adjusted'
        ];
        const types = ['info', 'success', 'warning'];
        setLogs(prev => {
          const newLog = {
            time: new Date().toLocaleTimeString('en-US', { hour12: false }),
            message: messages[Math.floor(Math.random() * messages.length)],
            type: types[Math.floor(Math.random() * types.length)]
          };
          return [...prev.slice(-4), newLog];
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-[#00FF88]';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-[#FF007A]';
      default: return 'text-[#00F0FF]';
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50 space-y-3 pointer-events-none">
      {/* Main Command Center */}
      <div className="glass-panel p-4 rounded-xl border border-[#00F0FF]/30 shadow-2xl min-w-[280px]">
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00F0FF] animate-pulse" />
            <span className="text-xs font-mono font-bold text-white">COMMAND CENTER</span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#FF007A] animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse delay-75" />
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse delay-150" />
          </div>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Wifi className="w-3 h-3" />
              FREQUENCY
            </div>
            <div className="text-lg font-bold text-[#00F0FF] font-mono">
              {telemetry.frequency.toFixed(1)} MHz
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Zap className="w-3 h-3" />
              LATENCY
            </div>
            <div className="text-lg font-bold text-[#00FF88] font-mono">
              {telemetry.latency} ms
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Signal className="w-3 h-3" />
              BANDWIDTH
            </div>
            <div className="text-lg font-bold text-[#8B5CF6] font-mono">
              {telemetry.bandwidth} Mbps
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Globe className="w-3 h-3" />
              SIGNAL
            </div>
            <div className="text-lg font-bold text-[#FF007A] font-mono">
              {telemetry.signalStrength}%
            </div>
          </div>
        </div>

        {/* Active Connections */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <Cpu className="w-3 h-3" />
            ACTIVE NODES
          </div>
          <span className="text-sm font-bold text-white font-mono">{telemetry.activeConnections}</span>
        </div>
      </div>

      {/* System Logs */}
      <div className="glass-panel p-3 rounded-xl border border-white/10 shadow-xl min-w-[280px]">
        <div className="text-[10px] font-mono text-slate-400 mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
          SYSTEM LOGS
        </div>
        <div className="space-y-1.5 max-h-[120px] overflow-hidden">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2 text-[10px] font-mono">
              <span className="text-slate-500 whitespace-nowrap">{log.time}</span>
              <span className={getTypeColor(log.type)}>{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Camera Controls Hint */}
      <div className="glass-panel px-3 py-2 rounded-xl border border-white/10 shadow-xl">
        <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
          <span className="text-[#00F0FF]">🖱️</span>
          <span>DRAG to orbit camera</span>
        </div>
      </div>
    </div>
  );
}