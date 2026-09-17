export interface User {
    id: number
    name: string
    email: string
    role?: string
    is_admin?: boolean
    permissions?: string[]
}

export interface LoginResponse {
    token: string
    user: User
}

export interface ApiError {
    message?: string
    errors?: Record<string, string[]>
}