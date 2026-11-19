import { Link } from "react-router-dom";
import { ArrowRight, Flame, Sparkles, ShoppingBag } from "lucide-react";

import ProductCard from "../products/ProductCard";
import useProductStore from "../../store/useProductStore";

function FeaturedProducts() {
  const products = useProductStore((state) => state.products);

  const featuredProducts = (Array.isArray(products) ? products : [])
    .filter((product) => product && product.status !== "Inactive")
    .filter((product) => product.badge || product.featured)
    .slice(0, 8);

  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-[#8B5CF6]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Section Heading */}
        <div className="mb-7 flex items-end justify-between gap-3 sm:mb-9">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-3 py-1.5">
              <Flame size={14} className="text-[#C4A7FF]" />
              <span className="text-[10px] font-bold tracking-[1.8px] text-[#C4A7FF] sm:text-xs">
                TOP PICKS
              </span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Featured{" "}
              <span className="bg-gradient-to-r from-[#C4A7FF] to-[#60A5FA] bg-clip-text text-transparent">
                Products
              </span>
            </h2>

            <p className="mt-2 max-w-md text-xs leading-6 text-[#AAA3C1] sm:text-sm">
              Discover our handpicked digital products and popular AI tools.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-[#C4A7FF] transition-all hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 hover:text-white sm:gap-2 sm:px-4 sm:text-sm"
          >
            View All
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bottom Link */}
            <div className="mt-8 flex justify-center sm:mt-10">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-xl border border-[#8B5CF6]/30 bg-gradient-to-r from-[#8B5CF6]/10 to-[#2563EB]/10 px-5 py-3 text-sm font-bold text-[#C4A7FF] transition-all hover:border-[#8B5CF6]/60 hover:from-[#8B5CF6] hover:to-[#6D28D9] hover:text-white"
              >
                <ShoppingBag size={16} />
                Explore All Products
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#211B3B] px-5 py-14 text-center sm:py-16">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#8B5CF6]/25 bg-[#8B5CF6]/10">
              <Sparkles size={25} className="text-[#B99AFF]" />
            </div>

            <h3 className="text-lg font-bold text-white sm:text-xl">
              Featured Products Coming Soon
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-[#AAA3C1] sm:text-sm">
              We are preparing popular digital products and AI tools for you.
              Check back soon!
            </p>

            <Link
              to="/shop"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-5 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-purple-900/30"
            >
              Explore All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
