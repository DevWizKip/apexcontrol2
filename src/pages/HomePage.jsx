// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'

function HomePage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [persona, setPersona] = useState('owner') // "owner" | "staff" | "dev"

  const personaCopy = {
    owner: {
      label: 'Server owner',
      title: 'See your GTA city like a business, not a black box.',
      body:
        'Track peak hours, stability, staff performance and player retention. Make decisions on restarts, events and whitelist waves using real data – not Discord vibes.',
    },
    staff: {
      label: 'Staff lead / head admin',
      title: 'Keep staff tickets, bans and reports under control.',
      body:
        'One queue for reports, warnings and bans. Claim tickets, leave notes and track who is actually handling the mess when the city is full.',
    },
    dev: {
      label: 'Developer / scripter',
      title: 'Find broken scripts before players start screaming.',
      body:
        'See crash clusters, slow resources and anticheat spam grouped by script. Roll back bad builds faster and keep the city stable during big content drops.',
    },
  }

  const activePersona = personaCopy[persona]

  return (
    <div className="gta-page">
      {/* top nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-400">
            <span className="text-[11px] font-bold text-slate-950">TP</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">
              TorquePanel
            </span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-cyan-400">
              FiveM / GTA Server Panel
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-4 text-[11px] text-slate-300 md:flex">
          <button
            onClick={() => navigate('/features')}
            className="hover:text-cyan-300"
          >
            Features
          </button>
          <button
            onClick={() => navigate('/analytics')}
            className="hover:text-cyan-300"
          >
            Analytics
          </button>
          <button
            onClick={() => navigate('/security')}
            className="hover:text-cyan-300"
          >
            Security
          </button>
          <button
            onClick={() => navigate('/pricing')}
            className="hover:text-cyan-300"
          >
            Pricing
          </button>

          {/* When NOT logged in → show Login + Sign up */}
          {!isLoggedIn && (
            <>
              <button
                onClick={() => navigate('/login')}
                className="hover:text-cyan-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="rounded-full border border-cyan-500/70 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-medium text-cyan-300 hover:bg-cyan-500/20"
              >
                Sign up
              </button>
            </>
          )}

          {/* When logged in → show Account instead */}
          {isLoggedIn && (
            <button
              onClick={() => navigate('/account')}
              className="rounded-full border border-emerald-500/70 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/20"
            >
              Account
            </button>
          )}

          <button
            onClick={() => navigate('/app/dashboard')}
            className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] font-medium text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
          >
            Launch admin panel
          </button>
        </nav>
      </header>

      {/* HERO */}
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-4 md:flex-row md:items-center">
        {/* Left: headline */}
        <section className="gta-hero-glow relative z-10 flex-1 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400">
            Los Santos ready
          </p>
          <h1 className="max-w-xl text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
            The control room
            <span className="text-cyan-400"> your GTA RP city</span> actually
            deserves.
          </h1>
          <p className="max-w-md text-xs text-slate-300 md:text-sm">
            TorquePanel gives FiveM &amp; GTA server owners live insight into
            queue, crashes, staff actions and player behavior. Built for serious
            roleplay cities that run deep whitelists, custom scripts and full
            staff teams.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-[11px]">
            <button
              onClick={() => navigate('/app/dashboard')}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-5 py-2 font-medium text-slate-950 shadow-lg shadow-cyan-500/30 hover:brightness-110"
            >
              View live demo
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
            >
              View pricing
            </button>
          </div>

          {/* GTA-style stats row */}
          <div className="mt-4 flex flex-wrap gap-3 text-[11px]">
            <div className="gta-card flex min-w-[150px] flex-1 flex-col gap-1 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Live RP cities
              </p>
              <p className="text-base font-semibold text-cyan-400">320+</p>
              <p className="text-[10px] text-slate-500">
                Using TorquePanel to watch crashes, queue and staff.
              </p>
            </div>
            <div className="gta-card flex min-w-[150px] flex-1 flex-col gap-1 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Peak players watched
              </p>
              <p className="text-base font-semibold text-emerald-400">
                18,400+
              </p>
              <p className="text-[10px] text-slate-500">
                Across whitelisted, cops-and-robbers and drift servers.
              </p>
            </div>
          </div>

          {/* “GTA vibe” bullet list */}
          <ul className="mt-3 grid max-w-md gap-2 text-[11px] text-slate-300 md:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>
                See when your city actually peaks – per hour, per district and
                per whitelist role.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>
                Track staff claims, warnings and bans like an in-game MDT, not
                a messy Discord log.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>
                Catch broken scripts and anticheat flags before your city
                explodes in chat.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>
                Designed for PD, EMS, gangs, racers &amp; streamers – not just
                vanilla freeroam.
              </span>
            </li>
          </ul>
        </section>

        {/* Right: fake “in-game panel” hero card */}
        <section className="relative z-10 mt-4 flex flex-1 justify-center md:mt-0">
          <div className="gta-card relative w-full max-w-md overflow-hidden px-4 py-4">
            <div className="mb-2 flex items-center justify-between text-[10px] text-slate-400">
              <span className="uppercase tracking-[0.2em] text-sky-400">
                City overview
              </span>
              <span>Los Santos · Main RP</span>
            </div>

            {/* faux skyline bar */}
            <div className="mb-3 h-16 rounded-xl bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800">
              <div className="flex h-full items-end gap-1 px-2 pb-2">
                <div className="h-6 w-3 rounded-sm bg-slate-600" />
                <div className="h-9 w-3 rounded-sm bg-slate-500" />
                <div className="h-4 w-3 rounded-sm bg-slate-700" />
                <div className="h-10 w-3 rounded-sm bg-slate-400" />
                <div className="h-7 w-3 rounded-sm bg-slate-500" />
                <div className="h-5 w-3 rounded-sm bg-slate-600" />
                <div className="h-9 w-3 rounded-sm bg-slate-500" />
              </div>
            </div>

            {/* mini stats row */}
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="rounded-lg bg-slate-900/80 px-2 py-1.5">
                <p className="text-slate-400">Players</p>
                <p className="text-sm font-semibold text-slate-50">
                  102<span className="text-[9px] text-slate-500">/128</span>
                </p>
                <p className="text-[9px] text-emerald-400">
                  Queue · 18 waiting
                </p>
              </div>
              <div className="rounded-lg bg-slate-900/80 px-2 py-1.5">
                <p className="text-slate-400">Stability</p>
                <p className="text-sm font-semibold text-emerald-400">
                  99.7%
                </p>
                <p className="text-[9px] text-slate-500">No crashes · 24h</p>
              </div>
              <div className="rounded-lg bg-slate-900/80 px-2 py-1.5">
                <p className="text-slate-400">Staff</p>
                <p className="text-sm font-semibold text-slate-50">
                  6 online
                </p>
                <p className="text-[9px] text-sky-400">3 active tickets</p>
              </div>
            </div>

            {/* mini ticket feed */}
            <div className="mt-3 space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between rounded-lg bg-slate-900/80 px-2 py-1.5">
                <div className="flex flex-col">
                  <span className="text-slate-50">
                    #4821 · VDM near Legion
                  </span>
                  <span className="text-[9px] text-slate-500">
                    TTV_Nitro reported by NovaRP · 4 min ago
                  </span>
                </div>
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[9px] text-amber-300">
                  High
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-900/80 px-2 py-1.5">
                <div className="flex flex-col">
                  <span className="text-slate-50">
                    Script error · police_mdt
                  </span>
                  <span className="text-[9px] text-slate-500">
                    Restarted by Karma · stable 12m
                  </span>
                </div>
                <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[9px] text-sky-300">
                  Script
                </span>
              </div>
            </div>

            <p className="mt-3 text-[9px] text-slate-500">
              Live demo shows simulated data. In a real deployment, these tiles
              stay synced to your FiveM console, database and staff tools.
            </p>
          </div>
        </section>
      </main>

      {/* Persona switcher */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="gta-card flex flex-col gap-4 px-4 py-4 text-[11px] text-slate-300 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md space-y-1">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Who are you in the city?
            </p>
            <h2 className="text-sm font-semibold text-slate-50">
              TorquePanel speaks to owners, staff leads and devs.
            </h2>
            <p className="text-slate-400">
              Tap through the roles to see how the panel feels from each
              perspective.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPersona('owner')}
              className={
                'rounded-full px-3 py-1.5 text-[10px] transition ' +
                (persona === 'owner'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-cyan-400 hover:text-cyan-300')
              }
            >
              Server owner
            </button>
            <button
              onClick={() => setPersona('staff')}
              className={
                'rounded-full px-3 py-1.5 text-[10px] transition ' +
                (persona === 'staff'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-emerald-400 hover:text-emerald-300')
              }
            >
              Staff lead
            </button>
            <button
              onClick={() => setPersona('dev')}
              className={
                'rounded-full px-3 py-1.5 text-[10px] transition ' +
                (persona === 'dev'
                  ? 'bg-sky-500 text-slate-950'
                  : 'border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-sky-400 hover:text-sky-300')
              }
            >
              Dev / scripter
            </button>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-[11px] text-slate-300">
          <p className="text-[10px] uppercase tracking-wide text-cyan-400">
            {activePersona.label}
          </p>
          <h3 className="mt-1 text-sm font-semibold text-slate-50">
            {activePersona.title}
          </h3>
          <p className="mt-2 text-slate-400">{activePersona.body}</p>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
              Simple pricing
            </p>
            <h2 className="text-sm font-semibold text-slate-50">
              Start small and scale up as your GTA city grows.
            </h2>
            <p className="text-[11px] text-slate-400">
              No credit card required for the starter tier. Upgrade only when
              your city actually fills up.
            </p>
          </div>
          <button
            onClick={() => navigate('/pricing')}
            className="self-start rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-4 py-2 text-[11px] font-medium text-slate-950 shadow-lg shadow-cyan-500/30 hover:brightness-110"
          >
            See full pricing
          </button>
        </div>

        <div className="mt-4 grid gap-3 text-[11px] text-slate-300 md:grid-cols-3">
          <div className="gta-card p-4">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Starter
            </p>
            <h3 className="mt-1 text-sm font-semibold text-slate-50">
              For growing cities
            </h3>
            <p className="mt-2 text-slate-400">
              Perfect for new GTA cities finding their rhythm. Core analytics,
              player browser and moderation queue.
            </p>
          </div>
          <div className="gta-card border-cyan-400/60 p-4 shadow-lg shadow-cyan-500/30">
            <p className="text-[10px] uppercase tracking-wide text-cyan-400">
              City
            </p>
            <h3 className="mt-1 text-sm font-semibold text-slate-50">
              For established RP servers
            </h3>
            <p className="mt-2 text-slate-400">
              Full analytics, staff tools, script insight and multi-server
              support for your main city + dev server.
            </p>
          </div>
          <div className="gta-card p-4">
            <p className="text-[10px] uppercase tracking-wide text-emerald-400">
              Network
            </p>
            <h3 className="mt-1 text-sm font-semibold text-slate-50">
              For full GTA networks
            </h3>
            <p className="mt-2 text-slate-400">
              Multi-city networks, event servers and special shards. Custom
              support and advanced integrations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
