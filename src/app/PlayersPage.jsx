import { useState } from 'react'
import { Link } from 'react-router-dom'
import { players } from './fakeData'

function PlayersPage() {
  const [search, setSearch] = useState('')

  const filteredPlayers = players.filter((p) => {
    if (!search) return true
    const term = search.toLowerCase()
    return p.name.toLowerCase().includes(term)
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">Players</p>
          <h1 className="text-xl font-semibold text-slate-50">Player directory</h1>
        </div>
        <input
          className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-100 w-full md:w-64"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
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
                <td className="px-3 py-2">
                  <Link to={`/app/players/${p.id}`} className="text-cyan-300">
                    {p.name}
                  </Link>
                </td>
                <td className="px-3 py-2">{p.playtimeHours}h</td>
                <td className="px-3 py-2">{p.lastSeen}</td>
                <td className="px-3 py-2">{p.sessions30d}</td>
                <td className="px-3 py-2">{p.infractions}</td>
                <td className="px-3 py-2">{p.risk}</td>
                <td className="px-3 py-2">{p.status}</td>
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

            {filteredPlayers.length === 0 && (
              <tr>
                <td className="px-3 py-4 text-center text-slate-500" colSpan={8}>
                  No players match “{search}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlayersPage
