// src/App.jsx

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom'

// Marketing / public pages
import HomePage from './pages/HomePage'
import DocsPage from './pages/DocsPage'
import CommunityPage from './pages/CommunityPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import FeaturesPage from './pages/FeaturesPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SecurityPage from './pages/SecurityPage'

// App (logged-in area)
import AppShell from './app/AppShell'
import DashboardPage from './app/DashboardPage'
import PlayersPage from './app/PlayersPage'
import PlayerDetailPage from './app/PlayerDetailPage'
import ModerationPage from './app/ModerationPage'
import ServerLogsPage from './app/ServerLogsPage'

// This little button floats in the top-left
function HomeOverlayButton() {
  return (
    <div className="fixed left-3 top-3 z-50">
      <Link
        to="/"
        className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950/90 px-3 py-1.5 text-[11px] font-medium text-slate-100 shadow-md shadow-black/40 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-cyan-500/30"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span>Back to TorquePanel home</span>
      </Link>
    </div>
  )
}

// Inner component that can use useLocation()
function AppLayout() {
  const location = useLocation()
  const showHomeButton = location.pathname !== '/'

  return (
    <>
      {/* floating home button is shown on all pages EXCEPT the homepage */}
      {showHomeButton && <HomeOverlayButton />}

      <Routes>
        {/* Marketing / public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* App shell + nested routes */}
        <Route path="/app" element={<AppShell />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="players" element={<PlayersPage />} />
          <Route path="players/:playerId" element={<PlayerDetailPage />} />
          <Route path="moderation" element={<ModerationPage />} />
          <Route path="server-logs" element={<ServerLogsPage />} />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
