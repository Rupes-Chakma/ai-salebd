import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingBag, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function ProductCard({ product }) {
  const productDetailsUrl = `/product/${product.id}`;
  const { isDark } = useTheme();

  const theme = {
    card: isDark
      ? "border-white/10 bg-[#171F30] hover:border-violet-500/50"
      : "border-slate-200 bg-white hover:border-violet-300",

    imageBg: isDark ? "bg-[#111827]" : "bg-slate-100",
    imageOverlay: isDark ? "from-[#111827]/60" : "from-slate-900/20",

    category: isDark ? "text-violet-300" : "text-violet-700",
    name: isDark ? "text-white" : "text-slate-900",
    price: isDark ? "text-white" : "text-slate-900",
    oldPrice: isDark ? "text-slate-500" : "text-slate-400",

    button: isDark
      ? "border-violet-400/30 bg-violet-500/10 text-violet-300 hover:border-violet-500 hover:bg-violet-600 hover:text-white"
      : "border-violet-200 bg-violet-50 text-violet-700 hover:border-violet-600 hover:bg-violet-600 hover:text-white",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-900/10 ${theme.card}`}
    >
      {/* Product Image */}
      <Link
        to={productDetailsUrl}
        className={`relative block aspect-[4/3] overflow-hidden ${theme.imageBg}`}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name || "Product"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 sm:group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ShoppingBag
              size={42}
              className={isDark ? "text-slate-600" : "text-slate-300"}
            />
          </div>
        )}

        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${theme.imageOverlay} via-transparent to-transparent opacity-70`}
        />

        {product.badge && (
          <span className="absolute left-2.5 top-2.5 inline-flex max-w-[85%] items-center gap-1 rounded-full border border-white/15 bg-violet-600 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-lg sm:left-3 sm:top-3 sm:gap-1.5 sm:px-3 sm:text-xs">
            <Sparkles size={12} />
            <span className="truncate">{product.badge}</span>
          </span>
        )}

        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-100 backdrop-blur-md transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </Link>

      {/* Product Details */}
      <div className="p-3 sm:p-4">
        <p
          className={`truncate text-[10px] font-bold uppercase tracking-wider sm:text-xs sm:tracking-[1.5px] ${theme.category}`}
        >
          {typeof product.category === "object"
            ? product.category?.name
            : product.category}
        </p>

        <Link to={productDetailsUrl}>
          <h3
            className={`mt-1.5 line-clamp-2 min-h-10 text-[13px] font-bold leading-5 transition-colors duration-200 group-hover:text-violet-500 sm:mt-2 sm:text-base ${theme.name}`}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2.5 flex min-h-7 flex-wrap items-center gap-x-2 gap-y-1 sm:mt-3">
          <span
            className={`text-base font-extrabold tracking-tight sm:text-lg ${theme.price}`}
          >
            ৳{product.price}
          </span>

          {product.oldPrice != null && product.oldPrice !== "" && (
            <span
              className={`text-[11px] font-medium line-through sm:text-xs ${theme.oldPrice}`}
            >
              ৳{product.oldPrice}
            </span>
          )}
        </div>

        {/* Product Details Button */}
        <Link
          to={productDetailsUrl}
          className={`mt-3 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-[11px] font-bold transition-all duration-300 hover:shadow-lg hover:shadow-violet-900/20 sm:mt-4 sm:gap-2 sm:px-3 sm:text-sm ${theme.button}`}
        >
          <ShoppingBag size={15} />
          View Product
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
