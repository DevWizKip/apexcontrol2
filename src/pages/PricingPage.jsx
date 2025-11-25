// src/pages/PricingPage.jsx
import { useState } from 'react'

function PricingPage() {
  const [billing, setBilling] = useState('monthly') // "monthly" or "yearly"

  // yearly = 20% cheaper
  const factor = billing === 'monthly' ? 1 : 0.8

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      highlight: false,
      basePrice: 9,
      description: 'For new GTA cities finding their first player base.',
      features: [
        'Up to 64 concurrent players',
        'Single FiveM server',
        'Core dashboard & uptime',
        'Player browser & basic search',
        'Starter moderation queue',
      ],
    },
    {
      id: 'city',
      name: 'City',
      highlight: true,
      basePrice: 24,
      description: 'For established RP cities with full staff teams.',
      features: [
        'Up to 128 concurrent players',
        'Main + dev FiveM servers',
        'Full analytics & retention',
        'Advanced player profiles',
        'Full moderation tools & audit trail',
        'Script performance insights',
      ],
    },
    {
      id: 'network',
      name: 'Network',
      highlight: false,
      basePrice: 49,
      description: 'For GTA server networks and community clusters.',
      features: [
        'Multiple RP servers & shards',
        'Cross-city analytics',
        'Custom staff roles',
        'Priority support',
        'Webhook & Discord integrations',
      ],
    },
  ]

  return (
    <div className="gta-page">
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 text-[11px] text-slate-300">
        <button
          onClick={() => (window.location.href = '/')}
          className="mb-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
        >
          ← Back to home
        </button>

        {/* HEADER */}
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400">
              Pricing
            </p>
            <h1 className="text-2xl font-semibold text-slate-50">
              Start small. Scale as your GTA city grows.
            </h1>
            <p className="max-w-xl text-xs text-slate-400">
              No credit card required for Starter. Upgrade only when you are
              actually filling queue and running multiple servers.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="gta-card flex items-center gap-3 px-4 py-2">
            <span className="text-[10px] text-slate-400">
              Billing interval
            </span>
            <div className="inline-flex items-center rounded-full bg-slate-900/80 p-1">
              <button
                onClick={() => setBilling('monthly')}
                className={
                  'rounded-full px-3 py-1 text-[10px] transition ' +
                  (billing === 'monthly'
                    ? 'bg-slate-50 text-slate-950'
                    : 'text-slate-300 hover:text-cyan-300')
                }
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('yearly')}
                className={
                  'rounded-full px-3 py-1 text-[10px] transition ' +
                  (billing === 'yearly'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-300 hover:text-cyan-300')
                }
              >
                Yearly <span className="text-[9px]">(save 20%)</span>
              </button>
            </div>
          </div>
        </header>

        {/* PLANS GRID */}
        <section className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const price = Math.round(plan.basePrice * factor)
            return (
              <div
                key={plan.id}
                className={
                  'gta-card flex h-full flex-col justify-between p-4 transition duration-200 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-cyan-500/30 ' +
                  (plan.highlight
                    ? 'border-cyan-400/70 shadow-lg shadow-cyan-500/40'
                    : '')
                }
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      {plan.name}
                    </p>
                    {plan.highlight && (
                      <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[9px] text-cyan-300">
                        Most popular
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1 text-sm font-semibold text-slate-50">
                    {plan.description}
                  </h2>

                  {/* Price */}
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-2xl font-semibold text-transparent">
                      ${price}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      /month {billing === 'yearly' && '(paid yearly)'}
                    </span>
                  </div>
                </div>

                {/* Feature list */}
                <ul className="mt-3 space-y-1.5 text-[10px] text-slate-300">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={
                    'mt-4 w-full rounded-full px-3 py-1.5 text-[11px] font-medium transition ' +
                    (plan.highlight
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 hover:brightness-110'
                      : 'border border-slate-700 bg-slate-950 text-slate-100 hover:border-cyan-400 hover:text-cyan-300')
                  }
                >
                  {plan.id === 'starter'
                    ? 'Start free on Starter'
                    : 'Contact us about this plan'}
                </button>
              </div>
            )
          })}
        </section>

        {/* FOOTNOTE */}
        <section className="gta-card mt-4 space-y-2 px-4 py-4 text-[10px] text-slate-400">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">
            Fair use &amp; demo note
          </p>
          <p>
            Pricing shown here is sample text for the TorquePanel design. In a
            real product, you would adjust these numbers to match your hosting
            costs, FiveM limits and support model.
          </p>
          <p>
            All tiers are tuned for GTA / FiveM roleplay cities: whitelisted RP,
            networks, drift &amp; racing servers and high-chaos freeroam
            communities.
          </p>
        </section>
      </main>
    </div>
  )
}

export default PricingPage
