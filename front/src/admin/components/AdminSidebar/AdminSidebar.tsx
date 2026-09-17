import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

interface NavItem {
    to: string;
    icon: string;
    label: string;
    permission: string | null;
}

const NAV: NavItem[] = [
    {to: '/admin', icon: '📊', label: 'Дашборд', permission: null},
    {to: '/admin/news', icon: '📰', label: 'Новости', permission: 'news'},
    {to: '/admin/restaurants', icon: '🏛️', label: 'Рестораны', permission: 'restaurants'},
    {to: '/admin/menu', icon: '🍽️', label: 'Меню', permission: 'menu'},
    {to: '/admin/pages', icon: '📄', label: 'Страницы', permission: 'pages'},
    {to: '/admin/reviews', icon: '⭐', label: 'Отзывы', permission: 'reviews'},
    {to: '/admin/orders', icon: '📞', label: 'Заказы', permission: 'orders'},
    {to: '/admin/contacts', icon: '✉️', label: 'Сообщения', permission: 'contacts'},
    {to: '/admin/managers', icon: '👥', label: 'Менеджеры', permission: 'managers'},
];

const AdminSidebar: React.FC = () => {
    const {user, logout, isAdmin} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const canAccess = (item: NavItem): boolean => {
        if (!item.permission) return true;

        if (isAdmin) return true;

        return user?.permissions?.includes(item.permission) ?? false;
    };

    return (
        <aside
            className="flex flex-col shrink-0 w-70 bg-white border border-gray-300 px-4 py-7 sticky top-0 h-screen overflow-y-auto">
            <div className="text-serif text-2xl text-gold mb-7 pl-3">✦ RESTAURANT</div>
            <nav className="flex flex-col gap-1">
                {NAV.filter(canAccess).map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/admin'}
                        className={({isActive}) =>
                            `
                            flex items-center gap-2.5 px-2.5 py-3 rounded-xl transition-all text-brown-50 text-sm 
                            decoration-0 cursor-pointer border-0 font-medium bg-none w-full text-left 
                            hover:bg-gray-disabled hover:text-gray-900
                            ${
                                isActive
                                    ? 'bg-brown-200 text-red font-semibold'
                                    : ''
                            }`
                        }
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
                <button className="flex items-center gap-2.5 px-2.5 py-3 rounded-xl transition-all text-sm decoration-0
                cursor-pointer border-0 font-medium bg-none w-full text-left
                mt-auto text-gray-200 hover:bg-brown-200 hover:text-red" onClick={handleLogout}>
                    <span>🚪</span>
                    <span>Выход</span>
                </button>
            </nav>
        </aside>
    );
};

export default AdminSidebar;