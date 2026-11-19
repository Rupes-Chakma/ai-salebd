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

function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#171326] p-5 lg:block">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-500">
          <Store size={22} />
        </div>

        <div>
          <h2 className="text-xl font-extrabold tracking-wide">NEXORA</h2>
          <p className="text-xs text-[#AAA3C1]">Admin Panel</p>
        </div>
      </div>

      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#AAA3C1]">
        Management
      </p>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-purple-600/20 text-[#B99AFF]"
                    : "text-[#AAA3C1] hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-10 border-t border-white/10 pt-5">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#AAA3C1] transition hover:bg-white/5 hover:text-white"
        >
          <Store size={19} />
          Visit Store
        </NavLink>
      </div>
    </aside>
  );
}

export default AdminSidebar;
