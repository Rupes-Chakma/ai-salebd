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
        .filter((category) => category.status === "Active")
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
    <nav className="hidden border-b border-white/10 bg-[#11101C] md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-1 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 ${
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
                      className={isActive ? "text-[#8B5CF6]" : "text-[#AAA3C1]"}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        <NavLink
          to="/deals"
          className="ml-3 flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/10 transition hover:scale-105"
        >
          <Sparkles size={17} />
          Special Deals
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
