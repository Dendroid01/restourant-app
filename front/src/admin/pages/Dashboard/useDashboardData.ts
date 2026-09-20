import { useCallback, useEffect, useState } from 'react'
import { adminDashboard } from '@/api/admin.js'
import type { DashboardData } from './types'

interface DashboardResponse {
    success: boolean
    data?: DashboardData
}

export function useDashboardData() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<DashboardData>({
        stats: {},
        recent_orders: [],
        pending_reviews: [],
        quick_actions: [],
    })

    const load = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = (await adminDashboard.stats()) as DashboardResponse

            if (response.success && response.data) {
                setData(response.data)
            } else {
                setError('Неверный формат ответа')
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Не удалось загрузить данные дашборда'

            setError(message)
            console.error('Failed to load dashboard:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        load()
    }, [load])

    return { loading, error, data, reload: load }
}