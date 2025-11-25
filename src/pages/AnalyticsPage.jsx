// src/pages/AnalyticsPage.jsx
// Standalone Analytics page for TorquePanel with richer stats and visuals.

function AnalyticsPage() {
  // NOTE: these numbers are sample "marketing" numbers, not live data.
  const usageRows = [
    { label: 'Main RP city', value: 90 },
    { label: 'Whitelist city', value: 65 },
    { label: 'Racing / drift', value: 55 },
    { label: 'Freeroam / sandbox', value: 40 },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* HEADER */}
        <header className="mb-6">
          <p className="text-[11px] uppercase tracking-wide text-cyan-400">
            TorquePanel · Analytics
          </p>
          <h1 className="mt-1 text-2xl font-semibold">
            Analytics built for RP cities, not ad agencies
          </h1>
          <p className="mt-2 text-xs text-slate-400 max-w-2xl">
            TorquePanel helps you understand how your GTA / FiveM city is used
            in real life: when owners log in, how players flow through servers,
            and where your community is growing or stalling.
          </p>
        </header>

        {/* WHO USES TORQUEPANEL */}
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs">
          <h2 className="mb-3 text-sm font-semibold text-slate-50">
            Who&apos;s using TorquePanel right now
          </h2>

          {/* top stats row */}
          <div className="grid gap-3 md:grid-cols-4 text-slate-300">
            <div className="rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-3">
              <p className="text-[11px] text-slate-400">Total panel users</p>
              <p className="text-xl font-semibold text-slate-50">3.2k</p>
              <p className="text-[10px] text-emerald-300">+184 this month</p>
            </div>
            <div className="rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-3">
              <p className="text-[11px] text-slate-400">
                GTA / FiveM server owners
              </p>
              <p className="text-xl font-semibold text-slate-50">870</p>
              <p className="text-[10px] text-cyan-300">
                Owners &amp; head admins
              </p>
            </div>
            <div className="rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-3">
              <p className="text-[11px] text-slate-400">Servers monitored</p>
              <p className="text-xl font-semibold text-slate-50">1.4k</p>
              <p className="text-[10px] text-slate-400">
                RP, freeroam, racing, economy &amp; more
              </p>
            </div>
            <div className="rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-3">
              <p className="text-[11px] text-slate-400">Peak players online</p>
              <p className="text-xl font-semibold text-slate-50">38k</p>
              <p className="text-[10px] text-emerald-300">
                Online across TorquePanel cities
              </p>
            </div>
          </div>

          {/* explanatory text */}
          <p className="mt-3 text-[11px] text-slate-400">
            Numbers are illustrative, but the way we measure them is real:
            TorquePanel pulls from your server logs and heartbeat checks, so you
            always know who&apos;s connected, how many servers are healthy, and
            where staff actually spend their time.
          </p>
        </section>

        {/* ANALYTICS DETAILS + SAMPLE VISUALS */}
        <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-300 md:grid-cols-[1.4fr_minmax(0,1fr)]">
          <div>
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              See your city the way your players feel it
            </h2>
            <p className="mb-3 text-[11px] text-slate-400">
              It&apos;s not just about &quot;how many people joined&quot;. TorquePanel
              focuses on how people stay, where they get stuck, and which
              servers or jobs are really carrying your RP.
            </p>

            <ul className="space-y-3">
              <li>
                <span className="font-semibold text-slate-100">
                  Concurrency &amp; peaks
                </span>
                <br />
                Understand when your city is busiest, across all your servers,
                so you can schedule restarts and major events without nuking RP.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Owners, staff and players in one view
                </span>
                <br />
                Track how often owners log in, how active your staff team is and
                which servers actually see the most action.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Server uptime and health
                </span>
                <br />
                See at a glance how many of your servers are online, stuck in
                queue, or down hard &mdash; before Discord fills with pings.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Player flow across servers
                </span>
                <br />
                Understand which RP shards players bounce between: main city,
                racing, drift, whitelist-only and test servers.
              </li>
            </ul>
          </div>

          {/* mini analytics / usage graph */}
          <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-4">
            <div className="mb-2 flex items-center justify-between text-[11px] text-slate-300">
              <span>Example server usage</span>
              <span className="text-slate-500">Last 24 hours</span>
            </div>

            {/* fake bar chart for people using servers */}
            <div className="space-y-2 text-[11px]">
              {usageRows.map((row) => (
                <div key={row.label}>
                  <div className="mb-0.5 flex items-center justify-between">
                    <span className="text-slate-300">{row.label}</span>
                    <span className="text-slate-400">
                      {row.value}% of players
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400"
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Average session length</span>
                <span className="font-semibold text-emerald-300">2h 14m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Returning players</span>
                <span className="font-semibold text-cyan-300">72%</span>
              </div>
            </div>

            <p className="mt-3 text-[10px] text-slate-500">
              In the real panel, these visuals are driven by your actual player
              sessions and resource metrics, updated in real time.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AnalyticsPage
