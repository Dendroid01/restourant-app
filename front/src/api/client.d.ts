import type {User, LoginResponse} from './types'

declare const BASE: string

interface ApiClient {
    csrf: () => Promise<void>
    get: <T = any>(path: string) => Promise<T>
    post: <T = any, D = any>(path: string, data?: D, customOptions?: RequestInit) => Promise<T>
    patch: <T = any, D = any>(path: string, data?: D) => Promise<T>
    put: <T = any, D = any>(path: string, data?: D) => Promise<T>
    delete: <T = any>(path: string, data?: any) => Promise<T>
}

export const api: ApiClient
export const publicApi: {
    getRestaurants: () => Promise<any>
    createBooking: (data: any) => Promise<any>
    createEvent: (data: any) => Promise<any>
    getEventDishes: () => Promise<any>
}