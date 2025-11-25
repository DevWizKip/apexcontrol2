// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // On first load, try to restore from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('torquepanel_user')
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch (err) {
      console.error('Failed to read user from localStorage', err)
    }
  }, [])

  // Save any changes to user into localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('torquepanel_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('torquepanel_user')
      }
    } catch (err) {
      console.error('Failed to write user to localStorage', err)
    }
  }, [user])

  function login({ name, email, role }) {
    const newUser = {
      id: email || name || 'local-user',
      name: name || 'Unnamed',
      email: email || '',
      role: role || 'owner', // owner | staff | dev
      createdAt: new Date().toISOString(),
    }
    setUser(newUser)
  }

  function logout() {
    setUser(null)
  }

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
