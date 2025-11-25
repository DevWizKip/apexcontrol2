// src/app/PlayersPage.jsx
// Shows the player directory (table) with search and filters.
// In this version, we load players from a fake API (players.json using fetch).

import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// Colored badge for risk level
function RiskBadge({ value }) {
  const base = 'px-2 py-0.5 rounded-full text-[11px] font-medium'
  if (value === 'High') {
    return <span className={`${base} bg-red-500/20 text-red-200`}>High</span>
  }
  if (value === 'Medium') {
    return <span className={`${base} bg-amber-500/20 text-amber-100`}>Medium</span>
  }
  return <span className={`${base} bg-emerald-500/20 text-emerald-100`}>Low</span>
}

// Colored badge for online/offline
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

function PlayersPage() {
  // players we loaded from the "API"
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // search + filter state (same as before)
  const [search, setSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [tagFilter, setTagFilter] = useState('All')

  // Load players.json once when the component mounts
  useEffect(() => {
    async function loadPlayers() {
      try {
        setLoading(true)
        setError('')

        const res = await fetch('/players.json')
        if (!res.ok) {
          throw new Error('Failed to load players.json')
        }

        const data = await res.json()
        setPlayers(data)
      } catch (err) {
        console.error(err)
        setError('Could not load players. Check the console for details.')
      } finally {
        setLoading(false)
      }
    }

    loadPlayers()
  }, [])

  // Build a list of all unique tags (Streamer, Police, VIP, etc.)
  const allTags = useMemo(() => {
    const set = new Set()
    players.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return Array.from(set)
  }, [players])

  // Apply search + filters to the players array
  const filteredPlayers = players.filter((p) => {
    const term = search.toLowerCase()

    if (term && !p.name.toLowerCase().includes(term)) {
      return false
    }

    if (riskFilter !== 'All' && p.risk !== riskFilter) {
      return false
    }

    if (statusFilter !== 'All' && p.status !== statusFilter) {
      return false
    }

    if (tagFilter !== 'All' && !p.tags.includes(tagFilter)) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-4">
      {/* Header + search input */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-400">Players</p>
            <h1 className="text-xl font-semibold text-slate-50">
              Player directory
            </h1>

            {/* Show different subtitle while loading or on error */}
            {loading ? (
              <p className="text-[11px] text-slate-500">Loading players…</p>
            ) : error ? (
              <p className="text-[11px] text-red-300">{error}</p>
            ) : (
              <p className="text-[11px] text-slate-500">
                {filteredPlayers.length} of {players.length} players shown
              </p>
            )}
          </div>

          <input
            className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-100 w-full md:w-64"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-2 text-[11px]">
          <select
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="All">All risk levels</option>
            <option value="Low">Low risk</option>
            <option value="Medium">Medium risk</option>
            <option value="High">High risk</option>
          </select>

          <select
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <select
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="All">All tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* While loading, show a simple message instead of the table */}
      {loading ? (
        <div className="text-xs text-slate-400">Loading player data…</div>
      ) : (
        <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900 text-slate-400 text-left">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Playtime</th>
                <th className="px-3 py-2">Last seen</th>
                <th className="px-3 py-2">Sessions (30d)</th>
                <th className="px-3 py-2">Infractions</th>
                <th className="px-3 py-2">Risk</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Tags</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-slate-800 hover:bg-slate-900/60"
                >
                  {/* Clicking the name goes to the PlayerDetailPage */}
                  <td className="px-3 py-2">
                    <Link
                      to={`/app/players/${p.id}`}
                      className="text-cyan-300 font-medium"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{p.playtimeHours}h</td>
                  <td className="px-3 py-2">{p.lastSeen}</td>
                  <td className="px-3 py-2">{p.sessions30d}</td>
                  <td className="px-3 py-2">{p.infractions}</td>
                  <td className="px-3 py-2">
                    <RiskBadge value={p.risk} />
                  </td>
                  <td className="px-3 py-2">
                    <StatusBadge value={p.status} />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty state when filters remove everything */}
              {!loading && filteredPlayers.length === 0 && (
                <tr>
                  <td
                    className="px-3 py-4 text-center text-slate-500"
                    colSpan={8}
                  >
                    No players match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PlayersPage
