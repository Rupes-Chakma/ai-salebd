import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  ChevronRight,
  ArrowUpRight,
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

const menuItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Shop All Products", path: "/shop", icon: Store },
];

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
      if (event.key === "Escape") closeMenu();
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

  const navLinkClass = ({ isActive }) =>
    `group flex min-h-[54px] items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-all duration-200 ${
      isActive
        ? "border-red-500/20 bg-red-500/[0.08] text-white"
        : "border-transparent text-[#B8C0B8] hover:border-white/[0.06] hover:bg-white/[0.035] hover:text-white"
    }`;

  return (
    <>
      {/* Menu Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        className="
          relative flex h-11 w-11 items-center justify-center
          rounded-xl border border-white/10
          bg-[#151A16] text-white
          shadow-sm shadow-black/20
          transition-all duration-200
          hover:border-[#E11D48]/40
          hover:bg-[#1C211D]
          active:scale-95 md:hidden
        "
      >
        <Menu size={21} strokeWidth={2} />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeMenu}
              className="
                fixed inset-0 z-[90]
                cursor-default bg-black/75
                backdrop-blur-sm md:hidden
              "
            />

            {/* Drawer */}
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
                stiffness: 300,
                damping: 30,
              }}
              className="
                fixed right-0 top-0 z-[100]
                flex h-[100dvh] w-[min(88vw,390px)]
                flex-col overflow-hidden
                border-l border-white/[0.08]
                bg-[#0D100E]
                shadow-2xl shadow-black/50
                md:hidden
              "
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-5 py-4">
                <Link
                  to="/"
                  onClick={closeMenu}
                  aria-label="AI-SaleBD Home"
                  className="flex items-center gap-3"
                >
                  <div
                    className="
                    flex h-11 w-11 items-center justify-center
                    rounded-xl border border-white/10
                    bg-[#171C18]
                  "
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="h-8 w-8"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 86L45 15C47 10 53 10 55 15L92 86H70L50 47L30 86H8Z"
                        fill="#E11D48"
                      />
                      <path d="M39 86L50 65L61 86H39Z" fill="#16A34A" />
                    </svg>
                  </div>

                  <div className="leading-tight">
                    <p className="text-[19px] font-extrabold tracking-tight text-white">
                      AI-Sale<span className="text-[#E11D48]">BD.</span>
                    </p>
                    <p className="mt-1 text-[9px] font-semibold tracking-[0.16em] text-[#899389]">
                      PREMIUM DIGITAL STORE
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl border border-white/10
                    bg-[#151A16] text-[#A3ADA4]
                    transition-all duration-200
                    hover:border-[#E11D48]/40
                    hover:text-white
                    active:scale-95
                  "
                >
                  <X size={19} />
                </button>
              </div>

              {/* Search */}
              <div className="shrink-0 px-5 py-5">
                <form onSubmit={handleSearch}>
                  <label
                    htmlFor="mobile-menu-search"
                    className="mb-2 block text-[11px] font-semibold tracking-wide text-[#A3ADA4]"
                  >
                    FIND YOUR DIGITAL PRODUCT
                  </label>

                  <div
                    className="
                    flex min-h-[50px] items-center gap-3
                    rounded-xl border border-white/[0.10]
                    bg-[#151A16] px-3.5
                    transition-all duration-200
                    focus-within:border-[#E11D48]/50
                    focus-within:ring-2 focus-within:ring-[#E11D48]/10
                  "
                  >
                    <Search size={18} className="shrink-0 text-[#16A34A]" />

                    <input
                      id="mobile-menu-search"
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search products..."
                      aria-label="Search digital products"
                      className="
                        min-w-0 flex-1 bg-transparent
                        py-3 text-sm text-white
                        outline-none placeholder:text-[#737D78]
                      "
                    />

                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        aria-label="Clear search"
                        className="text-[#899389] transition hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Scrollable Content */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
                {/* Main Navigation */}
                <section className="mb-7">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[11px] font-bold tracking-[0.15em] text-[#899389]">
                      EXPLORE
                    </p>
                    <span className="h-px flex-1 ml-4 bg-white/[0.07]" />
                  </div>

                  <nav className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.path === "/"}
                          onClick={closeMenu}
                          className={navLinkClass}
                        >
                          {({ isActive }) => (
                            <>
                              <span
                                className={`
                                flex h-9 w-9 shrink-0 items-center justify-center
                                rounded-lg transition
                                ${
                                  isActive
                                    ? "bg-[#E11D48]/15 text-[#FB7185]"
                                    : "bg-white/[0.045] text-[#A3ADA4] group-hover:text-white"
                                }
                              `}
                              >
                                <Icon size={18} />
                              </span>

                              <span className="flex-1 text-[13px] font-semibold">
                                {item.label}
                              </span>

                              {isActive && (
                                <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
                              )}

                              <ChevronRight
                                size={16}
                                className="text-[#657067] transition group-hover:translate-x-0.5 group-hover:text-white"
                              />
                            </>
                          )}
                        </NavLink>
                      );
                    })}
                  </nav>
                </section>

                {/* Categories */}
                {activeCategories.length > 0 && (
                  <section className="mb-7">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[11px] font-bold tracking-[0.15em] text-[#899389]">
                        SHOP BY CATEGORY
                      </p>

                      <span
                        className="
                        rounded-full border border-[#16A34A]/20
                        bg-[#16A34A]/[0.08]
                        px-2.5 py-1 text-[10px] font-semibold
                        text-[#4ADE80]
                      "
                      >
                        {activeCategories.length} Categories
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#121713] p-1.5">
                      <nav className="space-y-0.5">
                        {activeCategories.map((category) => {
                          const Icon = categoryIcons[category.name] || Layers;

                          return (
                            <NavLink
                              key={category.id || category.slug}
                              to={`/category/${category.slug}`}
                              onClick={closeMenu}
                              className={({ isActive }) => `
                                group flex min-h-[52px] items-center gap-3
                                rounded-xl px-3 transition-all duration-200
                                ${
                                  isActive
                                    ? "bg-[#16A34A]/10 text-white"
                                    : "text-[#A3ADA4] hover:bg-white/[0.04] hover:text-white"
                                }
                              `}
                            >
                              {({ isActive }) => (
                                <>
                                  <span
                                    className={`
                                    flex h-9 w-9 shrink-0 items-center justify-center
                                    rounded-lg border transition
                                    ${
                                      isActive
                                        ? "border-[#16A34A]/25 bg-[#16A34A]/15 text-[#4ADE80]"
                                        : "border-white/[0.05] bg-white/[0.035] text-[#16A34A] group-hover:border-[#16A34A]/20"
                                    }
                                  `}
                                  >
                                    <Icon size={17} />
                                  </span>

                                  <span className="flex-1 text-[13px] font-medium">
                                    {category.name}
                                  </span>

                                  <ChevronRight
                                    size={15}
                                    className="text-[#657067] transition group-hover:translate-x-0.5 group-hover:text-white"
                                  />
                                </>
                              )}
                            </NavLink>
                          );
                        })}
                      </nav>
                    </div>
                  </section>
                )}

                {/* Account & Support */}
                <section>
                  <div className="mb-3 flex items-center gap-4">
                    <p className="whitespace-nowrap text-[11px] font-bold tracking-[0.15em] text-[#899389]">
                      ACCOUNT & SUPPORT
                    </p>
                    <span className="h-px flex-1 bg-white/[0.07]" />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="
                        flex min-h-[50px] items-center justify-center gap-2
                        rounded-xl border border-white/[0.09]
                        bg-[#151A16] px-2
                        text-[12px] font-semibold text-white
                        transition-all duration-200
                        hover:border-[#16A34A]/40
                        hover:bg-[#16A34A]/[0.06]
                        active:scale-[0.98]
                      "
                    >
                      <UserRound size={17} className="text-[#4ADE80]" />
                      Login
                    </Link>

                    <Link
                      to="/contact"
                      onClick={closeMenu}
                      className="
                        flex min-h-[50px] items-center justify-center gap-2
                        rounded-xl border border-[#E11D48]/25
                        bg-[#E11D48]/[0.06] px-2
                        text-[12px] font-semibold text-white
                        transition-all duration-200
                        hover:border-[#E11D48]/50
                        hover:bg-[#E11D48]/[0.11]
                        active:scale-[0.98]
                      "
                    >
                      <Headphones size={17} className="text-[#FB7185]" />
                      Support
                      <ArrowUpRight size={13} className="text-[#899389]" />
                    </Link>
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div
                className="
                shrink-0 border-t border-white/[0.08]
                bg-[#101411] px-5 py-4
              "
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                  <p className="text-[10px] font-medium text-[#899389]">
                    © {new Date().getFullYear()} AI-SaleBD. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
