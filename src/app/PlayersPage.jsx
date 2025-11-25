// src/app/PlayersPage.jsx
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts'
import { players } from '../data/serverData'

function PlayersPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all') // all | low | medium | high
  const [quickViewPlayer, setQuickViewPlayer] = useState(null)

  // Risk bucket counts for the chart
  const riskBuckets = useMemo(() => {
    let low = 0
    let medium = 0
    let high = 0
    players.forEach((p) => {
      if (p.riskScore <= 25) low++
      else if (p.riskScore <= 60) medium++
      else high++
    })
    return [
      { label: 'Low', value: low },
      { label: 'Medium', value: medium },
      { label: 'High', value: high },
    ]
  }, [])

  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      const matchesSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.steamId && p.steamId.toLowerCase().includes(search.toLowerCase())) ||
        (p.rockstarId &&
          p.rockstarId.toLowerCase().includes(search.toLowerCase()))

      const matchesRole =
        roleFilter === 'all' ||
        (p.roles &&
          p.roles
            .map((r) => r.toLowerCase())
            .includes(roleFilter.toLowerCase()))

      const risk =
        p.riskScore <= 25
          ? 'low'
          : p.riskScore <= 60
          ? 'medium'
          : 'high'
      const matchesRisk =
        riskFilter === 'all' || riskFilter === risk

      return matchesSearch && matchesRole && matchesRisk
    })
  }, [search, roleFilter, riskFilter])

  function getRiskMeta(score) {
    if (score <= 25) {
      return {
        label: 'Low',
        color: 'bg-emerald-500/10 text-emerald-300',
      }
    }
    if (score <= 60) {
      return {
        label: 'Medium',
        color: 'bg-amber-500/10 text-amber-300',
      }
    }
    return {
      label: 'High',
      color: 'bg-rose-500/10 text-rose-300',
    }
  }

  return (
    <div className="gta-page min-h-[calc(100vh-3rem)]">
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 text-[11px] text-slate-300">
        {/* HEADER */}
        <header className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
              Players
            </p>
            <h1 className="text-lg font-semibold text-slate-50 md:text-xl">
              Player browser · GTA / FiveM city
            </h1>
            <p className="max-w-xl text-[11px] text-slate-400">
              Search and filter players across your GTA city. Open a profile to
              see sessions, reports and moderation history – or use quick
              activity view for a fast glance.
            </p>
          </div>
        </header>

        {/* OVERVIEW WITH RISK CHART */}
        <section className="gta-card grid gap-4 p-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Player overview
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                <p className="text-[10px] text-slate-400">
                  Total players seen
                </p>
                <p className="text-lg font-semibold text-cyan-400">
                  {players.length.toLocaleString()}
                </p>
                <p className="text-[9px] text-slate-500">
                  Across all TORQUE city history
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                <p className="text-[10px] text-slate-400">
                  Average playtime
                </p>
                <p className="text-lg font-semibold text-emerald-400">
                  {Math.round(
                    players.reduce(
                      (sum, p) => sum + p.totalPlaytimeHours,
                      0
                    ) / players.length
                  )}
                  h
                </p>
                <p className="text-[9px] text-slate-500">
                  Per player (fake sample)
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                <p className="text-[10px] text-slate-400">
                  At-risk players
                </p>
                <p className="text-lg font-semibold text-rose-400">
                  {
                    players.filter((p) => p.riskScore > 60)
                      .length
                  }
                </p>
                <p className="text-[9px] text-slate-500">
                  High risk (reports &amp; infractions)
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wide text-cyan-400">
              Risk distribution
            </p>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskBuckets}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1f2937"
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
                    allowDecimals={false}
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
                  <Bar dataKey="value" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-slate-500">
              Use this to spot when your city is attracting too many rule
              breakers vs. long-term clean players.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="gta-card flex flex-col gap-3 p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Search
              </p>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, Steam ID, Rockstar ID..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Role
              </p>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
              >
                <option value="all">All roles</option>
                <option value="owner">Owner</option>
                <option value="staff">Staff</option>
                <option value="dev">Dev</option>
                <option value="civilian">Civilian</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Risk score
              </p>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
              >
                <option value="all">All</option>
                <option value="low">Low (0–25)</option>
                <option value="medium">Medium (26–60)</option>
                <option value="high">High (61+)</option>
              </select>
            </div>
          </div>

          <p className="text-[10px] text-slate-500">
            Showing {filteredPlayers.length} of {players.length} players.
          </p>
        </section>

        {/* PLAYER LIST */}
        <section className="gta-card p-4">
          <div className="mb-2 grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] gap-3 border-b border-slate-800 pb-2 text-[10px] text-slate-400 max-md:hidden">
            <span>Name &amp; IDs</span>
            <span>Playtime &amp; activity</span>
            <span>Reports &amp; risk</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="space-y-2">
            {filteredPlayers.map((p) => {
              const riskMeta = getRiskMeta(p.riskScore)

              return (
                <div
                  key={p.id}
                  className="grid grid-cols-1 gap-2 rounded-xl bg-slate-900/80 p-3 text-[11px] transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-cyan-500/30 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] md:items-center md:border md:border-slate-800"
                >
                  {/* NAME & IDS */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => navigate(`/app/players/${p.id}`)}
                        className="text-left text-[11px] font-semibold text-slate-50 hover:text-cyan-300"
                      >
                        {p.name}
                      </button>
                      {p.roles && p.roles.length > 0 && (
                        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[9px] uppercase tracking-wide text-slate-300">
                          {p.roles[0]}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[9px] text-slate-500">
                      Steam: <span className="text-slate-300">{p.steamId}</span>
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Rockstar:{' '}
                      <span className="text-slate-300">
                        {p.rockstarId || 'N/A'}
                      </span>
                    </p>
                  </div>

                  {/* PLAYTIME */}
                  <div>
                    <p className="text-[10px] text-slate-400">
                      Total playtime
                    </p>
                    <p className="text-[11px] font-semibold text-cyan-300">
                      {p.totalPlaytimeHours}h
                    </p>
                    <p className="mt-1 text-[9px] text-slate-500">
                      Last seen:{' '}
                      <span className="text-slate-300">
                        {new Date(p.lastSeen).toLocaleString()}
                      </span>
                    </p>
                  </div>

                  {/* REPORTS & RISK */}
                  <div>
                    <p className="text-[10px] text-slate-400">
                      Reports &amp; risk
                    </p>
                    <p className="text-[11px] text-slate-200">
                      {p.reportsAgainst} reports · {p.infractions} infractions
                    </p>
                    <div className="mt-1 inline-flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] ${riskMeta.color}`}
                      >
                        Risk: {riskMeta.label} ({p.riskScore})
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-end gap-2 md:justify-end">
                    <button
                      type="button"
                      onClick={() => navigate(`/app/players/${p.id}`)}
                      className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[10px] text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
                    >
                      Open profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickViewPlayer(p)}
                      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[10px] text-slate-100 hover:border-emerald-400 hover:text-emerald-300"
                    >
                      Quick activity
                    </button>
                  </div>
                </div>
              )
            })}

            {filteredPlayers.length === 0 && (
              <p className="py-6 text-center text-[11px] text-slate-500">
                No players match your filters yet. Clear the filters or try a
                different search.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* QUICK ACTIVITY POPUP */}
      {quickViewPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="gta-card relative w-full max-w-lg border-cyan-500/60 bg-slate-950/95 p-4">
            <button
              className="absolute right-3 top-3 text-[11px] text-slate-400 hover:text-slate-100"
              onClick={() => setQuickViewPlayer(null)}
            >
              ✕
            </button>

            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
              Quick activity
            </p>
            <h2 className="mt-1 text-sm font-semibold text-slate-50">
              {quickViewPlayer.name}
            </h2>
            <p className="mt-1 text-[11px] text-slate-400">
              Fast snapshot of when they usually play and how long their
              sessions are.
            </p>

            <div className="mt-3 h-40 rounded-xl bg-slate-950/80 p-2">
              {quickViewPlayer.sessionHistory &&
              quickViewPlayer.sessionHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quickViewPlayer.sessionHistory}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1f2937"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                      width={30}
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
                    <Line
                      type="monotone"
                      dataKey="durationMinutes"
                      stroke="#22d3ee"
                      dot={{ r: 3 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="flex h-full items-center justify-center text-[11px] text-slate-500">
                  Not enough session data for this player yet.
                </p>
              )}
            </div>

            <p className="mt-2 text-[9px] text-slate-500">
              In a real server, this chart would show the last 7–30 days of
              sessions from your database.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayersPage
