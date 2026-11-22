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
} from "lucide-react";

import ProductCard from "../components/products/ProductCard";
import useProductStore from "../store/useProductStore";
import useCategoryStore from "../store/useCategoryStore";

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

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(8);

  // Only active categories
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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = (Array.isArray(products) ? products : []).filter(
      (product) => product && (!product.status || product.status === "Active"),
    );

    // Search filter
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

    // Category filter
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
        result.sort(
          (a, b) =>
            Number(Boolean(b.featured || b.badge)) -
            Number(Boolean(a.featured || a.badge)),
        );
        break;

      default:
        break;
    }

    return result;
  }, [products, search, activeCategory, activeCategories, sort]);

  // Products currently visible
  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All Products");
    setSort("featured");
    setVisibleCount(8);
  };

  // Category selection
  const selectCategory = (categoryName) => {
    setActiveCategory(categoryName);
    setVisibleCount(8);
  };

  // Search input
  const handleSearchChange = (value) => {
    setSearch(value);
    setVisibleCount(8);
  };

  // Sorting
  const handleSortChange = (value) => {
    setSort(value);
    setVisibleCount(8);
  };

  const hasActiveFilters =
    Boolean(search.trim()) ||
    activeCategory !== "All Products" ||
    sort !== "featured";

  return (
    <div className="min-h-screen overflow-hidden pb-12">
      {/* Premium Shop Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0d0a1b]">
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-600/15 blur-[110px]" />

        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />

        <div className="container-custom relative py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#AAA3C1]">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>

            <span className="text-gray-600">/</span>

            <span className="font-medium text-purple-300">Shop</span>
          </div>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-300">
                <Sparkles size={14} />
                AI-SaleBD Digital Marketplace
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                Discover Powerful
                <span className="gradient-text block sm:inline">
                  {" "}
                  Digital Products.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#AAA3C1] sm:text-base">
                Explore premium AI tools, subscriptions, software, gaming
                products and digital essentials — all in one marketplace.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs text-gray-300">
                  <Zap size={15} className="text-yellow-400" />
                  Premium AI Tools
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs text-gray-300">
                  <ShoppingBag size={15} className="text-purple-400" />
                  Digital Products
                </div>
              </div>
            </div>

            {/* Hero Decoration */}
            <div className="hidden lg:flex lg:justify-center">
              <div className="relative flex h-44 w-44 items-center justify-center rounded-[36px] border border-purple-400/20 bg-gradient-to-br from-purple-500/20 to-blue-500/10 shadow-2xl shadow-purple-900/20">
                <div className="absolute inset-3 rounded-[28px] border border-white/10" />

                <Sparkles
                  size={76}
                  strokeWidth={1.3}
                  className="text-purple-300"
                />

                <div className="absolute -right-5 -top-4 rounded-xl border border-white/10 bg-[#211B3B] px-3 py-2 text-xs font-bold text-white shadow-xl">
                  AI + Digital
                </div>

                <div className="absolute -bottom-4 -left-5 rounded-xl border border-white/10 bg-[#211B3B] px-3 py-2 text-xs font-bold text-purple-300 shadow-xl">
                  Explore Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-8 sm:py-10">
        {/* Search and Sorting */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#211B3B] to-[#171329] p-3 shadow-xl shadow-black/10 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#100d20] px-4 transition focus-within:border-purple-500/60 focus-within:ring-2 focus-within:ring-purple-500/10">
              <Search size={19} className="shrink-0 text-purple-300" />

              <input
                type="search"
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search AI tools, software, subscriptions..."
                aria-label="Search shop products"
                className="w-full min-w-0 bg-transparent py-3 text-sm text-white outline-none placeholder:text-[#77718D]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  aria-label="Clear search"
                  className="shrink-0 rounded-lg p-1 text-[#AAA3C1] transition hover:bg-white/10 hover:text-white"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Sorting */}
            <div className="flex min-h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#100d20] px-3 sm:min-w-[220px]">
              <ArrowUpDown size={17} className="shrink-0 text-purple-300" />

              <select
                value={sort}
                onChange={(event) => handleSortChange(event.target.value)}
                aria-label="Sort products"
                className="min-w-0 flex-1 cursor-pointer bg-transparent py-3 text-sm text-white outline-none"
              >
                <option value="featured" className="bg-[#211B3B]">
                  Featured
                </option>

                <option value="low-high" className="bg-[#211B3B]">
                  Price: Low to High
                </option>

                <option value="high-low" className="bg-[#211B3B]">
                  Price: High to Low
                </option>

                <option value="name" className="bg-[#211B3B]">
                  Name: A to Z
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Category Filters */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
                <SlidersHorizontal size={17} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-white">
                  Browse Categories
                </h2>

                <p className="mt-0.5 text-[11px] text-[#AAA3C1]">
                  Find what you are looking for
                </p>
              </div>
            </div>

            <span className="text-xs text-gray-500">
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
                  ? "border-purple-500 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/20"
                  : "border-white/10 bg-[#211B3B] text-[#AAA3C1] hover:border-purple-500/50 hover:text-white"
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
                    ? "border-purple-500 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/20"
                    : "border-white/10 bg-[#211B3B] text-[#AAA3C1] hover:border-purple-500/50 hover:text-white"
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
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  {activeCategory === "All Products"
                    ? "Explore All Products"
                    : activeCategory}
                </h2>

                <Sparkles size={16} className="text-purple-400" />
              </div>

              <p className="mt-1 text-xs text-[#AAA3C1]">
                Showing {displayedProducts.length} of {filteredProducts.length}{" "}
                products
              </p>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-xs font-semibold text-purple-300 transition hover:bg-purple-500/20 hover:text-white"
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
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-8 py-3 text-sm font-bold text-purple-300 transition duration-300 hover:-translate-y-0.5 hover:border-purple-400 hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-lg hover:shadow-purple-900/20"
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
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#211B3B] to-[#171329] px-5 py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-500/20 bg-purple-500/10">
                <PackageSearch size={38} className="text-purple-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                No Products Found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#AAA3C1]">
                We couldn't find any products matching your search. Try another
                keyword or choose a different category.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:shadow-purple-500/20"
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
