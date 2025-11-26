// src/app/AppShell.jsx
import { NavLink, Outlet } from 'react-router-dom'

function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-52 border-r border-slate-800 bg-slate-950/95 px-3 py-4 text-[11px]">
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              TorquePanel
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              In-panel dashboard
            </p>
          </div>

          <nav className="space-y-1">
            <NavLink
              to="/app/dashboard"
              className={({ isActive }) =>
                'block rounded px-2 py-1 ' +
                (isActive
                  ? 'bg-slate-800 text-cyan-300'
                  : 'text-slate-300 hover:bg-slate-900')
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/app/players"
              className={({ isActive }) =>
                'block rounded px-2 py-1 ' +
                (isActive
                  ? 'bg-slate-800 text-cyan-300'
                  : 'text-slate-300 hover:bg-slate-900')
              }
            >
              Players
            </NavLink>
            <NavLink
              to="/app/moderation"
              className={({ isActive }) =>
                'block rounded px-2 py-1 ' +
                (isActive
                  ? 'bg-slate-800 text-cyan-300'
                  : 'text-slate-300 hover:bg-slate-900')
              }
            >
              Moderation
            </NavLink>
            {/* Logs link removed */}
          </nav>
        </aside>

        {/* Main content area where child pages render */}
        <main className="flex-1 bg-slate-950/90 px-4 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppShell
