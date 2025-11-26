// src/pages/SuccessPage.jsx
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const stars = [
  { top: '10%', left: '15%', delay: '0s' },
  { top: '20%', left: '70%', delay: '0.4s' },
  { top: '35%', left: '30%', delay: '0.8s' },
  { top: '50%', left: '80%', delay: '0.2s' },
  { top: '60%', left: '20%', delay: '1s' },
  { top: '75%', left: '55%', delay: '0.6s' },
  { top: '85%', left: '40%', delay: '1.2s' },
  { top: '25%', left: '45%', delay: '0.3s' },
  { top: '40%', left: '10%', delay: '0.9s' },
  { top: '70%', left: '85%', delay: '0.5s' },
]

const API_BASE = 'http://localhost:3001'

function SuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, token } = useAuth()

  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('Finishing your setup...')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const sessionId = params.get('session_id')

    if (!sessionId) {
      setStatus('error')
      setMessage('Missing payment session information.')
      return
    }

    if (!isLoggedIn || !token) {
      setStatus('error')
      setMessage(
        'Your payment was completed, but you need to log in again to finish linking your server.'
      )
      return
    }

    async function finishBilling() {
      try {
        setStatus('loading')
        setMessage('Finishing your setup and creating your server...')

        const res = await fetch(`${API_BASE}/api/billing/complete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId }),
        })

        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Failed to complete billing')
        }

        setStatus('success')
        setMessage(
          'Your server has been created and linked to your account. You can view it on your Account page.'
        )
      } catch (err) {
        console.error('Finish billing error', err)
        setStatus('error')
        setMessage(err.message || 'There was a problem finishing your setup.')
      }
    }

    finishBilling()
  }, [location.search, isLoggedIn, token])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      {/* Animated star background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950">
        {stars.map((star, idx) => (
          <div
            key={idx}
            className="absolute h-1 w-1 rounded-full bg-cyan-400 opacity-70 animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          />
        ))}
        <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4 py-16">
        <div className="gta-card w-full max-w-md border-cyan-500/40 bg-slate-950/90 p-6 text-center shadow-xl shadow-cyan-500/20">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15">
            <span className="text-2xl">
              {status === 'success' ? '✅' : status === 'error' ? '⚠️' : '⏳'}
            </span>
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-slate-50">
            Payment authorized
          </h1>

          <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
            {message}
          </p>

          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-left text-[11px] text-slate-300">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              What happens next
            </p>
            <ul className="mt-2 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>
                  Stripe confirms your payment and tells TorquePanel it&apos;s
                  safe to create your server.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>
                  TorquePanel creates a new server under your account so only
                  you can see and manage it.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-slate-500" />
                <span>
                  Later, we&apos;ll connect this to a real FiveM host so it
                  actually starts a live GTA city.
                </span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/account')}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-4 py-2 text-[11px] font-medium text-slate-950 shadow-md shadow-cyan-500/30 hover:brightness-110"
          >
            Continue to your panel
          </button>

          <button
            onClick={() => navigate('/')}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
          >
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
