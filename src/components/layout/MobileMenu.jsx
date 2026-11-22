import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Home,
  Store,
  Gamepad2,
  Sparkles,
  Crown,
  Gift,
  UserRound,
  Headphones,
  Monitor,
  Film,
  Layers,
  Tag,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import useCategoryStore from "../../store/useCategoryStore";

const categoryIcons = {
  Gaming: Gamepad2,
  "AI Tools": Sparkles,
  Subscriptions: Crown,
  "Gift Cards": Gift,
  Software: Monitor,
  Entertainment: Film,
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const categories = useCategoryStore((state) => state.categories);

  const activeCategories = useMemo(() => {
    return Array.isArray(categories)
      ? categories.filter(
          (category) =>
            category &&
            category.status === "Active" &&
            category.slug &&
            category.name,
        )
      : [];
  }, [categories]);

  const closeMenu = () => {
    setIsOpen(false);
    setSearch("");
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) return;

    closeMenu();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const menuItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Shop All Products", path: "/shop", icon: Store },
    { label: "Special Deals", path: "/deals", icon: Tag },
  ];

  return (
    <>
      {/* Menu Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white transition hover:border-[#8B5CF6]/50 hover:bg-white/[0.07] active:scale-95 md:hidden"
      >
        <Menu size={21} />
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[90] cursor-default bg-black/65 backdrop-blur-[2px] md:hidden"
            />

            {/* Side Panel */}
            <motion.aside
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 32,
              }}
              className="fixed right-0 top-0 z-[100] flex h-[100dvh] w-[min(88vw,360px)] flex-col overflow-hidden border-l border-white/10 bg-[#171329] shadow-2xl md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-4">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="flex items-center gap-2.5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#2563EB]">
                    <Sparkles size={21} className="text-white" />
                  </div>

                  <div>
                    <p className="text-lg font-black tracking-tight text-white">
                      AI-SaleBD<span className="text-[#A78BFA]">.</span>
                    </p>
                    <p className="text-[9px] font-semibold tracking-[0.14em] text-[#AAA3C1]">
                      PREMIUM AI MARKETPLACE
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-[#AAA3C1] transition hover:bg-white/5 hover:text-white active:scale-95"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="shrink-0 px-4 py-4">
                <form onSubmit={handleSearch}>
                  <div className="flex min-h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#211B3B] px-3 transition focus-within:border-[#8B5CF6]/70 focus-within:shadow-lg focus-within:shadow-purple-500/10">
                    <Search size={18} className="shrink-0 text-[#AAA3C1]" />

                    <input
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search products..."
                      aria-label="Search digital products"
                      className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-[#817A9A]"
                    />

                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        aria-label="Clear search"
                        className="flex h-8 w-8 items-center justify-center text-[#AAA3C1] hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Scrollable Menu Content */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-5">
                {/* Main Navigation */}
                <div className="mb-5">
                  <p className="mb-2 px-2 text-[10px] font-bold tracking-[0.16em] text-[#817A9A]">
                    MAIN MENU
                  </p>

                  <nav className="space-y-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={closeMenu}
                          className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#DDD6FE] transition hover:bg-[#8B5CF6]/10 hover:text-white active:bg-[#8B5CF6]/20"
                        >
                          <Icon size={19} className="text-[#A78BFA]" />
                          <span className="flex-1">{item.label}</span>
                          <ChevronRight size={16} className="text-[#817A9A]" />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Categories */}
                {activeCategories.length > 0 && (
                  <div className="mb-5">
                    <div className="mb-2 flex items-center justify-between px-2">
                      <p className="text-[10px] font-bold tracking-[0.16em] text-[#817A9A]">
                        SHOP BY CATEGORY
                      </p>
                      <span className="text-[10px] text-[#817A9A]">
                        {activeCategories.length} Categories
                      </span>
                    </div>

                    <nav className="space-y-1">
                      {activeCategories.map((category) => {
                        const Icon = categoryIcons[category.name] || Layers;

                        return (
                          <Link
                            key={category.id || category.slug}
                            to={`/category/${category.slug}`}
                            onClick={closeMenu}
                            className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#AAA3C1] transition hover:bg-[#8B5CF6]/10 hover:text-white active:bg-[#8B5CF6]/20"
                          >
                            <Icon size={19} className="text-[#A78BFA]" />
                            <span className="flex-1">{category.name}</span>
                            <ChevronRight
                              size={16}
                              className="text-[#817A9A]"
                            />
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                )}

                {/* Account & Support */}
                <div>
                  <p className="mb-2 px-2 text-[10px] font-bold tracking-[0.16em] text-[#817A9A]">
                    ACCOUNT & SUPPORT
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3 text-xs font-semibold text-white transition hover:border-[#8B5CF6]/50 hover:bg-white/[0.06] active:scale-[0.98]"
                    >
                      <UserRound size={17} className="text-[#A78BFA]" />
                      Login
                    </Link>

                    <Link
                      to="/contact"
                      onClick={closeMenu}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-2 py-3 text-xs font-semibold text-white transition hover:brightness-110 active:scale-[0.98]"
                    >
                      <Headphones size={17} />
                      Support
                    </Link>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="shrink-0 border-t border-white/10 px-4 py-3 text-center">
                <p className="text-[10px] font-medium text-[#817A9A]">
                  © {new Date().getFullYear()} AI-SaleBD. All rights reserved.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
