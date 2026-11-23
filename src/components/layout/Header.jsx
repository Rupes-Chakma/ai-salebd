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
  ChevronRight,
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
  const mobileInputRef = useRef(null);

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

  // Product Search Suggestions
  const suggestions = useMemo(() => {
    const query = normalize(search);

    if (!query || !Array.isArray(products)) return [];

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

        if (name === query) score += 1000;
        else if (name.startsWith(query)) score += 800;
        else if (name.includes(query)) score += 600;

        if (brand === query) score += 500;
        else if (brand.startsWith(query)) score += 400;
        else if (brand.includes(query)) score += 300;

        if (category.startsWith(query)) score += 200;
        else if (category.includes(query)) score += 150;

        if (description.includes(query)) score += 50;

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

  // Close Suggestions on Outside Click
  useEffect(() => {
    const handlePointerDown = (event) => {
      const insideDesktop = desktopSearchRef.current?.contains(event.target);
      const insideMobile = mobileSearchRef.current?.contains(event.target);

      if (!insideDesktop && !insideMobile) {
        setShowSuggestions(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowSuggestions(false);
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto Focus Mobile Search
  useEffect(() => {
    if (mobileSearchOpen) {
      requestAnimationFrame(() => {
        mobileInputRef.current?.focus();
      });
    }
  }, [mobileSearchOpen]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      mobileInputRef.current?.focus();
      return;
    }

    setShowSuggestions(false);
    setMobileSearchOpen(false);

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const selectProduct = (productId) => {
    if (!productId) return;

    setShowSuggestions(false);
    setMobileSearchOpen(false);

    navigate(`/product/${productId}`);
  };

  const clearSearch = () => {
    setSearch("");
    setShowSuggestions(false);
  };

  // Navigation Link Style
  const navLinkClass = ({ isActive }) =>
    `group relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-[13px] font-semibold transition-all duration-200 ${
      isActive
        ? "bg-[#16A34A]/[0.12] text-[#4ADE80] shadow-sm shadow-[#16A34A]/[0.04]"
        : "text-[#A3ADA4] hover:bg-white/[0.045] hover:text-white"
    }`;

  // Search Suggestions
  const SearchSuggestions = () => {
    if (!showSuggestions || !search.trim()) return null;

    return (
      <div
        className="
          absolute left-0 right-0 top-full z-[100]
          mt-2 max-h-[min(65vh,440px)]
          overflow-x-hidden overflow-y-auto overscroll-contain
          rounded-2xl border border-white/[0.09]
          bg-[#141A15] shadow-2xl shadow-black/60
        "
      >
        {suggestions.length > 0 ? (
          <>
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
              <div>
                <p className="text-[10px] font-bold tracking-[0.15em] text-[#899389]">
                  SEARCH RESULTS
                </p>
                <p className="mt-1 text-xs text-[#A3ADA4]">
                  Suggested products for you
                </p>
              </div>

              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#16A34A]/[0.12] text-[#4ADE80]">
                <Sparkles size={16} />
              </span>
            </div>

            {suggestions.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => selectProduct(product.id)}
                className="
                  flex min-h-[68px] w-full min-w-0
                  items-center gap-3 border-b border-white/[0.05]
                  px-3.5 py-3 text-left transition-all duration-200
                  hover:bg-[#16A34A]/[0.055]
                  active:bg-[#16A34A]/[0.10]
                  sm:px-4
                "
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#1A211B]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name || "Product"}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <Package size={20} className="text-[#4ADE80]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-white">
                    {product.name}
                  </p>

                  <p className="mt-1 truncate text-[11px] text-[#899389]">
                    {getCategoryName(product.category)}
                  </p>
                </div>

                <span className="shrink-0 whitespace-nowrap text-xs font-bold text-[#4ADE80] sm:text-sm">
                  ৳{Number(product.price || 0).toLocaleString("en-BD")}
                </span>

                <ChevronRight size={15} className="shrink-0 text-[#657067]" />
              </button>
            ))}

            <button
              type="button"
              onClick={handleSearch}
              className="
                flex min-h-12 w-full items-center justify-center gap-2
                px-4 py-3 text-xs font-bold text-[#4ADE80]
                transition hover:bg-[#16A34A]/[0.07]
                active:bg-[#16A34A]/[0.12]
              "
            >
              View all search results
              <ArrowRight size={15} />
            </button>
          </>
        ) : (
          <div className="px-4 py-8 text-center">
            <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.045] text-[#899389]">
              <Package size={22} />
            </span>

            <p className="text-sm font-semibold text-white">
              No products found
            </p>

            <p className="mt-1 text-xs text-[#899389]">Try another keyword</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full min-w-0 overflow-x-clip border-b border-white/[0.06] bg-[#0B0F0C]/[0.97] shadow-lg shadow-black/10 backdrop-blur-xl">
      {/* Announcement Bar */}
      <div className="border-b border-white/[0.045] bg-[#101511] px-2 py-2">
        <div className="flex items-center justify-center gap-2 text-[10px] font-semibold text-[#D5DDD5] sm:text-xs">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#16A34A]/[0.12] text-[#4ADE80]">
            <Sparkles size={12} />
          </span>

          <span className="min-w-0 truncate">
            <span className="sm:hidden">
              Welcome to AI-SaleBD — Premium Digital Store
            </span>

            <span className="hidden sm:inline">
              Welcome to AI-SaleBD — Your Trusted Premium Digital Marketplace
            </span>
          </span>

          <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-[#16A34A] sm:block" />
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-white/[0.06] bg-[#0B0F0C]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3.5 sm:gap-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            to="/"
            aria-label="AI-SaleBD Home"
            className="group flex min-w-0 shrink items-center gap-2.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#16A34A]/20 bg-[#141A15] transition-all duration-300 group-hover:border-[#16A34A]/50 group-hover:bg-[#16A34A]/[0.08] sm:h-12 sm:w-12">
              <svg
                viewBox="0 0 100 100"
                className="h-8 w-8 sm:h-9 sm:w-9"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 86L45 15C47 10 53 10 55 15L92 86H70L50 47L30 86H8Z"
                  fill="#16A34A"
                />
                <path d="M39 86L50 65L61 86H39Z" fill="#E11D48" />
              </svg>
            </div>

            <div className="min-w-0 leading-tight">
              <h1 className="whitespace-nowrap text-[16px] font-black tracking-tight text-white min-[360px]:text-[18px] sm:text-[23px]">
                AI-Sale<span className="text-[#16A34A]">BD.</span>
              </h1>

              <p className="mt-1 hidden whitespace-nowrap text-[8px] font-semibold tracking-[0.15em] text-[#899389] min-[390px]:block sm:text-[9px]">
                PREMIUM DIGITAL MARKETPLACE
              </p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div
            ref={desktopSearchRef}
            className="relative mx-3 hidden min-w-0 max-w-[560px] flex-1 md:block lg:mx-6"
          >
            <form onSubmit={handleSearch}>
              <div className="flex min-h-[50px] w-full items-center gap-3 rounded-xl border border-white/[0.09] bg-[#141A15] px-3.5 transition-all duration-200 focus-within:border-[#16A34A]/60 focus-within:ring-2 focus-within:ring-[#16A34A]/[0.10]">
                <Search size={19} className="shrink-0 text-[#899389]" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search AI tools and digital products..."
                  aria-label="Search products"
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-[#737D78]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#899389] transition hover:bg-white/[0.05] hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}

                <button
                  type="submit"
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-[#16A34A] px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-[#15803D] active:scale-95"
                >
                  <Search size={14} />
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
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.09] bg-[#141A15] text-[#A3ADA4] transition-all duration-200 hover:border-[#16A34A]/40 hover:bg-[#16A34A]/[0.07] hover:text-[#4ADE80]"
            >
              <UserRound size={19} />
            </Link>

            <Link
              to="/cart"
              className="relative flex min-h-11 items-center gap-2.5 rounded-xl border border-[#16A34A]/30 bg-[#141A15] px-4 text-sm font-bold text-white transition-all duration-200 hover:border-[#16A34A]/60 hover:bg-[#16A34A]/[0.07] active:scale-[0.98]"
            >
              <ShoppingCart size={19} className="text-[#4ADE80]" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#0B0F0C] bg-[#E11D48] px-1 text-[10px] font-extrabold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen((prev) => !prev);
                setShowSuggestions(false);
              }}
              aria-label={mobileSearchOpen ? "Close search" : "Open search"}
              aria-expanded={mobileSearchOpen}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-[#141A15] text-white transition-all duration-200 hover:border-[#16A34A]/40 hover:text-[#4ADE80] active:scale-95"
            >
              {mobileSearchOpen ? <X size={19} /> : <Search size={19} />}
            </button>

            <Link
              to="/cart"
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-[#141A15] text-white transition-all duration-200 hover:border-[#16A34A]/40 hover:text-[#4ADE80] active:scale-95"
            >
              <ShoppingCart size={18} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border border-[#0B0F0C] bg-[#E11D48] px-1 text-[9px] font-extrabold text-white">
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
            className="relative border-t border-white/[0.07] bg-[#0E130F] px-3 py-3 sm:px-4 md:hidden"
          >
            <div className="relative min-w-0">
              <form onSubmit={handleSearch}>
                <div className="flex min-h-12 min-w-0 items-center gap-2 rounded-xl border border-white/[0.09] bg-[#141A15] px-2.5 transition-all duration-200 focus-within:border-[#16A34A]/60 focus-within:ring-2 focus-within:ring-[#16A34A]/[0.10] sm:px-3">
                  <Search size={18} className="shrink-0 text-[#899389]" />

                  <input
                    ref={mobileInputRef}
                    type="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search AI tools..."
                    aria-label="Search products"
                    className="min-w-0 flex-1 bg-transparent py-3 text-xs text-white outline-none placeholder:text-[#737D78] sm:text-sm"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear search"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#899389] hover:bg-white/[0.05] hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-[#16A34A] px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#15803D] active:scale-95 min-[390px]:px-3.5"
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

      {/* Desktop Navigation */}
      <nav
        aria-label="Main navigation"
        className="hidden w-full border-b border-white/[0.06] bg-[#0D120E] md:block"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 lg:px-8">
          <div className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max items-center gap-1.5 py-2">
              <NavLink to="/" end className={navLinkClass}>
                <Home size={16} />
                Home
              </NavLink>

              <NavLink to="/shop" className={navLinkClass}>
                <Store size={16} />
                Shop
              </NavLink>

              {activeCategories.map((category) => {
                const Icon = categoryIcons[category.name] || Layers;

                return (
                  <NavLink
                    key={category.id || category.slug}
                    to={`/category/${category.slug}`}
                    className={navLinkClass}
                  >
                    <Icon size={16} />
                    {category.name}
                  </NavLink>
                );
              })}

              <NavLink to="/my-orders" className={navLinkClass}>
                <ClipboardList size={16} />
                My Orders
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
