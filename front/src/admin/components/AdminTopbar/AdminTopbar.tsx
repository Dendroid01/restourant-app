import {useLocation} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'

const TITLES: Record<string, string> = {
    '/admin': 'Дашборд',
    '/admin/news': 'Новости',
    '/admin/restaurants': 'Рестораны',
    '/admin/menu': 'Меню',
    '/admin/pages': 'Страницы',
    '/admin/reviews': 'Отзывы',
    '/admin/orders': 'Заказы',
    '/admin/managers': 'Менеджеры',
}

export default function AdminTopbar() {
    const {pathname} = useLocation()
    const {user} = useAuth()
    const initials =
        user?.name
            ?.split(' ')
            .map((w: string) => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase() ?? 'A'

    return (
        <div
            className=" flex bg-white border border-solid border-gray-300 px-4 py-6 justify-between items-center sticky top-0 z-50">
            <h1 className="font-serif text-2xl font-regular">{TITLES[pathname] ?? 'Админпанель'}</h1>
            <div className="flex items-center gap-2.5 text-sm">
                <span>{user?.name}</span>
                <div className="flex items-center justify-center w-9 h-9 bg-gray-disabled rounded-full text-sm font-bold color-brown-50">{initials}</div>
            </div>
        </div>
    )
}