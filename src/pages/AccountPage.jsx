// src/pages/AccountPage.jsx
import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { servers } from '../data/serverData'

function AccountPage() {
  const { user, isLoggedIn, login, logout } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('owner') // owner | staff | dev

  function handleCreateAccount(e) {
    e.preventDefault()
    if (!name.trim()) return
    login({ name, email, role })
  }

  return (
    <div className="gta-page">
      <main className="mx-auto max-w-5xl space-y-8 px-4 py-10 text-[11px] text-slate-300">
        <button
          onClick={() => (window.location.href = '/')}
          className="mb-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
        >
          ← Back to home
        </button>

        {/* HEADER */}
        <header className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400">
            Account
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">
            Manage your TorquePanel account for your GTA city.
          </h1>
          <p className="text-xs text-slate-400">
            This demo keeps your account locally in your browser using
            localStorage. In a real deployment, this would be backed by a
            database and real authentication.
          </p>
        </header>

        {/* NOT LOGGED IN STATE */}
        {!isLoggedIn && (
          <section className="gta-card grid gap-6 p-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <form
              onSubmit={handleCreateAccount}
              className="space-y-3 text-[11px]"
            >
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Create local account
              </p>
              <p className="text-slate-400">
                This does not talk to any real server – it just sets a local
                account so you can see how TorquePanel would behave with owners,
                staff and devs.
              </p>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wide text-slate-400">
                  Display name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
                  placeholder="NovaRP, CityOwner, etc."
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wide text-slate-400">
                  Email (optional)
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
                  placeholder="you@cityrp.gg"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wide text-slate-400">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
                >
                  <option value="owner">Server owner</option>
                  <option value="staff">Staff / head admin</option>
                  <option value="dev">Dev / scripter</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-4 py-1.5 text-[11px] font-medium text-slate-950 shadow-lg shadow-cyan-500/30 hover:brightness-110"
              >
                Create local account
              </button>
            </form>

            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                What this demo account does
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>
                    Stores your name, email and role in your browser only,
                    using localStorage.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Lets the panel show different views for owners, staff and
                    devs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>
                    Easy to swap later for real authentication (Discord, email,
                    etc.).
                  </span>
                </li>
              </ul>
            </div>
          </section>
        )}

        {/* LOGGED IN STATE */}
        {isLoggedIn && (
          <section className="space-y-6">
            <div className="gta-card grid gap-4 p-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-wide text-emerald-400">
                  Signed in
                </p>
                <h2 className="text-sm font-semibold text-slate-50">
                  Welcome back, {user.name}.
                </h2>
                <p className="text-[11px] text-slate-400">
                  You are currently acting as{' '}
                  <span className="font-semibold text-cyan-300">
                    {user.role === 'owner'
                      ? 'Server owner'
                      : user.role === 'staff'
                      ? 'Staff / head admin'
                      : 'Dev / scripter'}
                  </span>{' '}
                  for this TorquePanel demo.
                </p>

                <div className="mt-2 grid gap-3 text-[11px] text-slate-300 sm:grid-cols-3">
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Role
                    </p>
                    <p className="text-sm font-semibold text-slate-50">
                      {user.role === 'owner'
                        ? 'Server owner'
                        : user.role === 'staff'
                        ? 'Staff / head admin'
                        : 'Dev / scripter'}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Email
                    </p>
                    <p className="text-xs text-slate-200">
                      {user.email || 'Not set'}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Local account since
                    </p>
                    <p className="text-xs text-slate-200">
                      {new Date(user.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="mt-3 rounded-full border border-rose-500/60 bg-rose-500/10 px-4 py-1.5 text-[11px] font-medium text-rose-200 hover:bg-rose-500/20"
                >
                  Log out of this demo account
                </button>
              </div>

              <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">
                  Servers you are managing
                </p>
                <ul className="space-y-1.5">
                  {servers.map((server) => (
                    <li
                      key={server.id}
                      className="flex items-center justify-between rounded-lg bg-slate-900/80 px-2 py-1.5"
                    >
                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-100">
                          {server.name}
                        </span>
                        <span className="text-[9px] text-slate-500">
                          {server.ip} · {server.tags.join(', ')}
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
                <p className="text-[9px] text-slate-500">
                  In a real deployment, this list would come from your backend
                  and match your actual FiveM / GTA servers and staff access.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default AccountPage
