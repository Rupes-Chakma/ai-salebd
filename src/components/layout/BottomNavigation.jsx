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
          category.status === "Active" && category.slug && category.name,
      )
    : [];

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-[80] w-full border-t border-white/10 bg-[#171329] shadow-[0_-8px_30px_rgba(0,0,0,0.3)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Scrollable Category Navigation */}
      {activeCategories.length > 0 && (
        <div className="w-full min-w-0 border-b border-white/10">
          <div
            className="w-full overflow-x-auto overscroll-x-contain touch-pan-x"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            <div className="flex w-max min-w-full flex-nowrap items-center gap-2 px-3 py-2">
              {activeCategories.map((category) => {
                const Icon = categoryIcons[category.name] || Layers;

                return (
                  <NavLink
                    key={category.id || category.slug}
                    to={`/category/${category.slug}`}
                    className={({ isActive }) =>
                      `flex min-h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-xs font-medium transition-colors ${
                        isActive
                          ? "border-[#8B5CF6]/60 bg-[#8B5CF6]/20 text-[#C4A7FF]"
                          : "border-white/10 bg-white/5 text-[#AAA3C1] active:bg-white/10"
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
                `relative flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-2 transition-colors ${
                  isActive
                    ? "text-[#B99AFF]"
                    : "text-[#AAA3C1] active:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative flex items-center justify-center">
                    <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />

                    {item.label === "Cart" && cartCount > 0 && (
                      <span className="absolute -right-3 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </span>

                  <span className="max-w-full truncate text-[10px] font-medium leading-tight">
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="absolute top-0 h-0.5 w-7 rounded-full bg-[#B99AFF]" />
                  )}
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
