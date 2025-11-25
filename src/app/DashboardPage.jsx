function KpiCard({ label, value, sub }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
      <span className="text-2xl font-semibold text-slate-50">{value}</span>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-5 flex flex-col gap-3">
      <header>
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  )
}

function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">Servers / Main RP City</p>
          <h1 className="text-xl font-semibold text-slate-50">Overview</h1>
        </div>
        <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs">
          <option>Last 24 hours</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Uptime" value="99.8%" sub="Last 7 days" />
        <KpiCard label="Crashes" value="3" sub="↑ 2 vs last week" />
        <KpiCard label="Avg ping" value="42 ms" sub="Stable" />
        <KpiCard label="Players online" value="72" sub="Peak 132 today" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Panel title="Concurrency & sessions">
          <div className="h-32 flex items-center justify-center text-xs text-slate-400">
            Chart placeholder
          </div>
        </Panel>

        <Panel title="Alerts & incidents">
          <ul className="text-xs space-y-1 text-slate-300">
            <li>✅ No critical incidents in the last 24 hours</li>
            <li>⚠ Reports up 18% after Police v3.1 update</li>
          </ul>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Panel title="Player & community health">
          <ul className="text-xs text-slate-300 space-y-1">
            <li>Reports: 34 (↓ 10%)</li>
            <li>Warnings: 17</li>
            <li>Bans: 5</li>
            <li>Top reported: TTV_Nitro, NovaRP, DriftKing</li>
          </ul>
        </Panel>

        <Panel title="Resource impact">
          <ul className="text-xs text-slate-300 space-y-1">
            <li>veh_tuning – 32% CPU, 4 errors</li>
            <li>police_jobs – 18% CPU, 1 error</li>
            <li>inventory_ui – 12% CPU, 0 errors</li>
          </ul>
        </Panel>

        <Panel title="Monetization snapshot">
          <ul className="text-xs text-slate-300 space-y-1">
            <li>Last 7 days: $412</li>
            <li>Top package: VIP+ Priority Queue</li>
            <li>Donor retention: 68% (30 days)</li>
          </ul>
        </Panel>
      </div>
    </div>
  )
}

export default DashboardPage
