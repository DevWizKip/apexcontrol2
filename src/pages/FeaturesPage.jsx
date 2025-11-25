// src/pages/FeaturesPage.jsx
// Standalone Features page for TorquePanel with GTA / FiveM RP-focused copy
// and some visual "graph" elements.

function FeaturesPage() {
  const serverUsage = [
    { label: 'Main RP city', value: 88 },
    { label: 'Whitelist city', value: 62 },
    { label: 'Racing / drift', value: 54 },
    { label: 'Freeroam / sandbox', value: 39 },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* HEADER */}
        <header className="mb-8">
          <p className="text-[11px] uppercase tracking-wide text-cyan-400">
            TorquePanel · Features
          </p>
          <h1 className="mt-1 text-2xl font-semibold">
            Everything your GTA / FiveM city needs in one control panel
          </h1>
          <p className="mt-2 text-xs text-slate-400 max-w-2xl">
            TorquePanel gives server owners, head admins, devs and staff the
            tools they need to keep RP smooth, performance stable and drama
            under control &mdash; without juggling ten different sites.
          </p>
        </header>

        {/* 3 KEY PILLARS (HOVERABLE CARDS) */}
        <section className="mb-8 grid gap-4 md:grid-cols-3 text-xs text-slate-300">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition-transform duration-150 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/20">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Live server HUD
            </h2>
            <p>
              Uptime, crashes, latency, CPU / RAM and resource impact in one
              esports-style HUD that updates as your players connect, crash or
              swap servers.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition-transform duration-150 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/20">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Player &amp; RP intelligence
            </h2>
            <p>
              See who&apos;s actually driving your RP: loyal players, streamers,
              gangs, cops, racers. Track sessions, retention and high-risk
              players in one place.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition-transform duration-150 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/20">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Staff-first moderation
            </h2>
            <p>
              Centralize reports, evidence, bans and notes so your staff can
              react in seconds, not screenshots. Every action is logged and
              auditable.
            </p>
          </div>
        </section>

        {/* LIVE CITY SNAPSHOT WITH SIMPLE GRAPH */}
        <section className="mb-8 grid gap-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 md:grid-cols-[1.3fr_minmax(0,1fr)]">
          <div>
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Live city snapshot (example)
            </h2>
            <p className="mb-3 text-[11px] text-slate-400 max-w-xl">
              This is how a typical TorquePanel city looks during an evening
              peak: multiple shards online, different server types, one view for
              owners and staff to work from.
            </p>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-slate-100">
                  Multi-server control
                </span>
                <br />
                See all your GTA / FiveM servers at once: main RP city,
                whitelist-only city, race servers, dev shards and more.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Queue &amp; peak awareness
                </span>
                <br />
                Understand where players are piling up so you can adjust slots,
                scaling and restart windows intelligently.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  One panel for all roles
                </span>
                <br />
                Owners, devs and staff can all look at the same data, filtered
                to the level of access they&apos;re allowed.
              </li>
            </ul>
          </div>

          {/* right side: bar-style "graph" for server usage */}
          <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-4">
            <div className="mb-2 flex items-center justify-between text-[11px] text-slate-300">
              <span>Server usage by type</span>
              <span className="text-slate-500">Last 24 hours (example)</span>
            </div>
            <div className="space-y-2 text-[11px]">
              {serverUsage.map((row) => (
                <div key={row.label}>
                  <div className="mb-0.5 flex items-center justify-between">
                    <span className="text-slate-300">{row.label}</span>
                    <span className="text-slate-400">
                      {row.value}% of players
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 transition-all duration-200 hover:brightness-110"
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-slate-500">
              In the live TorquePanel app, these bars are powered by your real
              player sessions and heartbeat checks.
            </p>
          </div>
        </section>

        {/* FEATURE GROUPS: SERVER, PLAYERS, MODERATION, STAFF */}
        <section className="space-y-6 text-xs text-slate-300">
          {/* SERVER HEALTH */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Server health &amp; performance
            </h2>
            <p className="mb-2 text-[11px] text-slate-400 max-w-xl">
              Stop guessing why the city feels scuffed tonight. TorquePanel
              gives you a full read on how your servers are behaving in real
              time.
            </p>
            <ul className="grid gap-2 md:grid-cols-2">
              <li>
                <span className="font-semibold text-slate-100">Uptime map</span>
                <br />
                See uptime and restart history across all your boxes so you can
                spot patterns before they turn into Discord riots.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Crash &amp; spike tracking
                </span>
                <br />
                Track crash frequency, peak queues and ping spikes tied to
                specific resources or updates.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Resource impact breakdown
                </span>
                <br />
                Quickly see which scripts are eating CPU or causing errors so
                devs know where to patch first.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Multi-server view
                </span>
                <br />
                Monitor main city, whitelist city, race servers, dev servers and
                more from the same panel.
              </li>
            </ul>
          </div>

          {/* PLAYER INTELLIGENCE */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Player intelligence &amp; RP quality
            </h2>
            <p className="mb-2 text-[11px] text-slate-400 max-w-xl">
              Go beyond &quot;how many joined&quot; and actually understand who&apos;s
              building your city up &mdash; and who&apos;s tearing it down.
            </p>
            <ul className="grid gap-2 md:grid-cols-2">
              <li>
                <span className="font-semibold text-slate-100">
                  Player profiles
                </span>
                <br />
                See playtime, last seen, roles, tags (cop, gang, medic,
                streamer) and risk score in one glance.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Session timelines
                </span>
                <br />
                Track when players connect, swap servers, get warned or banned
                &mdash; so incidents make sense in context.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Retention &amp; loyalty
                </span>
                <br />
                Measure how many new players stick around, how long they stay
                and which RP paths keep them hooked.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  High-risk player detection
                </span>
                <br />
                Spot players with stacked reports, repeated VDM / RDM or combat
                logging before they ruin a full restart.
              </li>
            </ul>
          </div>

          {/* MODERATION WORKFLOWS */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Moderation, reports &amp; bans
            </h2>
            <p className="mb-2 text-[11px] text-slate-400 max-w-xl">
              Instead of chasing screenshots across Discord, keep all your city
              enforcement in one place with full history.
            </p>
            <ul className="grid gap-2 md:grid-cols-2">
              <li>
                <span className="font-semibold text-slate-100">
                  Centralized report inbox
                </span>
                <br />
                All in-game and staff reports flow into one feed with filters
                for severity, location and rule type.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Evidence &amp; notes
                </span>
                <br />
                Attach clips, IDs, timestamps and internal notes to each case so
                staff decisions are clear and consistent.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Quick actions for staff
                </span>
                <br />
                Kick, warn, temp-ban or permaban directly from the player
                profile or report screen with templates.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Full audit log
                </span>
                <br />
                Every action is logged with who did what and when, so owners can
                review staff decisions later.
              </li>
            </ul>
          </div>

          {/* STAFF & OPERATIONS */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Staff operations &amp; monetization
            </h2>
            <p className="mb-2 text-[11px] text-slate-400 max-w-xl">
              Your city isn&apos;t just a game server &mdash; it&apos;s a live
              operation. TorquePanel helps keep it funded and staffed.
            </p>
            <ul className="grid gap-2 md:grid-cols-2">
              <li>
                <span className="font-semibold text-slate-100">
                  Role-based access
                </span>
                <br />
                Let helpers see what they need without giving them nuclear
                buttons. Separate views for owners, leads and trial staff.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Donor &amp; package insights
                </span>
                <br />
                Understand which perks actually convert and which donors keep
                coming back without exposing full payment data to staff.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Maintenance &amp; restart planning
                </span>
                <br />
                Use concurrency and incident data to choose restart windows that
                don&apos;t nuke prime-time RP.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Multi-city support
                </span>
                <br />
                Owners with multiple cities or test servers can track them all
                from one TorquePanel account.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FeaturesPage
