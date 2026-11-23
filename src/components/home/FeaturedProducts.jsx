import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Flame,
  Sparkles,
  ShoppingBag,
  Star,
} from "lucide-react";

import ProductCard from "../products/ProductCard";
import useProductStore from "../../store/useProductStore";
import { useTheme } from "../../context/ThemeContext";

function FeaturedProducts() {
  const products = useProductStore((state) => state.products);
  const { isDark } = useTheme();

  const featuredProducts = (Array.isArray(products) ? products : [])
    .filter(
      (product) =>
        product &&
        product.status !== "Inactive" &&
        (product.badge || product.featured),
    )
    .slice(0, 8);

  const isEmpty = featuredProducts.length === 0;

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-green-500/[0.06] blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-red-500/[0.035] blur-[110px]" />

      <div className="container-custom relative">
        {/* Section Header */}
        <div
          className={`relative mb-7 overflow-hidden rounded-2xl border p-5 sm:mb-9 sm:p-7 lg:p-8 ${
            isDark
              ? "border-white/[0.08] bg-[#111813]"
              : "border-gray-200 bg-white"
          }`}
        >
          {/* Header Decoration */}
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-green-500/[0.08]" />
          <div className="pointer-events-none absolute -right-2 -top-12 h-48 w-48 rounded-full border border-green-500/[0.08]" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5">
                <Sparkles size={13} className="text-green-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-green-500">
                  Handpicked for You
                </span>
                <span className="h-1 w-1 rounded-full bg-red-500" />
              </div>

              {/* Title */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                  <Star size={20} />
                </div>

                <h2
                  className={`text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Featured <span className="text-green-500">Products</span>
                </h2>
              </div>

              <p
                className={`mt-3 max-w-md text-xs leading-6 sm:text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Discover our carefully selected AI tools, premium subscriptions
                and digital essentials — all in one place.
              </p>
            </div>

            {/* Header Actions */}
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${
                  isDark
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <ShoppingBag size={16} className="text-green-500" />
                <div>
                  <p
                    className={`text-sm font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {featuredProducts.length}
                  </p>
                  <p
                    className={`text-[10px] ${
                      isDark ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    Products
                  </p>
                </div>
              </div>

              <Link
                to="/shop"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-green-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-green-900/30 sm:px-5 sm:text-sm"
              >
                Explore All
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Products Grid */}
        {featuredProducts.length > 0 ? (
          <>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <p
                  className={`text-xs font-semibold ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Top Picks for You
                </p>
              </div>

              <span
                className={`text-[10px] font-medium ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Showing {featuredProducts.length} products
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div
            className={`relative overflow-hidden rounded-2xl border border-dashed px-5 py-14 text-center sm:py-16 ${
              isDark
                ? "border-white/10 bg-[#111813]"
                : "border-gray-300 bg-white"
            }`}
          >
            <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-green-500/[0.06] blur-3xl" />

            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10">
              <Flame size={29} className="text-green-500" />
            </div>

            <h3
              className={`relative mt-5 text-lg font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Something Great Is Coming!
            </h3>

            <p
              className={`relative mx-auto mt-2 max-w-sm text-xs leading-6 sm:text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              We are preparing a collection of amazing digital products for you.
              Explore our marketplace in the meantime.
            </p>

            <Link
              to="/shop"
              className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
            >
              Explore Products
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        {!isEmpty && (
          <div className="mt-8 flex justify-center sm:mt-10">
            <Link
              to="/shop"
              className={`group inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-xs font-bold transition duration-300 sm:text-sm ${
                isDark
                  ? "border-white/10 bg-white/[0.03] text-gray-300 hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-400"
                  : "border-gray-200 bg-white text-gray-700 hover:border-green-500/40 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              Discover More Products
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
