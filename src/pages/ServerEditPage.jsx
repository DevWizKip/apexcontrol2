// src/pages/ServerEditPage.jsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const API_BASE = 'http://localhost:3001'

function ServerEditPage() {
  const { serverId } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn, token } = useAuth()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [server, setServer] = useState(null)
  const [code, setCode] = useState('')

  useEffect(() => {
    if (!isLoggedIn || !token) {
      setError('You need to be logged in to edit this server.')
      setLoading(false)
      return
    }

    async function fetchServer() {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE}/api/servers/${serverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Failed to load server')
        }
        setServer(data)
        setCode(data.code || '')
        setError(null)
      } catch (err) {
        console.error('Error loading server', err)
        setError(err.message || 'Could not load server')
      } finally {
        setLoading(false)
      }
    }

    fetchServer()
  }, [serverId, isLoggedIn, token])

  async function handleSave() {
    if (!server) return
    try {
      setSaving(true)
      setError(null)
      const res = await fetch(`${API_BASE}/api/servers/${serverId}/code`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save code')
      }
      setServer(data)
      alert('Server code saved!')
    } catch (err) {
      console.error('Save code error', err)
      setError(err.message || 'Could not save code')
    } finally {
      setSaving(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gta bg-cover bg-fixed bg-center bg-no-repeat">
        <main className="flex min-h-screen items-center justify-center bg-slate-950/80 px-4 py-10 text-slate-50 backdrop-blur">
          <div className="gta-card w-full max-w-md p-6 text-center">
            <h1 className="text-xl font-semibold tracking-tight text-slate-50">
              Edit server code
            </h1>
            <p className="mt-2 text-[11px] text-slate-400">
              You need to be logged in to edit a server.
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
          <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">
                Edit server code
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
                {server?.name || 'Loading server...'}
              </h1>
              {server && (
                <p className="text-[11px] text-slate-400">
                  Plan: {server.planId} · {server.billing} · Status: {server.status}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/account')}
                className="h-8 rounded-full border border-slate-700 bg-slate-950 px-3 text-[11px] text-slate-300 hover:border-cyan-400 hover:text-cyan-300"
              >
                Back to account
              </button>
              <button
                onClick={() => navigate('/')}
                className="h-8 rounded-full border border-slate-700 bg-slate-950 px-3 text-[11px] text-slate-300 hover:border-cyan-400 hover:text-cyan-300"
              >
                Home
              </button>
            </div>
          </header>

          <section className="gta-card p-4 text-[11px] text-slate-300">
            {loading ? (
              <p className="text-slate-400">Loading server...</p>
            ) : error ? (
              <p className="text-rose-400">{error}</p>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Server code / config
                </p>
                <p className="mt-2 text-slate-400">
                  This is where you can edit text that represents your FiveM
                  server resources or configuration. Right now it is stored
                  inside TorquePanel only. Later we&apos;ll sync this with your
                  actual game host (Pterodactyl / FXServer files).
                </p>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-3 h-72 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-[11px] text-slate-100 outline-none focus:border-cyan-400"
                  spellCheck={false}
                />

                <div className="mt-3 flex justify-between gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-4 py-1.5 text-[11px] font-medium text-slate-950 hover:brightness-110 disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                  <button
                    onClick={() => navigate('/account')}
                    className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-4 py-1.5 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default ServerEditPage
