// src/pages/AnalyticsPage.jsx
import { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

const playerConcurrencyData = [
  { label: '18:00', value: 96 },
  { label: '19:00', value: 112 },
  { label: '20:00', value: 128 },
  { label: '21:00', value: 121 },
  { label: '22:00', value: 104 },
  { label: '23:00', value: 77 },
]

const staffCoverageData = [
  { label: '18:00', value: 4 },
  { label: '19:00', value: 6 },
  { label: '20:00', value: 7 },
  { label: '21:00', value: 5 },
  { label: '22:00', value: 3 },
  { label: '23:00', value: 2 },
]

function AnalyticsPage() {
  const [view, setView] = useState('players')

  const chartData =
    view === 'players' ? playerConcurrencyData : staffCoverageData

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
            City analytics
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">
            Understand your FiveM city like a dashboard, not a guess.
          </h1>
          <p className="text-xs text-slate-400">
            TorquePanel gives you a birds-eye view of everything that matters:
            player peaks, queue behavior, crash patterns, staff coverage and
            retention – tuned specifically for GTA / FiveM roleplay servers.
          </p>
        </header>

        {/* LIVE STATUS BAR */}
        <section className="gta-card flex items-center justify-between gap-4 px-4 py-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-slate-100">TorquePanel telemetry</span>
            <span className="text-slate-500">
              Simulating live analytics for your Los Santos city.
            </span>
          </div>
          <div className="hidden items-center gap-3 text-[10px] text-slate-400 md:flex">
            <span>Last 24 hours</span>
            <span className="h-[1px] w-12 bg-slate-700" />
            <span>Peak: 128/128 players</span>
          </div>
        </section>

        {/* MAIN CHART + STATS */}
        <section className="grid gap-4 text-[11px] text-slate-300 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
          {/* Chart card */}
          <div className="gta-card p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-cyan-400">
                  Live city curve
                </p>
                <h2 className="text-sm font-semibold text-slate-50">
                  Peak hours across your GTA server
                </h2>
              </div>
              {/* Toggle buttons */}
              <div className="inline-flex gap-1 rounded-full bg-slate-900/80 p-1">
                <button
                  onClick={() => setView('players')}
                  className={
                    'rounded-full px-3 py-1 text-[10px] transition ' +
                    (view === 'players'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-300 hover:text-cyan-300')
                  }
                >
                  Players online
                </button>
                <button
                  onClick={() => setView('staff')}
                  className={
                    'rounded-full px-3 py-1 text-[10px] transition ' +
                    (view === 'staff'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-300 hover:text-emerald-300')
                  }
                >
                  Staff online
                </button>
              </div>
            </div>

            <div className="mt-2 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorCurve"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={view === 'players' ? '#22d3ee' : '#22c55e'}
                        stopOpacity={0.45}
                      />
                      <stop
                        offset="95%"
                        stopColor={view === 'players' ? '#22d3ee' : '#22c55e'}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    width={26}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#020617',
                      border: '1px solid #1f2937',
                      fontSize: 11,
                      color: '#e5e7eb',
                    }}
                    labelStyle={{ fontSize: 10 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={view === 'players' ? '#22d3ee' : '#22c55e'}
                    fillOpacity={1}
                    fill="url(#colorCurve)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-2 text-[10px] text-slate-500">
              In a real city, this view shows when to schedule storms, server
              restarts, big heists and whitelist waves – based on actual player
              behavior.
            </p>
          </div>

          {/* Stat cards */}
          <div className="space-y-3">
            <div className="gta-card p-4">
              <p className="text-[10px] uppercase tracking-wide text-cyan-400">
                TorquePanel usage
              </p>
              <h2 className="mt-1 text-sm font-semibold text-slate-50">
                People using the panel itself
              </h2>
              <p className="mt-2 text-slate-400">
                See how many owners, admins and staff actually open TorquePanel
                to manage your city each day.
              </p>

              <div className="mt-3 grid grid-cols-3 gap-3 text-[10px]">
                <div className="rounded-xl bg-slate-900/80 px-3 py-2 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-cyan-500/30 hover:shadow-lg">
                  <p className="text-slate-400">Active panel users</p>
                  <p className="text-lg font-semibold text-cyan-400">27</p>
                  <p className="text-[9px] text-slate-500">This week</p>
                </div>
                <div className="rounded-xl bg-slate-900/80 px-3 py-2 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-emerald-500/30 hover:shadow-lg">
                  <p className="text-slate-400">Staff teams</p>
                  <p className="text-lg font-semibold text-emerald-400">4</p>
                  <p className="text-[9px] text-slate-500">
                    PD · EMS · Gangs · Admin
                  </p>
                </div>
                <div className="rounded-xl bg-slate-900/80 px-3 py-2 transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-sky-500/30 hover:shadow-lg">
                  <p className="text-slate-400">Avg. daily opens</p>
                  <p className="text-lg font-semibold text-slate-50">96</p>
                  <p className="text-[9px] text-slate-500">
                    Panel sessions per day
                  </p>
                </div>
              </div>
            </div>

            <div className="gta-card p-4">
              <p className="text-[10px] uppercase tracking-wide text-amber-400">
                Server footprint
              </p>
              <h2 className="mt-1 text-sm font-semibold text-slate-50">
                How many GTA servers you are actually running
              </h2>
              <p className="mt-2 text-slate-400">
                Main RP, dev, training, event, drift, racing. TorquePanel keeps
                them in one map so nothing gets lost.
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3 text-[10px]">
                <div className="rounded-xl bg-slate-900/80 px-3 py-2 transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-amber-500/30 hover:shadow-lg">
                  <p className="text-slate-400">Total servers</p>
                  <p className="text-lg font-semibold text-slate-50">7</p>
                  <p className="text-[9px] text-slate-500">
                    3 main RP · 2 dev · 2 events
                  </p>
                </div>
                <div className="rounded-xl bg-slate-900/80 px-3 py-2 transition hover:-translate-y-0.5 hover:border-fuchsia-400 hover:shadow-fuchsia-500/30 hover:shadow-lg">
                  <p className="text-slate-400">Peak concurrency</p>
                  <p className="text-lg font-semibold text-cyan-400">684</p>
                  <p className="text-[9px] text-slate-500">
                    Combined peak players (last 30 days)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AnalyticsPage
