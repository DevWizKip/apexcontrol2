// src/app/PlayerDetailPage.jsx
// Detailed view for a single player with graphs and reports.
// Uses the same "fallback on error" idea as PlayersPage,
// so it always works even if /Players.json fails.

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts'

// Same fallback data structure as in PlayersPage (shortened comments)
const fallbackPlayers = [
  {
    id: 1,
    name: 'NovaRP',
    rockstarId: 'steam:110000112345678',
    playtimeHours: 242,
    lastSeen: '2 hours ago',
    sessions30d: 18,
    infractionsTotal: 3,
    risk: 'Medium',
    status: 'Active',
    region: 'NA-East',
    lastAction: 'Warned for OOC in PD',
    tags: ['cop', 'staff', 'streamer'],
    infractions: [
      {
        date: '2024-05-12',
        reason: 'OOC in PD cells',
        staff: 'Karma',
        severity: 'Medium',
        type: 'Warn',
      },
      {
        date: '2024-04-03',
        reason: 'VDM - Legion Square',
        staff: 'Pixel',
        severity: 'High',
        type: 'Kick',
      },
    ],
  },
  {
    id: 2,
    name: 'TTV_Nitro',
    rockstarId: 'steam:110000119999999',
    playtimeHours: 120,
    lastSeen: '34 minutes ago',
    sessions30d: 22,
    infractionsTotal: 4,
    risk: 'High',
    status: 'Active',
    region: 'EU-West',
    lastAction: 'Temp banned for VDM',
    tags: ['racer', 'gang'],
    infractions: [
      {
        date: '2024-05-20',
        reason: 'Multiple VDM reports',
        staff: 'Pixel',
        severity: 'High',
        type: 'Temp ban',
      },
      {
        date: '2024-05-10',
        reason: 'Combat logging',
        staff: 'Nova',
        severity: 'Medium',
        type: 'Warn',
      },
    ],
  },
  {
    id: 3,
    name: 'DriftKing',
    rockstarId: 'steam:110000118888888',
    playtimeHours: 89,
    lastSeen: '1 day ago',
    sessions30d: 15,
    infractionsTotal: 1,
    risk: 'Low',
    status: 'Active',
    region: 'NA-West',
    lastAction: 'Info note added',
    tags: ['racer'],
    infractions: [
      {
        date: '2024-04-18',
        reason: 'Street racing near hospital',
        staff: 'Ash',
        severity: 'Low',
        type: 'Note',
      },
    ],
  },
  {
    id: 4,
    name: 'Karma',
    rockstarId: 'steam:110000117777777',
    playtimeHours: 310,
    lastSeen: 'Online now',
    sessions30d: 26,
    infractionsTotal: 0,
    risk: 'Low',
    status: 'Staff',
    region: 'NA-East',
    lastAction: 'Staff · handled 5 tickets today',
    tags: ['staff', 'cop'],
    infractions: [],
  },
]

