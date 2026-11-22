import { NavLink } from "react-router-dom";
import {
  Home,
  Store,
  Gamepad2,
  Sparkles,
  Crown,
  Gift,
  ClipboardList,
  Monitor,
  Film,
  Layers,
} from "lucide-react";

import useCategoryStore from "../../store/useCategoryStore";

const categoryIcons = {
  Gaming: Gamepad2,
  "AI Tools": Sparkles,
  Subscriptions: Crown,
  "Gift Cards": Gift,
  Software: Monitor,
  Entertainment: Film,
};

const Navbar = () => {
  const categories = useCategoryStore((state) => state.categories);

  const activeCategories = Array.isArray(categories)
    ? categories
        .filter(
          (category) =>
            category.status === "Active" && category.name && category.slug,
        )
        .sort((a, b) => {
          if (a.name === "AI Tools") return -1;
          if (b.name === "AI Tools") return 1;
          return 0;
        })
    : [];

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Shop", path: "/shop", icon: Store },
    ...activeCategories.map((category) => ({
      label: category.name,
      path: `/category/${category.slug}`,
      icon: categoryIcons[category.name] || Layers,
    })),
    { label: "My Orders", path: "/my-orders", icon: ClipboardList },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="hidden w-full border-b border-white/10 bg-[#11101C] md:block"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 lg:px-8">
        <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-center gap-1 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#8B5CF6]/15 text-[#B99AFF]"
                        : "text-[#AAA3C1] hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        className={
                          isActive ? "text-[#8B5CF6]" : "text-[#AAA3C1]"
                        }
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        <NavLink
          to="/deals"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/10 transition hover:brightness-110"
        >
          <Sparkles size={17} />
          <span>Special Deals</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
