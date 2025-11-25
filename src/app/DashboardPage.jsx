// src/app/DashboardPage.jsx
// Main server overview page. Now reads metrics from metrics.json via fetch.

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts'

// Simple card used for top KPIs (uptime, avg ping, etc.)
function KpiCard({ label, value, sub }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-2xl font-semibold text-slate-50">{value}</span>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </div>
  )
}

// Generic panel wrapper with title + optional "right" text
function Panel({ title, children, right }) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-5 flex flex-col gap-3">
      <header className="flex items-center justify-between gap-2 text-sm">
        <h2 className="font-semibold text-slate-100">{title}</h2>
        {right && <div className="text-xs text-slate-400">{right}</div>}
      </header>
      <div className="min-h-[80px]">{children}</div>
    </section>
  )
}

function DashboardPage() {
  // metrics loaded from the "API" (metrics.json)
  const [concurrencyData, setConcurrencyData] = useState([])
  const [incidentsData, setIncidentsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load metrics.json once when the page mounts
  useEffect(() => {
    async function loadMetrics() {
      try {
        setLoading(true)
        setError('')

        const res = await fetch('/metrics.json')
        if (!res.ok) {
          throw new Error(
            'Failed to load metrics.json (status ' + res.status + ')'
          )
        }

        const data = await res.json()
        setConcurrencyData(data.concurrency || [])
        setIncidentsData(data.incidents || [])
      } catch (err) {
        console.error('loadMetrics error:', err)
        setError('Could not load metrics: ' + String(err))
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
  }, [])

  return (
    <div className="space-y-4">
      {/* Page header: title + time range selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">Servers / Main RP City</p>
          <h1 className="text-xl font-semibold text-slate-50">Overview</h1>

          {loading ? (
            <p className="text-[11px] text-slate-500">Loading metrics…</p>
          ) : error ? (
            <p className="text-[11px] text-red-300">{error}</p>
          ) : (
            <p className="text-[11px] text-slate-500">
              Data loaded from metrics.json
            </p>
          )}
        </div>
        <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs">
          {/* Time range is visual only right now */}
          <option>Last 24 hours</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>

      {/* Top-level KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Uptime" value="99.8%" sub="Last 7 days (fake)" />
        <KpiCard label="Crashes" value="3" sub="↑ 2 vs last week" />
        <KpiCard label="Avg ping" value="42 ms" sub="Stable" />
        <KpiCard label="Players online" value="72" sub="Peak 132 today" />
      </div>

      {/* Charts row: concurrency chart + incidents chart + alerts panel */}
      {loading ? (
        <div className="text-xs text-slate-400">Loading charts…</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Concurrency chart */}
          <Panel
            title="Concurrency & sessions"
            right="Players online (last 12 hours)"
          >
            <div className="h-44 md:h-52">
              {error ? (
                <div className="h-full flex items-center justify-center text-[11px] text-red-300">
                  {error}
                </div>
              ) : concurrencyData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-[11px] text-slate-500">
                  No concurrency data.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={concurrencyData}
                    margin={{ top: 5, right: 16, bottom: 0, left: -20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                      tickLine={false}
                      axisLine={{ stroke: '#4b5563' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                      tickLine={false}
                      axisLine={{ stroke: '#4b5563' }}
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#020617',
                        border: '1px solid #1f2937',
                        fontSize: 11,
                        color: '#e5e7eb',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="players"
                      stroke="#22d3ee"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </Panel>

          {/* Crashes & reports chart */}
          <Panel title="Crashes & reports" right="Last 7 days">
            <div className="h-44 md:h-52">
              {error ? (
                <div className="h-full flex items-center justify-center text-[11px] text-red-300">
                  {error}
                </div>
              ) : incidentsData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-[11px] text-slate-500">
                  No incident data.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={incidentsData}
                    margin={{ top: 5, right: 16, bottom: 0, left: -20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                      tickLine={false}
                      axisLine={{ stroke: '#4b5563' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                      tickLine={false}
                      axisLine={{ stroke: '#4b5563' }}
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#020617',
                        border: '1px solid #1f2937',
                        fontSize: 11,
                        color: '#e5e7eb',
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: 10,
                        color: '#9ca3af',
                      }}
                    />
                    <Bar
                      dataKey="crashes"
                      fill="#f97316"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="reports"
                      fill="#22c55e"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Panel>

          {/* Alerts summary panel (still static text) */}
          <Panel title="Alerts & incidents">
            <ul className="text-xs space-y-1 text-slate-300">
              <li>✅ No critical incidents in the last 24 hours</li>
              <li>⚠ Reports up 18% after Police v3.1 update</li>
              <li>⚙ Considering restart window at 18:00–19:00 to avoid peak</li>
            </ul>
          </Panel>
        </div>
      )}

      {/* Second row of more detailed panels (static placeholders) */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Panel title="Player & community health">
          <ul className="text-xs text-slate-300 space-y-1">
            <li>Reports: 34 (↓ 10%)</li>
            <li>Warnings: 17</li>
            <li>Bans: 5</li>
            <li>Top reported: TTV_Nitro, NovaRP, DriftKing</li>
          </ul>
        </Panel>

        <Panel title="Resource impact">
          <ul className="text-xs text-slate-300 space-y-1">
            <li>veh_tuning – 32% CPU, 4 errors</li>
            <li>police_jobs – 18% CPU, 1 error</li>
            <li>inventory_ui – 12% CPU, 0 errors</li>
          </ul>
        </Panel>

        <Panel title="Monetization snapshot">
          <ul className="text-xs text-slate-300 space-y-1">
            <li>Last 7 days: $412</li>
            <li>Top package: VIP+ Priority Queue</li>
            <li>Donor retention: 68% (30 days)</li>
          </ul>
        </Panel>
      </div>
    </div>
  )
}

export default DashboardPage
