// src/app/AppShell.jsx
// Layout wrapper for the logged-in app area (dashboard, players, etc.)

import { NavLink, Outlet } from 'react-router-dom'

function AppShell() {
  const navItems = [
    { to: '/app/dashboard', label: 'Dashboard' },
    { to: '/app/players', label: 'Players' },
    { to: '/app/moderation', label: 'Moderation' },
    { to: '/app/server-logs', label: 'Server logs' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl gap-4 px-4 py-6 sm:px-6 lg:px-8">
        {/* SIDEBAR */}
        <aside className="w-44 shrink-0">
          <div className="mb-4">
            <p className="text-xs font-semibold tracking-wide text-slate-200">
              TorquePanel
            </p>
            <p className="text-[11px] text-slate-500">
              GTA / FiveM server tools
            </p>
          </div>
          <nav className="space-y-1 text-xs">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'flex items-center justify-between rounded-lg px-3 py-1.5 transition-colors',
                    isActive
                      ? 'bg-slate-900 text-cyan-300 border border-cyan-500/50'
                      : 'text-slate-300 hover:bg-slate-900/60 hover:text-cyan-200 border border-transparent',
                  ].join(' ')
                }
              >
                <span>{item.label}</span>
                {/* small indicator dot */}
                <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
      <main className="flex-1">
  <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
    <Outlet />
  </div>
</main>
      </div>
    </div>
  )
}

export default AppShell
