// src/app/PlayerDetailPage.jsx
// Shows details for a single player: risk, tags, stats, recent sessions chart, etc.

import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { players, playerSessions } from './fakeData'

// Re-use the same badge styles as in PlayersPage
function RiskBadge({ value }) {
  const base = 'px-2 py-0.5 rounded-full text-[11px] font-medium'
  if (value === 'High') {
    return <span className={`${base} bg-red-500/20 text-red-200`}>High risk</span>
  }
  if (value === 'Medium') {
    return <span className={`${base} bg-amber-500/20 text-amber-100`}>Medium risk</span>
  }
  return <span className={`${base} bg-emerald-500/20 text-emerald-100`}>Low risk</span>
}

function StatusBadge({ value }) {
  const base = 'px-2 py-0.5 rounded-full text-[11px] font-medium'
  if (value === 'Online') {
    return (
      <span className={`${base} bg-emerald-500/15 text-emerald-200`}>
        ● Online
      </span>
    )
  }
  return (
    <span className={`${base} bg-slate-700/70 text-slate-200`}>
      ● Offline
    </span>
  )
}

function PlayerDetailPage() {
  // Get the ":id" part of the URL, e.g. /app/players/1
  const { id } = useParams()

  // Look up this player in the fake players array
  const player = players.find((p) => p.id === id)

  // Sessions for this player from fakeData
  const sessions = playerSessions[id] || []

  // Calculate average + last session length from the sessions array
  const sessionStats = useMemo(() => {
    if (!sessions.length) {
      return { avgLength: 0, lastLength: 0 }
    }
    const total = sessions.reduce((sum, s) => sum + s.lengthMin, 0)
    const avgLength = Math.round(total / sessions.length)
    const lastLength = sessions[0].lengthMin
    return { avgLength, lastLength }
  }, [sessions])

  // If the ID is invalid, show a simple error and link back
  if (!player) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-slate-300">Player not found.</p>
        <Link to="/app/players" className="text-xs text-cyan-400">
          ← Back to players
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header: player name, risk/status badges, and action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">
            <Link to="/app/players" className="text-cyan-400">
              Players
            </Link>{' '}
            / {player.name}
          </p>
          <h1 className="text-xl font-semibold text-slate-50">{player.name}</h1>
          <p className="text-xs text-slate-400">
            Total playtime {player.playtimeHours}h · Last seen {player.lastSeen}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
            <RiskBadge value={player.risk} />
            <StatusBadge value={player.status} />
          </div>
        </div>

        {/* These buttons are just visual; they don't do anything yet */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700">
            Warn
          </button>
          <button className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700">
            Temp ban
          </button>
          <button className="px-3 py-1.5 rounded-md bg-red-500 text-slate-950">
            Perm ban
          </button>
        </div>
      </div>

      {/* Tags / roles for this player */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-300">
        <h2 className="text-xs font-semibold text-slate-100 mb-1">Tags</h2>
        {player.tags.length === 0 ? (
          <p className="text-slate-500">
            No tags yet. You can use tags for roles like Police, Mechanic, Streamer.
          </p>
        ) : (
          <div className="flex flex-wrap gap-1">
            {player.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Summary cards for this player */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <div className="text-slate-400">Sessions (30 days)</div>
          <div className="text-lg font-semibold text-slate-50">
            {player.sessions30d}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <div className="text-slate-400">Infractions</div>
          <div className="text-lg font-semibold text-slate-50">
            {player.infractions}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <div className="text-slate-400">Avg session length</div>
          <div className="text-lg font-semibold text-slate-50">
            {sessionStats.avgLength} min
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <div className="text-slate-400">Last session</div>
          <div className="text-lg font-semibold text-slate-50">
            {sessionStats.lastLength} min
          </div>
        </div>
      </div>

      {/* Main row: recent sessions chart + identifiers */}
      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] gap-4">
        {/* Sessions chart + list */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100">
              Recent sessions
            </h2>
            <span className="text-[11px] text-slate-500">
              Last {sessions.length || 0} sessions
            </span>
          </div>

          {/* Line chart of session lengths */}
          <div className="h-44">
            {sessions.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500 text-[11px]">
                No session data yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[...sessions].reverse()} // show oldest first on the axis
                  margin={{ top: 5, right: 16, bottom: 0, left: -20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis
                    dataKey="startedAt"
                    tick={{ fontSize: 9, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={{ stroke: '#4b5563' }}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: '#9ca3af' }}
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
                    labelStyle={{ fontSize: 10 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="lengthMin"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Table of recent sessions under the chart */}
          {sessions.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-[11px]">
                <thead className="text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-1 text-left">Start</th>
                    <th className="py-1 text-left">Length</th>
                    <th className="py-1 text-left">Avg ping</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id} className="border-b border-slate-900">
                      <td className="py-1 pr-3">{s.startedAt}</td>
                      <td className="py-1 pr-3">{s.lengthMin} min</td>
                      <td className="py-1">{s.avgPing} ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Identifiers (Steam/Rockstar IDs etc.) */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
          <h2 className="text-sm font-semibold text-slate-100">Identifiers</h2>
          <ul>
            {player.identifiers.map((idVal) => (
              <li key={idVal} className="font-mono text-[11px]">
                {idVal}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Placeholder notes section for future infractions timeline */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
        <h2 className="text-sm font-semibold text-slate-100">Notes & history</h2>
        <p>
          This is where you&apos;ll later show a timeline of infractions and staff notes
          for this player. For now it&apos;s a static placeholder so you can design
          around it.
        </p>
      </section>
    </div>
  )
}

export default PlayerDetailPage
