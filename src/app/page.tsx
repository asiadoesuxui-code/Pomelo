const features = [
  {
    title: "Guest list & RSVPs",
    description:
      "Track invites, meal choices, plus-ones, and seating — without the spreadsheet chaos.",
  },
  {
    title: "Budget tracker",
    description:
      "Set categories, log deposits, and see what is left to spend at a glance.",
  },
  {
    title: "Vendor hub",
    description:
      "Keep contracts, contacts, and payment due dates for every vendor in one place.",
  },
  {
    title: "Day-of timeline",
    description:
      "Build a run-of-show your planner, venue, and wedding party can actually follow.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-lg">
            🍊
          </span>
          <span className="font-serif text-2xl tracking-tight text-foreground">
            Pomelo
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#features" className="transition hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="transition hover:text-foreground">
            How it works
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full px-4 py-2 text-sm text-muted transition hover:text-foreground sm:inline-flex"
          >
            Sign in
          </button>
          <button
            type="button"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            Start planning
          </button>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-sage">
              Wedding planning, reimagined
            </p>
            <h1 className="font-serif text-5xl leading-tight tracking-tight text-foreground md:text-7xl">
              Every detail of your day, in one calm place
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Pomelo helps couples and planners stay organized — from the first
              venue tour to the last dance — with tools that feel as thoughtful
              as the celebration itself.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="w-full rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-foreground transition hover:opacity-90 sm:w-auto"
              >
                Create your wedding
              </button>
              <button
                type="button"
                className="w-full rounded-full border border-accent-soft bg-blush px-8 py-3.5 text-sm font-medium text-foreground transition hover:bg-accent-soft/60 sm:w-auto"
              >
                See a demo
              </button>
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[
              { label: "Days until I do", value: "142" },
              { label: "Guests confirmed", value: "86 / 120" },
              { label: "Budget remaining", value: "$12,400" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-accent-soft bg-blush/50 p-6 text-center"
              >
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="mt-2 font-serif text-3xl text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="border-t border-accent-soft bg-blush/30 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <h2 className="font-serif text-4xl text-foreground md:text-5xl">
                Built for the whole journey
              </h2>
              <p className="mt-4 text-lg text-muted">
                From engagement party to honeymoon send-off, Pomelo keeps your
                planning tools connected and your stress level lower.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-accent-soft bg-background p-8 shadow-sm"
                >
                  <h3 className="font-serif text-2xl text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              How it works
            </h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Create your wedding",
                  body: "Add your date, venue, and partner details to spin up a shared workspace.",
                },
                {
                  step: "02",
                  title: "Invite your team",
                  body: "Bring in your partner, planner, or wedding party with role-based access.",
                },
                {
                  step: "03",
                  title: "Plan with confidence",
                  body: "Track tasks, vendors, and budget in one place — updated in real time.",
                },
              ].map((item) => (
                <li key={item.step}>
                  <p className="text-sm font-medium text-sage">{item.step}</p>
                  <h3 className="mt-2 font-serif text-2xl text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="border-t border-accent-soft py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Pomelo. Plan beautifully.</p>
          <p>Made for couples who deserve less chaos.</p>
        </div>
      </footer>
    </div>
  );
}
