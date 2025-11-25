// src/app/ServerLogsPage.jsx
import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { serverLogs } from '../data/serverData'

function ServerLogsPage() {
  const [levelFilter, setLevelFilter] = useState('all') // all | info | warn | error
  const [search, setSearch] = useState('')
  const [selectedLog, setSelectedLog] = useState(null)

  const levelCounts = useMemo(() => {
    const counts = { info: 0, warn: 0, error: 0 }
    serverLogs.forEach((log) => {
      if (counts[log.level] != null) counts[log.level]++
    })
    return [
      { level: 'info', label: 'Info', value: counts.info },
      { level: 'warn', label: 'Warnings', value: counts.warn },
      { level: 'error', label: 'Errors', value: counts.error },
    ]
  }, [])

  const filteredLogs = useMemo(() => {
    return serverLogs.filter((log) => {
      const matchesLevel =
        levelFilter === 'all' || log.level === levelFilter

      const matchesSearch =
        !search.trim() ||
        log.message.toLowerCase().includes(search.toLowerCase()) ||
        log.source.toLowerCase().includes(search.toLowerCase())

      return matchesLevel && matchesSearch
    })
  }, [levelFilter, search])

  return (
    <div className="gta-page min-h-[calc(100vh-3rem)]">
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 text-[11px] text-slate-300">
        {/* HEADER */}
        <header className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-sky-400">
              Server logs
            </p>
            <h1 className="text-lg font-semibold text-slate-50 md:text-xl">
              Script, server &amp; anticheat logs
            </h1>
            <p className="max-w-xl text-[11px] text-slate-400">
              Watch script errors, server events and anticheat flags in one GTA
              RP–friendly view. Filter down to what actually matters.
            </p>
          </div>
        </header>

        {/* SUMMARY + LEVEL CHART */}
        <section className="gta-card grid gap-4 p-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)]">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Log summary
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                <p className="text-[10px] text-slate-400">
                  Total log entries
                </p>
                <p className="text-lg font-semibold text-slate-50">
                  {serverLogs.length}
                </p>
                <p className="text-[9px] text-slate-500">
                  Sample data from this demo city.
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                <p className="text-[10px] text-slate-400">
                  Errors
                </p>
                <p className="text-lg font-semibold text-rose-400">
                  {
                    serverLogs.filter((l) => l.level === 'error')
                      .length
                  }
                </p>
                <p className="text-[9px] text-slate-500">
                  Script &amp; resource failures.
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                <p className="text-[10px] text-slate-400">
                  Anti-cheat warnings
                </p>
                <p className="text-lg font-semibold text-amber-400">
                  {
                    serverLogs.filter((l) =>
                      l.source.toLowerCase().includes('anticheat')
                    ).length
                  }
                </p>
                <p className="text-[9px] text-slate-500">
                  Flags worth reviewing in spectate.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wide text-sky-400">
              Logs by level
            </p>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={levelCounts}>
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
                  <Bar dataKey="value" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-slate-500">
              Spikes in errors after deploys usually mean a bad script build or
              config change.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="gta-card flex flex-col gap-3 p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Search logs
              </p>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Message, source, script name..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Level
              </p>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
              >
                <option value="all">All levels</option>
                <option value="info">Info</option>
                <option value="warn">Warnings</option>
                <option value="error">Errors</option>
              </select>
            </div>
          </div>

          <p className="text-[10px] text-slate-500">
            Showing {filteredLogs.length} of {serverLogs.length} log entries.
          </p>
        </section>

        {/* LOG LIST */}
        <section className="gta-card max-h-[430px] space-y-2 overflow-y-auto p-3">
          {filteredLogs.map((log) => (
            <button
              key={log.id}
              onClick={() => setSelectedLog(log)}
              className="flex w-full items-start gap-2 rounded-lg bg-slate-900/80 px-3 py-2 text-left text-[10px] transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-sky-500/30 md:border md:border-slate-800"
            >
              <span
                className={
                  'mt-[3px] h-1.5 w-1.5 flex-none rounded-full ' +
                  (log.level === 'error'
                    ? 'bg-rose-400'
                    : log.level === 'warn'
                    ? 'bg-amber-400'
                    : 'bg-slate-400')
                }
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-[9px] text-slate-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                  <span className="text-[9px] text-slate-500">·</span>
                  <span className="text-[9px] text-slate-300">
                    {log.source}
                  </span>
                  <span className="text-[9px] text-slate-500">·</span>
                  <span
                    className={
                      'rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wide ' +
                      (log.level === 'error'
                        ? 'bg-rose-500/10 text-rose-300'
                        : log.level === 'warn'
                        ? 'bg-amber-500/10 text-amber-300'
                        : 'bg-slate-700/60 text-slate-200')
                    }
                  >
                    {log.level}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-100">
                  {log.message}
                </p>
              </div>
            </button>
          ))}

          {filteredLogs.length === 0 && (
            <p className="py-6 text-center text-[11px] text-slate-500">
              No logs match your filters or search.
            </p>
          )}
        </section>
      </div>

      {/* LOG DETAIL POPUP */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="gta-card relative w-full max-w-lg border-sky-500/60 bg-slate-950/95 p-4">
            <button
              className="absolute right-3 top-3 text-[11px] text-slate-400 hover:text-slate-100"
              onClick={() => setSelectedLog(null)}
            >
              ✕
            </button>

            <p className="text-[10px] uppercase tracking-[0.2em] text-sky-400">
              Log detail
            </p>
            <h2 className="mt-1 text-sm font-semibold text-slate-50">
              {selectedLog.source}
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              {new Date(selectedLog.timestamp).toLocaleString()} ·{' '}
              <span
                className={
                  'rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wide ' +
                  (selectedLog.level === 'error'
                    ? 'bg-rose-500/10 text-rose-300'
                    : selectedLog.level === 'warn'
                    ? 'bg-amber-500/10 text-amber-300'
                    : 'bg-slate-700/60 text-slate-200')
                }
              >
                {selectedLog.level}
              </span>
            </p>

            <p className="mt-3 text-[11px] text-slate-100">
              {selectedLog.message}
            </p>

            <p className="mt-3 text-[9px] text-slate-500">
              In a live city, clicking a log like this might jump you straight
              into the relevant resource, player or incident in TorquePanel.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServerLogsPage
