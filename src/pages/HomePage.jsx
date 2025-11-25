// src/pages/HomePage.jsx
// GTA / FiveM themed marketing homepage with a Lunar-style vibe, branded as TorquePanel,
// now with proper sections for Features, Analytics, and Security.

import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50">
      {/* Top gradient + glow background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* soft neon blobs */}
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-40 -left-32 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute top-80 -right-40 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Page content wrapper */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        {/* NAVBAR */}
        <header className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 shadow-lg shadow-cyan-500/30">
              <span className="text-sm font-bold tracking-tight">T</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide">
                TorquePanel
              </span>
              <span className="text-[11px] text-slate-400">
                FiveM / GTA server control panel
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs text-slate-300 md:flex">
  <Link to="/features" className="hover:text-slate-50">
    Features
  </Link>
  <Link to="/analytics" className="hover:text-slate-50">
    Analytics
  </Link>
  <Link to="/security" className="hover:text-slate-50">
    Security
  </Link>
  <Link to="/docs" className="hover:text-slate-50">
    Docs
  </Link>
</nav>

          <div className="flex items-center gap-2 text-xs">
            <Link
              to="/login"
              className="rounded-full border border-slate-700/80 px-3 py-1.5 text-slate-200 hover:border-slate-500 hover:bg-slate-900/70"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:brightness-110"
            >
              Start for free
            </Link>
          </div>
        </header>

        {/* HERO SECTION */}
        <main className="flex flex-1 flex-col items-center gap-10 lg:flex-row lg:items-stretch">
          {/* Left side: text */}
          <section className="flex flex-1 flex-col justify-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-950/80 px-2 py-1 text-[11px] text-cyan-100">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Real-time control for your FiveM city</span>
            </div>

            <div>
              <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                The server panel your{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
                  RP city deserves
                </span>
                .
              </h1>
              <p className="mt-3 max-w-xl text-sm text-slate-300">
                TorquePanel gives you esports-grade dashboards, player intel,
                and moderation tools for GTA 5 / FiveM servers. See every spike,
                crash, and rulebreak before your city feels it.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <Link
                to="/signup"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-5 py-2 font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:brightness-110"
              >
                Launch my control panel
              </Link>
              <Link
                to="/app/dashboard"
                className="rounded-full border border-slate-700/80 bg-slate-950/70 px-4 py-2 text-slate-100 hover:border-cyan-400/70 hover:bg-slate-900/80"
              >
                View live demo
              </Link>
              <p className="w-full text-[11px] text-slate-400 sm:w-auto">
                No credit card • Works with FiveM / txAdmin setups
              </p>
            </div>

            {/* host types */}
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-1 rounded-full border border-slate-700/70 bg-slate-950/70 px-2 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Windows host</span>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-slate-700/70 bg-slate-950/70 px-2 py-1">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span>Linux VPS</span>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-slate-700/70 bg-slate-950/70 px-2 py-1">
                <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                <span>Dedicated machines</span>
              </div>
            </div>
          </section>

          {/* Right side: fake launcher / dashboard card */}
          <section className="flex flex-1 items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* glow behind card */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-500/40 via-fuchsia-500/30 to-emerald-500/30 blur-xl" />
              <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4 shadow-2xl shadow-black/60 backdrop-blur">
                {/* top bar (like a mini launcher) */}
                <div className="mb-3 flex items-center justify-between text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="font-semibold">Main RP City · Online</span>
                  </div>
                  <span className="text-slate-500">TorquePanel preview</span>
                </div>

                {/* faux dashboard content */}
                <div className="grid gap-3">
                  {/* row 1 - KPIs */}
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-2 py-2">
                      <p className="text-slate-400">Players</p>
                      <p className="text-lg font-semibold text-slate-50">128</p>
                      <p className="text-[10px] text-emerald-400">
                        Peak 212 tonight
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-2 py-2">
                      <p className="text-slate-400">Crashes</p>
                      <p className="text-lg font-semibold text-slate-50">0</p>
                      <p className="text-[10px] text-emerald-400">Stable</p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-2 py-2">
                      <p className="text-slate-400">Reports</p>
                      <p className="text-lg font-semibold text-slate-50">14</p>
                      <p className="text-[10px] text-amber-300">3 urgent</p>
                    </div>
                  </div>

                  {/* row 2 - mini chart placeholder */}
                  <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 px-3 py-3">
                    <div className="mb-1 flex items-center justify-between text-[11px] text-slate-300">
                      <span>Concurrency · last 12h</span>
                      <span className="text-slate-500">132 peak</span>
                    </div>
                    <div className="h-20 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.35),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.3),transparent_55%)]" />
                  </div>

                  {/* row 3 - incidents list */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3">
                    <div className="mb-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">Live incidents</span>
                      <span className="text-slate-500">Moderation</span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      <li className="flex items-center justify-between">
                        <span className="truncate">
                          TTV_Nitro · VDM in Legion
                        </span>
                        <span className="ml-2 rounded-full bg-amber-500/20 px-2 py-0.5 text-amber-200">
                          High
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="truncate">
                          NovaRP · OOC in PD holding
                        </span>
                        <span className="ml-2 rounded-full bg-sky-500/20 px-2 py-0.5 text-sky-200">
                          Medium
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="truncate">
                          DriftKing · Street race at Vinewood
                        </span>
                        <span className="ml-2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-200">
                          Watching
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* bottom hint */}
                <p className="mt-3 text-[10px] text-slate-500">
                  Actual in-app UI is even denser and fully real-time. This is
                  just a taste.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* FEATURES SECTION */}
        <section
          id="features"
          className="mt-16 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-xs text-slate-300"
        >
          <h2 className="mb-1 text-sm font-semibold text-slate-50">
            Built for serious GTA / FiveM servers
          </h2>
          <p className="mb-4 text-[11px] text-slate-400">
            TorquePanel replaces basic panels and half-broken spreadsheets with
            one place to see your city&apos;s health, from resources to roleplay.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <h3 className="mb-1 text-sm font-semibold text-slate-50">
                Live server HUD
              </h3>
              <p>
                Uptime, crash history, latency, CPU / RAM and resource impact in
                one esports-style HUD that updates as your players connect.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <h3 className="mb-1 text-sm font-semibold text-slate-50">
                Player intelligence
              </h3>
              <p>
                See sessions, risk scores, and tags for streamers, cops,
                racers, gangs &mdash; so you reward the right people and catch
                trouble early.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <h3 className="mb-1 text-sm font-semibold text-slate-50">
                Staff-first moderation
              </h3>
              <p>
                Centralize reports, evidence, bans and staff notes, instead of
                digging through Discord channels at 3AM.
              </p>
            </div>
          </div>
        </section>

        {/* ANALYTICS SECTION */}
        <section
          id="analytics"
          className="mt-10 grid gap-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-300 md:grid-cols-[1.4fr_minmax(0,1fr)]"
        >
          <div>
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Analytics built for RP cities, not ad agencies
            </h2>
            <p className="mb-3 text-[11px] text-slate-400">
              Track how your city actually feels to play: concurrency, queue
              pain, crashes, and RP hotspots &mdash; not just vanity numbers.
            </p>

            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-slate-100">
                  Concurrency &amp; peaks
                </span>
                <br />
                Understand when your city is busiest, so you can schedule
                restarts and major events without nuking RP.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Retention &amp; loyalty
                </span>
                <br />
                See which players keep coming back, which gangs or jobs keep
                them hooked, and where new players drop.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Incident heatmaps
                </span>
                <br />
                Spot spikes in reports, VDM, combat logging or toxic behavior
                before it bleeds into your whole community.
              </li>
            </ul>
          </div>

          {/* mini analytics visual */}
          <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-3">
            <div className="mb-2 flex items-center justify-between text-[11px] text-slate-300">
              <span>Sample city analytics</span>
              <span className="text-slate-500">Last 7 days</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Average nightly peak</span>
                <span className="font-semibold text-emerald-300">166 players</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">New players retained</span>
                <span className="font-semibold text-cyan-300">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Reports per 100 players</span>
                <span className="font-semibold text-amber-300">7.4</span>
              </div>
            </div>
            <div className="mt-3 h-20 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_55%),radial-gradient(circle_at_bottom,_rgba(52,211,153,0.3),transparent_55%)]" />
            <p className="mt-2 text-[10px] text-slate-500">
              Real metrics in-app are driven by your live logs and server
              events.
            </p>
          </div>
        </section>

        {/* SECURITY SECTION */}
        <section
          id="security"
          className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 text-xs text-slate-300"
        >
          <h2 className="mb-1 text-sm font-semibold text-slate-50">
            Security built for staff teams, not just sysadmins
          </h2>
          <p className="mb-4 text-[11px] text-slate-400">
            TorquePanel is designed so you can safely share control with your
            staff without giving everyone full access to the box.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <h3 className="mb-1 text-sm font-semibold text-slate-50">
                Role-based access
              </h3>
              <p>
                Limit who can restart services, ban players, edit configs or see
                monetization, so&apos;s there&apos;s no &quot;oops I nuked the city&quot;
                moments.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <h3 className="mb-1 text-sm font-semibold text-slate-50">
                Full audit trails
              </h3>
              <p>
                Every kick, ban, config change and restart is logged with who,
                when and why, so owner decisions don&apos;t get lost in Discord.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <h3 className="mb-1 text-sm font-semibold text-slate-50">
                Safe by design
              </h3>
              <p>
                Read-only views for helpers, elevated modes for leads, and
                sane defaults tuned for GTA RP communities, not generic web
                apps.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
