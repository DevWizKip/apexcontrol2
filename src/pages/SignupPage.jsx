// src/pages/SignupPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignupPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [serverName, setServerName] = useState('')
  const [serverType, setServerType] = useState('Roleplay')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email || !password || !serverName) {
      setError('Please fill in all required fields.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    // This is where a real app would send data to a backend
    console.log('Signup data:', { email, serverName, serverType })

    setSuccess('Account created! Redirecting you to the demo app...')
    // fake redirect after a short delay
    setTimeout(() => {
      navigate('/app/dashboard')
    }, 800)
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

        {/* Stepper */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
          <div className="flex items-center gap-1">
            <span className="h-5 w-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">
              1
            </span>
            <span>Account</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-5 w-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px]">
              2
            </span>
            <span className="text-slate-500">Server</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-5 w-5 rounded-full border border-slate-800 flex items-center justify-center text-[10px]">
              3
            </span>
            <span className="text-slate-600">Invite staff</span>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Create your account</h1>
          <p className="text-xs text-slate-400">
            Connect ApexControl to your next FiveM restart. No credit card required.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-3 text-xs" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="block text-slate-200">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-200">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-200">
              Main server name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100"
              placeholder="Example: Apex RP City"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-200">Server type</label>
            <select
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100"
              value={serverType}
              onChange={(e) => setServerType(e.target.value)}
            >
              <option>Roleplay</option>
              <option>Drift / racing</option>
              <option>Freeroam</option>
              <option>Stunt / minigames</option>
              <option>Development / test</option>
            </select>
          </div>

          {error && (
            <div className="text-[11px] text-red-300 bg-red-500/10 border border-red-500/40 rounded px-3 py-2">
              {error}
            </div>
          )}

          {success && (
            <div className="text-[11px] text-emerald-200 bg-emerald-500/10 border border-emerald-500/40 rounded px-3 py-2">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-1 py-2.5 rounded-full bg-cyan-500 text-slate-950 text-sm font-medium"
          >
            Create account & go to demo
          </button>
        </form>

        <p className="text-[11px] text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400">
            Sign in
          </Link>
        </p>

        <p className="text-[10px] text-slate-600">
          By continuing you confirm you&apos;re running a legitimate GTA V / FiveM
          setup and you agree to follow Rockstar&apos;s and FiveM&apos;s terms.
        </p>
      </div>
    </div>
  )
}

export default SignupPage
