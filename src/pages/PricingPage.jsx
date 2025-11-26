// src/pages/PricingPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function PricingPage() {
  const [billing, setBilling] = useState('monthly') // "monthly" or "yearly"
  const { isLoggedIn, token } = useAuth()
  const navigate = useNavigate()

  // Visual: yearly appears ~20% cheaper
  const factor = billing === 'monthly' ? 1 : 0.8

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      highlight: false,
      basePrice: 9,
      description: 'For new GTA cities finding their first player base.',
      features: [
        '1 GTA / FiveM server',
        'Basic staff tools',
        'Simple player reports',
        'Basic moderation logging',
      ],
    },
    {
      id: 'creator',
      name: 'Creator',
      highlight: true,
      basePrice: 19,
      description: 'For creators running a serious RP or drift city.',
      features: [
        'Up to 3 servers (RP / dev / test)',
        'Staff+dev dashboards',
        'Live metrics for player activity',
        'Moderation tools & audit logs',
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
        'Webhook & integration helpers',
      ],
    },
  ]

  async function handleBuy(planId) {
    // 1) Make sure user is logged in
    if (!isLoggedIn) {
      alert('Please log in or create an account before choosing a plan.')
      navigate('/signup') // or '/login' if you prefer
      return
    }

    try {
      const res = await fetch(
        'http://localhost:3001/api/billing/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 2) Send the auth token so backend knows which user this is
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ planId, billing }),
        }
      )

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Could not start checkout. Check the backend server.')
      }
    } catch (err) {
      console.error('Error starting checkout', err)
      alert('There was an error talking to the payment system.')
    }
  }

  return (
    <div className="min-h-screen bg-gta bg-cover bg-fixed bg-center bg-no-repeat">
      <main className="min-h-screen bg-slate-950/80 px-4 pb-12 pt-20 text-slate-50 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <header className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">
              Pricing
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
              GTA / FiveM city control that grows with you
            </h1>
            <p className="max-w-2xl text-[11px] leading-relaxed text-slate-400">
              All plans are designed for GTA / FiveM communities — from your
              first city launch to multi-city networks. Start on Starter, grow
              into Creator, and talk to us for Network.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-2 py-1 text-[10px] text-slate-300">
              <button
                className={
                  'rounded-full px-2 py-0.5 transition ' +
                  (billing === 'monthly'
                    ? 'bg-slate-800 text-cyan-300'
                    : 'text-slate-400')
                }
                onClick={() => setBilling('monthly')}
              >
                Monthly
              </button>
              <button
                className={
                  'rounded-full px-2 py-0.5 transition ' +
                  (billing === 'yearly'
                    ? 'bg-slate-800 text-emerald-300'
                    : 'text-slate-400')
                }
                onClick={() => setBilling('yearly')}
              >
                Yearly · save ~20%
              </button>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => {
              const price = plan.basePrice * factor

              return (
                <div
                  key={plan.id}
                  className={
                    'gta-card flex flex-col justify-between p-4 ' +
                    (plan.highlight
                      ? 'border-cyan-400/60 bg-slate-950/90 shadow-lg shadow-cyan-500/20'
                      : 'border-slate-800 bg-slate-950/80')
                  }
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-[13px] font-semibold text-slate-50">
                        {plan.name}
                      </h2>
                      {plan.highlight && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium text-emerald-300">
                          Most popular
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400">
                      {plan.description}
                    </p>

                    <p className="flex items-baseline gap-1 text-slate-50">
                      <span className="text-xl font-semibold">
                        ${price.toFixed(0)}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        /
                        {billing === 'monthly'
                          ? 'month'
                          : 'month (billed yearly)'}
                      </span>
                    </p>

                    <ul className="mt-2 space-y-1.5 text-[11px] text-slate-300">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-[11px]"
                        >
                          <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleBuy(plan.id)}
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
                </div>
              )
            })}
          </section>

          <section className="gta-card space-y-2 p-4 text-[11px] text-slate-300">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              How we price TorquePanel
            </p>
            <p>
              Pricing is based on how many GTA / FiveM servers and staff teams
              you&apos;re running, plus the analytics and tooling depth you
              need. You can start small and upgrade later as your city grows.
            </p>
            <p>
              These prices are examples – in a real deployment you&apos;d wire
              this directly to Stripe / PayPal products that match your host
              costs, FiveM limits and support model.
            </p>
            <p>
              All tiers are tuned for GTA / FiveM roleplay cities: whitelisted
              RP, networks, drift &amp; racing servers and high-chaos freeroam
              communities.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

export default PricingPage
