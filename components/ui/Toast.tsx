'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#00FF88]" />,
    error: <AlertCircle className="w-5 h-5 text-[#FF007A]" />,
    info: <Info className="w-5 h-5 text-[#00F0FF]" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl glass-panel border-[#00F0FF]/40 text-white text-sm font-mono shadow-2xl animate-fade-in">
      {icons[type]}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Close Toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
