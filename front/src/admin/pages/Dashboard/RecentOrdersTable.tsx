import { Link } from 'react-router-dom'
import StatusBadge from '@/admin/components/StatusBadge/StatusBadge'
import type { RecentOrder } from './types'

interface Props {
    orders: RecentOrder[]
}

export function RecentOrdersTable({ orders }: Props) {
    if (orders.length === 0) return null

    return (
        <div className="mb-7">
            <div className="flex justify-between items-center mb-3.5">
                <h2 className="font-serif text-xl font-normal">
                    Последние заказы
                </h2>
                <Link
                    to="/admin/orders"
                    className="text-[13px] text-[var(--red-default)] no-underline"
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
                    {orders.map((order, idx) => (
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
    )
}