// src/app/ModerationPage.jsx
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
import { moderationEvents as baseModerationEvents } from '../data/serverData'

function ModerationPage() {
  const [statusFilter, setStatusFilter] = useState('open') // open | resolved | all
  const [typeFilter, setTypeFilter] = useState('all') // all | warning | kick | ban | note
  const [search, setSearch] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Local copy so we can “resolve” in UI without touching the data file
  const [localEvents, setLocalEvents] = useState(
    baseModerationEvents.map((e) => ({ ...e }))
  )

  const typeCounts = useMemo(() => {
    const counts = {
      warning: 0,
      kick: 0,
      ban: 0,
      note: 0,
    }
    localEvents.forEach((e) => {
      if (counts[e.type] != null) counts[e.type]++
    })
    return [
      { type: 'warning', label: 'Warnings', value: counts.warning },
      { type: 'kick', label: 'Kicks', value: counts.kick },
      { type: 'ban', label: 'Bans', value: counts.ban },
      { type: 'note', label: 'Notes', value: counts.note },
    ]
  }, [localEvents])

  const filteredEvents = useMemo(() => {
    return localEvents.filter((m) => {
      const matchesStatus =
        statusFilter === 'all' || m.status === statusFilter

      const matchesType =
        typeFilter === 'all' || m.type === typeFilter

      const matchesSearch =
        !search.trim() ||
        m.playerName.toLowerCase().includes(search.toLowerCase()) ||
        m.staffName.toLowerCase().includes(search.toLowerCase()) ||
        m.reason.toLowerCase().includes(search.toLowerCase())

      return matchesStatus && matchesType && matchesSearch
    })
  }, [statusFilter, typeFilter, search, localEvents])

  function markResolved(id) {
    setLocalEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: 'resolved' } : e
      )
    )
    setSelectedEvent((prev) =>
      prev && prev.id === id ? { ...prev, status: 'resolved' } : prev
    )
  }

  return (
    <div className="gta-page min-h-[calc(100vh-3rem)]">
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 text-[11px] text-slate-300">
        {/* HEADER */}
        <header className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400">
              Moderation
            </p>
            <h1 className="text-lg font-semibold text-slate-50 md:text-xl">
              Moderation queue · Warnings, kicks &amp; bans
            </h1>
            <p className="max-w-xl text-[11px] text-slate-400">
              See recent staff actions and open tickets against players. Perfect
              for head admins and staff leads doing reviews.
            </p>
          </div>
        </header>

        {/* SUMMARY + CHART */}
        <section className="gta-card grid gap-4 p-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)]">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Queue summary
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                <p className="text-[10px] text-slate-400">
                  Open tickets
                </p>
                <p className="text-lg font-semibold text-amber-300">
                  {
                    localEvents.filter((e) => e.status === 'open')
                      .length
                  }
                </p>
                <p className="text-[9px] text-slate-500">
                  Keep this number low during peak hours.
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                <p className="text-[10px] text-slate-400">
                  Total actions
                </p>
                <p className="text-lg font-semibold text-slate-50">
                  {localEvents.length}
                </p>
                <p className="text-[9px] text-slate-500">
                  Warnings, kicks, bans &amp; notes.
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                <p className="text-[10px] text-slate-400">
                  Most severe type
                </p>
                <p className="text-lg font-semibold text-rose-300">
                  Bans
                </p>
                <p className="text-[9px] text-slate-500">
                  Use bans sparingly for extreme behavior.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wide text-amber-400">
              Actions by type
            </p>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeCounts}>
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
                  <Bar dataKey="value" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-slate-500">
              Too many kicks vs. warnings may mean staff are skipping education
              and going straight to kicks.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="gta-card flex flex-col gap-3 p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Search
              </p>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Player, staff, reason..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Status
              </p>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
              >
                <option value="open">Open only</option>
                <option value="resolved">Resolved only</option>
                <option value="all">All</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Type
              </p>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
              >
                <option value="all">All types</option>
                <option value="warning">Warnings</option>
                <option value="kick">Kicks</option>
                <option value="ban">Bans</option>
                <option value="note">Notes</option>
              </select>
            </div>
          </div>

          <p className="text-[10px] text-slate-500">
            Showing {filteredEvents.length} of {localEvents.length} moderation
            events.
          </p>
        </section>

        {/* MODERATION LIST */}
        <section className="gta-card p-4">
          <div className="mb-2 grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.1fr)] gap-3 border-b border-slate-800 pb-2 text-[10px] text-slate-400 max-md:hidden">
            <span>Player &amp; action</span>
            <span>Staff &amp; status</span>
            <span>Reason &amp; evidence</span>
          </div>

          <div className="space-y-2">
            {filteredEvents.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedEvent(m)}
                className="grid w-full grid-cols-1 gap-2 rounded-xl bg-slate-900/80 p-3 text-left text-[11px] transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-amber-500/30 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.1fr)] md:items-start md:border md:border-slate-800"
              >
                {/* PLAYER & ACTION */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-50">
                      {m.playerName}
                    </span>
                    <span
                      className={
                        'rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wide ' +
                        (m.type === 'ban'
                          ? 'bg-rose-500/10 text-rose-300'
                          : m.type === 'kick'
                          ? 'bg-amber-500/10 text-amber-300'
                          : m.type === 'warning'
                          ? 'bg-emerald-500/10 text-emerald-300'
                          : 'bg-sky-500/10 text-sky-300')
                      }
                    >
                      {m.type}
                    </span>
                  </div>
                  <p className="mt-1 text-[9px] text-slate-500">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* STAFF & STATUS */}
                <div>
                  <p className="text-[10px] text-slate-400">Staff</p>
                  <p className="text-[11px] text-slate-200">
                    {m.staffName}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Status:{' '}
                    <span
                      className={
                        m.status === 'open'
                          ? 'text-amber-300'
                          : 'text-emerald-300'
                      }
                    >
                      {m.status}
                    </span>
                  </p>
                </div>

                {/* REASON & EVIDENCE */}
                <div>
                  <p className="text-[10px] text-slate-400">Reason</p>
                  <p className="text-[11px] text-slate-100">
                    {m.reason}
                  </p>
                  {m.evidence && m.evidence.length > 0 && (
                    <p className="mt-1 text-[9px] text-slate-500">
                      Evidence:{' '}
                      <span className="text-sky-300">
                        {m.evidence.join(', ')}
                      </span>
                    </p>
                  )}
                </div>
              </button>
            ))}

            {filteredEvents.length === 0 && (
              <p className="py-6 text-center text-[11px] text-slate-500">
                No moderation events match your filters.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* POPUP DETAIL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="gta-card relative w-full max-w-lg border-amber-500/60 bg-slate-950/95 p-4">
            <button
              className="absolute right-3 top-3 text-[11px] text-slate-400 hover:text-slate-100"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>

            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400">
              Moderation detail
            </p>
            <h2 className="mt-1 text-sm font-semibold text-slate-50">
              {selectedEvent.type.toUpperCase()} ·{' '}
              {selectedEvent.playerName}
            </h2>
            <p className="mt-1 text-[11px] text-slate-400">
              Staff:{' '}
              <span className="text-slate-200">
                {selectedEvent.staffName}
              </span>{' '}
              ·{' '}
              <span
                className={
                  selectedEvent.status === 'open'
                    ? 'text-amber-300'
                    : 'text-emerald-300'
                }
              >
                {selectedEvent.status}
              </span>
            </p>

            <p className="mt-3 text-[10px] text-slate-400">Reason</p>
            <p className="text-[11px] text-slate-100">
              {selectedEvent.reason}
            </p>

            {selectedEvent.evidence &&
              selectedEvent.evidence.length > 0 && (
                <>
                  <p className="mt-3 text-[10px] text-slate-400">
                    Evidence
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-[10px] text-sky-300">
                    {selectedEvent.evidence.map((e, idx) => (
                      <li key={idx}>{e}</li>
                    ))}
                  </ul>
                </>
              )}

            <div className="mt-4 flex items-center justify-between gap-3 text-[10px]">
              <p className="max-w-xs text-slate-500">
                Mark this as resolved once the situation is fully handled and
                documented.
              </p>
              {selectedEvent.status === 'open' ? (
                <button
                  onClick={() => markResolved(selectedEvent.id)}
                  className="rounded-full bg-emerald-500/80 px-4 py-1.5 text-[11px] font-medium text-slate-950 hover:bg-emerald-400"
                >
                  Mark as resolved
                </button>
              ) : (
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] text-emerald-300">
                  Already resolved
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModerationPage
