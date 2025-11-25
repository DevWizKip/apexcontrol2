// src/app/AppShell.jsx
// This component is the "frame" around the dashboard area.
// It shows the sidebar + top header, and renders child pages with <Outlet />.

import { NavLink, Outlet, Link } from 'react-router-dom'

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard' },
  { to: '/app/players', label: 'Players' },
  { to: '/app/moderation', label: 'Moderation' },
]

function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar on the left */}
      <aside className="hidden md:flex w-60 flex-col border-r border-slate-900 bg-slate-950/80">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-900">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-bold">
              A
            </span>
            <span className="font-semibold tracking-wide text-sm">
              ApexControl
            </span>
          </Link>
        </div>

        {/* Main navigation links */}
        <nav className="flex-1 px-2 py-4 space-y-1 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 rounded-md px-3 py-2',
                  isActive
                    ? 'bg-slate-900 text-cyan-400'
                    : 'text-slate-300 hover:bg-slate-900/60',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom area in sidebar (server name etc.) */}
        <div className="px-4 py-3 border-t border-slate-900 text-[11px] text-slate-400">
          <div className="font-semibold text-slate-200">Main RP City</div>
          <div>Server ID: main-rp-city</div>
        </div>
      </aside>

      {/* Right side: header + main content */}
      <div className="flex-1 flex flex-col">
        {/* Top header bar */}
        <header className="h-14 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 px-4">
          <div className="md:hidden flex items-center gap-2">
            {/* On mobile, just show a simple title for now */}
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-bold">
              A
            </span>
            <span className="font-semibold text-sm">ApexControl</span>
          </div>

          <div className="hidden md:block text-xs text-slate-400">
            {/* This text is only visual for now, not functional */}
            Connected as demo admin · Main RP City
          </div>

          {/* Fake user menu area */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-300">demo@apexcontrol.local</span>
            <button className="rounded-full w-7 h-7 bg-slate-800 text-[11px]">
              AC
            </button>
          </div>
        </header>

        {/* Main content area where child pages are rendered */}
        <main className="flex-1 p-4 md:p-6">
          {/* Outlet = where nested routes (dashboard, players, etc.) appear */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppShell
