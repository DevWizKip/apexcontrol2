// src/pages/SecurityPage.jsx
// Standalone Security page for TorquePanel, GTA / FiveM RP-focused,
// with some visual "status" and bar charts.

function SecurityPage() {
  const actionsByRole = [
    { role: 'Owners', value: 12 },
    { role: 'Leads', value: 38 },
    { role: 'Moderators', value: 64 },
    { role: 'Helpers', value: 21 },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* HEADER */}
        <header className="mb-8">
          <p className="text-[11px] uppercase tracking-wide text-cyan-400">
            TorquePanel · Security
          </p>
          <h1 className="mt-1 text-2xl font-semibold">
            Security built for staff teams, not just sysadmins
          </h1>
          <p className="mt-2 text-xs text-slate-400 max-w-2xl">
            Your GTA / FiveM city lives on trust: trusted owners, trusted staff,
            trusted systems. TorquePanel helps you share control without handing
            everyone the keys to the entire box.
          </p>
        </header>

        {/* SECURITY STATUS SNAPSHOT */}
        <section className="mb-8 grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 md:grid-cols-[1.3fr_minmax(0,1fr)]">
          <div>
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Security status snapshot (example)
            </h2>
            <p className="mb-3 text-[11px] text-slate-400 max-w-xl">
              See at a glance how your staff are using their powers: who&apos;s
              handling most actions, how many risky changes happened, and
              whether audit coverage looks healthy.
            </p>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-slate-100">
                  Staff activity
                </span>
                <br />
                Match moderation load with your staff roster so you&apos;re not
                relying on one or two burned-out leads.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  High-risk actions
                </span>
                <br />
                Track bans, unbans, config edits and restarts as a separate
                stream from low-risk actions like notes and warnings.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Audit coverage
                </span>
                <br />
                See how many actions have proper reasons, evidence and staff
                notes attached, so you know reviews won&apos;t be guesswork.
              </li>
            </ul>
          </div>

          {/* right side: small "status" widget */}
          <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-4">
            <div className="mb-2 flex items-center justify-between text-[11px] text-slate-300">
              <span>Example security metrics</span>
              <span className="text-slate-500">Last 7 days</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">High-risk actions</span>
                <span className="font-semibold text-amber-300">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Actions with evidence</span>
                <span className="font-semibold text-emerald-300">84%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Staff on duty (peak)</span>
                <span className="font-semibold text-cyan-300">12</span>
              </div>
            </div>

            {/* simple gauge-style bar */}
            <div className="mt-3">
              <p className="mb-1 text-[11px] text-slate-400">
                Audit health (example)
              </p>
              <div className="h-2 w-full rounded-full bg-slate-800">
                <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300" />
              </div>
            </div>

            <p className="mt-3 text-[10px] text-slate-500">
              In live use, these numbers come from your real audit logs and
              staff actions inside TorquePanel.
            </p>
          </div>
        </section>

        {/* TOP 3 SECURITY PILLARS */}
        <section className="mb-8 grid gap-4 md:grid-cols-3 text-xs text-slate-300">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition-transform duration-150 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/20">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Role-based access
            </h2>
            <p>
              Owners, head admins, devs, trial staff and helpers each see only
              what they need, from view-only dashboards to full control.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition-transform duration-150 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/20">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Full audit trails
            </h2>
            <p>
              Every restart, ban, unban, config change and permission tweak is
              logged. No more &quot;who did this?&quot; at 3 AM.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition-transform duration-150 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/20">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Safe staff workflows
            </h2>
            <p>
              Let staff moderate players without touching system-level access or
              payment data. Keep the city safe without risking the host.
            </p>
          </div>
        </section>

        {/* DETAILED SECURITY SECTIONS */}
        <section className="space-y-6 text-xs text-slate-300">
          {/* ACCESS CONTROL */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Access control tuned for RP cities
            </h2>
            <p className="mb-2 text-[11px] text-slate-400 max-w-xl">
              TorquePanel assumes you have a mix of owners, tech staff and RP
              staff. Permissions are built around that reality, not just generic
              &quot;admin / user&quot; roles.
            </p>
            <ul className="grid gap-2 md:grid-cols-2">
              <li>
                <span className="font-semibold text-slate-100">
                  Granular roles &amp; scopes
                </span>
                <br />
                Give helpers access to player search and notes only, while
                leads can handle bans, and owners manage configs and billing.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Safe defaults for new staff
                </span>
                <br />
                New staff accounts start with low-risk permissions, so one bad
                click doesn&apos;t wipe out your entire player base.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Read-only &amp; review modes
                </span>
                <br />
                Let mentors or co-owners review what&apos;s happening without
                touching live controls until they&apos;re ready.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Server separation
                </span>
                <br />
                Keep dev / test shards and live cities separate so someone
                doesn&apos;t &quot;practice&quot; on the wrong machine.
              </li>
            </ul>
          </div>

          {/* AUDIT & LOGGING + ACTIONS BY ROLE GRAPH */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="grid gap-4 md:grid-cols-[1.3fr_minmax(0,1fr)]">
              <div>
                <h2 className="mb-1 text-sm font-semibold text-slate-50">
                  Audit logs that actually tell the story
                </h2>
                <p className="mb-2 text-[11px] text-slate-400 max-w-xl">
                  When something goes wrong in an RP city, &quot;logs&quot; can&apos;t just
                  be a wall of timestamps. TorquePanel structures them so owner
                  reviews are fast and fair.
                </p>
                <ul className="grid gap-2 md:grid-cols-2">
                  <li>
                    <span className="font-semibold text-slate-100">
                      Action-based history
                    </span>
                    <br />
                    See &quot;who banned who for what&quot;, &quot;who changed this
                    config&quot; and &quot;who restarted which server&quot; in
                    human-readable form.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-100">
                      Linked to players &amp; staff
                    </span>
                    <br />
                    Player profiles show every staff action tied to them. Staff
                    profiles show every decision they&apos;ve made.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-100">
                      Timeboxed incident reviews
                    </span>
                    <br />
                    Filter logs down to a specific RP scene or crash window to
                    see exactly what happened around it.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-100">
                      Export &amp; backup options
                    </span>
                    <br />
                    Keep periodic exports of critical audit data if you ever
                    need to migrate cities or review long-term patterns.
                  </li>
                </ul>
              </div>

              {/* tiny bar chart: actions by role */}
              <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-4">
                <div className="mb-2 flex items-center justify-between text-[11px] text-slate-300">
                  <span>Actions by role</span>
                  <span className="text-slate-500">This week (example)</span>
                </div>
                <div className="space-y-2 text-[11px]">
                  {actionsByRole.map((row) => (
                    <div key={row.role}>
                      <div className="mb-0.5 flex items-center justify-between">
                        <span className="text-slate-300">{row.role}</span>
                        <span className="text-slate-400">{row.value} actions</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 transition-all duration-200 hover:brightness-110"
                          style={{ width: `${Math.min(row.value * 2, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] text-slate-500">
                  Owners should see mods and leads handling most day-to-day
                  actions, not doing everything themselves.
                </p>
              </div>
            </div>
          </div>

          {/* INFRASTRUCTURE & DATA SAFETY */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Infrastructure &amp; player data safety
            </h2>
            <p className="mb-2 text-[11px] text-slate-400 max-w-xl">
              Even if you&apos;re just running a hobby city, players trust you with
              their time, their identity and their communities. TorquePanel is
              built to respect that trust.
            </p>
            <ul className="grid gap-2 md:grid-cols-2">
              <li>
                <span className="font-semibold text-slate-100">
                  Minimal sensitive data
                </span>
                <br />
                Focus on IDs, session info and staff notes. No need to pipe full
                payment details or real-life info into staff tools.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Config &amp; backup awareness
                </span>
                <br />
                Highlight risky actions like wiping databases, rotating keys or
                changing core configs with extra confirmations.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Environment separation
                </span>
                <br />
                Make sure dev/testing experiments don&apos;t touch your live
                database or donor perks by accident.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Clear staff &amp; player policies
                </span>
                <br />
                Surface your own community guidelines around privacy, evidence
                and bans so staff know the rules as well as players do.
              </li>
            </ul>
          </div>

          {/* ETHICS / COMMUNITY TRUST */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Built around community trust, not paranoia
            </h2>
            <p className="mb-2 text-[11px] text-slate-400 max-w-xl">
              Good security in a GTA RP city means protecting your community
              from bad actors &mdash; without turning your staff into spies.
            </p>
            <ul className="grid gap-2 md:grid-cols-2">
              <li>
                <span className="font-semibold text-slate-100">
                  Transparent player history
                </span>
                <br />
                Players can understand why actions were taken against them
                (where your policies allow), reducing drama and confusion.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Respect for privacy
                </span>
                <br />
                Focus on in-city behavior, not digging into unrelated external
                accounts or off-server tracking.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Configurable data retention
                </span>
                <br />
                Decide how long you keep certain logs and notes so you&apos;re not
                storing more than you actually need.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Owner-level visibility
                </span>
                <br />
                Owners get the full picture of staff and system behavior without
                needing to read raw log files or guess.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SecurityPage
