'use client';

import { useEffect, useState } from 'react';
import { evidenceCases } from '@/lib/data';

type EvidenceCase = (typeof evidenceCases)[number];

export default function EvidenceSection() {
  const [selectedCase, setSelectedCase] = useState<EvidenceCase | null>(null);

  useEffect(() => {
    if (!selectedCase) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedCase(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedCase]);

  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.2em] text-zinc-400 uppercase">Selected work</p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">Evidence cases</h2>
        <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          A closer look at network problems, the engineering approach and the customer value in view.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {evidenceCases.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedCase(item)}
            className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-left transition-colors hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs tracking-[0.16em] text-zinc-500 uppercase">{item.category}</span>
              <span className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-300">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-7 text-xl font-medium tracking-tight text-white sm:text-2xl">{item.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">{item.context}</p>
            <span className="mt-6 inline-block text-sm text-zinc-200">Inspect case <span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>

      {selectedCase && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedCase(null);
          }}
        >
          <section
            aria-labelledby="evidence-dialog-title"
            aria-modal="true"
            className="max-h-[min(90vh,760px)] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#101010] p-6 sm:p-9"
            role="dialog"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase">{selectedCase.category}</p>
                <h3 id="evidence-dialog-title" className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {selectedCase.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                aria-label="Close case details"
                className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                ['Context', selectedCase.context],
                ['Approach', selectedCase.action],
                ['Value', selectedCase.value],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs tracking-[0.16em] text-zinc-500 uppercase">{label}</dt>
                  <dd className="mt-2 text-sm leading-6 text-zinc-300">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs tracking-[0.16em] text-zinc-500 uppercase">5G KPI snapshot</p>
                  <h4 className="mt-2 text-lg font-medium text-white">Illustrative simulation</h4>
                </div>
                <p className="max-w-sm text-xs leading-5 text-zinc-500">
                  Example values for this interactive demo only; not audited project results.
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {selectedCase.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl bg-white/[0.04] p-4">
                    <p className="text-xs text-zinc-500">{metric.label}</p>
                    <p className="mt-2 text-2xl font-medium tracking-tight text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
