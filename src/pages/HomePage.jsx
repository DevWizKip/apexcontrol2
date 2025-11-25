import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Top navigation */}
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-bold">
              A
            </span>
            <span className="font-semibold tracking-wide text-sm">
              ApexControl
            </span>
          </div>

          <nav className="hidden md:flex gap-6 text-sm text-slate-300">
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/docs">Docs</Link>
            <Link to="/community">Community</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-slate-300">
              Sign in
            </Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-2 rounded-full bg-cyan-500 text-slate-950 font-medium"
            >
              Start free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <section>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Pro-grade control for your <span className="text-cyan-400">FiveM</span> servers.
            </h1>
            <p className="text-slate-300 mb-6 max-w-xl">
              Monitor performance, understand player behavior, and give your staff
              serious tools to keep RP clean and fair — all in one dashboard.
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-full bg-cyan-500 text-slate-950 font-medium text-sm"
              >
                Start free for your next restart
              </Link>
              <Link
                to="/app/dashboard"
                className="px-5 py-3 rounded-full border border-slate-700 text-sm text-slate-200"
              >
                View demo dashboard
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              No credit card · Works alongside txAdmin · Connect in under 5 minutes
            </p>
          </section>

          <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 h-72 md:h-96 p-4">
            <div className="h-full flex items-center justify-center text-slate-400 text-sm">
              Dashboard preview (we’ll make this real later)
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default HomePage
