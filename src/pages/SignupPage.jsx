// src/pages/SignupPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setLoading(true)
      await signup({ name, email, password })
      navigate('/account')
    } catch (err) {
      console.error('Signup failed', err)
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gta bg-cover bg-fixed bg-center bg-no-repeat">
      <main className="flex min-h-screen items-center justify-center bg-slate-950/80 px-4 py-10 text-slate-50 backdrop-blur">
        <div className="gta-card w-full max-w-md p-6">
          <h1 className="text-xl font-semibold tracking-tight text-slate-50">
            Create your TorquePanel account
          </h1>
          <p className="mt-1 text-[11px] text-slate-400">
            This account will own your GTA / FiveM servers. Make sure you use an
            email you control.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-[11px]">
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wide text-slate-400">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
                placeholder="City Owner, Lead Dev..."
              />
            </div>

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

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wide text-slate-400">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-3 text-center text-[11px] text-slate-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
            >
              Log in instead
            </button>
            .
          </p>
        </div>
      </main>
    </div>
  )
}

export default SignupPage
