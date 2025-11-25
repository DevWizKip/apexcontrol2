// src/app/DashboardPage.jsx
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import {
  servers,
  dashboardSnapshot,
  playerOverview,
  moderationEvents,
  serverLogs,
} from '../data/serverData'

function DashboardPage() {
  const navigate = useNavigate()
  const [showPreview, setShowPreview] = useState(false)

  const activeServer = useMemo(() => {
    return (
      servers.find((s) => s.id === dashboardSnapshot.activeServerId) ||
      servers[0]
    )
  }, [])

  const recentModeration = moderationEvents.slice(0, 3)
  const recentLogs = serverLogs.slice(0, 3)

  const serverLoadData = servers.map((s) => ({
    name: s.name.replace('Los Santos RP · ', '').slice(0, 14),
    players: s.currentPlayers,
    max: s.maxPlayers,
  }))

  return (
    <div className="gta-page min-h-[calc(100vh-3rem)]">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 text-[11px] text-slate-300">
        {/* Back to marketing homepage */}
        <button
          onClick={() => (window.location.href = '/')}
          className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
        >
          ← Back to home
        </button>

        {/* HEADER */}
        <header className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
              City control
            </p>
            <h1 className="text-lg font-semibold text-slate-50 md:text-xl">
              Dashboard · {activeServer?.name || 'Your GTA server'}
            </h1>
            <p className="max-w-xl text-[11px] text-slate-400">
              At-a-glance view of players online, staff load, open moderation
              tickets and server health. Designed for busy GTA / FiveM city
              owners and staff leads.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
              {dashboardSnapshot.totalServers} servers connected
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">
              {dashboardSnapshot.totalPlayersOnline} players online
            </span>
          </div>
        </header>

        {/* TOP STATS */}
        <section className="grid gap-3 md:grid-cols-3">
          <div className="gta-card hover:shadow-cyan-500/30 p-4 transition hover:-translate-y-0.5">
            <p className="text-[10px] uppercase tracking-wide text-cyan-400">
              Players online
            </p>
            <p className="mt-1 text-2xl font-semibold text-cyan-400">
              {dashboardSnapshot.totalPlayersOnline}
            </p>
            <p className="mt-1 text-[10px] text-slate-400">
              Peak last 24h:&nbsp;
              <span className="text-slate-200">
                {playerOverview.peakOnlineLast24h}
              </span>
            </p>
            <ul className="mt-2 space-y-1 text-[10px] text-slate-400">
              <li>
                Total players in city history:{' '}
                <span className="text-slate-200">
                  {playerOverview.totalPlayersSeen.toLocaleString()}
                </span>
              </li>
              <li>
                Active in last 30 days:{' '}
                <span className="text-slate-200">
                  {playerOverview.activeLast30d.toLocaleString()}
                </span>
              </li>
              <li>
                New this month:{' '}
                <span className="text-slate-200">
                  {playerOverview.newLast30d.toLocaleString()}
                </span>
              </li>
            </ul>
          </div>

          <div className="gta-card hover:shadow-amber-500/30 p-4 transition hover:-translate-y-0.5">
            <p className="text-[10px] uppercase tracking-wide text-amber-400">
              Moderation load
            </p>
            <p className="mt-1 text-2xl font-semibold text-amber-300">
              {dashboardSnapshot.openModerationTickets}
            </p>
            <p className="mt-1 text-[10px] text-slate-400">
              Open moderation tickets right now.
            </p>
            <p className="mt-2 text-[10px] text-slate-400">
              Open reports against players:{' '}
              <span className="text-slate-200">
                {dashboardSnapshot.openReportsAgainstPlayers}
              </span>
            </p>
            <p className="mt-1 text-[9px] text-slate-500">
              Keep this below 5 during peak hours to avoid chaos in city RP.
            </p>
          </div>

          <div className="gta-card hover:shadow-emerald-500/30 p-4 transition hover:-translate-y-0.5">
            <p className="text-[10px] uppercase tracking-wide text-emerald-400">
              Active server health
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-50">
              {activeServer?.name}
            </p>
            {activeServer && (
              <>
                <p className="mt-2 text-[10px] text-slate-400">
                  {activeServer.currentPlayers}/{activeServer.maxPlayers}{' '}
                  players · Queue{' '}
                  <span className="text-slate-200">
                    {activeServer.queue}
                  </span>
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  CPU:{' '}
                  <span className="text-slate-200">
                    {activeServer.cpuUsage}%
                  </span>{' '}
                  · RAM:{' '}
                  <span className="text-slate-200">
                    {activeServer.ramUsageGb} GB
                  </span>
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Net out:{' '}
                  <span className="text-slate-200">
                    {activeServer.netOutMbps} Mbps
                  </span>{' '}
                  · Ping:{' '}
                  <span className="text-slate-200">
                    {activeServer.averagePing} ms
                  </span>
                </p>
                <p className="mt-2 text-[9px] text-slate-500">
                  Tags:{' '}
                  <span className="text-slate-300">
                    {activeServer.tags.join(', ')}
                  </span>
                </p>
              </>
            )}
            <button
              onClick={() => setShowPreview(true)}
              className="mt-3 rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[10px] text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
            >
              Open live-style preview
            </button>
          </div>
        </section>

        {/* SERVER LOAD CHART + SHORTCUTS */}
        <section className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]">
          {/* Chart + shortcuts */}
          <div className="gta-card flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-cyan-400">
                  Live server load
                </p>
                <h2 className="text-sm font-semibold text-slate-50">
                  Players per GTA server right now
                </h2>
              </div>
            </div>

            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serverLoadData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1f2937"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
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
                  <Bar dataKey="players" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-[9px] text-slate-500">
              Use this view during events or whitelists to see which GTA
              servers are filling up and where to open extra shards.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => navigate('/app/players')}
                className="gta-card flex flex-col items-start justify-between gap-1 rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-cyan-500/30"
              >
                <p className="text-[10px] uppercase tracking-wide text-cyan-400">
                  Player browser
                </p>
                <p className="text-[11px] text-slate-100">
                  Search, filter and open player profiles.
                </p>
                <span className="mt-1 text-[10px] text-slate-500">
                  View online &amp; recent players
                </span>
              </button>

              <button
                onClick={() => navigate('/app/moderation')}
                className="gta-card flex flex-col items-start justify-between gap-1 rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-left transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-amber-500/30"
              >
                <p className="text-[10px] uppercase tracking-wide text-amber-400">
                  Moderation queue
                </p>
                <p className="text-[11px] text-slate-100">
                  Process warnings, kicks and bans.
                </p>
                <span className="mt-1 text-[10px] text-slate-500">
                  Keep reports under control
                </span>
              </button>

              <button
                onClick={() => navigate('/app/server-logs')}
                className="gta-card flex flex-col items-start justify-between gap-1 rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-left transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-sky-500/30"
              >
                <p className="text-[10px] uppercase tracking-wide text-sky-400">
                  Server logs
                </p>
                <p className="text-[11px] text-slate-100">
                  Watch errors, warnings and AC flags.
                </p>
                <span className="mt-1 text-[10px] text-slate-500">
                  Track script crashes and anticheat
                </span>
              </button>
            </div>
          </div>

          {/* Other servers list */}
          <div className="gta-card p-4">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Connected GTA / FiveM servers
            </p>
            <ul className="mt-2 space-y-2 text-[10px]">
              {servers.map((server) => (
                <li
                  key={server.id}
                  className="flex items-center justify-between rounded-lg bg-slate-900/80 px-3 py-2"
                >
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-100">
                      {server.name}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      {server.ip} · {server.currentPlayers}/
                      {server.maxPlayers} players · queue {server.queue}
                    </span>
                  </div>
                  <span
                    className={
                      'rounded-full px-2 py-0.5 text-[9px] ' +
                      (server.status === 'online'
                        ? 'bg-emerald-500/10 text-emerald-300'
                        : server.status === 'restarting'
                        ? 'bg-amber-500/10 text-amber-300'
                        : 'bg-rose-500/10 text-rose-300')
                    }
                  >
                    {server.status === 'online'
                      ? 'Online'
                      : server.status === 'restarting'
                      ? 'Restarting'
                      : 'Offline'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* BOTTOM: RECENT ACTIVITY */}
        <section className="grid gap-3 md:grid-cols-2">
          <div className="gta-card p-4">
            <p className="text-[10px] uppercase tracking-wide text-amber-400">
              Recent moderation
            </p>
            <ul className="mt-2 space-y-1.5 text-[10px]">
              {recentModeration.map((m) => (
                <li
                  key={m.id}
                  className="flex items-start gap-2 rounded-lg bg-slate-900/80 px-3 py-2"
                >
                  <span
                    className={
                      'mt-[3px] h-1.5 w-1.5 rounded-full ' +
                      (m.type === 'ban'
                        ? 'bg-rose-400'
                        : m.type === 'kick'
                        ? 'bg-amber-400'
                        : m.type === 'warning'
                        ? 'bg-emerald-400'
                        : 'bg-sky-400')
                    }
                  />
                  <div>
                    <p className="text-slate-100">
                      {m.type.toUpperCase()} · {m.playerName}
                    </p>
                    <p className="text-[9px] text-slate-400">
                      {m.reason}
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Staff: {m.staffName} · Status:{' '}
                      <span className="capitalize">{m.status}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[9px] text-slate-500">
              View all moderation actions in the Moderation tab.
            </p>
          </div>

          <div className="gta-card p-4">
            <p className="text-[10px] uppercase tracking-wide text-sky-400">
              Recent server logs
            </p>
            <ul className="mt-2 space-y-1.5 text-[10px]">
              {recentLogs.map((log) => (
                <li
                  key={log.id}
                  className="flex items-start gap-2 rounded-lg bg-slate-900/80 px-3 py-2"
                >
                  <span
                    className={
                      'mt-[3px] h-1.5 w-1.5 rounded-full ' +
                      (log.level === 'error'
                        ? 'bg-rose-400'
                        : log.level === 'warn'
                        ? 'bg-amber-400'
                        : 'bg-slate-400')
                    }
                  />
                  <div>
                    <p className="text-[9px] text-slate-500">
                      {new Date(log.timestamp).toLocaleString()} ·{' '}
                      <span className="text-slate-300">
                        {log.source}
                      </span>
                    </p>
                    <p className="text-slate-100">{log.message}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[9px] text-slate-500">
              Use the Server Logs tab for full filtering and deep dives.
            </p>
          </div>
        </section>
      </div>

      {/* LIVE PREVIEW POPUP */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="gta-card relative w-full max-w-lg overflow-hidden border-cyan-500/60 bg-slate-950/95 p-4">
            <button
              className="absolute right-3 top-3 text-[11px] text-slate-400 hover:text-slate-100"
              onClick={() => setShowPreview(false)}
            >
              ✕
            </button>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
              Live-style preview
            </p>
            <h2 className="mt-1 text-sm font-semibold text-slate-50">
              How TorquePanel would look docked next to your GTA monitor
            </h2>
            <p className="mt-2 text-[11px] text-slate-400">
              This mockup shows how key tiles sit together while you are
              spectating, handling tickets or watching staff cams.
            </p>

            <div className="mt-3 grid gap-3 text-[10px] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
              <div className="rounded-xl bg-slate-900/80 p-3">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">
                  City snapshot
                </p>
                <p className="mt-1 text-[11px] text-slate-100">
                  {activeServer?.name}
                </p>
                <p className="mt-1 text-[9px] text-slate-400">
                  {activeServer?.currentPlayers}/{activeServer?.maxPlayers}{' '}
                  players · queue {activeServer?.queue}
                </p>
                <p className="mt-1 text-[9px] text-slate-400">
                  CPU {activeServer?.cpuUsage}% · RAM{' '}
                  {activeServer?.ramUsageGb} GB
                </p>
                <p className="mt-1 text-[9px] text-slate-400">
                  Ping {activeServer?.averagePing} ms
                </p>
              </div>

              <div className="rounded-xl bg-slate-900/80 p-3">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">
                  Current noise
                </p>
                <ul className="mt-1 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="text-[10px] text-slate-200">
                      {dashboardSnapshot.openModerationTickets} moderation
                      tickets open (aim for &lt;3 during peak).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span className="text-[10px] text-slate-200">
                      {recentLogs.length} notable script / anticheat log
                      entries in the last few minutes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-slate-200">
                      {playerOverview.activeLast30d.toLocaleString()} players
                      active this month – your city is alive.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-3 text-[9px] text-slate-500">
              In a real deployment, this view would refresh in real time as your
              GTA / FiveM city runs.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
