import { useDashboardData } from './useDashboardData'
import { StatsGrid } from './StatsGrid'
import { RecentOrdersTable } from './RecentOrdersTable'
import { PendingReviewsBanner } from './PendingReviewsBanner'
import { DashboardLoading, DashboardError } from './DashboardState'

export default function Dashboard() {
    const { loading, error, data, reload } = useDashboardData()

    if (loading) return <DashboardLoading />
    if (error) return <DashboardError message={error} onRetry={reload} />

    const newsCount = data.stats?.news?.published ?? 0
    const restaurantsCount = data.stats?.restaurants?.active ?? 0
    const pendingReviewsCount = data.stats?.reviews?.pending ?? 0
    const newOrdersCount = data.stats?.orders?.new_orders ?? 0

    const stats = [
        { label: 'Новостей', value: newsCount, to: '/admin/news' },
        { label: 'Ресторанов', value: restaurantsCount, to: '/admin/restaurants' },
        { label: 'Отзывов (ожид)', value: pendingReviewsCount, to: '/admin/reviews' },
        { label: 'Новых заказов', value: newOrdersCount, to: '/admin/orders' },
    ]

    return (
        <div>
            <StatsGrid stats={stats} />
            <RecentOrdersTable orders={data.recent_orders ?? []} />
            <PendingReviewsBanner count={pendingReviewsCount} />
        </div>
    )
}