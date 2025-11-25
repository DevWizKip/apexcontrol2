// src/App.jsx
// This file defines all the routes (URLs) for the app.
// It connects the marketing pages and the "app" section (dashboard, players, etc.)

import { Routes, Route } from 'react-router-dom'

// Marketing / public pages
import HomePage from './pages/HomePage.jsx'
import FeaturesPage from './pages/FeaturesPage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import DocsPage from './pages/DocsPage.jsx'
import CommunityPage from './pages/CommunityPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

// App shell + inner pages (admin area)
import AppShell from './app/AppShell.jsx'
import DashboardPage from './app/DashboardPage.jsx'
import PlayersPage from './app/PlayersPage.jsx'
import PlayerDetailPage from './app/PlayerDetailPage.jsx'
import ModerationPage from './app/ModerationPage.jsx'

function App() {
  return (
    <>
      {/*
        Routes decides which page to show based on the current URL.
        Example:
        - "/"          -> HomePage
        - "/pricing"   -> PricingPage
        - "/app/..."   -> pages inside AppShell (dashboard, players, etc.)
      */}
      <Routes>
        {/* Public marketing pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/community" element={<CommunityPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/*
          /app routes are wrapped by AppShell.
          AppShell gives us the left sidebar and top bar.
          Inside it we use <Outlet /> to show the inner pages.
        */}
        <Route path="/app" element={<AppShell />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="players" element={<PlayersPage />} />
          <Route path="players/:id" element={<PlayerDetailPage />} />
          <Route path="moderation" element={<ModerationPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
