// src/app/ModerationPage.jsx
// Shows a list of reports (cases) and a detail panel for the selected one.
// In this version, we load reports from a fake API (reports.json using fetch).

import { useEffect, useState } from 'react'

// Status badge for Open / In progress / Resolved
function StatusBadge({ value }) {
  const base = 'px-2 py-0.5 rounded-full text-[11px] font-medium'
  if (value === 'Open') {
    return (
      <span
        className={`${base} bg-red-500/10 text-red-400 border border-red-500/40`}
      >
        Open
      </span>
    )
  }
  if (value === 'In progress') {
    return (
      <span
        className={`${base} bg-amber-500/10 text-amber-300 border border-amber-500/40`}
      >
        In progress
      </span>
    )
  }
  return (
    <span
      className={`${base} bg-emerald-500/10 text-emerald-300 border border-emerald-500/40`}
    >
      Resolved
    </span>
  )
}

// Severity badge for High / Medium / Low
function SeverityBadge({ value }) {
  const base = 'px-2 py-0.5 rounded-full text-[11px]'
  if (value === 'High') {
    return <span className={`${base} bg-red-500/20 text-red-200`}>High</span>
  }
  if (value === 'Medium') {
    return <span className={`${base} bg-amber-500/20 text-amber-100`}>Medium</span>
  }
  return <span className={`${base} bg-slate-700/60 text-slate-100`}>Low</span>
}

function ModerationPage() {
  // reports loaded from the "API"
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(null)

  // Load reports.json once
  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true)
        setError('')

        const res = await fetch('/reports.json')
        if (!res.ok) {
          throw new Error('Failed to load reports.json (status ' + res.status + ')')
        }

        const data = await res.json()
        setReports(data)
      } catch (err) {
        console.error('loadReports error:', err)
        setError('Could not load reports: ' + String(err))
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [])

  // Filter reports by status (Open / In progress / Resolved / All)
  const filteredReports = reports.filter((r) => {
    if (statusFilter === 'All') return true
    return r.status === statusFilter
  })

  // Find the currently selected report (for detail panel)
  const selectedReport =
    reports.find((r) => r.id === selectedId) || filteredReports[0] || null

  return (
    <div className="space-y-4">
      {/* Header with status filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">Moderation</p>
          <h1 className="text-xl font-semibold text-slate-50">Reports</h1>

          {loading ? (
            <p className="text-[11px] text-slate-500">Loading reports…</p>
          ) : error ? (
            <p className="text-[11px] text-red-300">{error}</p>
          ) : (
            <p className="text-[11px] text-slate-500">
              {filteredReports.length} of {reports.length} reports shown
            </p>
          )}
        </div>

        <div className="flex gap-2 text-xs">
          <select
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Open">Open</option>
            <option value="In progress">In progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Layout: table on the left, detail panel on the right */}
      {loading ? (
        <div className="text-xs text-slate-400">Loading reports…</div>
      ) : (
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] gap-4">
          {/* Reports table */}
          <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-900 text-slate-400 text-left">
                <tr>
                  <th className="px-3 py-2">Time</th>
                  <th className="px-3 py-2">Reporter</th>
                  <th className="px-3 py-2">Accused</th>
                  <th className="px-3 py-2">Reason</th>
                  <th className="px-3 py-2">Severity</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Handler</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((r) => {
                  const isSelected = selectedReport && r.id === selectedReport.id
                  return (
                    <tr
                      key={r.id}
                      className={
                        'border-t border-slate-800 cursor-pointer hover:bg-slate-900/60 ' +
                        (isSelected ? 'bg-slate-900/80' : '')
                      }
                      onClick={() => setSelectedId(r.id)}
                    >
                      <td className="px-3 py-2">{r.createdAt}</td>
                      <td className="px-3 py-2">{r.reporter}</td>
                      <td className="px-3 py-2">{r.accused}</td>
                      <td className="px-3 py-2 max-w-xs">
                        <span className="line-clamp-2">{r.reasonShort}</span>
                      </td>
                      <td className="px-3 py-2">
                        <SeverityBadge value={r.severity} />
                      </td>
                      <td className="px-3 py-2">
                        <StatusBadge value={r.status} />
                      </td>
                      <td className="px-3 py-2">{r.handler ?? 'Unassigned'}</td>
                    </tr>
                  )
                })}

                {/* Empty state when no reports match the filter */}
                {!loading && filteredReports.length === 0 && (
                  <tr>
                    <td
                      className="px-3 py-4 text-center text-slate-500"
                      colSpan={7}
                    >
                      No reports for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Detail panel for the selected report */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-3">
            {!selectedReport && (
              <p className="text-slate-500">
                Select a report on the left to see details.
              </p>
            )}

            {selectedReport && (
              <>
                {/* Header row with status + severity */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] text-slate-400">
                      Case ID {selectedReport.id.toUpperCase()}
                    </p>
                    <h2 className="text-sm font-semibold text-slate-50">
                      {selectedReport.reasonShort}
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      {selectedReport.createdAt} · Reporter{' '}
                      {selectedReport.reporter}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge value={selectedReport.status} />
                    <SeverityBadge value={selectedReport.severity} />
                  </div>
                </div>

                <div className="flex gap-2 text-[11px]">
                  <span className="text-slate-400">Accused:</span>
                  <span className="font-medium text-slate-100">
                    {selectedReport.accused}
                  </span>
                </div>

                {/* Long description */}
                <div>
                  <h3 className="text-[11px] font-semibold text-slate-200 mb-1">
                    Description
                  </h3>
                  <p>{selectedReport.description}</p>
                </div>

                {/* Rule tags */}
                <div>
                  <h3 className="text-[11px] font-semibold text-slate-200 mb-1">
                    Rule tags
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedReport.ruleTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Evidence links */}
                <div>
                  <h3 className="text-[11px] font-semibold text-slate-200 mb-1">
                    Evidence
                  </h3>
                  <ul className="space-y-1">
                    {selectedReport.evidenceLinks.map((link) => (
                      <li key={link} className="break-all">
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Staff notes */}
                <div>
                  <h3 className="text-[11px] font-semibold text-slate-200 mb-1">
                    Staff notes
                  </h3>
                  <p>{selectedReport.staffNotes}</p>
                </div>

                {/* Fake action buttons */}
                <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                  <button className="px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700">
                    Assign to me
                  </button>
                  <button className="px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700">
                    Add note
                  </button>
                  <button className="px-3 py-1.5 rounded-md bg-emerald-500 text-slate-950">
                    Mark resolved
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ModerationPage
