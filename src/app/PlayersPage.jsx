// src/app/PlayersPage.jsx
// Player directory view: tries to load /Players.json,
// but falls back to built-in demo data so it always works.

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// --- Built-in demo data (used ONLY if Players.json fails) ---
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
  },
]

function PlayersPage() {
  const [players, setPlayers] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState(null) // soft message, not an error

  const [search, setSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')

  const navigate = useNavigate()

  // Load data: first try /Players.json, if that fails, use fallbackPlayers
  useEffect(() => {
    async function loadPlayers() {
      try {
        setLoading(true)
        setNote(null)

        const res = await fetch('/Players.json')
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const data = await res.json()
        const list = data.players || data

        setPlayers(list)
        setFiltered(list)
      } catch (err) {
        console.warn(
          'Could not load Players.json, using built-in demo data instead:',
          err
        )
        setPlayers(fallbackPlayers)
        setFiltered(fallbackPlayers)
        setNote('Showing built-in demo players (Players.json not loaded).')
      } finally {
        setLoading(false)
      }
    }

    loadPlayers()
  }, [])

  // Apply filters & search
  useEffect(() => {
    let next = [...players]

    if (search.trim()) {
      const term = search.toLowerCase()
      next = next.filter((p) =>
        (p.name || '').toLowerCase().includes(term)
      )
    }

    if (riskFilter !== 'all') {
      next = next.filter(
        (p) => (p.risk || '').toLowerCase() === riskFilter
      )
    }

    if (statusFilter !== 'all') {
      next = next.filter(
        (p) => (p.status || '').toLowerCase() === statusFilter
      )
    }

    if (tagFilter !== 'all') {
      next = next.filter((p) =>
        Array.isArray(p.tags)
          ? p.tags.map((t) => t.toLowerCase()).includes(tagFilter)
          : false
      )
    }

    setFiltered(next)
  }, [players, search, riskFilter, statusFilter, tagFilter])

  const riskOptions = [
    { value: 'all', label: 'All risk levels' },
    { value: 'low', label: 'Low risk' },
    { value: 'medium', label: 'Medium risk' },
    { value: 'high', label: 'High risk' },
  ]

  const statusOptions = [
    { value: 'all', label: 'All statuses' },
    { value: 'active', label: 'Active' },
    { value: 'banned', label: 'Banned' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'staff', label: 'Staff' },
  ]

  const tagOptions = [
    { value: 'all', label: 'All tags' },
    { value: 'cop', label: 'Cops' },
    { value: 'gang', label: 'Gangs' },
    { value: 'medic', label: 'Medics' },
    { value: 'racer', label: 'Racers' },
    { value: 'streamer', label: 'Streamers' },
    { value: 'staff', label: 'Staff' },
  ]

  const handleRowClick = (player) => {
    if (!player?.id) return
    navigate(`/app/players/${player.id}`)
  }

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-cyan-400">
            Players
          </p>
          <h1 className="text-lg font-semibold text-slate-50">
            Player directory
          </h1>
          <p className="text-xs text-slate-400">
            Search, filter and drill into players across your GTA / FiveM city.
            Click a row to open the full player profile.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none md:w-64"
          />
        </div>
      </header>

      {/* FILTERS */}
      <section className="flex flex-wrap gap-2 text-[11px]">
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-100 focus:border-cyan-400 focus:outline-none"
        >
          {riskOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-100 focus:border-cyan-400 focus:outline-none"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-100 focus:border-cyan-400 focus:outline-none"
        >
          {tagOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </section>

      {/* SMALL NOTE IF USING FALLBACK DATA */}
      {note && (
        <p className="text-xs text-slate-500">
          {note}
        </p>
      )}
      {loading && (
        <p className="text-xs text-slate-400">Loading players…</p>
      )}

      {/* TABLE */}
      <section className="mt-2 rounded-2xl border border-slate-800 bg-slate-950/80">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-1 text-[11px] text-slate-300">
            <thead>
              <tr className="text-slate-400">
                <th className="text-left font-normal px-3 py-2">Name</th>
                <th className="text-left font-normal px-3 py-2">Playtime</th>
                <th className="text-left font-normal px-3 py-2">Last seen</th>
                <th className="text-left font-normal px-3 py-2">
                  Sessions (30d)
                </th>
                <th className="text-left font-normal px-3 py-2">Infractions</th>
                <th className="text-left font-normal px-3 py-2">Risk</th>
                <th className="text-left font-normal px-3 py-2">Status</th>
                <th className="text-left font-normal px-3 py-2">Tags</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-6 text-center text-xs text-slate-500"
                  >
                    No players match your filters.
                  </td>
                </tr>
              )}

              {filtered.map((player) => (
                <tr
                  key={player.id || player.name}
                  onClick={() => handleRowClick(player)}
                  className="cursor-pointer"
                >
                  <td className="rounded-l-xl bg-slate-900/80 px-3 py-2">
                    <div className="flex flex-col">
                      <span className="text-slate-50">{player.name}</span>
                      <span className="text-[10px] text-slate-500">
                        {player.id ? `ID: ${player.id}` : player.rockstarId}
                      </span>
                    </div>
                  </td>
                  <td className="bg-slate-900/80 px-3 py-2">
                    {player.playtimeHours != null
                      ? `${player.playtimeHours}h`
                      : '-'}
                  </td>
                  <td className="bg-slate-900/80 px-3 py-2">
                    {player.lastSeen || '-'}
                  </td>
                  <td className="bg-slate-900/80 px-3 py-2">
                    {player.sessions30d ?? '-'}
                  </td>
                  <td className="bg-slate-900/80 px-3 py-2">
                    {player.infractionsTotal ?? 0}
                  </td>
                  <td className="bg-slate-900/80 px-3 py-2">
                    {player.risk ? (
                      <span
                        className={
                          'rounded-full px-2 py-0.5 text-[10px] ' +
                          (player.risk.toLowerCase() === 'high'
                            ? 'bg-amber-500/20 text-amber-300'
                            : player.risk.toLowerCase() === 'medium'
                            ? 'bg-sky-500/20 text-sky-200'
                            : 'bg-emerald-500/20 text-emerald-200')
                        }
                      >
                        {player.risk}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="bg-slate-900/80 px-3 py-2">
                    {player.status || 'Active'}
                  </td>
                  <td className="rounded-r-xl bg-slate-900/80 px-3 py-2">
                    {Array.isArray(player.tags) && player.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {player.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default PlayersPage
