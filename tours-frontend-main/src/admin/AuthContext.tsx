import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { API_URL } from '../config'

type AuthState = { token: string; username: string } | null

interface AuthCtx {
  auth: AuthState
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const Ctx = createContext<AuthCtx>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    try { return JSON.parse(localStorage.getItem('bmdt_admin') ?? 'null') }
    catch { return null }
  })

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) throw new Error('Invalid credentials')
    const data = await res.json()
    const state = { token: data.token, username: data.username }
    setAuth(state)
    localStorage.setItem('bmdt_admin', JSON.stringify(state))
  }

  const logout = () => {
    setAuth(null)
    localStorage.removeItem('bmdt_admin')
  }

  return <Ctx.Provider value={{ auth, login, logout }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)

/** Authenticated fetch helper */
export function useApi() {
  const { auth } = useAuth()
  const token = auth?.token ?? ''
  
  return useCallback((url: string, options: RequestInit = {}) => {
    const isFormData = options.body instanceof FormData
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    }
    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }

    return fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers ?? {}),
      },
    })
  }, [token])
}
