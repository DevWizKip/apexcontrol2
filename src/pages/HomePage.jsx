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

      {/* Main content */}
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-slate-900">
          <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                Pro-grade control for your{' '}
                <span className="text-cyan-400">FiveM</span> servers.
              </h1>
              <p className="text-slate-300 mb-6 max-w-xl">
                ApexControl sits on top of your existing txAdmin or custom setup
                and turns raw logs into live intelligence: performance, player
                behavior, and moderation all in one place.
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
            </div>

            {/* Right side visual */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 h-72 md:h-96 p-4">
              <div className="h-full flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Main RP City · Overview</span>
                  <span className="text-slate-400">Last 24h</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="bg-slate-950/40 border border-slate-700/70 rounded-xl p-3">
                    <div className="text-slate-400 uppercase tracking-wide">
                      Uptime
                    </div>
                    <div className="text-2xl font-semibold text-slate-50">
                      99.8%
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1">
                      +0.4% vs last week
                    </div>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-700/70 rounded-xl p-3">
                    <div className="text-slate-400 uppercase tracking-wide">
                      Online
                    </div>
                    <div className="text-2xl font-semibold text-slate-50">
                      72
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Peak 132 today
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-slate-950/40 border border-slate-700/70 rounded-xl flex items-center justify-center text-[11px] text-slate-400">
                  Live concurrency & ping chart (demo)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof / stats */}
        <section className="border-b border-slate-900">
          <div className="max-w-6xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-3 text-xs text-slate-300">
            <div>
              <div className="text-slate-100 text-lg font-semibold">4,200+</div>
              Active servers monitored
            </div>
            <div>
              <div className="text-slate-100 text-lg font-semibold">1.2M</div>
              Unique players tracked across RP, racing & drift servers
            </div>
            <div>
              <div className="text-slate-100 text-lg font-semibold">99.98%</div>
              Panel uptime backed by global infrastructure
            </div>
          </div>
        </section>

        {/* Feature highlights */}
        <section className="border-b border-slate-900">
          <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
            <h2 className="text-2xl font-semibold">Built for serious server owners</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-slate-50">Deep server health</h3>
                <p className="text-slate-300 text-xs">
                  Track uptime, crashes, resource usage and average ping across
                  all of your servers — not just basic player count.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-slate-50">Player intel</h3>
                <p className="text-slate-300 text-xs">
                  See sessions, retention, high-risk players and top supporters at
                  a glance, so you can reward the good and deal with the bad.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-slate-50">Moderation that scales</h3>
                <p className="text-slate-300 text-xs">
                  Centralise reports, evidence links and staff actions so your
                  team stays aligned even when the city is full.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why upgrade from txAdmin */}
        <section className="border-b border-slate-900">
          <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 text-sm">
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                Why not just use txAdmin?
              </h2>
              <p className="text-slate-300 text-sm mb-3">
                txAdmin is great at starting your server and handling basic tasks.
                ApexControl focuses on everything txAdmin doesn&apos;t do:
                intelligence, monitoring and community health.
              </p>
              <ul className="text-slate-300 text-xs space-y-2 list-disc list-inside">
                <li>No more guessing why players are leaving after 2 days.</li>
                <li>See which resources are actually killing performance.</li>
                <li>Give staff a shared place to work cases and track actions.</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
              <h3 className="font-semibold text-slate-50">
                Side-by-side with your existing tools
              </h3>
              <p>
                Keep using txAdmin for console access and restarts. ApexControl
                connects via lightweight agents and APIs to analyse what&apos;s
                actually happening in-game.
              </p>
              <p>
                Start in &lt; 5 minutes, roll it out to staff, and if you don&apos;t
                love it, just disconnect – no changes to your core server config.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} ApexControl. Not affiliated with Rockstar Games or Take-Two.</span>
          <div className="flex gap-4">
            <Link to="/docs">Docs</Link>
            <Link to="/community">Discord</Link>
            <a href="mailto:contact@example.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
