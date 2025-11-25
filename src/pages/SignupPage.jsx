import { Link } from 'react-router-dom'

function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h1 className="text-xl font-semibold text-center">Create your account</h1>
        <div className="space-y-2 text-sm">
          <label className="space-y-1 block">
            <span className="text-slate-300">Community / server name</span>
            <input
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
              placeholder="NightCity RP"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-slate-300">Email</span>
            <input
              type="email"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
              placeholder="you@example.com"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-slate-300">Password</span>
            <input
              type="password"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
              placeholder="At least 10 characters"
            />
          </label>
        </div>
        <button className="w-full py-2.5 rounded-full bg-cyan-500 text-slate-950 text-sm font-medium">
          Create account
        </button>
        <p className="text-xs text-slate-400 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
