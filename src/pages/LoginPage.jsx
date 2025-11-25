// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return

    // In a real app this would check a backend.
    // Here we just "log you in" with the info you typed.
    login({ name, email, role: 'owner' })
    navigate('/account')
  }

  return (
    <div className="gta-page">
      <main className="mx-auto max-w-md space-y-6 px-4 py-10 text-[11px] text-slate-300">
        <button
          onClick={() => (window.location.href = '/')}
          className="mb-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
        >
          ← Back to home
        </button>

        <header className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400">
            Login
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">
            Sign in to TorquePanel.
          </h1>
          <p className="text-xs text-slate-400">
            This demo does not talk to a real backend – it just stores your
            account locally so you can see how the panel would behave.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="gta-card space-y-3 p-4 text-[11px]"
        >
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

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-4 py-1.5 text-[11px] font-medium text-slate-950 shadow-lg shadow-cyan-500/30 hover:brightness-110"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-[10px] text-slate-400">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
          >
            Sign up instead
          </button>
          .
        </p>
      </main>
    </div>
  )
}

export default LoginPage
