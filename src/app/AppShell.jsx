// src/app/AppShell.jsx
import { NavLink, Outlet } from 'react-router-dom'

function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-slate-800 flex-col">
        <div className="h-16 flex items-center px-4 border-b border-slate-800 gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-bold">
            A
          </span>
          <span className="font-semibold text-sm">ApexControl</span>
        </div>

        <nav className="flex-1 px-3 py-4 text-sm space-y-1">
          <NavLink
            to="/app/dashboard"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${
                isActive ? 'bg-slate-800 text-cyan-300' : 'text-slate-300'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/app/players"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${
                isActive ? 'bg-slate-800 text-cyan-300' : 'text-slate-300'
              }`
            }
          >
            Players
          </NavLink>

          <NavLink
            to="/app/moderation"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${
                isActive ? 'bg-slate-800 text-cyan-300' : 'text-slate-300'
              }`
            }
          >
            Moderation
          </NavLink>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-400">Server:</span>
            <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs">
              <option>Main RP City</option>
              <option>Drift Server</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button className="relative">
              🔔
              {/* later you can add a notification dot here */}
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-slate-700" />
              <span>Alex</span>
            </div>
          </div>
        </header>

        {/* Page content (changes with route) */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppShell
