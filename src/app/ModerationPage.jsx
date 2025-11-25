// src/app/ModerationPage.jsx
import { useState } from 'react'
import { reports } from './fakeData'

function ModerationPage() {
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredReports = reports.filter((r) => {
    if (statusFilter === 'All') return true
    return r.status === statusFilter
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">Moderation</p>
          <h1 className="text-xl font-semibold text-slate-50">Reports</h1>
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

      {/* Table */}
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
            {filteredReports.map((r) => (
              <tr
                key={r.id}
                className="border-t border-slate-800 hover:bg-slate-900/60"
              >
                <td className="px-3 py-2">{r.createdAt}</td>
                <td className="px-3 py-2">{r.reporter}</td>
                <td className="px-3 py-2">{r.accused}</td>
                <td className="px-3 py-2 max-w-xs">
                  <span className="line-clamp-2">{r.reason}</span>
                </td>
                <td className="px-3 py-2">{r.severity}</td>
                <td className="px-3 py-2">{r.status}</td>
                <td className="px-3 py-2">{r.handler ?? 'Unassigned'}</td>
              </tr>
            ))}

            {filteredReports.length === 0 && (
              <tr>
                <td className="px-3 py-4 text-center text-slate-500" colSpan={7}>
                  No reports for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ModerationPage
