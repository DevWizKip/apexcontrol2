function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <header className="space-y-2 text-center">
          <p className="text-xs text-cyan-400 uppercase tracking-wide">
            Pricing
          </p>
          <h1 className="text-3xl font-semibold">Simple plans for growing servers</h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Start free on your test or small community server. Upgrade only when
            you&apos;re ready to track more players, more staff and more servers.
          </p>
        </header>

        {/* Plans */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold">Starter</h2>
              <p className="text-slate-300 text-xs">
                For new or small servers wanting better visibility.
              </p>
            </div>
            <div>
              <span className="text-3xl font-semibold">$0</span>
              <span className="text-slate-400 text-xs ml-1">/month</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• 1 production server + 1 dev server</li>
              <li>• Up to 50 concurrent players</li>
              <li>• Basic health dashboard & crash tracking</li>
              <li>• Player list & simple analytics</li>
              <li>• Basic report inbox</li>
            </ul>
            <button className="mt-2 w-full py-2.5 rounded-full bg-slate-800 text-slate-100 text-sm">
              Start on Starter
            </button>
          </div>

          {/* Pro */}
          <div className="bg-slate-900 border border-cyan-500 rounded-2xl p-6 flex flex-col gap-4 relative">
            <div className="absolute -top-3 right-4 text-[10px] px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-semibold">
              Most popular
            </div>
            <div>
              <h2 className="text-lg font-semibold">Pro</h2>
              <p className="text-slate-300 text-xs">
                For established RP communities, drift servers and networks.
              </p>
            </div>
            <div>
              <span className="text-3xl font-semibold">$19</span>
              <span className="text-slate-400 text-xs ml-1">/month per server</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• Up to 3 production servers + dev / test servers</li>
              <li>• Unlimited concurrent players</li>
              <li>• Advanced health analytics & resource impact</li>
              <li>• Full player retention & cohort views</li>
              <li>• Moderation history, evidence and audit export</li>
              <li>• Priority support & feature voting</li>
            </ul>
            <button className="mt-2 w-full py-2.5 rounded-full bg-cyan-500 text-slate-950 text-sm font-medium">
              Upgrade to Pro
            </button>
          </div>
        </section>

        {/* Small comparison note */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-[11px] text-slate-300 space-y-2">
          <h2 className="text-sm font-semibold">How is this different from txAdmin?</h2>
          <p>
            txAdmin is free and stays that way. ApexControl does something
            different: it&apos;s a dedicated analytics & moderation layer built for
            communities that have outgrown basic tools, not a replacement for
            your existing control panel.
          </p>
          <p>
            You can run both side by side. If you ever want to leave,
            disconnect the agent and your server keeps running as normal.
          </p>
        </section>
      </main>
    </div>
  )
}

export default PricingPage
