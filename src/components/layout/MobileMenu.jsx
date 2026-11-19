import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Shop", path: "/shop", icon: Store },
    { label: "Gaming", path: "/category/gaming", icon: Gamepad2 },
    { label: "AI Tools", path: "/category/ai-tools", icon: Sparkles },
    {
      label: "Subscriptions",
      path: "/category/subscriptions",
      icon: Crown,
    },
    { label: "Gift Cards", path: "/category/gift-cards", icon: Gift },
    { label: "Special Deals", path: "/deals", icon: Sparkles },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="rounded-lg border border-white/10 p-2.5 text-white transition hover:border-[#8B5CF6] hover:text-[#B99AFF] md:hidden"
      >
        {isOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 top-[105px] z-40 bg-black/60 md:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-[#171329] p-4 shadow-2xl md:hidden"
            >
              {/* Search */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const query = new FormData(e.currentTarget).get("search");
                  if (query?.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                  }
                  closeMenu();
                }}
                className="mb-4 flex items-center rounded-xl border border-white/10 bg-[#211B3B] px-3"
              >
                <Search size={18} className="shrink-0 text-[#AAA3C1]" />

                <input
                  name="search"
                  type="search"
                  placeholder="Search digital products..."
                  className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#AAA3C1]"
                />
              </form>

              {/* Navigation Links */}
              <nav className="flex flex-col">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-lg border-b border-white/5 px-3 py-3.5 text-sm font-medium text-[#AAA3C1] transition hover:bg-[#8B5CF6]/10 hover:text-[#B99AFF]"
                    >
                      <Icon size={19} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Account */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-3 text-sm font-semibold text-white hover:border-[#8B5CF6]"
                >
                  <UserRound size={17} />
                  Login
                </Link>

                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#8B5CF6] px-3 py-3 text-sm font-semibold text-white hover:bg-[#7C3AED]"
                >
                  <Headphones size={17} />
                  Support
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
