// src/app/PlayerDetailPage.jsx
import { useParams, Link } from 'react-router-dom'
import { players } from './fakeData'

function PlayerDetailPage() {
  const { id } = useParams()
  const player = players.find((p) => p.id === id)

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
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
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
        </div>
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

      {/* Summary cards */}
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
          <div className="text-slate-400">Risk level</div>
          <div className="text-lg font-semibold text-slate-50">
            {player.risk}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <div className="text-slate-400">Status</div>
          <div className="text-lg font-semibold text-slate-50">
            {player.status}
          </div>
        </div>
      </div>

      {/* Identifiers / notes placeholder */}
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

      <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
        <h2 className="text-sm font-semibold text-slate-100">Notes & history</h2>
        <p>
          This is where you&apos;ll later show sessions, infractions timeline, and staff
          notes for this player.
        </p>
      </section>
    </div>
  )
}

export default PlayerDetailPage
