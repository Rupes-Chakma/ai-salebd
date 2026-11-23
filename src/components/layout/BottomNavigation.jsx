import { NavLink } from "react-router-dom";
import {
  Home,
  Store,
  ShoppingCart,
  ClipboardList,
  UserRound,
  Gamepad2,
  Sparkles,
  Crown,
  Gift,
  Monitor,
  Film,
  Layers,
} from "lucide-react";

import useCartStore from "../../store/cartStore";
import useCategoryStore from "../../store/useCategoryStore";

const categoryIcons = {
  Gaming: Gamepad2,
  "AI Tools": Sparkles,
  Subscriptions: Crown,
  "Gift Cards": Gift,
  Software: Monitor,
  Entertainment: Film,
};

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Shop", path: "/shop", icon: Store },
  { label: "Cart", path: "/cart", icon: ShoppingCart },
  { label: "Orders", path: "/my-orders", icon: ClipboardList },
  { label: "Account", path: "/account", icon: UserRound },
];

const BottomNavigation = () => {
  const cartCount = useCartStore((state) => state.getCartCount());
  const categories = useCategoryStore((state) => state.categories);

  const activeCategories = Array.isArray(categories)
    ? categories.filter(
        (category) =>
          category &&
          category.status === "Active" &&
          category.slug &&
          category.name,
      )
    : [];

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-[80] w-full border-t border-white/[0.08] bg-[#0B0D0B] shadow-[0_-8px_30px_rgba(0,0,0,0.35)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Scrollable Category Navigation */}
      {activeCategories.length > 0 && (
        <div className="w-full min-w-0 border-b border-white/[0.07] bg-[#111411]">
          <div
            className="w-full overflow-x-auto overscroll-x-contain touch-pan-x"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            <div className="flex w-max min-w-full flex-nowrap items-center gap-2 px-3 py-2.5">
              {activeCategories.map((category) => {
                const Icon = categoryIcons[category.name] || Layers;

                return (
                  <NavLink
                    key={category.id || category.slug}
                    to={`/category/${category.slug}`}
                    className={({ isActive }) =>
                      `flex min-h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? "border-red-500/40 bg-red-500/[0.08] text-red-400"
                          : "border-white/[0.08] bg-[#171B17] text-[#A3AAA3] hover:border-green-500/30 hover:text-green-400 active:bg-[#1D241D]"
                      }`
                    }
                  >
                    <Icon size={14} />
                    <span>{category.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Navigation */}
      <div className="mx-auto grid min-h-16 w-full max-w-lg grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              aria-label={item.label}
              className={({ isActive }) =>
                `relative flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-2 transition-colors duration-200 ${
                  isActive ? "text-red-400" : "text-[#858E85] active:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute top-0 h-[2px] w-7 rounded-full bg-[#DC2626]" />
                  )}

                  {/* Icon */}
                  <span className="relative flex items-center justify-center">
                    <Icon size={21} strokeWidth={isActive ? 2.4 : 1.8} />

                    {/* Cart Badge */}
                    {item.label === "Cart" && cartCount > 0 && (
                      <span className="absolute -right-3 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border border-[#0B0D0B] bg-[#16A34A] px-1 text-[10px] font-bold leading-none text-white">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </span>

                  {/* Label */}
                  <span
                    className={`max-w-full truncate text-[10px] leading-tight ${
                      isActive ? "font-bold" : "font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
