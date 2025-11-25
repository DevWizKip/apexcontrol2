function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <header className="space-y-2">
          <p className="text-xs text-cyan-400 uppercase tracking-wide">
            Product
          </p>
          <h1 className="text-3xl font-semibold">Everything in one panel</h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            ApexControl gives you a full picture of your FiveM servers: performance,
            players and moderation. Stop jumping between logs, spreadsheets and
            screenshots to understand what&apos;s going on.
          </p>
        </header>

        {/* Sections */}
        <section className="grid md:grid-cols-2 gap-8 text-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Server health & performance</h2>
            <ul className="text-slate-300 text-xs space-y-1 list-disc list-inside">
              <li>Live uptime, crash count and restart history.</li>
              <li>CPU, RAM and network usage by server and by resource.</li>
              <li>Average & peak ping by region, with trend lines.</li>
              <li>Alerts when things spike so you&apos;re not surprised mid-restart.</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p>
              See exactly which resources are causing stutters in Legion or
              why FPS tanks when a certain script updates. No more guessing or
              blaming random cars.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 text-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Player analytics</h2>
            <ul className="text-slate-300 text-xs space-y-1 list-disc list-inside">
              <li>New vs returning players and average session length.</li>
              <li>Retention by cohort – who sticks around after day 1, 3, 7?</li>
              <li>High-risk players flagged by reports & infractions.</li>
              <li>Top supporters, staff and streamers by playtime.</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p>
              Spot trends early: if new players are bouncing after one police
              interaction or if your whitelist changes hit retention, you&apos;ll see it.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 text-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Moderation & audit trail</h2>
            <ul className="text-slate-300 text-xs space-y-1 list-disc list-inside">
              <li>Central report inbox with status and assigned staff.</li>
              <li>Per-player history of kicks, warns and bans.</li>
              <li>Evidence links (clips, screenshots, message IDs) attached to cases.</li>
              <li>Exportable audit logs for appeals and staff training.</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p>
              Instead of digging through Discord logs and DMs, your team works
              from one shared timeline, so decisions are consistent and fair.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 text-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Multi-server & team-ready</h2>
            <ul className="text-slate-300 text-xs space-y-1 list-disc list-inside">
              <li>See all of your servers (RP, drift, racing, dev) in one view.</li>
              <li>Role-based access for owners, devs, staff and trial mods.</li>
              <li>Activity logs so you know who did what, and when.</li>
              <li>Works alongside txAdmin instead of replacing it.</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p>
              ApexControl is built for teams: multiple owners, head admins,
              department leads and helpers can all have tailored access.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FeaturesPage
