export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-8 sm:py-12">
      <header className="flex flex-col gap-4">
        <div className="inline-flex w-fit items-center rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          Private clinical toolkit
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            NurseCore
          </h1>
          <p className="max-w-2xl text-base text-neutral-600 sm:text-lg">
            Calm structure for daily nursing work and study. Everything in one
            place—tools, notes, knowledge, and Boris support.
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <a
          href="/tools"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Tools</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Daily checklists and ward-focused aids.
            </p>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            Open tools →
          </span>
        </a>
        <a
          href="/boris"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Boris AI</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Study support with safe, structured guidance.
            </p>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            Ask Boris →
          </span>
        </a>
        <a
          href="/notes"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Notes</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Quick personal notes and reminders.
            </p>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            View notes →
          </span>
        </a>
        <a
          href="/knowledge"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Knowledge
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Short references for IBD, liver, and ICU study.
            </p>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            Browse knowledge →
          </span>
        </a>
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="/boris"
          className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          Boris – finns här för dig
        </a>
      </div>
    </div>
  );
}
