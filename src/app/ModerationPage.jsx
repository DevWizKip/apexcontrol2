// src/app/ModerationPage.jsx
// Moderation control room for TorquePanel

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

const demoTickets = [
  {
    id: 4821,
    createdAt: '4 min ago',
    player: 'TTV_Nitro',
    reporter: 'NovaRP',
    location: 'Legion Square',
    summary: 'VDM into sidewalk crowd during event.',
    severity: 'High',
    status: 'Open',
    queue: 'City',
    ageMinutes: 4,
    category: 'VDM',
    staff: null,
    notes: [
      'Auto-flag from anticheat for unusual vehicle speed.',
      'Multiple reports within 2 minutes near Legion.',
    ],
  },
  {
    id: 4817,
    createdAt: '18 min ago',
    player: 'NovaRP',
    reporter: 'Karma',
    location: 'MRPD holding',
    summary: 'OOC in cells, arguing about rules on voice.',
    severity: 'Medium',
    status: 'Claimed',
    queue: 'PD',
    ageMinutes: 18,
    category: 'OOC',
    staff: 'Karma',
    notes: ['Player previously warned for similar behavior last week.'],
  },
  {
    id: 4811,
    createdAt: '29 min ago',
    player: 'DriftKing',
    reporter: 'System',
    location: 'Vinewood',
    summary: 'Street race reported by multiple 911 calls.',
    severity: 'Low',
    status: 'Investigating',
    queue: 'Traffic',
    ageMinutes: 29,
    category: 'Reckless driving',
    staff: 'Ash',
    notes: ['Traffic unit dispatched, bodycam footage pending review.'],
  },
  {
    id: 4803,
    createdAt: '1 h 12 min ago',
    player: 'RandomAndy',
    reporter: 'Player report',
    location: 'Hospital parking',
    summary: 'Combat logging after being downed.',
    severity: 'Medium',
    status: 'Resolved',
    queue: 'City',
    ageMinutes: 72,
    category: 'Combat logging',
    staff: 'Pixel',
    notes: ['Explained rules, 24h temp ban applied.', 'Logged to MDT.'],
  },
]

