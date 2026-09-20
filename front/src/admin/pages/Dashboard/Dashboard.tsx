import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminDashboard } from '@/api/admin.js'
import StatusBadge from '../../components/StatusBadge/StatusBadge'

interface DashboardStats {
    news?: {
        published?: number
    }
    restaurants?: {
        active?: number
    }
    reviews?: {
        pending?: number
    }
    orders?: {
        new_orders?: number
    }
}

interface RecentOrder {
    id: string | number
    type_label: string
    client: string
    restaurant?: string | null
    date: string
    status: string
}

interface PendingReview {
    id: string | number
        [key: string]: unknown
}

interface QuickAction {
    label?: string
    to?: string
        [key: string]: unknown
}

interface DashboardData {
    stats?: DashboardStats
    recent_orders?: RecentOrder[]
    pending_reviews?: PendingReview[]
    quick_actions?: QuickAction[]
}

interface DashboardResponse {
    success: boolean
    data?: DashboardData
}

export default function Dashboard() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        stats: {},
        recent_orders: [],
        pending_reviews: [],
        quick_actions: [],
    })

    useEffect(() => {
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = (await adminDashboard.stats()) as DashboardResponse

            if (response.success && response.data) {
                setDashboardData(response.data)
            } else {
                throw new Error('Неверный формат ответа')
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
    }

    const newsCount = dashboardData.stats?.news?.published ?? 0
    const restaurantsCount = dashboardData.stats?.restaurants?.active ?? 0
    const pendingReviewsCount = dashboardData.stats?.reviews?.pending ?? 0
    const newOrdersCount = dashboardData.stats?.orders?.new_orders ?? 0

    const stats: Array<{ label: string; value: number; to: string }> = [
        { label: 'Новостей', value: newsCount, to: '/admin/news' },
        { label: 'Ресторанов', value: restaurantsCount, to: '/admin/restaurants' },
        { label: 'Отзывов (ожид)', value: pendingReviewsCount, to: '/admin/reviews' },
        { label: 'Новых заказов', value: newOrdersCount, to: '/admin/orders' },
    ]

    const recentOrders = dashboardData.recent_orders ?? []

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: 18, color: '#666' }}>
                    Загрузка данных дашборда...
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div
                    style={{
                        color: 'var(--state-error)',
                        marginBottom: 16,
                        fontSize: 16,
                    }}
                >
                    ⚠️ {error}
                </div>
                <button
                    onClick={loadDashboardData}
                    className="btn-admin btn-admin-primary"
                    style={{ padding: '8px 20px' }}
                >
                    Попробовать снова
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className="stats-grid">
                {stats.map((s) => (
                    <Link to={s.to} key={s.label} style={{ textDecoration: 'none' }}>
                        <div
                            className="stat-card"
                            style={{
                                cursor: 'pointer',
                                transition: 'box-shadow 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow =
                                    '0 6px 20px rgba(0,0,0,0.1)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = ''
                            }}
                        >
                            <div className="stat-label">{s.label}</div>
                            <div className="stat-value">{s.value}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {recentOrders.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 14,
                        }}
                    >
                        <h2
                            style={{
                                fontFamily: 'Georgia, serif',
                                fontSize: 20,
                                fontWeight: 400,
                            }}
                        >
                            Последние заказы
                        </h2>
                        <Link
                            to="/admin/orders"
                            style={{
                                fontSize: 13,
                                color: 'var(--red-default)',
                                textDecoration: 'none',
                            }}
                        >
                            Все заказы →
                        </Link>
                    </div>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Тип</th>
                                <th>Клиент</th>
                                <th>Ресторан</th>
                                <th>Дата</th>
                                <th>Статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recentOrders.map((order, idx) => (
                                <tr key={idx}>
                                    <td>{order.id}</td>
                                    <td>{order.type_label}</td>
                                    <td>{order.client}</td>
                                    <td>{order.restaurant || '—'}</td>
                                    <td>{order.date}</td>
                                    <td>
                                        <StatusBadge status={order.status} />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {pendingReviewsCount > 0 && (
                <div
                    style={{
                        background: 'rgba(36,104,170,0.08)',
                        border: '1px solid rgba(36,104,170,0.2)',
                        borderRadius: 12,
                        padding: '16px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <span style={{ fontSize: 14, color: 'var(--state-info)' }}>
                        ⏳ Ожидают проверки <strong>{pendingReviewsCount}</strong> отзывов
                    </span>
                    <Link
                        to="/admin/reviews"
                        className="btn-admin btn-admin-primary"
                        style={{
                            textDecoration: 'none',
                            padding: '6px 16px',
                            fontSize: 13,
                        }}
                    >
                        Проверить
                    </Link>
                </div>
            )}
        </div>
    )
}