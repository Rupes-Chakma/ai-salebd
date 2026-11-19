import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Globe,
  UserRound,
  Zap,
  Sparkles,
  X,
  Package,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

import MobileMenu from "./MobileMenu";
import useCartStore from "../../store/cartStore";
import products from "../../data/products";

const Header = () => {
  const [language, setLanguage] = useState("EN");
  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  const cartCount = useCartStore((state) => state.getCartCount());

  const suggestions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter((product) => {
        return (
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
        );
      })
      .slice(0, 5);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "BN" : "EN"));
  };

  const handleSearch = (e) => {
    e.preventDefault();

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
    if (!showSuggestions || !search.trim()) return null;

    return (
      <div className="absolute left-0 right-0 top-full z-[70] mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#19162B]/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
        {suggestions.length > 0 ? (
          <>
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
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
                className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition-colors hover:bg-white/[0.06]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#30264F]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package size={20} className="text-[#B99AFF]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {product.name}
                  </p>
                  <p className="mt-1 text-xs text-[#AAA3C1]">
                    {product.category}
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
              className="flex w-full items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-[#A78BFA] transition hover:bg-white/[0.06]"
            >
              View all results
              <ArrowRight size={16} />
            </button>
          </>
        ) : (
          <div className="px-4 py-6 text-center">
            <Package size={27} className="mx-auto mb-2 text-[#AAA3C1]" />
            <p className="text-sm font-medium text-white">No products found</p>
            <p className="mt-1 text-xs text-[#AAA3C1]">Try another keyword</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#100E1B]">
      {/* Announcement Bar */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5420B8] via-[#6D28D9] to-[#2563EB] px-3 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        <div className="relative z-10 flex items-center justify-center gap-1.5">
          <Sparkles size={14} />
          <span>Welcome to AI-SaleBD — Your Gateway to Premium AI Tools</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-white/[0.08] bg-[#100E1B]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            to="/"
            aria-label="AI-SaleBD Home"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#2563EB] shadow-lg shadow-purple-500/20 transition duration-300 group-hover:scale-105 group-hover:shadow-purple-500/40">
              <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-br from-[#8B5CF6] to-[#2563EB]" />
              <Sparkles
                size={24}
                strokeWidth={2.2}
                className="relative z-10 text-white"
              />
            </div>

            <div>
              <h1 className="text-[21px] font-black tracking-tight text-white sm:text-2xl">
                AI-SaleBD<span className="text-[#A78BFA]">.</span>
              </h1>
              <p className="-mt-0.5 text-[8px] font-semibold tracking-[0.16em] text-[#AAA3C1] sm:text-[9px]">
                PREMIUM AI TOOLS MARKETPLACE
              </p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div
            ref={searchRef}
            className="relative mx-5 hidden max-w-xl flex-1 md:block"
          >
            <form onSubmit={handleSearch}>
              <div className="flex w-full items-center rounded-xl border border-white/10 bg-[#1B172D] px-4 transition-all duration-300 focus-within:border-[#8B5CF6]/70 focus-within:bg-[#211B3B] focus-within:shadow-lg focus-within:shadow-purple-500/10">
                <Search size={19} className="shrink-0 text-[#AAA3C1]" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search AI tools and digital products..."
                  className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-[#817A9A]"
                />

                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/15 transition duration-200 hover:brightness-110 active:scale-95"
                >
                  Search
                </button>
              </div>
            </form>

            <SearchSuggestions />
          </div>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-2.5 md:flex">
            {/* Language */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Change language"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm font-semibold text-[#DDD6FE] transition hover:border-[#8B5CF6]/50 hover:bg-white/[0.06]"
            >
              <Globe size={17} />
              {language}
            </button>

            {/* Account */}
            <Link
              to="/account"
              aria-label="Account"
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[#DDD6FE] transition hover:border-[#8B5CF6]/50 hover:bg-white/[0.06] hover:text-white"
            >
              <UserRound size={20} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/15 transition duration-200 hover:brightness-110 active:scale-95"
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
            {/* Mobile Search Toggle */}
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

            {/* Mobile Cart */}
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

            {/* Mobile Language */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Change language"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-2.5 text-xs font-bold text-white transition hover:border-[#8B5CF6]/50"
            >
              {language}
            </button>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>

        {/* Mobile Search */}
        {mobileSearchOpen && (
          <div
            ref={searchRef}
            className="border-t border-white/[0.08] bg-[#100E1B] px-4 py-3.5 md:hidden"
          >
            <div className="relative">
              <form onSubmit={handleSearch}>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1B172D] px-3 transition focus-within:border-[#8B5CF6]/70">
                  <Search size={18} className="shrink-0 text-[#AAA3C1]" />

                  <input
                    type="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search AI tools..."
                    autoFocus
                    className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#817A9A]"
                  />

                  <button
                    type="submit"
                    className="rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-3.5 py-2.5 text-xs font-bold text-white transition hover:brightness-110"
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
    </header>
  );
};

export default Header;
