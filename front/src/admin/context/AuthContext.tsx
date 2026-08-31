import React, {createContext, useContext, useState, useCallback, useEffect, ReactNode} from 'react'
import {api} from '@/api/client'
import type {User} from '@/api/types'

interface AuthContextType {
    user: User | null
    token: string | null
    login: (email: string, password: string) => Promise<User>
    logout: () => Promise<void>
    loading: boolean
    isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'))

    useEffect(() => {
        const loadUser = async () => {
                const storedToken = localStorage.getItem('admin_token')
                if (!storedToken) {
                    setLoading(false)
                    return
                }

                try {
                    const response = await api.get<{ user: User }>('/admin/me')
                    setUser(response.user)
                } catch (error) {
                    console.error('Failed to load user:', error)
                    localStorage.removeItem('admin_token')
                    setToken(null)
                    setUser(null)
                } finally {
                    setLoading(false)
                }
            }

        ;(async () => {
            try {
                await loadUser()
            } catch (error) {
                console.error('Unexpected error in loadUser:', error)
            }
        })()
    }, [])

    const login = useCallback(async (email: string, password: string) => {
        try {
            await api.csrf()
            const response = await api.post<{ token: string; user: User }>('/admin/login', {
                email,
                password,
                device_name: 'web',
            })

            const {token: newToken, user: userData} = response

            localStorage.setItem('admin_token', newToken)
            setToken(newToken)
            setUser(userData)

            return userData
        } catch (error: any) {
            if (error.body?.errors) {
                const firstError = Object.values(error.body.errors)[0]?.[0]
                throw new Error(firstError || 'Ошибка входа')
            }
            throw new Error(error.message || 'Неверный email или пароль')
        }
    }, [])

    const logout = useCallback(async () => {
        try {
            await api.post('/admin/logout')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            localStorage.removeItem('admin_token')
            setToken(null)
            setUser(null)
        }
    }, [])

    const value: AuthContextType = {
        user,
        token,
        login,
        logout,
        loading,
        isAdmin: user?.role === 'admin' || user?.is_admin === true,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}