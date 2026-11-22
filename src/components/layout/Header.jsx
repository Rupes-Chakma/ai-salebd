import { useState, useMemo, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  UserRound,
  Sparkles,
  X,
  Package,
  ArrowRight,
  Home,
  Store,
  Gamepad2,
  Crown,
  Gift,
  ClipboardList,
  Monitor,
  Film,
  Layers,
} from "lucide-react";

import MobileMenu from "./MobileMenu";
import useCartStore from "../../store/cartStore";
import useProductStore from "../../store/useProductStore";
import useCategoryStore from "../../store/useCategoryStore";

const categoryIcons = {
  Gaming: Gamepad2,
  "AI Tools": Sparkles,
  Subscriptions: Crown,
  "Gift Cards": Gift,
  Software: Monitor,
  Entertainment: Film,
};

const getCategoryName = (category) => {
  if (typeof category === "string") return category;

  if (category && typeof category === "object") {
    return category.name || category.title || "";
  }

  return "";
};

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const Header = () => {
  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const cartCount = useCartStore((state) => state.getCartCount());
  const products = useProductStore((state) => state.products);
  const categories = useCategoryStore((state) => state.categories);

  const activeCategories = useMemo(() => {
    return Array.isArray(categories)
      ? categories
          .filter(
            (category) =>
              category &&
              category.status === "Active" &&
              category.name &&
              category.slug,
          )
          .sort((a, b) => {
            if (a.name === "AI Tools") return -1;
            if (b.name === "AI Tools") return 1;
            return 0;
          })
      : [];
  }, [categories]);

  const suggestions = useMemo(() => {
    const query = normalize(search);

    if (!query || !Array.isArray(products)) {
      return [];
    }

    return products
      .filter((product) => {
        if (product.status && product.status !== "Active") {
          return false;
        }

        const name = normalize(product.name);
        const brand = normalize(product.brand);
        const category = normalize(getCategoryName(product.category));
        const description = normalize(product.description);

        return (
          name.includes(query) ||
          brand.includes(query) ||
          category.includes(query) ||
          description.includes(query)
        );
      })
      .map((product, index) => {
        const name = normalize(product.name);
        const brand = normalize(product.brand);
        const category = normalize(getCategoryName(product.category));
        const description = normalize(product.description);

        let score = 0;

        if (name === query) {
          score += 1000;
        } else if (name.startsWith(query)) {
          score += 800;
        } else if (name.includes(query)) {
          score += 600;
        }

        if (brand === query) {
          score += 500;
        } else if (brand.startsWith(query)) {
          score += 400;
        } else if (brand.includes(query)) {
          score += 300;
        }

        if (category.startsWith(query)) {
          score += 200;
        } else if (category.includes(query)) {
          score += 150;
        }

        if (description.includes(query)) {
          score += 50;
        }

        return {
          ...product,
          searchScore: score,
          originalIndex: index,
        };
      })
      .sort((a, b) => {
        if (b.searchScore !== a.searchScore) {
          return b.searchScore - a.searchScore;
        }

        return a.originalIndex - b.originalIndex;
      })
      .slice(0, 5);
  }, [search, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const insideDesktop = desktopSearchRef.current?.contains(event.target);

      const insideMobile = mobileSearchRef.current?.contains(event.target);

      if (!insideDesktop && !insideMobile) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) return;

    setShowSuggestions(false);
    setMobileSearchOpen(false);

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const selectProduct = (productId) => {
    setShowSuggestions(false);
    setMobileSearchOpen(false);

    navigate(`/product/${productId}`);
  };

  const SearchSuggestions = () => {
    if (!showSuggestions || !search.trim()) {
      return null;
    }

    return (
      <div className="absolute left-0 right-0 top-full z-[100] mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#19162B] shadow-2xl shadow-black/60">
        {suggestions.length > 0 ? (
          <>
            <div className="flex items-center justify-between border-b border-white/10 bg-[#19162B] px-4 py-3">
              <p className="text-[11px] font-bold tracking-widest text-[#AAA3C1]">
                SUGGESTED PRODUCTS
              </p>

              <Sparkles size={15} className="text-[#A78BFA]" />
            </div>

            {suggestions.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => selectProduct(product.id)}
                className="flex w-full items-center gap-3 border-b border-white/5 bg-[#19162B] px-4 py-3 text-left transition-colors hover:bg-[#28213F]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#30264F]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name || "Product"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Package size={20} className="text-[#B99AFF]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {product.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-[#AAA3C1]">
                    {getCategoryName(product.category)}
                  </p>
                </div>

                <span className="shrink-0 text-sm font-bold text-[#C4B5FD]">
                  ৳{Number(product.price || 0).toLocaleString("en-BD")}
                </span>
              </button>
            ))}

            <button
              type="button"
              onClick={handleSearch}
              className="flex w-full items-center justify-center gap-2 bg-[#19162B] px-4 py-3.5 text-sm font-semibold text-[#A78BFA] transition hover:bg-[#28213F]"
            >
              View all results
              <ArrowRight size={16} />
            </button>
          </>
        ) : (
          <div className="bg-[#19162B] px-4 py-6 text-center">
            <Package size={27} className="mx-auto mb-2 text-[#AAA3C1]" />

            <p className="text-sm font-medium text-white">No products found</p>

            <p className="mt-1 text-xs text-[#AAA3C1]">Try another keyword</p>
          </div>
        )}
      </div>
    );
  };

  const navLinkClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "bg-[#8B5CF6]/15 text-[#B99AFF]"
        : "text-[#AAA3C1] hover:bg-white/5 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full min-w-0 bg-[#100E1B]">
      {/* Announcement Bar */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5420B8] via-[#6D28D9] to-[#2563EB] px-3 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        <div className="relative z-10 flex items-center justify-center gap-1.5">
          <Sparkles size={14} />
          <span>Welcome to AI-SaleBD — Your Gateway to Premium AI Tools</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-white/[0.08] bg-[#100E1B]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            to="/"
            aria-label="AI-SaleBD Home"
            className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#2563EB] shadow-lg shadow-purple-500/20 transition duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
              <Sparkles
                size={23}
                strokeWidth={2.2}
                className="relative z-10 text-white"
              />
            </div>

            <div className="min-w-0">
              <h1 className="whitespace-nowrap text-lg font-black tracking-tight text-white sm:text-2xl">
                AI-SaleBD<span className="text-[#A78BFA]">.</span>
              </h1>

              <p className="-mt-0.5 whitespace-nowrap text-[7px] font-semibold tracking-[0.12em] text-[#AAA3C1] sm:text-[9px] sm:tracking-[0.16em]">
                PREMIUM AI TOOLS MARKETPLACE
              </p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div
            ref={desktopSearchRef}
            className="relative mx-3 hidden min-w-0 max-w-xl flex-1 md:block lg:mx-5"
          >
            <form onSubmit={handleSearch}>
              <div className="flex w-full items-center rounded-xl border border-white/10 bg-[#1B172D] px-4 transition-all duration-300 focus-within:border-[#8B5CF6]/70 focus-within:bg-[#211B3B] focus-within:shadow-lg focus-within:shadow-purple-500/10">
                <Search size={19} className="shrink-0 text-[#AAA3C1]" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search AI tools and digital products..."
                  className="w-full min-w-0 bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-[#817A9A]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setShowSuggestions(false);
                    }}
                    aria-label="Clear search"
                    className="mr-2 shrink-0 text-[#AAA3C1] hover:text-white"
                  >
                    <X size={17} />
                  </button>
                )}

                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition duration-200 hover:brightness-110 active:scale-95"
                >
                  Search
                </button>
              </div>
            </form>

            <SearchSuggestions />
          </div>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-2.5 md:flex">
            <Link
              to="/account"
              aria-label="Account"
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[#DDD6FE] transition hover:border-[#8B5CF6]/50 hover:bg-white/[0.06] hover:text-white"
            >
              <UserRound size={20} />
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-4 py-3 text-sm font-bold text-white shadow-lg transition duration-200 hover:brightness-110 active:scale-95"
            >
              <ShoppingCart size={19} />
              Cart
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#100E1B] bg-[#38BDF8] px-1 text-[10px] font-extrabold text-[#11101C]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen((prev) => !prev);
                setShowSuggestions(false);
              }}
              aria-label="Open search"
              className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white transition hover:border-[#8B5CF6]/50"
            >
              {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <Link
              to="/cart"
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white transition hover:border-[#8B5CF6]/50"
            >
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#38BDF8] px-1 text-[9px] font-extrabold text-[#11101C]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <MobileMenu />
          </div>
        </div>

        {/* Mobile Search */}
        {mobileSearchOpen && (
          <div
            ref={mobileSearchRef}
            className="border-t border-white/[0.08] bg-[#100E1B] px-4 py-3.5 md:hidden"
          >
            <div className="relative">
              <form onSubmit={handleSearch}>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1B172D] px-3 transition focus-within:border-[#8B5CF6]/70">
                  <Search size={18} className="shrink-0 text-[#AAA3C1]" />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search AI tools..."
                    autoFocus
                    className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#817A9A]"
                  />

                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-3.5 py-2.5 text-xs font-bold text-white transition hover:brightness-110"
                  >
                    Search
                  </button>
                </div>
              </form>

              <SearchSuggestions />
            </div>
          </div>
        )}
      </div>

      {/* Desktop Menu Bar */}
      <nav
        aria-label="Main navigation"
        className="hidden w-full border-b border-white/10 bg-[#11101C] md:block"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 lg:px-8">
          <div className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max items-center gap-1 py-2">
              <NavLink to="/" end className={navLinkClass}>
                <Home size={17} />
                Home
              </NavLink>

              <NavLink to="/shop" className={navLinkClass}>
                <Store size={17} />
                Shop
              </NavLink>

              {activeCategories.map((category) => {
                const Icon = categoryIcons[category.name] || Layers;

                return (
                  <NavLink
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className={navLinkClass}
                  >
                    <Icon size={17} />
                    {category.name}
                  </NavLink>
                );
              })}

              <NavLink to="/my-orders" className={navLinkClass}>
                <ClipboardList size={17} />
                My Orders
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/deals"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#2563EB] px-3 py-3 text-sm font-semibold text-white transition hover:brightness-110 lg:px-4"
          >
            <Sparkles size={17} />
            <span>Special Deals</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
