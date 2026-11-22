import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  CreditCard,
  Truck,
  Users,
  TicketPercent,
  Image,
  Settings,
  Store,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Categories", path: "/admin/categories", icon: Tags },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Payments", path: "/admin/payments", icon: CreditCard },
  { name: "Deliveries", path: "/admin/deliveries", icon: Truck },
  { name: "Customers", path: "/admin/customers", icon: Users },
  { name: "Coupons", path: "/admin/coupons", icon: TicketPercent },
  { name: "Banners", path: "/admin/banners", icon: Image },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

function AdminSidebar({ isOpen = false, onClose = () => {} }) {
  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <div>
          <h2 className="text-xl font-extrabold tracking-wide">
            AI-Sale<span className="text-purple-400">BD</span>
          </h2>
          <p className="text-xs text-[#AAA3C1]">Admin Panel</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-[#AAA3C1] hover:bg-white/10 lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
                    : "text-[#AAA3C1] hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Visit Store */}
      <div className="border-t border-white/10 p-4">
        <NavLink
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#AAA3C1] transition hover:bg-white/5 hover:text-white"
        >
          <Store size={19} />
          Visit Store
        </NavLink>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#171326] lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-72 max-w-[85vw] flex-col border-r border-white/10 bg-[#171326] shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Admin navigation"
      >
        {sidebarContent}
      </aside>
    </>
  );
}

export default AdminSidebar;