function ModerationPage() {
  const [statusFilter, setStatusFilter] = useState('active') // active = open + claimed + investigating
  const [severityFilter, setSeverityFilter] = useState('all')
  const [queueFilter, setQueueFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(demoTickets[0]?.id ?? null)

  const filteredTickets = useMemo(() => {
    return demoTickets.filter((t) => {
      if (statusFilter === 'active') {
        if (['Resolved', 'Closed'].includes(t.status)) return false
      } else if (statusFilter !== 'all' && t.status !== statusFilter) {
        return false
      }

      if (
        severityFilter !== 'all' &&
        (t.severity || '').toLowerCase() !== severityFilter
      ) {
        return false
      }

      if (
        queueFilter !== 'all' &&
        (t.queue || '').toLowerCase() !== queueFilter
      ) {
        return false
      }

      if (search.trim()) {
        const term = search.toLowerCase()
        const text = `${t.id} ${t.player} ${t.reporter} ${t.summary} ${t.location} ${
          t.category || ''
        }`.toLowerCase()
        if (!text.includes(term)) return false
      }

      return true
    })
  }, [statusFilter, severityFilter, queueFilter, search])

  const selectedTicket =
    filteredTickets.find((t) => t.id === selectedId) ||
    filteredTickets[0] ||
    demoTickets[0] ||
    null

  // Small chart: tickets by severity
  const severityCounts = demoTickets.reduce(
    (acc, t) => {
      const s = (t.severity || 'Other').toLowerCase()
      if (s === 'high') acc.high += 1
      else if (s === 'medium') acc.medium += 1
      else if (s === 'low') acc.low += 1
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

  const statusOptions = [
    { value: 'active', label: 'Active queue' },
    { value: 'all', label: 'All statuses' },
    { value: 'Open', label: 'Open only' },
    { value: 'Claimed', label: 'Claimed' },
    { value: 'Investigating', label: 'Investigating' },
    { value: 'Resolved', label: 'Resolved' },
  ]

  const severityOptions = [
    { value: 'all', label: 'All severities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ]

  const queueOptions = [
    { value: 'all', label: 'All queues' },
    { value: 'city', label: 'City' },
    { value: 'pd', label: 'PD' },
    { value: 'traffic', label: 'Traffic' },
  ]

  const severityBadgeClasses = (severity) => {
    const s = (severity || '').toLowerCase()
    if (s === 'high') return 'bg-amber-500/20 text-amber-300'
    if (s === 'medium') return 'bg-sky-500/20 text-sky-200'
    if (s === 'low') return 'bg-emerald-500/20 text-emerald-200'
    return 'bg-slate-700/40 text-slate-200'
  }

  const statusBadgeClasses = (status) => {
    if (status === 'Open') return 'bg-rose-500/20 text-rose-200'
    if (status === 'Claimed') return 'bg-cyan-500/20 text-cyan-200'
    if (status === 'Investigating') return 'bg-indigo-500/20 text-indigo-200'
    if (status === 'Resolved') return 'bg-emerald-500/20 text-emerald-200'
    return 'bg-slate-700/40 text-slate-200'
  }

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-cyan-400">
            Moderation
          </p>
          <h1 className="text-lg font-semibold text-slate-50">
            Live incident queue
          </h1>
          <p className="text-xs text-slate-400">
            See every report, staff claim and resolution in one place. Built for
            GTA / FiveM RP cities so your staff can move faster than Discord
            screenshots.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search by player, reporter or reason…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none md:w-72"
          />
        </div>
      </header>

      {/* FILTERS */}
      <section className="flex flex-wrap gap-2 text-[11px]">
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
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-100 focus:border-cyan-400 focus:outline-none"
        >
          {severityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={queueFilter}
          onChange={(e) => setQueueFilter(e.target.value)}
          className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-100 focus:border-cyan-400 focus:outline-none"
        >
          {queueOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </section>

      {/* MAIN GRID: QUEUE + DETAILS */}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)]">
        {/* LEFT: QUEUE */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-50">
                Open moderation items
              </h2>
              <p className="text-[11px] text-slate-400">
                Click a ticket to view details, notes and staff actions.
              </p>
            </div>
            <span className="text-[11px] text-slate-500">
              {filteredTickets.length} tickets
            </span>
          </div>

          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-1 text-[11px]">
              <thead className="text-slate-400">
                <tr>
                  <th className="text-left font-normal px-2 py-1">ID</th>
                  <th className="text-left font-normal px-2 py-1">Player</th>
                  <th className="text-left font-normal px-2 py-1">
                    Severity
                  </th>
                  <th className="text-left font-normal px-2 py-1">Status</th>
                  <th className="text-left font-normal px-2 py-1">
                    Reporter
                  </th>
                  <th className="text-left font-normal px-2 py-1">
                    Age
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 py-6 text-center text-xs text-slate-500"
                    >
                      No tickets match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((t) => (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedId(t.id)}
                      className={
                        'cursor-pointer ' +
                        (t.id === selectedTicket?.id
                          ? 'brightness-110'
                          : '')
                      }
                    >
                      <td className="rounded-l-xl bg-slate-900/80 px-2 py-2 text-slate-400">
                        #{t.id}
                      </td>
                      <td className="bg-slate-900/80 px-2 py-2">
                        <div className="flex flex-col">
                          <span className="text-slate-50">{t.player}</span>
                          <span className="text-[10px] text-slate-500">
                            {t.location}
                          </span>
                        </div>
                      </td>
                      <td className="bg-slate-900/80 px-2 py-2">
                        <span
                          className={
                            'rounded-full px-2 py-0.5 text-[10px] ' +
                            severityBadgeClasses(t.severity)
                          }
                        >
                          {t.severity}
                        </span>
                      </td>
                      <td className="bg-slate-900/80 px-2 py-2">
                        <span
                          className={
                            'rounded-full px-2 py-0.5 text-[10px] ' +
                            statusBadgeClasses(t.status)
                          }
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="bg-slate-900/80 px-2 py-2">
                        {t.reporter}
                      </td>
                      <td className="rounded-r-xl bg-slate-900/80 px-2 py-2 text-slate-400">
                        {t.createdAt}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* RIGHT: DETAILS + CHART */}
        <section className="space-y-3">
          {/* Ticket details */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
            {selectedTicket ? (
              <>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-50">
                      Ticket #{selectedTicket.id}{' '}
                      <span className="text-xs text-slate-400">
                        · {selectedTicket.category}
                      </span>
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Reported {selectedTicket.createdAt} by{' '}
                      <span className="text-slate-200">
                        {selectedTicket.reporter}
                      </span>
                      .
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[11px]">
                    <span
                      className={
                        'rounded-full px-2 py-0.5 ' +
                        severityBadgeClasses(selectedTicket.severity)
                      }
                    >
                      {selectedTicket.severity} priority
                    </span>
                    <span
                      className={
                        'rounded-full px-2 py-0.5 ' +
                        statusBadgeClasses(selectedTicket.status)
                      }
                    >
                      {selectedTicket.status}
                    </span>
                  </div>
                </div>

                <div className="mt-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
                  <p className="text-[11px] text-slate-400">Summary</p>
                  <p className="text-xs text-slate-50">
                    {selectedTicket.summary}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Location:{' '}
                    <span className="text-slate-200">
                      {selectedTicket.location}
                    </span>{' '}
                    · Queue:{' '}
                    <span className="text-slate-200">
                      {selectedTicket.queue}
                    </span>
                  </p>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
                    <p className="text-[11px] text-slate-400">Reported player</p>
                    <p className="text-xs text-slate-50">
                      {selectedTicket.player}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Staff assigned:{' '}
                      <span className="text-slate-200">
                        {selectedTicket.staff || 'Unassigned'}
                      </span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
                    <p className="text-[11px] text-slate-400">Time in queue</p>
                    <p className="text-xs text-slate-50">
                      {selectedTicket.ageMinutes} minutes
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      In a live city this would enforce your staff SLA for
                      high-priority tickets.
                    </p>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
                  <p className="text-[11px] text-slate-400">Notes</p>
                  {selectedTicket.notes && selectedTicket.notes.length > 0 ? (
                    <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                      {selectedTicket.notes.map((n, idx) => (
                        <li key={idx}>{n}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-500">
                      No staff notes yet. In production you could sync notes
                      with your MDT or Discord bot.
                    </p>
                  )}
                </div>

                {/* Quick actions – demo only */}
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 hover:border-cyan-400 hover:text-cyan-300">
                    Claim ticket (demo)
                  </button>
                  <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 hover:border-emerald-400 hover:text-emerald-300">
                    Mark resolved (demo)
                  </button>
                  <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 hover:border-sky-400 hover:text-sky-300">
                    Ping staff Discord (demo)
                  </button>
                </div>
                <p className="mt-1 text-[10px] text-slate-500">
                  Buttons are demo-only here. In a live TorquePanel setup these
                  would log to your audit trail and optionally hit a Discord bot
                  or in-game command.
                </p>
              </>
            ) : (
              <p className="text-[11px] text-slate-500">
                Select a ticket on the left to see full details.
              </p>
            )}
          </div>

          {/* Severity mix chart */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">
                  Queue severity mix
                </h2>
                <p className="text-[11px] text-slate-400">
                  Small snapshot of how heavy the active queue feels right now.
                </p>
              </div>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-500">
                Demo analytics
              </span>
            </div>
            <div className="mt-2 h-32">
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
          </div>
        </section>
      </div>
    </div>
  )
}

export default ModerationPage
