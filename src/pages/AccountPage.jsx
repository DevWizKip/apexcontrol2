// src/pages/AccountPage.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const API_BASE = 'http://localhost:3001'

function AccountPage() {
  const { user, isLoggedIn, token, logout } = useAuth()
  const navigate = useNavigate()
  const [servers, setServers] = useState([])
  const [loadingServers, setLoadingServers] = useState(false)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isLoggedIn) return

    async function fetchServers() {
      try {
        setLoadingServers(true)
        const res = await fetch(`${API_BASE}/api/servers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Failed to load servers')
        }
        setServers(data)
      } catch (err) {
        console.error('Error loading servers', err)
        setError(err.message || 'Could not load servers')
      } finally {
        setLoadingServers(false)
      }
    }

    fetchServers()
  }, [isLoggedIn, token])

  async function handleCreateServer() {
    try {
      setCreating(true)
      setError(null)
      const res = await fetch(`${API_BASE}/api/servers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planId: 'starter', billing: 'monthly' }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create server')
      }
      setServers((prev) => [...prev, data])
    } catch (err) {
      console.error('Create server failed', err)
      setError(err.message || 'Could not create server')
    } finally {
      setCreating(false)
    }
  }

  const totalServers = servers.length
  const monthlyServers = servers.filter((s) => s.billing === 'monthly').length
  const yearlyServers = servers.filter((s) => s.billing === 'yearly').length

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gta bg-cover bg-fixed bg-center bg-no-repeat">
        <main className="flex min-h-screen items-center justify-center bg-slate-950/80 px-4 py-10 text-slate-50 backdrop-blur">
          <div className="gta-card w-full max-w-md p-6 text-center">
            <h1 className="text-xl font-semibold tracking-tight text-slate-50">
              Account &amp; servers
            </h1>
            <p className="mt-2 text-[11px] text-slate-400">
              You need to be logged in to view your servers.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-[11px]">
              <button
                onClick={() => navigate('/login')}
                className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-4 py-1.5 font-medium text-slate-950 hover:brightness-110"
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="w-full rounded-full border border-slate-700 bg-slate-950 px-4 py-1.5 text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
              >
                Create an account
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full rounded-full border border-slate-700 bg-slate-950 px-4 py-1.5 text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
              >
                Back to homepage
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gta bg-cover bg-fixed bg-center bg-no-repeat">
      <main className="min-h-screen bg-slate-950/80 px-4 pb-12 pt-20 text-slate-50 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          {/* HEADER */}
          <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">
                Account
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
                {user?.name || 'Your TorquePanel account'}
              </h1>
              <p className="text-[11px] text-slate-400">{user?.email}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate('/')}
                className="h-8 rounded-full border border-slate-700 bg-slate-950 px-3 text-[11px] text-slate-300 hover:border-cyan-400 hover:text-cyan-300"
              >
                Back to homepage
              </button>
              <button
                onClick={logout}
                className="h-8 rounded-full border border-slate-700 bg-slate-950 px-3 text-[11px] text-slate-300 hover:border-rose-400 hover:text-rose-300"
              >
                Log out
              </button>
            </div>
          </header>

          {/* STATS ROW */}
          <section className="grid gap-3 md:grid-cols-3 text-[11px]">
            <div className="gta-card flex flex-col justify-between p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Total servers
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-50">
                {totalServers}
              </p>
              <p className="mt-1 text-[10px] text-slate-400">
                All servers owned by this account.
              </p>
            </div>
            <div className="gta-card flex flex-col justify-between p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Monthly plans
              </p>
              <p className="mt-1 text-xl font-semibold text-cyan-300">
                {monthlyServers}
              </p>
              <p className="mt-1 text-[10px] text-slate-400">
                Servers billed on a monthly basis.
              </p>
            </div>
            <div className="gta-card flex flex-col justify-between p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Yearly plans
              </p>
              <p className="mt-1 text-xl font-semibold text-emerald-300">
                {yearlyServers}
              </p>
              <p className="mt-1 text-[10px] text-slate-400">
                Servers that use the yearly discount.
              </p>
            </div>
          </section>

          {/* MAIN CONTENT */}
          <section className="grid gap-4 md:grid-cols-3">
            {/* LEFT: servers list */}
            <div className="gta-card p-4 text-[11px] text-slate-300 md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Your GTA / FiveM servers
              </p>

              {error && <p className="mt-2 text-rose-400">{error}</p>}

              {loadingServers ? (
                <p className="mt-3 text-slate-400">Loading servers...</p>
              ) : servers.length === 0 ? (
                <p className="mt-3 text-slate-400">
                  No servers yet. After you complete a plan purchase, your
                  server will appear here. For now you can create a demo entry
                  with the button below.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {servers.map((srv) => (
                    <li
                      key={srv.id}
                      className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2"
                    >
                      <div>
                        <p className="text-[11px] font-medium text-slate-50">
                          {srv.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Status: {srv.status} · Plan: {srv.planId} ·{' '}
                          {srv.billing}
                        </p>
                        <button
                          onClick={() =>
                            navigate(`/servers/${srv.id}/edit`)
                          }
                          className="mt-1 rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-[10px] text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
                        >
                          Edit server code
                        </button>
                      </div>
                      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                        {srv.ip || 'pending'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={handleCreateServer}
                disabled={creating}
                className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-4 py-1.5 text-[11px] font-medium text-slate-950 hover:brightness-110 disabled:opacity-60"
              >
                {creating ? 'Creating demo server...' : 'Create demo server entry'}
              </button>
            </div>

            {/* RIGHT: extra info + quick actions */}
            <div className="space-y-3 text-[11px] text-slate-300">
              <div className="gta-card p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Quick actions
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    onClick={() => navigate('/pricing')}
                    className="w-full rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-left text-[11px] text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
                  >
                    View pricing &amp; upgrade
                  </button>
                  <button
                    onClick={() => navigate('/app/dashboard')}
                    className="w-full rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-left text-[11px] text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Go to in-panel dashboard
                  </button>
                </div>
              </div>

              <div className="gta-card p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Security
                </p>
                <p className="mt-2 text-slate-400">
                  Only you can access the servers attached to this account. Keep
                  your email + password safe and don&apos;t share them with
                  anyone.
                </p>
                <p className="mt-2 text-slate-400">
                  Later we can add staff accounts and permissions (for example:
                  devs that can restart the server but can&apos;t change
                  billing).
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default AccountPage
