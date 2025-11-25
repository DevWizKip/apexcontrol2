// src/pages/CommunityPage.jsx
import { Link } from 'react-router-dom'

function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <p className="text-[11px] text-slate-500">
          <Link to="/" className="text-cyan-400">
            Home
          </Link>{' '}
          / Community
        </p>

        <header className="space-y-2">
          <p className="text-xs text-cyan-400 uppercase tracking-wide">
            Community
          </p>
          <h1 className="text-3xl font-semibold">Built for server owners, devs & staff</h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Imagine a place where RP server owners, scripters, staff teams and
            power players share ideas on how to run better communities. This
            page is a placeholder for that: Discord, GitHub, and content links.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <h2 className="text-sm font-semibold text-slate-100">Discord</h2>
            <p className="text-slate-300">
              A future ApexControl Discord would be the place for feature
              requests, bug reports and sharing screenshots of your dashboards.
            </p>
            <p className="text-slate-500 text-[11px]">
              Placeholder: discord.gg/your-server
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <h2 className="text-sm font-semibold text-slate-100">GitHub</h2>
            <p className="text-slate-300">
              This project could live on GitHub so other people can see how you
              built it, give ideas, or even open pull requests.
            </p>
            <p className="text-slate-500 text-[11px]">
              Placeholder: github.com/yourname/apexcontrol
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <h2 className="text-sm font-semibold text-slate-100">Content</h2>
            <p className="text-slate-300">
              You could share short clips on TikTok / YouTube showing how the
              dashboard works, how you handle reports, and how you grow servers.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default CommunityPage
