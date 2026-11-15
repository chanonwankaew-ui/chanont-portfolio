'use client';

import { FormEvent, useEffect, useState } from 'react';
import { profile } from '@/lib/data';

type TerminalLine = { kind: 'system' | 'command' | 'output'; text: string };

const analysisOutput =
  'Parsed synthetic RAN sample.\n\nRF insight: Sector B shows a low-SINR cluster with a matching rise in retransmissions.\nSuggested next step: validate antenna tilt and neighboring-cell interference before adjusting parameters.\n\nSimulation only — no live network data was accessed.';

export default function TerminalSection() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { kind: 'system', text: 'Portfolio CLI ready. Type help to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState<number | null>(null);
  const [streamText, setStreamText] = useState<string | null>(null);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const busy = analysisProgress !== null || (streamText !== null && visibleCharacters < streamText.length);

  useEffect(() => {
    if (analysisProgress === null) return;
    const timer = window.setTimeout(() => {
      if (analysisProgress >= 100) {
        setAnalysisProgress(null);
        setVisibleCharacters(0);
        setStreamText(analysisOutput);
      } else {
        setAnalysisProgress(analysisProgress + 5);
      }
    }, 55);
    return () => window.clearTimeout(timer);
  }, [analysisProgress]);

  useEffect(() => {
    if (streamText === null) return;
    if (visibleCharacters >= streamText.length) return;
    const timer = window.setTimeout(() => setVisibleCharacters((count) => count + 1), 14);
    return () => window.clearTimeout(timer);
  }, [streamText, visibleCharacters]);

  function runCommand(commandText: string) {
    const command = commandText.trim().toLowerCase();
    if (!command || busy) return;

    if (command === 'clear') {
      setLines([]);
      setStreamText(null);
      setInput('');
      return;
    }

    setLines((current) => [...current, { kind: 'command', text: `› ${command}` }]);
    setInput('');

    if (command === 'analyze_network') {
      setStreamText(null);
      setAnalysisProgress(0);
      return;
    }

    setStreamText(null);
    const responses: Record<string, string> = {
      help: 'Commands: help · whoami · skills · contact · analyze_network · clear',
      whoami: `${profile.name} — ${profile.role}. Focus: ${profile.focus}.`,
      skills: 'RAN/RF · 3G–5G NR · Python · SQL · Power BI · CEM · RAG · FastAPI',
      contact: `${profile.email} · ${profile.phone} · ${profile.location}`,
    };

    setLines((current) => [
      ...current,
      { kind: 'output', text: responses[command] ?? `Unknown command: ${command}. Type help for options.` },
    ]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(220px,0.7fr)]">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#080808]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <p className="text-sm text-zinc-300">chanont://network-analysis</p>
          <span className="text-xs text-zinc-500">SIMULATED CLI</span>
        </div>
        <div
          aria-live="polite"
          className="min-h-64 space-y-3 p-5 font-mono text-sm leading-6 sm:min-h-80 sm:p-7"
        >
          {lines.map((line, index) => (
            <p
              key={`${line.kind}-${index}`}
              className={line.kind === 'command' ? 'text-white' : line.kind === 'system' ? 'text-zinc-500' : 'whitespace-pre-line text-zinc-300'}
            >
              {line.text}
            </p>
          ))}
          {analysisProgress !== null && (
            <div className="max-w-sm pt-2">
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Parsing synthetic network sample</span>
                <span>{analysisProgress}%</span>
              </div>
              <div
                className="mt-2 h-1 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Network analysis progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={analysisProgress}
              >
                <div className="h-full rounded-full bg-zinc-200 transition-[width]" style={{ width: `${analysisProgress}%` }} />
              </div>
            </div>
          )}
          {streamText !== null && (
            <p className="whitespace-pre-line text-zinc-300">
              {streamText.slice(0, visibleCharacters)}
              {visibleCharacters < streamText.length && <span className="animate-pulse">▍</span>}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-white/10 px-5 py-4 sm:px-7">
          <label htmlFor="terminal-command" className="text-zinc-500" aria-label="Command prompt">›</label>
          <input
            id="terminal-command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={busy}
            autoComplete="off"
            spellCheck={false}
            placeholder={busy ? 'Analysis in progress…' : 'Type a command'}
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-zinc-600 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy || input.trim().length === 0}
            className="rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Run
          </button>
        </form>
        <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-4 sm:px-7">
          {['help', 'analyze_network', 'skills'].map((command) => (
            <button
              key={command}
              type="button"
              disabled={busy}
              onClick={() => runCommand(command)}
              className="rounded-full bg-white/[0.06] px-3 py-1.5 font-mono text-xs text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
            >
              {command}
            </button>
          ))}
        </div>
      </div>

      <aside className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
        <div>
          <p className="text-xs tracking-[0.16em] text-zinc-500 uppercase">AI terminal</p>
          <h3 className="mt-4 text-2xl font-medium tracking-tight text-white">A small network-analysis demo.</h3>
          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Run a local, simulated parsing flow to see how RF observations can lead to practical next steps.
            It does not call an AI service or access live network data.
          </p>
        </div>
        <div className="mt-8 space-y-2 border-t border-white/10 pt-5 text-sm">
          <a className="block text-zinc-300 transition hover:text-white" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="block text-zinc-400 transition hover:text-white" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn profile ↗</a>
        </div>
      </aside>
    </div>
  );
}
