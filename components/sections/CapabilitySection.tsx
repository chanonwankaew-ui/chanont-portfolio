import { capabilities } from '@/lib/data';

export default function CapabilitySection() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.2em] text-zinc-400 uppercase">How I work</p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">Capabilities</h2>
        <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          Telecom domain depth, practical analytics and applied AI—connected around better network experiences.
        </p>
      </header>

      <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
        {capabilities.map((capability) => (
          <article key={capability.number} className="bg-black/90 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm text-zinc-500">{capability.number}</p>
                <h3 className="mt-4 text-2xl font-medium tracking-tight text-white">{capability.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{capability.subtitle}</p>
              </div>
              <span className="mt-1 h-2 w-2 rounded-full bg-zinc-300" aria-hidden="true" />
            </div>
            <ul className="mt-8 space-y-3 border-t border-white/10 pt-5">
              {capability.details.map((detail) => (
                <li key={detail} className="text-sm leading-6 text-zinc-300">
                  {detail}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
