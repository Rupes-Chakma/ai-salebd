import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  PackageOpen,
  Sparkles,
  Compass,
  Bot,
  Crown,
  Clapperboard,
  Monitor,
  Gift,
  Gamepad2,
  ArrowUpDown,
  X,
  ShoppingBag,
  Zap,
  ArrowRight,
} from "lucide-react";

import ProductCard from "../components/products/ProductCard";
import useProductStore from "../store/useProductStore";
import useCategoryStore from "../store/useCategoryStore";

// Unique icon for each category
const categoryIcons = {
  gaming: Gamepad2,
  "ai-tools": Bot,
  subscriptions: Crown,
  "gift-cards": Gift,
  software: Monitor,
  entertainment: Clapperboard,
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
      item?.status === "Active" &&
      item?.slug?.toLowerCase() === slug?.toLowerCase(),
  );

  // Filter and Sort Category Products
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
      <main className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden bg-[#0B0F0C] px-4 text-center text-[#F5F7F5]">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-green-500/[0.07] blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-rose-500/[0.04] blur-[100px]" />

        <div className="relative">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-green-500/15 bg-[#141A15] shadow-xl shadow-black/20">
            <PackageOpen size={42} className="text-green-400" />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">
            Category Not Found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#A3ADA4]">
            Sorry, this category does not exist or is currently inactive.
            Explore our marketplace to discover other digital products.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-700"
          >
            Browse All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  // Dynamic Icon based on category slug
  const CategoryIcon =
    categoryIcons[category.slug?.toLowerCase()] || PackageOpen;

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0F0C] pb-12 text-[#F5F7F5]">
      <style>{`
        @keyframes categoryFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes categoryShine {
          0%, 65% {
            transform: translateX(-130%);
          }
          90%, 100% {
            transform: translateX(130%);
          }
        }

        @keyframes categoryIconPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
          50% {
            box-shadow: 0 0 0 7px rgba(34, 197, 94, 0.06);
          }
        }

        @keyframes categoryOrb {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(12px, -10px);
          }
        }

        .category-explore-badge {
          isolation: isolate;
          animation: categoryFloat 4s ease-in-out infinite;
        }

        .category-badge-shine {
          z-index: -1;
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(74, 222, 128, 0.09) 45%,
            transparent 70%
          );
          transform: translateX(-130%);
          animation: categoryShine 5.5s ease-in-out infinite;
        }

        .category-compass-icon {
          animation: categoryIconPulse 3s ease-in-out infinite;
        }

        .category-hero-orb {
          animation: categoryOrb 8s ease-in-out infinite;
        }

        .category-decoration {
          animation: categoryFloat 5s ease-in-out infinite;
        }

        .category-main-icon {
          animation: categoryFloat 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .category-explore-badge,
          .category-badge-shine,
          .category-compass-icon,
          .category-hero-orb,
          .category-decoration,
          .category-main-icon {
            animation: none !important;
          }

          .category-explore-badge *,
          .category-explore-badge {
            transition: none !important;
          }
        }
      `}</style>

      {/* Category Hero Banner */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.08] bg-[#0E140F]">
        {/* Background Effects */}
        <div className="category-hero-orb pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-green-500/[0.08] blur-[110px]" />

        <div className="category-hero-orb pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-rose-500/[0.05] blur-[100px]" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />

        <div className="container-custom relative py-9 sm:py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#A3ADA4]"
          >
            <Link to="/" className="transition hover:text-green-400">
              Home
            </Link>

            <span className="text-white/20">/</span>

            <Link to="/shop" className="transition hover:text-green-400">
              Shop
            </Link>

            <span className="text-white/20">/</span>

            <span aria-current="page" className="font-medium text-green-400">
              {category.name}
            </span>
          </nav>

          {/* Category Content */}
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              {/* Premium Animated Explore Badge */}
              <div className="category-explore-badge group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-green-500/20 bg-gradient-to-r from-[#111711] via-[#172019] to-[#111711] px-4 py-2.5 shadow-lg shadow-green-950/20 transition-all duration-500 hover:-translate-y-1 hover:border-green-400/40 hover:shadow-xl hover:shadow-green-900/20 sm:px-5">
                <span className="category-badge-shine pointer-events-none absolute inset-0" />

                <span className="category-compass-icon relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-green-400 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-green-500/20">
                  <Compass size={18} strokeWidth={2} />
                </span>

                <span className="relative flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-400 sm:text-[11px]">
                    Explore Category
                  </span>

                  <span className="text-[11px] font-medium text-[#A3ADA4] sm:text-xs">
                    Discover your digital world
                  </span>
                </span>

                <span className="relative ml-1 hidden items-center gap-2 border-l border-white/10 pl-3 sm:inline-flex">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
                  </span>

                  <span className="text-[10px] font-bold tracking-wide text-[#F5F7F5]">
                    AI-SaleBD
                  </span>
                </span>
              </div>

              {/* Category Title */}
              <div className="mt-7 flex items-center gap-4 sm:gap-5">
                {/* Dynamic Category Icon */}
                <div className="category-main-icon group flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/15 to-[#141A15] text-green-400 shadow-lg shadow-green-950/20 transition-all duration-500 hover:scale-105 hover:border-green-400/40 hover:shadow-green-900/20 sm:h-20 sm:w-20">
                  <CategoryIcon
                    size={34}
                    strokeWidth={1.7}
                    className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 sm:h-10 sm:w-10"
                  />
                </div>

                <div className="min-w-0">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-green-400 sm:text-xs">
                    Digital Marketplace
                  </p>

                  <h1 className="break-words text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                    {category.name}
                  </h1>
                </div>
              </div>

              <p className="mt-6 max-w-lg text-sm leading-7 text-[#A3ADA4] sm:text-base">
                Explore our {category.name} digital products and services. Find
                the right products for your needs in one convenient place.
              </p>

              {/* Category Stats */}
              <div className="mt-7 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#141A15]/80 px-4 py-3 transition-colors duration-300 hover:border-green-500/20">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                    <ShoppingBag size={16} className="text-green-400" />
                  </span>

                  <span className="text-sm font-bold text-[#F5F7F5]">
                    {filteredProducts.length}
                  </span>

                  <span className="text-xs text-[#A3ADA4]">
                    Products Available
                  </span>
                </div>

                <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#141A15]/80 px-4 py-3 transition-colors duration-300 hover:border-rose-500/20">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10">
                    <Zap size={16} className="text-rose-400" />
                  </span>

                  <span className="text-xs font-medium text-[#A3ADA4]">
                    Digital Products
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Decorative Category Icon */}
            <div className="hidden justify-center lg:flex">
              <div className="category-decoration relative flex h-48 w-48 items-center justify-center rounded-[34px] border border-green-500/15 bg-gradient-to-br from-green-500/[0.10] via-[#141A15] to-[#111711] shadow-2xl shadow-green-950/20">
                <div className="absolute inset-3 rounded-[27px] border border-white/[0.07]" />

                <div className="absolute inset-0 rounded-[34px] bg-green-500/[0.025] blur-xl" />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-green-500/20 bg-green-500/[0.08] text-green-400 shadow-lg shadow-green-950/20">
                  <CategoryIcon size={58} strokeWidth={1.5} />
                </div>

                <div className="absolute -right-5 -top-4 rounded-xl border border-white/[0.08] bg-[#141A15] px-3.5 py-2.5 text-xs font-bold text-[#F5F7F5] shadow-xl shadow-black/20">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Explore Now
                  </span>
                </div>

                <div className="absolute -bottom-4 -left-5 rounded-xl border border-green-500/15 bg-[#141A15] px-3.5 py-2.5 text-xs font-bold text-green-400 shadow-xl shadow-black/20">
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
        <div className="rounded-2xl border border-white/[0.08] bg-[#111711] p-3 shadow-xl shadow-black/10 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative flex min-h-12 flex-1 items-center">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${category.name} products...`}
                aria-label={`Search ${category.name} products`}
                className="w-full rounded-xl border border-white/[0.08] bg-[#0B0F0C] py-3 pl-11 pr-11 text-sm text-[#F5F7F5] outline-none transition placeholder:text-[#69746B] focus:border-green-500/50 focus:ring-2 focus:ring-green-500/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 rounded-lg text-[#A3ADA4] transition hover:text-rose-400"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Sorting */}
            <div className="flex min-h-12 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0B0F0C] px-3 sm:min-w-[220px]">
              <ArrowUpDown size={17} className="shrink-0 text-green-400" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="w-full cursor-pointer bg-transparent py-3 text-sm text-[#F5F7F5] outline-none"
              >
                <option value="featured" className="bg-[#111711]">
                  Featured
                </option>

                <option value="low-high" className="bg-[#111711]">
                  Price: Low to High
                </option>

                <option value="high-low" className="bg-[#111711]">
                  Price: High to Low
                </option>

                <option value="name" className="bg-[#111711]">
                  Name: A to Z
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Results */}
        <section className="mt-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold sm:text-xl">
                  {category.name} Products
                </h2>

                <Sparkles size={16} className="text-green-400" />
              </div>

              <p className="mt-1 text-xs text-[#A3ADA4]">
                Showing {filteredProducts.length} products in this category
              </p>
            </div>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/15 bg-rose-500/[0.07] px-3 py-2 text-xs font-semibold text-rose-400 transition hover:bg-rose-500/15"
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
            <div className="rounded-2xl border border-white/[0.08] bg-[#111711] px-5 py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-green-500/15 bg-green-500/[0.08]">
                <PackageOpen size={38} className="text-green-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold">No Products Found</h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#A3ADA4]">
                {search
                  ? "We couldn't find products matching your search. Try another keyword."
                  : "Products in this category will be added soon."}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <X size={15} />
                  Clear Search
                </button>
              )}
            </div>
          )}
        </section>

        {/* Back to Shop */}
        <div className="mt-10 border-t border-white/[0.08] pt-7">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-green-400 transition hover:text-green-300"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to All Products
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Category;
