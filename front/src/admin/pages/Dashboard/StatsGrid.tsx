import { Link } from 'react-router-dom'

interface StatItem {
    label: string
    value: number
    to: string
}

interface Props {
    stats: StatItem[]
}

export function StatsGrid({ stats }: Props) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mb-8">
            {stats.map((s) => (
                <Link key={s.label} to={s.to} className="no-underline">
                    <div className="stat-card cursor-pointer transition-shadow hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]">
                        <div className="stat-label">{s.label}</div>
                        <div className="stat-value">{s.value}</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}