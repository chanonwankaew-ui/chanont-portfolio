import { careerTimeline } from '@/lib/data';

export default function TimelineSection() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.2em] text-zinc-400 uppercase">Experience & development</p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">Timeline</h2>
        <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          A career shaped by telecom engineering, customer experience and continuous learning.
        </p>
      </header>

      <ol className="relative max-w-3xl space-y-0 border-l border-white/15 pl-6 sm:pl-9">
        {careerTimeline.map((item, index) => (
          <li key={item.title} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full border border-zinc-400 bg-black sm:-left-[41px]" />
            <p className="text-xs tracking-[0.16em] text-zinc-500 uppercase">{item.marker}</p>
            <h3 className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">{item.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">{item.description}</p>
            {index < careerTimeline.length - 1 && <div className="mt-8 h-px max-w-xl bg-white/[0.07]" />}
          </li>
        ))}
      </ol>
    </div>
  );
}
