// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) return

    try {
      setLoading(true)
      await login({ email, password })
      navigate('/account')
    } catch (err) {
      console.error('Login failed', err)
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gta bg-cover bg-fixed bg-center bg-no-repeat">
      <main className="flex min-h-screen items-center justify-center bg-slate-950/80 px-4 py-10 text-slate-50 backdrop-blur">
        <div className="gta-card w-full max-w-md p-6">
          <h1 className="text-xl font-semibold tracking-tight text-slate-50">
            Log in to TorquePanel
          </h1>
          <p className="mt-1 text-[11px] text-slate-400">
            Use the email and password you signed up with. This will unlock your
            account and any servers linked to it.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-[11px]">
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wide text-slate-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wide text-slate-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-[11px] text-rose-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-4 py-1.5 text-[11px] font-medium text-slate-950 shadow-sm hover:brightness-110 disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="mt-3 text-center text-[11px] text-slate-400">
            Need an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
            >
              Sign up instead
            </button>
            .
          </p>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
