import {Link} from 'react-router-dom'

interface Props {
    count: number
}

export function PendingReviewsBanner({count}: Props) {
    if (count <= 0) return null

    return (
        <div className="flex justify-between items-center rounded-xl border border-navy bg-navy-100 px-5 py-4">
            <span className="text-sm text-info">
                ⏳ Ожидают проверки <strong>{count}</strong> отзывов
            </span>
            <Link
                to="/admin/reviews"
                className="inline-flex items-center justify-center gap-1 px-4 py-3 rounded-4xl border-0 font-sans text-sm font-medium pointer transition-all bg-red text-white hover:bg-red"
            >
                Проверить
            </Link>
        </div>
    )
}