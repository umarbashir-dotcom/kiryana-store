import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopBar from "../components/AdminTopBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner"

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <>
        
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />

            <div className="lg:pl-72">
                <AdminTopBar onMenuClick={openSidebar} />

                <main className="px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
                    <div className="mx-auto w-full max-w-[1600px]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
        <Toaster
        position="bottom-right"
        richColors
        closeButton
        duration={4000}
        expand={false}
      />
        </>
    );
};

export default AdminLayout;