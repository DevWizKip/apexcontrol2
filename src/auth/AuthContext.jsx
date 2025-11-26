// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const API_BASE = 'http://localhost:3001'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // On first load, try to restore from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('torquepanel_auth')
      if (stored) {
        const parsed = JSON.parse(stored)
        setUser(parsed.user || null)
        setToken(parsed.token || null)
      }
    } catch (err) {
      console.error('Failed to load auth from localStorage', err)
    } finally {
      setLoading(false)
    }
  }, [])

  function saveAuth(nextUser, nextToken) {
    setUser(nextUser)
    setToken(nextToken)
    if (nextUser && nextToken) {
      localStorage.setItem(
        'torquepanel_auth',
        JSON.stringify({ user: nextUser, token: nextToken })
      )
    } else {
      localStorage.removeItem('torquepanel_auth')
    }
  }

  async function signup({ name, email, password }) {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'Signup failed')
    }
    saveAuth(data.user, data.token)
  }

  async function login({ email, password }) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'Login failed')
    }
    saveAuth(data.user, data.token)
  }

  function logout() {
    saveAuth(null, null)
  }

  const value = {
    user,
    token,
    isLoggedIn: !!user && !!token,
    loading,
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
