// src/App.jsx
import { Routes, Route } from 'react-router-dom'

// Marketing pages
import HomePage from './pages/HomePage.jsx'
import FeaturesPage from './pages/FeaturesPage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import DocsPage from './pages/DocsPage.jsx'
import CommunityPage from './pages/CommunityPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

// Admin app
import AppShell from './app/AppShell.jsx'
import DashboardPage from './app/DashboardPage.jsx'
import PlayersPage from './app/PlayersPage.jsx'
import PlayerDetailPage from './app/PlayerDetailPage.jsx'
import ModerationPage from './app/ModerationPage.jsx'

function App() {
  return (
    <Routes>
      {/* Marketing site */}
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Admin app layout */}
      <Route path="/app" element={<AppShell />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="players/:id" element={<PlayerDetailPage />} />
        <Route path="moderation" element={<ModerationPage />} />
      </Route>
    </Routes>
  )
}

export default App

