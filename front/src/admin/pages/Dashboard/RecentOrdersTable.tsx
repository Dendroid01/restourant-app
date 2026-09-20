import {Link} from 'react-router-dom'
import StatusBadge from '@/admin/components/StatusBadge/StatusBadge'
import type {RecentOrder} from './types'

interface Props {
    orders: RecentOrder[]
}

const thClass =
    'px-4 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-disabled border-b border-solid border-gray-300'

const tdClass =
    'px-4 py-3.5 text-left text-sm border-b border-solid border-gray-300 group-hover:bg-gray-50'

export function RecentOrdersTable({orders}: Props) {
    if (orders.length === 0) return null

    return (
        <div className="mb-7">
            <div className="flex justify-between items-center mb-3.5">
                <h2 className="font-sans text-xl font-normal">Последние заказы</h2>
                <Link
                    to="/admin/orders"
                    className="text-sm font-sans font-bold text-red no-underline"
                >
                    Все заказы →
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-solid border-gray-200 overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                    <tr>
                        <th className={thClass}>ID</th>
                        <th className={thClass}>Тип</th>
                        <th className={thClass}>Клиент</th>
                        <th className={thClass}>Ресторан</th>
                        <th className={thClass}>Дата</th>
                        <th className={thClass}>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, idx) => (
                        <tr
                            key={idx}
                            className="group [&:last-child_td]:border-b-0"
                        >
                            <td className={tdClass}>{order.id}</td>
                            <td className={tdClass}>{order.type_label}</td>
                            <td className={tdClass}>{order.client}</td>
                            <td className={tdClass}>{order.restaurant || '—'}</td>
                            <td className={tdClass}>{order.date}</td>
                            <td className={tdClass}>
                                <StatusBadge status={order.status}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}