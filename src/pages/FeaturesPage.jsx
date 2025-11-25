// src/pages/FeaturesPage.jsx
import { useState } from 'react'

function FeaturesPage() {
  const [scenario, setScenario] = useState('rp')

  const scenarioCopy = {
    rp: {
      label: 'Whitelisted RP',
      title: 'Deep RP cities with full staff teams',
      body:
        'For serious whitelisted roleplay cities with PD, EMS, gangs and strict rules. TorquePanel keeps staff on the same page so tickets do not disappear into Discord.',
    },
    drift: {
      label: 'Drift / racing',
      title: 'Frame-perfect servers for racers and drifters',
      body:
        'For drift and racing servers where latency, stability and peak times matter more than anything. See when your lobbies fill, which tracks pop and when to schedule events.',
    },
    freeroam: {
      label: 'Freeroam / cops & robbers',
      title: 'High-chaos freeroam with real control',
      body:
        'For chaos-heavy freeroam, cops and robbers and minigame servers. Track troublemakers, see what scripts are failing and keep an eye on anticheat without staring at console spam.',
    },
  }

  const current = scenarioCopy[scenario]

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
            Feature overview
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">
            Built for serious GTA / FiveM servers – not basic control panels.
          </h1>
          <p className="text-xs text-slate-400">
            TorquePanel treats your city like a live service: queue, staff,
            crashes and player behavior are all first-class. No more guessing
            why the server feels off – you can see it.
          </p>
        </header>

        {/* INTERACTIVE SERVER TYPE TOGGLES */}
        <section className="gta-card p-4 text-[11px] text-slate-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Tune TorquePanel to your city style
              </p>
              <h2 className="text-sm font-semibold text-slate-50">
                Roleplay? Drift? Freeroam? It adapts.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setScenario('rp')}
                className={
                  'rounded-full px-3 py-1.5 text-[11px] transition ' +
                  (scenario === 'rp'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                    : 'border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-cyan-400 hover:text-cyan-300')
                }
              >
                Whitelisted RP
              </button>
              <button
                onClick={() => setScenario('drift')}
                className={
                  'rounded-full px-3 py-1.5 text-[11px] transition ' +
                  (scenario === 'drift'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                    : 'border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-emerald-400 hover:text-emerald-300')
                }
              >
                Drift / racing
              </button>
              <button
                onClick={() => setScenario('freeroam')}
                className={
                  'rounded-full px-3 py-1.5 text-[11px] transition ' +
                  (scenario === 'freeroam'
                    ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                    : 'border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-sky-400 hover:text-sky-300')
                }
              >
                Freeroam / cops &amp; robbers
              </button>
            </div>
          </div>

          {/* Active scenario description */}
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3">
            <p className="text-[10px] uppercase tracking-wide text-cyan-400">
              {current.label}
            </p>
            <h3 className="mt-1 text-sm font-semibold text-slate-50">
              {current.title}
            </h3>
            <p className="mt-2 text-[11px] text-slate-400">{current.body}</p>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section className="grid gap-4 text-[11px] text-slate-300 md:grid-cols-3">
          {[
            {
              label: 'City-wide analytics',
              accent: 'text-cyan-400',
              title: 'See your city like a minimap',
              body:
                'Peak hours, queue spikes, crash clusters and staff coverage at a glance. Tune restart times and events around when your Los Santos is actually alive.',
            },
            {
              label: 'Staff-first tools',
              accent: 'text-emerald-400',
              title: 'Tickets that feel like an MDT',
              body:
                'Every report, warning and ban flows into a clean moderation queue. Staff can claim, resolve and leave notes without digging through Discord logs.',
            },
            {
              label: 'Script insight',
              accent: 'text-sky-400',
              title: 'When a resource breaks, you know',
              body:
                'Watch which scripts are causing lag spikes, restarts or errors. See anticheat flags per resource, not just random console spam.',
            },
            {
              label: 'Player intelligence',
              accent: 'text-amber-400',
              title: 'Know your whales and grinders',
              body:
                'Identify who plays the most, who gets reported the most and who always shows up to wars, robberies or races.',
            },
            {
              label: 'Multi-server ready',
              accent: 'text-rose-400',
              title: 'Hubs, dev servers & events',
              body:
                'Track main city, dev / staging and special event servers from one panel. See where your players actually go when you open new shards.',
            },
            {
              label: 'RP-focused',
              accent: 'text-fuchsia-400',
              title: 'Cops, gangs, EMS and streamers',
              body:
                'Tag and filter players by role and see if your RP ecosystem is balanced or tilted to only one group.',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="gta-card group transform p-4 transition duration-200 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-cyan-500/30"
            >
              <p
                className={
                  'text-[10px] uppercase tracking-wide ' + card.accent
                }
              >
                {card.label}
              </p>
              <h2 className="mt-1 text-sm font-semibold text-slate-50">
                {card.title}
              </h2>
              <p className="mt-2 text-slate-400">{card.body}</p>
              <div className="mt-3 h-[2px] w-10 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-60 group-hover:opacity-100" />
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default FeaturesPage
