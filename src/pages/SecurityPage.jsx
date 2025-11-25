// src/pages/SecurityPage.jsx
import { useState } from 'react'

function SecurityPage() {
  const [mode, setMode] = useState('stability') // stability | audit | access

  const modeCopy = {
    stability: {
      label: 'Stability',
      title: 'See crashes before Discord explodes',
      body:
        'Track uptime, restarts and crash clusters. Know which resources were running, which players were online and what staff did in the final minutes before a crash.',
    },
    audit: {
      label: 'Audit trail',
      title: 'Every action leaves a clean footprint',
      body:
        'Warnings, kicks, bans, restarts, script toggles, whitelist changes – all logged in one place. Perfect for staff reviews and keeping everyone accountable.',
    },
    access: {
      label: 'Access control',
      title: 'Give staff only what they need',
      body:
        'Map TorquePanel roles to your in-game ranks: junior staff, PD command, head admin, owner. Each role sees only the tools they should touch.',
    },
  }

  const current = modeCopy[mode]

  return (
    <div className="gta-page">
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        <button
          onClick={() => (window.location.href = '/')}
          className="mb-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
        >
          ← Back to home
        </button>

        {/* HEADER */}
        <header className="max-w-2xl space-y-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400">
            Security &amp; stability
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">
            Keep your GTA city safe, stable and hard to grief.
          </h1>
          <p className="text-xs text-slate-400">
            TorquePanel sits between your FiveM server, database and staff
            tools. It does not replace anticheat – it makes it easier to see
            what is going wrong and who is abusing your city.
          </p>
        </header>

        {/* TOGGLE BAR */}
        <section className="gta-card flex flex-col gap-3 px-4 py-3 text-[11px] text-slate-300 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              What do you want to lock down?
            </p>
            <h2 className="text-sm font-semibold text-slate-50">
              Stability, audit trail and access control in one view.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMode('stability')}
              className={
                'rounded-full px-3 py-1.5 text-[10px] transition ' +
                (mode === 'stability'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-emerald-400 hover:text-emerald-300')
              }
            >
              Stability
            </button>
            <button
              onClick={() => setMode('audit')}
              className={
                'rounded-full px-3 py-1.5 text-[10px] transition ' +
                (mode === 'audit'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-cyan-400 hover:text-cyan-300')
              }
            >
              Audit trail
            </button>
            <button
              onClick={() => setMode('access')}
              className={
                'rounded-full px-3 py-1.5 text-[10px] transition ' +
                (mode === 'access'
                  ? 'bg-sky-500 text-slate-950'
                  : 'border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-sky-400 hover:text-sky-300')
              }
            >
              Access control
            </button>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="grid gap-4 text-[11px] text-slate-300 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
          {/* Left: static core cards */}
          <div className="space-y-3">
            <div className="gta-card p-4">
              <p className="text-[10px] uppercase tracking-wide text-emerald-400">
                Safe hosting
              </p>
              <h2 className="mt-1 text-sm font-semibold text-slate-50">
                Your city, your data
              </h2>
              <p className="mt-2 text-slate-400">
                TorquePanel is designed to plug into your existing FiveM setup.
                Audit logs, player info and staff actions stay under your
                control. No surprise data exports.
              </p>
            </div>

            <div className="gta-card p-4">
              <p className="text-[10px] uppercase tracking-wide text-rose-400">
                Anticheat aware
              </p>
              <h2 className="mt-1 text-sm font-semibold text-slate-50">
                Make sense of anticheat spam
              </h2>
              <p className="mt-2 text-slate-400">
                Instead of raw console spam, see anticheat flags grouped by
                player, resource and time. Spot false positives and real
                cheaters faster.
              </p>
            </div>
          </div>

          {/* Right: mode detail + mini "timeline" */}
          <div className="gta-card flex flex-col gap-4 p-4">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-cyan-400">
                {current.label}
              </p>
              <h2 className="mt-1 text-sm font-semibold text-slate-50">
                {current.title}
              </h2>
              <p className="mt-2 text-slate-400">{current.body}</p>
            </div>

            {/* Mini audit timeline */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Example audit feed
              </p>
              <ul className="mt-2 space-y-1.5 text-[10px]">
                <li className="flex items-start gap-2 rounded-lg bg-slate-900/80 px-2 py-1.5 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-cyan-500/30">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <div>
                    <p className="text-slate-50">
                      NovaRP issued a warning to TTV_Nitro for VDM (ticket
                      #4821).
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Logged to audit trail · 4 minutes ago
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2 rounded-lg bg-slate-900/80 px-2 py-1.5 transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-amber-500/30">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <div>
                    <p className="text-slate-50">
                      police_mdt restarted by Karma after script error.
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Resource uptime reset · no crash detected
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2 rounded-lg bg-slate-900/80 px-2 py-1.5 transition hover:-translate-y-0.5 hover:border-rose-400 hover:shadow-rose-500/30">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400" />
                  <div>
                    <p className="text-slate-50">
                      Head admin changed staff role for Ash (PD → PD command).
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Access level updated across TorquePanel tools
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2 rounded-lg bg-slate-900/80 px-2 py-1.5 transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-sky-500/30">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <div>
                    <p className="text-slate-50">
                      Auto-alert: crash cluster detected after new resource
                      deploy.
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Suggested rollback target: previous build · 9 minutes ago
                    </p>
                  </div>
                </li>
              </ul>
              <p className="mt-2 text-[9px] text-slate-500">
                In a live setup, this feed pulls directly from your moderation
                actions, resource restarts and role changes – no more guessing
                who touched what.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SecurityPage
