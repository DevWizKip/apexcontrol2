// src/app/ServerLogsPage.jsx
// Demo server logs view for TorquePanel

import { useState, useMemo } from 'react'

const demoLogs = [
  {
    id: 1,
    time: '2024-06-12 18:22:41',
    level: 'info',
    source: 'Main RP',
    category: 'restart',
    message: 'Scheduled soft restart completed in 31s.',
  },
  {
    id: 2,
    time: '2024-06-12 18:20:09',
    level: 'warn',
    source: 'Anticheat',
    category: 'anticheat',
    message: 'Flagged possible speedhack: TTV_Nitro (veh: elegy).',
  },
  {
    id: 3,
    time: '2024-06-12 18:18:03',
    level: 'error',
    source: 'Resource: legacy_vehicleshop',
    category: 'script',
    message: 'Script error: attempt to index a nil value (buyVehicle.lua:142).',
  },
  {
    id: 4,
    time: '2024-06-12 18:15:10',
    level: 'info',
    source: 'Queue',
    category: 'queue',
    message: 'Queue peak 64 players · average wait 3m 20s.',
  },
  {
    id: 5,
    time: '2024-06-12 18:12:29',
    level: 'warn',
    source: 'Player report',
    category: 'report',
    message: 'New report: #8421 · DriftKing reported for VDM near Legion.',
  },
  {
    id: 6,
    time: '2024-06-12 18:10:17',
    level: 'info',
    source: 'Resource: police_mdt',
    category: 'script',
    message: 'Resource restarted by staff: Karma.',
  },
  {
    id: 7,
    time: '2024-06-12 18:06:02',
    level: 'error',
    source: 'Database',
    category: 'db',
    message: 'Slow query detected (players table – 2.4s).',
  },
  {
    id: 8,
    time: '2024-06-12 18:02:45',
    level: 'info',
    source: 'Staff',
    category: 'staff',
    message: 'Karma claimed ticket #8416 (OOC in PD holding).',
  },
  {
    id: 9,
    time: '2024-06-12 17:58:01',
    level: 'warn',
    source: 'Anticheat',
    category: 'anticheat',
    message: 'Unusual damage pattern from player NovaRP near apartments.',
  },
  {
    id: 10,
    time: '2024-06-12 17:54:33',
    level: 'info',
    source: 'Main RP',
    category: 'join',
    message: 'Player TTV_Nitro connected · ping 41ms · slot 96/128.',
  },
]

function ServerLogsPage() {
  const [levelFilter, setLevelFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredLogs = useMemo(() => {
    return demoLogs.filter((log) => {
      if (levelFilter !== 'all' && log.level !== levelFilter) return false
      if (categoryFilter !== 'all' && log.category !== categoryFilter)
        return false
      if (search.trim()) {
        const term = search.toLowerCase()
        const text =
          `${log.time} ${log.source} ${log.message}`.toLowerCase()
        if (!text.includes(term)) return false
      }
      return true
    })
  }, [levelFilter, categoryFilter, search])

  const levelOptions = [
    { value: 'all', label: 'All levels' },
    { value: 'info', label: 'Info' },
    { value: 'warn', label: 'Warnings' },
    { value: 'error', label: 'Errors' },
  ]

  const categoryOptions = [
    { value: 'all', label: 'All categories' },
    { value: 'anticheat', label: 'Anticheat' },
    { value: 'script', label: 'Scripts' },
    { value: 'report', label: 'Player reports' },
    { value: 'db', label: 'Database' },
    { value: 'staff', label: 'Staff actions' },
    { value: 'queue', label: 'Queue' },
    { value: 'restart', label: 'Restarts' },
    { value: 'join', label: 'Joins' },
  ]

  const levelBadgeClasses = (level) => {
    if (level === 'error') {
      return 'bg-rose-500/20 text-rose-300'
    }
    if (level === 'warn') {
      return 'bg-amber-500/20 text-amber-300'
    }
    return 'bg-sky-500/20 text-sky-200'
  }

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-cyan-400">
            Logs
          </p>
          <h1 className="text-lg font-semibold text-slate-50">
            Server logs
          </h1>
          <p className="text-xs text-slate-400">
            Search and filter live logs across your GTA / FiveM city – joins,
            restarts, anticheat flags, script errors and staff actions.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search logs (player, resource, message)…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none md:w-80"
          />
        </div>
      </header>

      {/* FILTERS */}
      <section className="flex flex-wrap gap-2 text-[11px]">
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-100 focus:border-cyan-400 focus:outline-none"
        >
          {levelOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-100 focus:border-cyan-400 focus:outline-none"
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </section>

      {/* TABLE */}
      <section className="mt-2 rounded-2xl border border-slate-800 bg-slate-950/80">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-1 text-[11px] text-slate-300">
            <thead>
              <tr className="text-slate-400">
                <th className="text-left font-normal px-3 py-2">Time</th>
                <th className="text-left font-normal px-3 py-2">Level</th>
                <th className="text-left font-normal px-3 py-2">Source</th>
                <th className="text-left font-normal px-3 py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-6 text-center text-xs text-slate-500"
                  >
                    No logs match your filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="rounded-l-xl bg-slate-900/80 px-3 py-2">
                      <div className="flex flex-col">
                        <span className="text-slate-200">
                          {log.time}
                        </span>
                      </div>
                    </td>
                    <td className="bg-slate-900/80 px-3 py-2">
                      <span
                        className={
                          'rounded-full px-2 py-0.5 text-[10px] ' +
                          levelBadgeClasses(log.level)
                        }
                      >
                        {log.level.toUpperCase()}
                      </span>
                    </td>
                    <td className="bg-slate-900/80 px-3 py-2">
                      {log.source}
                    </td>
                    <td className="rounded-r-xl bg-slate-900/80 px-3 py-2 text-slate-200">
                      {log.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default ServerLogsPage
