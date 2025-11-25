// src/pages/LoginPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    // In a real app you would verify credentials here.
    // For now we just log them and move to the dashboard.
    console.log('Login attempt:', { email })

    navigate('/app/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-bold">
            A
          </span>
          <span className="font-semibold text-sm">ApexControl</span>
        </div>

        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Sign in</h1>
          <p className="text-xs text-slate-400">
            Continue to your server overview and player analytics.
          </p>
        </div>

        <form className="space-y-3 text-xs" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="block text-slate-200">Email</label>
            <input
              type="email"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-200">Password</label>
            <input
              type="password"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100"
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-[11px] text-red-300 bg-red-500/10 border border-red-500/40 rounded px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-1 py-2.5 rounded-full bg-cyan-500 text-slate-950 text-sm font-medium"
          >
            Sign in
          </button>
        </form>

        <p className="text-[11px] text-slate-500">
          New here?{' '}
          <Link to="/signup" className="text-cyan-400">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
