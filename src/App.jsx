// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'

// Marketing / public pages
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SecurityPage from './pages/SecurityPage'
import PricingPage from './pages/PricingPage'
import AccountPage from './pages/AccountPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

// In-app panel pages (admin / server management)
import AppShell from './app/AppShell'
import DashboardPage from './app/DashboardPage'
import PlayersPage from './app/PlayersPage'
import PlayerDetailPage from './app/PlayerDetailPage'
import ModerationPage from './app/ModerationPage'
import ServerLogsPage from './app/ServerLogsPage'

function App() {
  return (
    <Routes>
      {/* Public / marketing pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* In-app panel area */}
      <Route path="/app" element={<AppShell />}>
        {/* default /app goes to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="players/:playerId" element={<PlayerDetailPage />} />
        <Route path="moderation" element={<ModerationPage />} />
        <Route path="server-logs" element={<ServerLogsPage />} />
      </Route>

      {/* Fallback: unknown routes → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
