import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  SlidersHorizontal,
  PackageOpen,
  Sparkles,
  ArrowUpDown,
  X,
  ShoppingBag,
  Zap,
  ArrowRight,
} from "lucide-react";

import ProductCard from "../components/products/ProductCard";
import useProductStore from "../store/useProductStore";
import useCategoryStore from "../store/useCategoryStore";

const categoryEmojis = {
  gaming: "🎮",
  "ai-tools": "🤖",
  subscriptions: "👑",
  "gift-cards": "🎁",
  software: "💻",
  entertainment: "🎬",
};

const Category = () => {
  const { slug } = useParams();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Zustand Stores
  const products = useProductStore((state) => state.products);
  const categories = useCategoryStore((state) => state.categories);

  // Safe Arrays
  const safeProducts = Array.isArray(products) ? products : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  // Find Active Category by Slug
  const category = safeCategories.find(
    (item) =>
      item.status === "Active" &&
      item.slug?.toLowerCase() === slug?.toLowerCase(),
  );

  // Filter Category Products
  const filteredProducts = useMemo(() => {
    if (!category) return [];

    let result = safeProducts.filter(
      (product) =>
        product &&
        product.status !== "Inactive" &&
        product.category?.trim().toLowerCase() ===
          category.name?.trim().toLowerCase(),
    );

    // Search Filter
    if (search.trim()) {
      const keyword = search.trim().toLowerCase();

      result = result.filter((product) =>
        `${product.name || ""} ${product.brand || ""} ${
          product.description || ""
        }`
          .toLowerCase()
          .includes(keyword),
      );
    }

    // Sorting
    if (sortBy === "low-high") {
      result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortBy === "high-low") {
      result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sortBy === "name") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "featured") {
      result.sort(
        (a, b) =>
          Number(Boolean(b.featured || b.badge)) -
          Number(Boolean(a.featured || a.badge)),
      );
    }

    return result;
  }, [safeProducts, category, search, sortBy]);

  // Category Not Found
  if (!category) {
    return (
      <div className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-purple-600/10 blur-[100px]" />

        <div className="relative">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-purple-500/20 bg-purple-500/10">
            <PackageOpen size={45} className="text-purple-400" />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
            Category Not Found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#AAA3C1]">
            Sorry, this category does not exist or is currently inactive.
            Explore our marketplace to discover other digital products.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5"
          >
            Browse All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // Dynamic Category Emoji
  const emoji = categoryEmojis[category.slug?.toLowerCase()] || "📦";

  return (
    <div className="min-h-screen overflow-hidden pb-12">
      {/* Category Hero Banner */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0d0a1b]">
        {/* Background Effects */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-600/15 blur-[110px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />

        <div className="container-custom relative py-10 sm:py-14 lg:py-16">
          {/* Breadcrumb */}
          <div className="mb-7 flex flex-wrap items-center gap-2 text-xs text-[#AAA3C1]">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>

            <span className="text-gray-600">/</span>

            <Link to="/shop" className="transition hover:text-white">
              Shop
            </Link>

            <span className="text-gray-600">/</span>

            <span className="font-medium text-purple-300">{category.name}</span>
          </div>

          {/* Category Content */}
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-300">
                <Sparkles size={14} />
                AI-SaleBD Digital Marketplace
              </div>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-4xl shadow-lg sm:h-20 sm:w-20 sm:text-5xl">
                  {emoji}
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[2px] text-purple-300">
                    Explore Category
                  </p>

                  <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                    {category.name}
                  </h1>
                </div>
              </div>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[#AAA3C1] sm:text-base">
                Explore our {category.name} digital products and services. Find
                the right products for your needs in one convenient place.
              </p>

              {/* Category Stats */}
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <ShoppingBag size={16} className="text-purple-300" />
                  <span className="text-sm font-bold text-white">
                    {filteredProducts.length}
                  </span>
                  <span className="text-xs text-[#AAA3C1]">
                    Products Available
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <Zap size={16} className="text-yellow-400" />
                  <span className="text-xs font-medium text-gray-300">
                    Digital Products
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Category Icon */}
            <div className="hidden lg:flex lg:justify-center">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-[40px] border border-purple-400/20 bg-gradient-to-br from-purple-500/20 to-blue-500/10 shadow-2xl shadow-purple-900/20">
                <div className="absolute inset-3 rounded-[32px] border border-white/10" />

                <span className="text-8xl drop-shadow-2xl">{emoji}</span>

                <div className="absolute -right-5 -top-4 rounded-xl border border-white/10 bg-[#211B3B] px-3 py-2 text-xs font-bold text-white shadow-xl">
                  Explore Now
                </div>

                <div className="absolute -bottom-4 -left-5 rounded-xl border border-white/10 bg-[#211B3B] px-3 py-2 text-xs font-bold text-purple-300 shadow-xl">
                  AI-SaleBD
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-8 sm:py-10">
        {/* Search and Sorting */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#211B3B] to-[#171329] p-3 shadow-xl shadow-black/10 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative flex min-h-12 flex-1 items-center">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${category.name} products...`}
                className="w-full rounded-xl border border-white/10 bg-[#100d20] py-3 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-[#77718D] focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 rounded-lg text-[#AAA3C1] transition hover:text-white"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Sorting */}
            <div className="flex min-h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#100d20] px-3 sm:min-w-[220px]">
              <ArrowUpDown size={17} className="shrink-0 text-purple-300" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="w-full cursor-pointer bg-transparent py-3 text-sm text-white outline-none"
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

        {/* Product Results Heading */}
        <section className="mt-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  {category.name} Products
                </h2>

                <Sparkles size={16} className="text-purple-400" />
              </div>

              <p className="mt-1 text-xs text-[#AAA3C1]">
                Showing {filteredProducts.length} products in this category
              </p>
            </div>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-xs font-semibold text-purple-300 transition hover:bg-purple-500/20 hover:text-white"
              >
                <X size={14} />
                Clear Search
              </button>
            )}
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#211B3B] to-[#171329] px-5 py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-500/20 bg-purple-500/10">
                <PackageOpen size={40} className="text-purple-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                No Products Found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#AAA3C1]">
                {search
                  ? "We couldn't find products matching your search. Try another keyword."
                  : "Products in this category will be added soon."}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  <X size={15} />
                  Clear Search
                </button>
              )}
            </div>
          )}
        </section>

        {/* Back to Shop */}
        <div className="mt-10 border-t border-white/10 pt-7">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-purple-300 transition hover:text-white"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
