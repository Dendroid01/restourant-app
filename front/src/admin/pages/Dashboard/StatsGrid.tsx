import {Link} from 'react-router-dom'

interface StatItem {
    label: string
    value: number
    to: string
}

interface Props {
    stats: StatItem[]
}

export function StatsGrid({stats}: Props) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mb-8">
            {stats.map((s) => (
                <Link key={s.label} to={s.to} className="no-underline">
                    <div
                        className=' bg-white p-5 rounded-2xl border border-solid border-gray-200 transition-all cursor-pointer hover:shadow-lg'>
                        <div className="text-sm text-brown-50 mb-1.5">{s.label}</div>
                        <div className="font-sans text-4xl text-red-dark">{s.value}</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}