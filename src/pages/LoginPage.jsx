import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h1 className="text-xl font-semibold text-center">Sign in to ApexControl</h1>
        <div className="space-y-2 text-sm">
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
              placeholder="••••••••"
            />
          </label>
        </div>
        <button className="w-full py-2.5 rounded-full bg-cyan-500 text-slate-950 text-sm font-medium">
          Sign in
        </button>
        <p className="text-xs text-slate-400 text-center">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-cyan-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
