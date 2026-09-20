export interface DashboardStats {
    news?: { published?: number }
    restaurants?: { active?: number }
    reviews?: { pending?: number }
    orders?: { new_orders?: number }
}

export interface RecentOrder {
    id: string | number
    type_label: string
    client: string
    restaurant?: string | null
    date: string
    status: string
}

export interface DashboardData {
    stats?: DashboardStats
    recent_orders?: RecentOrder[]
    pending_reviews?: unknown[]
    quick_actions?: unknown[]
}