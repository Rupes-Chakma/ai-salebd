import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#11101C] text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
