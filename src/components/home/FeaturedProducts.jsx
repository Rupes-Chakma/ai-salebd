import { Link } from "react-router-dom";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

import ProductCard from "../products/ProductCard";
import useProductStore from "../../store/useProductStore";

function FeaturedProducts() {
  const products = useProductStore((state) => state.products);

  const featuredProducts = (Array.isArray(products) ? products : [])
    .filter((product) => product && product.status !== "Inactive")
    .filter((product) => product.badge || product.featured)
    .slice(0, 8);

  return (
    <section className="pt-6 pb-3 sm:pt-9 sm:pb-5 lg:pt-10 lg:pb-6">
      <div className="container-custom">
        {/* Section Heading */}
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-6">
          <div className="min-w-0">
            <div className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1.5px] text-[#B99AFF] sm:text-xs">
              <Flame size={14} />
              FEATURED COLLECTION
            </div>

            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-3xl">
              Featured{" "}
              <span className="bg-gradient-to-r from-[#C4A7FF] to-[#60A5FA] bg-clip-text text-transparent">
                Products
              </span>
            </h2>

            <p className="mt-1 text-xs text-[#AAA3C1] sm:text-sm">
              Handpicked digital products for you.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex min-h-9 shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-[#C4A7FF] transition hover:text-white sm:min-h-10 sm:gap-2 sm:px-3 sm:text-sm"
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
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#211B3B] px-5 py-8 text-center sm:py-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/10">
              <Sparkles size={23} className="text-[#B99AFF]" />
            </div>

            <h3 className="mt-4 text-base font-bold text-white sm:text-lg">
              Featured Products Coming Soon
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-[#AAA3C1] sm:text-sm">
              Popular digital products will appear here soon.
            </p>

            <Link
              to="/shop"
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              Explore Products
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