function PlayerDetailPage() {
  const { playerId } = useParams()
  const navigate = useNavigate()

  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadPlayer() {
      try {
        setLoading(true)
        setError(null)
        setNote(null)

        const res = await fetch('/Players.json')
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        const data = await res.json()
        const list = data.players || data
        const found =
          list.find((p) => String(p.id) === String(playerId)) || null

        if (!found) {
          setError('Player not found in Players.json, showing demo data.')
          // fall through to fallback
          const fb =
            fallbackPlayers.find(
              (p) => String(p.id) === String(playerId)
            ) || null
          setPlayer(fb)
        } else {
          setPlayer(found)
        }
      } catch (err) {
        console.warn(
          'Could not load Players.json in PlayerDetailPage, using fallback:',
          err
        )
        const fb =
          fallbackPlayers.find(
            (p) => String(p.id) === String(playerId)
          ) || null
        setPlayer(fb)
        setNote('Showing built-in demo data (Players.json not loaded).')
      } finally {
        setLoading(false)
      }
    }

    loadPlayer()
  }, [playerId])

  if (loading) {
    return <p className="text-xs text-slate-400">Loading player…</p>
  }

  if (!player) {
    return (
      <div className="space-y-2 text-xs text-slate-300">
        <p className="text-amber-300">Player not found in demo data.</p>
        <button
          onClick={() => navigate('/app/players')}
          className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
        >
          Back to player list
        </button>
      </div>
    )
  }

  const risk = (player.risk || '').toLowerCase()

  // --- Build demo stats for graphs ---

  // "Most active hours this month" – bar chart buckets
  const baseHours = [
    { label: '00–03', value: 6 },
    { label: '03–06', value: 3 },
    { label: '06–09', value: 4 },
    { label: '09–12', value: 7 },
    { label: '12–15', value: 10 },
    { label: '15–18', value: 14 },
    { label: '18–21', value: 18 },
    { label: '21–24', value: 11 },
  ]

  const hoursOnlineData = baseHours.map((h) => ({
    hour: h.label,
    minutes: h.value + (player.id || 1) * 1.5, // small variation per player
  }))

  // "Sessions this month" – area chart with 10 sample days
  const baseSessions = [
    2, 4, 3, 5, 4, 6, 7, 5, 6, 8,
  ]

  const sessionsData = baseSessions.map((val, idx) => ({
    day: `Day ${idx + 1}`,
    sessions: val + ((player.id || 1) % 3),
  }))

  // Aggregate report severities for a small bar chart
  const infractions = Array.isArray(player.infractions)
    ? player.infractions
    : []

  const severityCounts = infractions.reduce(
    (acc, inf) => {
      const sev = (inf.severity || 'Other').toLowerCase()
      if (sev === 'high') acc.high += 1
      else if (sev === 'medium') acc.medium += 1
      else if (sev === 'low') acc.low += 1
      else acc.other += 1
      return acc
    },
    { high: 0, medium: 0, low: 0, other: 0 }
  )

  const severityData = [
    { label: 'High', count: severityCounts.high },
    { label: 'Med', count: severityCounts.medium },
    { label: 'Low', count: severityCounts.low },
    { label: 'Other', count: severityCounts.other },
  ]

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <button
            onClick={() => navigate('/app/players')}
            className="mb-1 inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
          >
            ← Back to players
          </button>
          <h1 className="text-lg font-semibold text-slate-50">
            {player.name}
          </h1>
          <p className="text-xs text-slate-400">
            ID: {player.id || 'N/A'} · Rockstar/Steam:{' '}
            {player.rockstarId || player.steamId || 'N/A'}
          </p>
          {note && (
            <p className="mt-1 text-[11px] text-slate-500">{note}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          {risk && (
            <span
              className={
                'rounded-full px-3 py-1 ' +
                (risk === 'high'
                  ? 'bg-amber-500/20 text-amber-300'
                  : risk === 'medium'
                  ? 'bg-sky-500/20 text-sky-200'
                  : 'bg-emerald-500/20 text-emerald-200')
              }
            >
              Risk: {player.risk}
            </span>
          )}
          <span className="rounded-full bg-slate-900 px-3 py-1 text-slate-200">
            Status: {player.status || 'Active'}
          </span>
        </div>
      </div>

      {/* TOP GRID: SUMMARY + TAGS + QUICK ACTIONS */}
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
        {/* Summary */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
          <h2 className="mb-2 text-sm font-semibold text-slate-50">
            Summary
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-[11px] text-slate-400">Total playtime</p>
              <p className="text-base font-semibold text-emerald-300">
                {player.playtimeHours != null
                  ? `${player.playtimeHours}h`
                  : '—'}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Sessions (30d): {player.sessions30d ?? '—'}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Last seen</p>
              <p className="text-base font-semibold text-sky-300">
                {player.lastSeen || 'Unknown'}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Region: {player.region || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Infractions</p>
              <p className="text-base font-semibold text-amber-300">
                {player.infractionsTotal ?? infractions.length}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Last action:{' '}
                {player.lastAction || 'No recent moderation actions'}
              </p>
            </div>
          </div>
        </section>

        {/* Tags + quick actions */}
        <section className="space-y-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
            <h2 className="mb-2 text-sm font-semibold text-slate-50">
              Roles &amp; tags
            </h2>
            {Array.isArray(player.tags) && player.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {player.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-500">
                No tags assigned yet. In a live city you might tag players as
                <span className="text-slate-400">
                  {' '}
                  cop, gang, medic, racer, streamer, staff
                </span>
                .
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
            <h2 className="mb-2 text-sm font-semibold text-slate-50">
              Quick actions (demo only)
            </h2>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] text-slate-200 hover:border-amber-400 hover:text-amber-300">
                Warn player
              </button>
              <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] text-slate-200 hover:border-rose-400 hover:text-rose-300">
                Temp ban (demo)
              </button>
              <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] text-slate-200 hover:border-emerald-400 hover:text-emerald-300">
                Add note
              </button>
            </div>
            <p className="mt-2 text-[10px] text-slate-500">
              In a real TorquePanel deployment these buttons would open
              confirmation dialogs and log actions to your audit trail.
            </p>
          </div>
        </section>
      </div>

      {/* MIDDLE GRID: GRAPHS */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
        {/* Most active hours */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-50">
                Most active hours this month
              </h2>
              <p className="text-[11px] text-slate-400">
                Approximate time windows when this player is most often online.
              </p>
            </div>
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
              Demo analytics
            </span>
          </div>
          <div className="mt-3 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursOnlineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  width={28}
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
                <Bar
                  dataKey="minutes"
                  radius={[6, 6, 0, 0]}
                  fill="#22d3ee"
                  opacity={0.85}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Sessions this month */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-50">
                Sessions this month
              </h2>
              <p className="text-[11px] text-slate-400">
                How often this player has connected across the last 10 days.
              </p>
            </div>
          </div>
          <div className="mt-3 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sessionsData}>
                <defs>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  width={24}
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
                  dataKey="sessions"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorSessions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* LOWER GRID: REPORTS + SEVERITY SUMMARY */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1)]">
        {/* Reports / infractions table */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
          <h2 className="mb-2 text-sm font-semibold text-slate-50">
            Reports & infractions
          </h2>
          <p className="mb-2 text-[11px] text-slate-400">
            Every report, warning, kick or ban logged against this player in the
            demo data.
          </p>
          {infractions.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              No reports recorded in the demo data for this player.
            </p>
          ) : (
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-1 text-[11px]">
                <thead className="text-slate-400">
                  <tr>
                    <th className="text-left font-normal px-2 py-1">Date</th>
                    <th className="text-left font-normal px-2 py-1">Reason</th>
                    <th className="text-left font-normal px-2 py-1">
                      Severity
                    </th>
                    <th className="text-left font-normal px-2 py-1">Type</th>
                    <th className="text-left font-normal px-2 py-1">Staff</th>
                  </tr>
                </thead>
                <tbody>
                  {infractions.map((inf, idx) => (
                    <tr key={idx}>
                      <td className="rounded-l-xl bg-slate-900/80 px-2 py-1.5 text-slate-300">
                        {inf.date || 'Unknown'}
                      </td>
                      <td className="bg-slate-900/80 px-2 py-1.5 text-slate-200">
                        {inf.reason || 'No reason provided'}
                      </td>
                      <td className="bg-slate-900/80 px-2 py-1.5">
                        <span
                          className={
                            'rounded-full px-2 py-0.5 text-[10px] ' +
                            ((inf.severity || '').toLowerCase() === 'high'
                              ? 'bg-amber-500/20 text-amber-300'
                              : (inf.severity || '').toLowerCase() ===
                                'medium'
                              ? 'bg-sky-500/20 text-sky-200'
                              : (inf.severity || '').toLowerCase() === 'low'
                              ? 'bg-emerald-500/20 text-emerald-200'
                              : 'bg-slate-700/40 text-slate-200')
                          }
                        >
                          {inf.severity || 'N/A'}
                        </span>
                      </td>
                      <td className="bg-slate-900/80 px-2 py-1.5 text-slate-300">
                        {inf.type || 'Action'}
                      </td>
                      <td className="rounded-r-xl bg-slate-900/80 px-2 py-1.5 text-slate-300">
                        {inf.staff || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Severity summary chart */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
          <h2 className="mb-2 text-sm font-semibold text-slate-50">
            Report severity mix
          </h2>
          <p className="mb-2 text-[11px] text-slate-400">
            Quick view of how serious the reports are for this player.
          </p>
          <div className="mt-2 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#0f172a"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  width={20}
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
                <Bar
                  dataKey="count"
                  radius={[6, 6, 0, 0]}
                  fill="#38bdf8"
                  opacity={0.9}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-[10px] text-slate-500">
            In a real deployment, this would pull live counts from your
            moderation logs and update in real time.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PlayerDetailPage
