import { credentials } from '@/lib/data';

export default function CredentialsSection() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.2em] text-zinc-400 uppercase">Education & continuous learning</p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">Credentials</h2>
        <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          Eleven certificates across AI, data analysis and practical automation.
        </p>
      </header>

      <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs tracking-[0.16em] text-zinc-500 uppercase">Education</p>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-medium text-white">B.Eng. Telecommunications Engineering</h3>
              <p className="mt-2 text-sm text-zinc-400">Rajamangala University of Technology Thanyaburi</p>
            </div>
            <div className="border-t border-white/10 pt-5">
              <h3 className="font-medium text-white">Higher Technical Certificate</h3>
              <p className="mt-2 text-sm text-zinc-400">Electrical & Electronics · Thai-Austrian Technical College</p>
            </div>
            <p className="border-t border-white/10 pt-5 text-sm leading-6 text-zinc-400">
              340+ days of applied AI and data-science study alongside telecom engineering work.
            </p>
          </div>
        </article>

        <ol className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.025] px-5 sm:px-7">
          {credentials.map((credential, index) => (
            <li key={credential.title} className="flex items-start gap-4 py-4">
              <span className="mt-0.5 w-7 shrink-0 text-xs text-zinc-600">0{index + 1}</span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium leading-6 text-white">{credential.title}</h3>
                <p className="mt-1 text-xs leading-5 text-zinc-500">{credential.issuer}</p>
              </div>
              <time className="shrink-0 pt-1 text-xs text-zinc-500">{credential.date}</time>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
