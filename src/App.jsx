// src/App.jsx
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SecurityPage from './pages/SecurityPage'
import PricingPage from './pages/PricingPage'
import AccountPage from './pages/AccountPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SuccessPage from './pages/SuccessPage'
import ServerEditPage from './pages/ServerEditPage'

import AppShell from './app/AppShell'
import DashboardPage from './app/DashboardPage'
import PlayersPage from './app/PlayersPage'
import PlayerDetailPage from './app/PlayerDetailPage'
import ModerationPage from './app/ModerationPage'
// 🔴 NOTE: no more "ServerLogsPage" import here

function App() {
  return (
    <Routes>
      {/* Marketing / public site */}
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* Auth & account */}
      <Route path="/account" element={<AccountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Success / cancel pages */}
      <Route path="/success" element={<SuccessPage />} />
      <Route
        path="/cancel"
        element={
          <div className="min-h-screen bg-gta bg-cover bg-fixed bg-center bg-no-repeat">
            <main className="flex min-h-screen items-center justify-center bg-slate-950/80 px-4 py-10 text-slate-50 backdrop-blur">
              <div className="gta-card w-full max-w-md p-6 text-center">
                <h1 className="text-xl font-semibold tracking-tight text-slate-50">
                  Payment canceled
                </h1>
                <p className="mt-2 text-[11px] text-slate-400">
                  Your payment was canceled. You can pick another plan or try
                  again later.
                </p>
              </div>
            </main>
          </div>
        }
      />

      {/* Server edit page */}
      <Route path="/servers/:serverId/edit" element={<ServerEditPage />} />

      {/* In-app "panel" area */}
      <Route path="/app" element={<AppShell />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="players/:id" element={<PlayerDetailPage />} />
        <Route path="moderation" element={<ModerationPage />} />
        {/* 🔴 logs route removed */}
      </Route>
    </Routes>
  )
}

export default App
