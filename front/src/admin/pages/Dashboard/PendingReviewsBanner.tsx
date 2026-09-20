import { Link } from 'react-router-dom'

interface Props {
    count: number
}

export function PendingReviewsBanner({ count }: Props) {
    if (count <= 0) return null

    return (
        <div className="flex justify-between items-center rounded-xl border border-[rgba(36,104,170,0.2)] bg-[rgba(36,104,170,0.08)] px-5 py-4">
            <span className="text-sm text-[var(--state-info)]">
                ⏳ Ожидают проверки <strong>{count}</strong> отзывов
            </span>
            <Link
                to="/admin/reviews"
                className="btn-admin btn-admin-primary no-underline px-4 py-1.5 text-[13px]"
            >
                Проверить
            </Link>
        </div>
    )
}