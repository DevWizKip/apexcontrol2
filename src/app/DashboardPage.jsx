// src/app/DashboardPage.jsx
// Demo dashboard shown when clicking "View live demo".
// All data here is sample data to showcase what TorquePanel can do.

import { useNavigate } from 'react-router-dom'

function DashboardPage() {
  const navigate = useNavigate()

  const kpis = [
    {
      label: 'Players online',
      value: '128',
      sub: 'Peak 212 · Queued 14',
      accent: 'text-emerald-300',
    },
    {
      label: 'Server health',
      value: 'Stable',
      sub: '0 crashes · 12h since restart',
      accent: 'text-cyan-300',
    },
    {
      label: 'Active staff',
      value: '7',
      sub: '2 owners · 3 mods · 2 helpers',
      accent: 'text-sky-300',
    },
    {
      label: 'Open reports',
      value: '19',
      sub: '3 high · 6 medium · 10 low',
      accent: 'text-amber-300',
    },
  ]

  const servers = [
    {
      name: 'Main RP City',
      id: 'main-rp',
      status: 'Online',
      players: '96 / 128',
      ping: '34 ms',
      incidents: '2 minor',
    },
    {
      name: 'Whitelist City',
      id: 'wl-city',
      status: 'Online',
      players: '42 / 96',
      ping: '41 ms',
      incidents: '1 high',
    },
    {
      name: 'Racing / Drift',
      id: 'race',
      status: 'Online',
      players: '18 / 64',
      ping: '28 ms',
      incidents: 'Clean',
    },
    {
      name: 'Dev / Testing',
      id: 'dev',
      status: 'Locked',
      players: '2 / 16',
      ping: '52 ms',
      incidents: 'Whitelisted',
    },
  ]

  const staff = [
    { name: 'Nova', role: 'Owner', actions: 18, status: 'Online' },
    { name: 'Pixel', role: 'Head admin', actions: 32, status: 'Online' },
    { name: 'Karma', role: 'Moderator', actions: 27, status: 'Online' },
    { name: 'Ash', role: 'Helper', actions: 9, status: 'Offline' },
  ]

  const packages = [
    { name: 'Priority queue', buyers: 124, trend: '+12% this month' },
    { name: 'VIP whitelist', buyers: 58, trend: '+7% this month' },
    { name: 'Supporter bundle', buyers: 43, trend: '+3% this month' },
  ]

  const incidents = [
    {
      id: '#4821',
      player: 'TTV_Nitro',
      type: 'VDM · Legion Square',
      severity: 'High',
      status: 'Needs review',
      ago: '4 min ago',
    },
    {
      id: '#4817',
      player: 'NovaRP',
      type: 'OOC in PD holding',
      severity: 'Medium',
      status: 'Staff investigating',
      ago: '18 min ago',
    },
    {
      id: '#4811',
      player: 'DriftKing',
      type: 'Street race · Vinewood',
      severity: 'Low',
      status: 'Logged',
      ago: '29 min ago',
    },
  ]

  return (
    <div className="space-y-4">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">
            Main RP City · Live demo
          </h1>
          <p className="text-xs text-slate-400">
            This is a sample TorquePanel dashboard view for a GTA / FiveM city.
            Data shown here is demo-only, but reflects what a real server sees.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => navigate('/app/server-logs')}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
          >
            View server logs
          </button>
          <button
            onClick={() => navigate('/app/players')}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 hover:border-emerald-400 hover:text-emerald-300"
          >
            Open player browser
          </button>
          <button
            className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-500 cursor-not-allowed"
            title="Disabled in demo"
          >
            Restart server (demo)
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-3 md:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-xs text-slate-300 shadow-sm shadow-black/40 transition-transform duration-150 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:shadow-cyan-500/20"
          >
            <p className="text-[11px] text-slate-400">{kpi.label}</p>
            <p className={`mt-1 text-lg font-semibold ${kpi.accent}`}>
              {kpi.value}
            </p>
            <p className="mt-1 text-[11px] text-slate-400">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* MID GRID: CONCURRENCY + INCIDENTS */}
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
        {/* Fake concurrency graph */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
            <div>
              <p className="text-[11px] text-slate-400">
                Concurrency · last 12 hours
              </p>
              <p className="text-sm font-medium text-slate-50">
                Evening peak looks healthy
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-300">
              Demo data
            </span>
          </div>
          {/* styled placeholder graph */}
          <div className="mt-2 h-32 rounded-xl bg-slate-900">
            <div className="h-full w-full rounded-xl bg-[linear-gradient(to_top,_rgba(148,163,184,0.18)_1px,_transparent_1px),linear-gradient(to_right,_rgba(148,163,184,0.12)_1px,_transparent_1px)] bg-[length:100%_24px,24px_100%]">
              <div className="h-full w-full rounded-xl bg-gradient-to-tr from-cyan-500/20 via-fuchsia-500/15 to-emerald-500/20" />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Queue spike around 20:00 · Peak 212 players</span>
            <span>Timezone: UTC</span>
          </div>
        </div>

        {/* Incidents / alerts */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
            <div>
              <p className="text-[11px] text-slate-400">Live incidents</p>
              <p className="text-sm font-medium text-slate-50">
                Items needing staff attention
              </p>
            </div>
            <button
              onClick={() => navigate('/app/moderation')}
              className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
            >
              Open moderation
            </button>
          </div>
          <ul className="mt-2 space-y-2 text-xs text-slate-300">
            {incidents.map((incident) => (
              <li
                key={incident.id}
                className="flex items-start justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 hover:border-amber-400/60 hover:bg-slate-900"
              >
                <div>
                  <p className="text-[11px] text-slate-500">{incident.id}</p>
                  <p className="text-xs font-medium text-slate-50">
                    {incident.player}{' '}
                    <span className="text-slate-400">· {incident.type}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">{incident.ago}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={
                      'rounded-full px-2 py-0.5 text-[10px] ' +
                      (incident.severity === 'High'
                        ? 'bg-amber-500/20 text-amber-300'
                        : incident.severity === 'Medium'
                        ? 'bg-sky-500/20 text-sky-200'
                        : 'bg-emerald-500/20 text-emerald-200')
                    }
                  >
                    {incident.severity}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {incident.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* LOWER GRID: SERVERS, STAFF, MONETIZATION */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
        {/* Multi-server status table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
            <div>
              <p className="text-[11px] text-slate-400">Servers</p>
              <p className="text-sm font-medium text-slate-50">
                Multi-shard city overview
              </p>
            </div>
            <span className="text-[11px] text-slate-500">
              4 servers · demo data
            </span>
          </div>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-1 text-[11px] text-slate-300">
              <thead>
                <tr className="text-slate-400">
                  <th className="text-left font-normal">Name</th>
                  <th className="text-left font-normal">Status</th>
                  <th className="text-left font-normal">Players</th>
                  <th className="text-left font-normal">Ping</th>
                  <th className="text-left font-normal">Incidents</th>
                </tr>
              </thead>
              <tbody>
                {servers.map((server) => (
                  <tr key={server.id}>
                    <td className="rounded-l-xl bg-slate-900/80 px-2 py-1.5">
                      <div className="flex flex-col">
                        <span className="text-slate-50">{server.name}</span>
                        <span className="text-[10px] text-slate-500">
                          ID: {server.id}
                        </span>
                      </div>
                    </td>
                    <td className="bg-slate-900/80 px-2 py-1.5">
                      {server.status === 'Online' ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Online
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/40 px-2 py-0.5 text-[10px] text-slate-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          Locked
                        </span>
                      )}
                    </td>
                    <td className="bg-slate-900/80 px-2 py-1.5">
                      {server.players}
                    </td>
                    <td className="bg-slate-900/80 px-2 py-1.5">
                      {server.ping}
                    </td>
                    <td className="rounded-r-xl bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-300">
                      {server.incidents}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: staff + monetization */}
        <div className="space-y-4">
          {/* Staff snapshot */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
              <div>
                <p className="text-[11px] text-slate-400">Staff snapshot</p>
                <p className="text-sm font-medium text-slate-50">
                  Who&apos;s carrying the city tonight
                </p>
              </div>
              <span className="text-[11px] text-slate-500">
                Demo staff lineup
              </span>
            </div>
            <ul className="mt-2 space-y-2 text-xs text-slate-300">
              {staff.map((mod) => (
                <li
                  key={mod.name}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-slate-50">{mod.name}</p>
                    <p className="text-[11px] text-slate-400">{mod.role}</p>
                  </div>
                  <div className="text-right text-[11px]">
                    <p className="text-slate-400">{mod.actions} actions</p>
                    <p
                      className={
                        'mt-0.5 ' +
                        (mod.status === 'Online'
                          ? 'text-emerald-300'
                          : 'text-slate-500')
                      }
                    >
                      {mod.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Monetization snapshot */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
              <div>
                <p className="text-[11px] text-slate-400">
                  Monetization snapshot
                </p>
                <p className="text-sm font-medium text-slate-50">
                  Example donor activity
                </p>
              </div>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
                Demo only
              </span>
            </div>
            <ul className="mt-2 space-y-2 text-xs text-slate-300">
              {packages.map((p) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-slate-50">{p.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {p.buyers} active buyers
                    </p>
                  </div>
                  <p className="text-[11px] text-emerald-300">{p.trend}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[10px] text-slate-500">
              In a real city, this can connect to your existing store / Tebex /
              Patreon stack to show trends, not raw payment details.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
