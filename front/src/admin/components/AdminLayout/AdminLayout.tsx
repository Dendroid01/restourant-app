import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import AdminTopbar from '../AdminTopbar/AdminTopbar';
import '../../styles/admin.css';

const AdminLayout: React.FC = () => {
    return (
        <div className="bg-color-gray-50 text-gray-900 min-h-full">
            <div className="flex flex-row">
                <AdminSidebar />
                <div className="w-full flex flex-col">
                    <AdminTopbar />
                    <div className="p-7">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;