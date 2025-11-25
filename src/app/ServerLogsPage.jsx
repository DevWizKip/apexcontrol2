// src/app/ServerLogsPage.jsx
// Demo server logs view for TorquePanel.

function ServerLogsPage() {
  const logs = [
    {
      time: '21:04:12',
      server: 'Main RP City',
      level: 'INFO',
      message: 'Player TTV_Nitro connected (steam:110000112345678)',
      source: 'connection',
    },
    {
      time: '21:04:57',
      server: 'Main RP City',
      level: 'WARN',
      message: 'High ping spike detected for region EU-West',
      source: 'metrics',
    },
    {
      time: '21:06:03',
      server: 'Whitelist City',
      level: 'ERROR',
      message: 'Resource police_mdw threw an exception',
      source: 'resource',
    },
    {
      time: '21:06:41',
      server: 'Dev / Testing',
      level: 'INFO',
      message: 'Scheduled restart completed successfully',
      source: 'scheduler',
    },
  ]

  const filters = ['All', 'Info', 'Warnings', 'Errors']

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">
            Server logs · Demo
          </h1>
          <p className="text-xs text-slate-400">
            Centralized log view across your GTA / FiveM servers. This demo
            shows example lines; a real city would stream live logs.
          </p>
        </div>
      </div>

      {/* FILTERS + STATUS */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400">Filter by level:</span>
          <div className="flex flex-wrap gap-1">
            {filters.map((f) => (
              <button
                key={f}
                className={
                  'rounded-full border px-2.5 py-1 text-[11px] ' +
                  (f === 'All'
                    ? 'border-cyan-400 bg-slate-900 text-cyan-300'
                    : 'border-slate-700 bg-slate-900/80 text-slate-300 hover:border-cyan-400/70 hover:text-cyan-200')
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[11px] text-slate-400">
          Demo mode · filters are not interactive yet
        </div>
      </div>

      {/* LOG TABLE */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
          <div>
            <p className="text-[11px] text-slate-400">Recent log lines</p>
            <p className="text-sm font-medium text-slate-50">
              Combined view from your city&apos;s servers
            </p>
          </div>
          <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
            Demo data
          </span>
        </div>

        <div className="mt-2 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-1 text-[11px] text-slate-300">
            <thead>
              <tr className="text-slate-400">
                <th className="text-left font-normal">Time</th>
                <th className="text-left font-normal">Server</th>
                <th className="text-left font-normal">Level</th>
                <th className="text-left font-normal">Message</th>
                <th className="text-left font-normal">Source</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td className="rounded-l-xl bg-slate-900/80 px-2 py-1.5 text-slate-400">
                    {log.time}
                  </td>
                  <td className="bg-slate-900/80 px-2 py-1.5">{log.server}</td>
                  <td className="bg-slate-900/80 px-2 py-1.5">
                    {log.level === 'ERROR' ? (
                      <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] text-rose-200">
                        ERROR
                      </span>
                    ) : log.level === 'WARN' ? (
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-200">
                        WARN
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-700/40 px-2 py-0.5 text-[10px] text-slate-200">
                        INFO
                      </span>
                    )}
                  </td>
                  <td className="bg-slate-900/80 px-2 py-1.5 text-slate-200">
                    {log.message}
                  </td>
                  <td className="rounded-r-xl bg-slate-900/80 px-2 py-1.5 text-slate-400">
                    {log.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-[10px] text-slate-500">
          In a full TorquePanel deployment, this view can stream logs from
          txAdmin / runtime logs, filter by server, and link straight into
          incidents and player profiles.
        </p>
      </div>
    </div>
  )
}

export default ServerLogsPage
