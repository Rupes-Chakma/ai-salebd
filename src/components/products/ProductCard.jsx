import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingBag, Sparkles } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const getBadgeStyle = (badge) => {
  const value = String(badge || "")
    .trim()
    .toLowerCase();

  if (["popular", "sale", "discount", "hot"].includes(value)) {
    return {
      className: "border-red-400/25 bg-red-500/15 text-red-300",
      icon: "text-red-300",
    };
  }

  if (["new", "new arrival"].includes(value)) {
    return {
      className: "border-green-400/25 bg-green-500/15 text-green-300",
      icon: "text-green-300",
    };
  }

  if (["best seller", "bestseller", "featured"].includes(value)) {
    return {
      className: "border-emerald-400/25 bg-emerald-500/15 text-emerald-300",
      icon: "text-emerald-300",
    };
  }

  return {
    className: "border-white/15 bg-black/60 text-gray-200",
    icon: "text-green-400",
  };
};

function ProductCard({ product }) {
  const { isDark } = useTheme();

  if (!product) return null;

  const productLink = `/product/${product.id}`;

  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  const badgeStyle = product.badge ? getBadgeStyle(product.badge) : null;

  const cardTheme = isDark
    ? "border-white/[0.08] bg-[#141A15] hover:border-green-500/35 hover:bg-[#171F18]"
    : "border-gray-200 bg-white hover:border-green-400/60 hover:bg-gray-50";

  const titleTheme = isDark ? "text-white" : "text-gray-900";
  const mutedTheme = isDark ? "text-[#929A92]" : "text-gray-500";
  const oldPriceTheme = isDark ? "text-gray-500" : "text-gray-400";

  const imageBackground = isDark ? "bg-[#101610]" : "bg-gray-100";

  const currentPrice = Number(product.price || 0);
  const oldPrice = Number(product.oldPrice || 0);

  return (
    <Link
      to={productLink}
      aria-label={`View ${product.name || "product"}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isDark ? "hover:shadow-black/25" : "hover:shadow-green-900/10"
      } ${cardTheme}`}
    >
      {/* Product Image */}
      <div
        className={`relative aspect-[4/3] overflow-hidden ${imageBackground}`}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name || "Digital Product"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ShoppingBag size={38} strokeWidth={1.3} className={mutedTheme} />
          </div>
        )}

        {/* Image Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {/* Product Badge */}
        {product.badge && (
          <span
            className={`absolute left-2.5 top-2.5 z-10 inline-flex max-w-[calc(100%-20px)] items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide shadow-lg backdrop-blur-md sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[10px] ${badgeStyle.className}`}
          >
            <Sparkles
              size={11}
              strokeWidth={2.5}
              className={`shrink-0 ${badgeStyle.icon}`}
            />
            <span className="truncate">{product.badge}</span>
          </span>
        )}

        {/* Quick View Icon */}
        <div className="absolute bottom-2.5 right-2.5 flex h-8 w-8 translate-y-2 items-center justify-center rounded-lg border border-white/20 bg-black/65 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        {/* Category */}
        {categoryName && (
          <p className="mb-1.5 truncate text-[9px] font-bold uppercase tracking-[0.13em] text-green-500 sm:text-[10px]">
            {categoryName}
          </p>
        )}

        {/* Product Name */}
        <h3
          className={`line-clamp-2 min-h-[2.5rem] text-[12px] font-bold leading-5 transition-colors duration-200 group-hover:text-green-500 sm:text-sm ${titleTheme}`}
        >
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="mt-auto flex min-h-[42px] flex-wrap items-center gap-x-2 gap-y-1 pt-3">
          <span className="text-sm font-extrabold tracking-tight text-green-500 sm:text-base">
            ৳{currentPrice.toLocaleString("en-BD")}
          </span>

          {oldPrice > currentPrice && (
            <span
              className={`text-[10px] font-medium line-through sm:text-xs ${oldPriceTheme}`}
            >
              ৳{oldPrice.toLocaleString("en-BD")}
            </span>
          )}
        </div>

        {/* Details Footer */}
        <div
          className={`mt-2.5 flex items-center justify-between border-t pt-2.5 ${
            isDark ? "border-white/[0.07]" : "border-gray-100"
          }`}
        >
          <span
            className={`text-[10px] font-medium sm:text-[11px] ${mutedTheme}`}
          >
            View Product
          </span>

          <span className="inline-flex items-center gap-1 rounded-lg bg-green-500/10 px-2.5 py-1.5 text-[10px] font-bold text-green-500 transition-all duration-200 group-hover:bg-green-500 group-hover:text-white sm:text-[11px]">
            Details
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
