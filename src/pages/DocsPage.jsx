// src/pages/DocsPage.jsx
import { Link } from 'react-router-dom'

function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Breadcrumb */}
        <p className="text-[11px] text-slate-500">
          <Link to="/" className="text-cyan-400">
            Home
          </Link>{' '}
          / Docs
        </p>

        {/* Title */}
        <header className="space-y-2">
          <p className="text-xs text-cyan-400 uppercase tracking-wide">
            Docs
          </p>
          <h1 className="text-3xl font-semibold">Getting started with ApexControl</h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            This guide explains how ApexControl fits into your GTA V / FiveM
            setup, and how you&apos;d connect your servers when you&apos;re ready to
            move beyond txAdmin-only monitoring.
          </p>
        </header>

        {/* Layout: left content, right quick info */}
        <div className="grid lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1.1fr)] gap-6">
          {/* Main docs content */}
          <section className="space-y-8 text-sm text-slate-200">
            {/* Section 1 */}
            <section className="space-y-2">
              <h2 className="text-lg font-semibold">What is ApexControl?</h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                ApexControl is a web-based analytics and moderation panel
                designed for FiveM / GTA V servers. It doesn&apos;t replace txAdmin
                or your existing control panel – it sits alongside them and
                focuses on analytics, player behavior and moderation workflows.
              </p>
              <ul className="text-slate-300 text-xs space-y-1 list-disc list-inside">
                <li>See server health and performance in one dashboard.</li>
                <li>Track player sessions, retention and risk levels.</li>
                <li>Give staff a shared place to handle reports and bans.</li>
              </ul>
            </section>

            {/* Section 2: Conceptual setup */}
            <section className="space-y-2">
              <h2 className="text-lg font-semibold">How it fits into your setup</h2>
              <p className="text-slate-300 text-xs">
                In a real deployment, ApexControl would connect to your servers
                using a small background agent and your game logs / APIs. For
                this demo, all data is local and fake – perfect for designing
                and testing your workflow.
              </p>
              <ol className="text-slate-300 text-xs space-y-1 list-decimal list-inside">
                <li>You keep using txAdmin (or your own scripts) to start/stop servers.</li>
                <li>An ApexControl agent sends anonymised stats & logs to the panel.</li>
                <li>Admins and staff log into the web UI to see analytics & handle cases.</li>
              </ol>
            </section>

            {/* Section 3: Quickstart steps (imaginary but realistic) */}
            <section className="space-y-2">
              <h2 className="text-lg font-semibold">Quickstart (conceptual)</h2>
              <p className="text-slate-300 text-xs">
                These are the steps you would follow in a future real version of
                ApexControl. For this demo, you only need to complete steps 1–2.
              </p>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xs font-semibold text-slate-100">
                    1. Create an account
                  </h3>
                  <p className="text-slate-300 text-xs">
                    Go to the{' '}
                    <Link to="/signup" className="text-cyan-400">
                      signup page
                    </Link>{' '}
                    and create a free account with your email, password and main
                    server name.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-100">
                    2. Add your first server
                  </h3>
                  <p className="text-slate-300 text-xs">
                    In a real deployment, you would copy a small config snippet
                    into your server.cfg and restart. The agent would start
                    sending metrics (uptime, ping, player joins/leaves) to your
                    ApexControl dashboard.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-100">
                    3. Invite your staff team
                  </h3>
                  <p className="text-slate-300 text-xs">
                    You would then invite head admins, department leads and
                    trusted staff. Each role would have its own permissions
                    (view only, ban powers, access to monetization data, etc.).
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-100">
                    4. Roll it out to your live server
                  </h3>
                  <p className="text-slate-300 text-xs">
                    Finally, you&apos;d announce the new moderation / reporting flow to
                    your community. Players submit reports in-game or via
                    Discord; staff handle them from the ApexControl panel with a
                    clear audit trail.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: FAQ */}
            <section className="space-y-2">
              <h2 className="text-lg font-semibold">FAQ</h2>
              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <p className="font-semibold text-slate-100">
                    Does this replace txAdmin?
                  </p>
                  <p>
                    No. ApexControl focuses on analytics, player intel and
                    moderation. You would still use txAdmin (or your host&apos;s panel)
                    for starting/stopping the server and direct console access.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">
                    Is this safe / allowed by Rockstar & FiveM?
                  </p>
                  <p>
                    This demo project is for educational purposes only and is
                    not officially connected to Rockstar Games, Take-Two,
                    CitizenFX or FiveM. Any real deployment must follow their
                    official terms of service.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">
                    Where does the data live?
                  </p>
                  <p>
                    In a production setup, metrics would be stored in a secure
                    database behind the web panel. This demo uses local fake
                    data in your browser only – nothing is being sent anywhere.
                  </p>
                </div>
              </div>
            </section>
          </section>

          {/* Side panel: Links / help */}
          <aside className="space-y-4 text-xs">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                Quick links
              </h3>
              <ul className="space-y-1 text-slate-300">
                <li>
                  <Link to="/signup" className="text-cyan-400">
                    Create account
                  </Link>
                </li>
                <li>
                  <Link to="/app/dashboard" className="text-cyan-400">
                    View demo dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-cyan-400">
                    Join community (placeholder)
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                Support & feedback
              </h3>
              <p className="text-slate-300">
                This is a personal learning project, not a commercial product.
                If you have ideas, feedback or want to help build something like
                this for real, you could imagine joining a Discord or GitHub
                repo linked here.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default DocsPage
