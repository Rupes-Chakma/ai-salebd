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

const BottomNavigation = () => {
  const cartCount = useCartStore((state) => state.getCartCount());
  const categories = useCategoryStore((state) => state.categories);

  const activeCategories = Array.isArray(categories)
    ? categories.filter((category) => category.status === "Active")
    : [];

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Shop", path: "/shop", icon: Store },
    { label: "Cart", path: "/cart", icon: ShoppingCart },
    { label: "Orders", path: "/my-orders", icon: ClipboardList },
    { label: "Account", path: "/account", icon: UserRound },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#171329]/95 backdrop-blur-xl md:hidden">
      {/* Dynamic Categories */}
      {activeCategories.length > 0 && (
        <div className="border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {activeCategories.map((category) => {
              const Icon = categoryIcons[category.name] || Layers;

              return (
                <NavLink
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className={({ isActive }) =>
                    `flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition ${
                      isActive
                        ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/20 text-[#C4A7FF]"
                        : "border-white/10 bg-white/5 text-[#AAA3C1] hover:text-white"
                    }`
                  }
                >
                  <Icon size={14} />
                  {category.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Bottom Navigation */}
      <div className="mx-auto grid max-w-lg grid-cols-5 px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex min-h-[64px] flex-col items-center justify-center gap-1 transition ${
                  isActive
                    ? "text-[#B99AFF]"
                    : "text-[#AAA3C1] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />

                    {item.label === "Cart" && cartCount > 0 && (
                      <span className="absolute -right-3 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </span>

                  <span className="text-[10px] font-medium">{item.label}</span>
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
