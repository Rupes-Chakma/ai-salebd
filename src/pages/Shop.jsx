import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  PackageSearch,
  X,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Zap,
  Star,
} from "lucide-react";

import ProductCard from "../components/products/ProductCard";
import useProductStore from "../store/useProductStore";
import useCategoryStore from "../store/useCategoryStore";
import { useTheme } from "../context/ThemeContext";

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const getCategoryName = (category) => {
  if (typeof category === "string") return category;

  if (category && typeof category === "object") {
    return category.name || category.title || "";
  }

  return "";
};

function Shop() {
  const products = useProductStore((state) => state.products);
  const categories = useCategoryStore((state) => state.categories);
  const { isDark } = useTheme();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(8);

  // Active Categories
  const activeCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];

    return categories
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
      });
  }, [categories]);

  // Product Filtering and Sorting
  const filteredProducts = useMemo(() => {
    let result = (Array.isArray(products) ? products : []).filter(
      (product) => product && (!product.status || product.status === "Active"),
    );

    // Search
    const query = normalize(search);

    if (query) {
      result = result.filter((product) => {
        const searchableFields = [
          product.name,
          product.brand,
          getCategoryName(product.category),
          product.description,
          product.slug,
        ];

        return searchableFields.some((field) =>
          normalize(field).includes(query),
        );
      });
    }

    // Category Filter
    if (activeCategory !== "All Products") {
      const selectedCategory = activeCategories.find(
        (category) => category.name === activeCategory,
      );

      const selectedName = normalize(activeCategory);
      const selectedSlug = normalize(selectedCategory?.slug);

      result = result.filter((product) => {
        const productCategory = product.category;

        if (productCategory && typeof productCategory === "object") {
          const name = normalize(productCategory.name || productCategory.title);

          const slug = normalize(productCategory.slug);

          return (
            name === selectedName || (selectedSlug && slug === selectedSlug)
          );
        }

        return normalize(productCategory) === selectedName;
      });
    }

    // Sorting
    switch (sort) {
      case "low-high":
        result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        break;

      case "high-low":
        result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        break;

      case "name":
        result.sort((a, b) =>
          String(a.name || "").localeCompare(String(b.name || "")),
        );
        break;

      case "featured":
        result.sort((a, b) => {
          const aFeatured = Number(Boolean(a.featured || a.badge));
          const bFeatured = Number(Boolean(b.featured || b.badge));

          return (
            bFeatured - aFeatured ||
            String(a.name || "").localeCompare(String(b.name || ""))
          );
        });
        break;

      default:
        break;
    }

    return result;
  }, [products, search, activeCategory, activeCategories, sort]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Reset Filters
  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All Products");
    setSort("featured");
    setVisibleCount(8);
  };

  const selectCategory = (categoryName) => {
    setActiveCategory(categoryName);
    setVisibleCount(8);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setVisibleCount(8);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setVisibleCount(8);
  };

  const hasActiveFilters =
    Boolean(search.trim()) ||
    activeCategory !== "All Products" ||
    sort !== "featured";

  // Theme Classes
  const surface = isDark
    ? "border-white/10 bg-[#141A15]"
    : "border-gray-200 bg-white";

  const mutedText = isDark ? "text-[#A3ADA4]" : "text-gray-500";

  const headingText = isDark ? "text-white" : "text-gray-900";

  const inputSurface = isDark
    ? "border-white/10 bg-[#0B0F0C] text-white"
    : "border-gray-200 bg-gray-50 text-gray-900";

  const inactiveCategory = isDark
    ? "border-white/10 bg-[#141A15] text-[#A3ADA4] hover:border-green-500/50 hover:text-white"
    : "border-gray-200 bg-white text-gray-600 hover:border-green-500 hover:text-green-700";

  return (
    <div
      className={`min-h-screen overflow-hidden pb-12 ${
        isDark ? "bg-[#0B0F0C]" : "bg-gray-50"
      }`}
    >
      {/* Shop Hero */}
      <section
        className={`relative overflow-hidden border-b ${
          isDark ? "border-white/10 bg-[#0D130E]" : "border-gray-200 bg-white"
        }`}
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-green-500/10 blur-[110px]" />

        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-red-500/5 blur-[100px]" />

        <div className="container-custom relative py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <div className={`flex items-center gap-2 text-xs ${mutedText}`}>
            <Link to="/" className="transition hover:text-green-500">
              Home
            </Link>

            <span>/</span>

            <span className="font-semibold text-green-500">Shop</span>
          </div>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            {/* Hero Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-500">
                <Sparkles size={14} />
                AI-SaleBD Digital Marketplace
              </div>

              <h1
                className={`mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl ${headingText}`}
              >
                Discover Powerful
                <span className="block text-green-500">Digital Products.</span>
              </h1>

              <p
                className={`mt-4 max-w-xl text-sm leading-7 sm:text-base ${mutedText}`}
              >
                Explore premium AI tools, subscriptions, software, gaming
                products and digital essentials — all in one marketplace.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-gray-300"
                      : "border-gray-200 bg-gray-50 text-gray-700"
                  }`}
                >
                  <Zap size={15} className="text-green-500" />
                  Premium AI Tools
                </div>

                <div
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-gray-300"
                      : "border-gray-200 bg-gray-50 text-gray-700"
                  }`}
                >
                  <ShoppingBag size={15} className="text-red-500" />
                  Digital Products
                </div>
              </div>
            </div>

            {/* Hero Decoration */}
            <div className="hidden lg:flex lg:justify-center">
              <div
                className={`relative flex h-44 w-44 items-center justify-center rounded-[36px] border border-green-500/20 bg-green-500/5 shadow-2xl ${
                  isDark ? "shadow-green-950/20" : "shadow-gray-200"
                }`}
              >
                <div className="absolute inset-3 rounded-[28px] border border-green-500/10" />

                <Sparkles
                  size={76}
                  strokeWidth={1.3}
                  className="text-green-500"
                />

                <div
                  className={`absolute -right-5 -top-4 rounded-xl border border-white/10 px-3 py-2 text-xs font-bold shadow-xl ${
                    isDark
                      ? "bg-[#1A241B] text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  AI + Digital
                </div>

                <div className="absolute -bottom-4 -left-5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-500 shadow-xl">
                  Explore Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-8 sm:py-10">
        {/* Search and Sorting */}
        <div
          className={`rounded-2xl border p-3 shadow-xl shadow-black/5 sm:p-4 ${surface}`}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search Input */}
            <div
              className={`flex min-h-14 flex-1 items-center gap-3 rounded-xl border px-4 transition focus-within:border-green-500/60 focus-within:ring-2 focus-within:ring-green-500/10 ${inputSurface}`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                <Search size={18} />
              </div>

              <input
                type="search"
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search AI tools, software, subscriptions..."
                aria-label="Search shop products"
                className="w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-gray-500"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  aria-label="Clear search"
                  className="shrink-0 rounded-lg p-1 text-gray-500 transition hover:bg-gray-500/10 hover:text-red-500"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Premium Sorting */}
            <div
              className={`flex min-h-14 items-center gap-3 rounded-xl border px-3 transition focus-within:border-green-500/50 sm:min-w-[250px] ${inputSurface}`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                <ArrowUpDown size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <label
                  htmlFor="shop-sort"
                  className={`block text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Sort Products
                </label>

                <select
                  id="shop-sort"
                  value={sort}
                  onChange={(event) => handleSortChange(event.target.value)}
                  aria-label="Sort products"
                  className={`w-full cursor-pointer bg-transparent py-1 text-sm font-bold outline-none ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <option value="featured">Featured Products</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {sort === "featured" && (
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1 text-[10px] font-bold text-green-500">
                  <Star size={11} fill="currentColor" />
                  Top Picks
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                <SlidersHorizontal size={17} />
              </div>

              <div>
                <h2 className={`text-sm font-bold ${headingText}`}>
                  Browse Categories
                </h2>

                <p className={`mt-0.5 text-[11px] ${mutedText}`}>
                  Find what you are looking for
                </p>
              </div>
            </div>

            <span className={`text-xs ${mutedText}`}>
              {activeCategories.length} categories
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => selectCategory("All Products")}
              aria-pressed={activeCategory === "All Products"}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition duration-200 sm:text-sm ${
                activeCategory === "All Products"
                  ? "border-green-500 bg-green-600 text-white shadow-lg shadow-green-900/20"
                  : inactiveCategory
              }`}
            >
              All Products
            </button>

            {activeCategories.map((category) => (
              <button
                key={category.id ?? category.slug}
                type="button"
                onClick={() => selectCategory(category.name)}
                aria-pressed={activeCategory === category.name}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition duration-200 sm:text-sm ${
                  activeCategory === category.name
                    ? "border-green-500 bg-green-600 text-white shadow-lg shadow-green-900/20"
                    : inactiveCategory
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Product Results */}
        <section className="mt-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-lg font-bold sm:text-xl ${headingText}`}>
                  {activeCategory === "All Products"
                    ? "Explore All Products"
                    : activeCategory}
                </h2>

                <Sparkles size={16} className="text-green-500" />
              </div>

              <p className={`mt-1 text-xs ${mutedText}`}>
                Showing {displayedProducts.length} of {filteredProducts.length}{" "}
                products
              </p>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-500/20"
              >
                <X size={14} />
                Clear Filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {displayedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More */}
              {visibleCount < filteredProducts.length && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + 8)}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-green-500/40 bg-green-500/10 px-8 py-3 text-sm font-bold text-green-500 transition duration-300 hover:-translate-y-0.5 hover:bg-green-600 hover:text-white hover:shadow-lg hover:shadow-green-900/20"
                  >
                    Load More Products
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div
              className={`rounded-2xl border px-5 py-16 text-center ${surface}`}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-green-500/20 bg-green-500/10">
                <PackageSearch size={38} className="text-green-500" />
              </div>

              <h3 className={`mt-5 text-lg font-bold ${headingText}`}>
                No Products Found
              </h3>

              <p
                className={`mx-auto mt-2 max-w-sm text-sm leading-6 ${mutedText}`}
              >
                We couldn't find any products matching your search. Try another
                keyword or choose a different category.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:-translate-y-0.5 hover:bg-green-700"
              >
                <X size={15} />
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Shop;
