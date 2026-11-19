import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Gamepad2,
  Sparkles,
  Crown,
  Gift,
  Monitor,
  Film,
  Layers,
  Package,
  Compass,
  Star,
} from "lucide-react";

import useCategoryStore from "../../store/useCategoryStore";
import useProductStore from "../../store/useProductStore";
import { useTheme } from "../../context/ThemeContext";

const categoryStyles = {
  Gaming: {
    icon: Gamepad2,
    gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
    accent: "text-purple-500",
    iconBg: "bg-purple-500/10",
    glow: "bg-purple-500/20",
  },
  "AI Tools": {
    icon: Sparkles,
    gradient: "from-violet-500/25 via-blue-500/15 to-transparent",
    accent: "text-violet-500",
    iconBg: "bg-violet-500/10",
    glow: "bg-violet-500/25",
  },
  Subscriptions: {
    icon: Crown,
    gradient: "from-pink-500/20 via-purple-500/10 to-transparent",
    accent: "text-pink-500",
    iconBg: "bg-pink-500/10",
    glow: "bg-pink-500/20",
  },
  "Gift Cards": {
    icon: Gift,
    gradient: "from-orange-500/20 via-yellow-500/10 to-transparent",
    accent: "text-orange-500",
    iconBg: "bg-orange-500/10",
    glow: "bg-orange-500/20",
  },
  Software: {
    icon: Monitor,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accent: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
    glow: "bg-cyan-500/20",
  },
  Entertainment: {
    icon: Film,
    gradient: "from-red-500/20 via-pink-500/10 to-transparent",
    accent: "text-red-500",
    iconBg: "bg-red-500/10",
    glow: "bg-red-500/20",
  },
};

const defaultStyle = {
  icon: Layers,
  gradient: "from-violet-500/20 via-blue-500/10 to-transparent",
  accent: "text-violet-500",
  iconBg: "bg-violet-500/10",
  glow: "bg-violet-500/20",
};

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function getProductCount(category, products) {
  if (!Array.isArray(products)) return 0;

  return products.filter((product) => {
    if (!product || product.status === "Inactive") return false;

    const productCategory =
      typeof product.category === "object"
        ? product.category?.name || product.category?.slug
        : product.category;

    const productCategorySlug = product.categorySlug || product.category_slug;

    const productCategoryId = product.categoryId ?? product.category_id;

    const matchesName =
      productCategory &&
      normalize(productCategory) === normalize(category.name);

    const matchesSlug =
      (productCategory &&
        normalize(productCategory) === normalize(category.slug)) ||
      (productCategorySlug &&
        normalize(productCategorySlug) === normalize(category.slug));

    const matchesId =
      productCategoryId != null &&
      String(productCategoryId) === String(category.id);

    return matchesName || matchesSlug || matchesId;
  }).length;
}

function CategorySection() {
  const categories = useCategoryStore((state) => state.categories);
  const products = useProductStore((state) => state.products);
  const { isDark } = useTheme();

  const activeCategories = (Array.isArray(categories) ? categories : [])
    .filter(
      (category) =>
        category &&
        category.status === "Active" &&
        category.name &&
        category.slug,
    )
    .slice()
    .sort((a, b) => {
      if (a.name === "AI Tools") return -1;
      if (b.name === "AI Tools") return 1;
      return 0;
    });

  const theme = {
    heading: isDark ? "text-white" : "text-slate-900",
    description: isDark ? "text-slate-400" : "text-slate-600",
    card: isDark
      ? "border-white/[0.09] bg-[#171F30] hover:border-violet-500/40"
      : "border-slate-200 bg-white hover:border-violet-300",
    cardText: isDark ? "text-white" : "text-slate-900",
    cardMuted: isDark ? "text-slate-400" : "text-slate-500",
    cardBorder: isDark ? "border-white/10" : "border-slate-200",
    sectionLabel: isDark
      ? "border-violet-400/20 bg-violet-500/10 text-violet-300"
      : "border-violet-200 bg-violet-50 text-violet-700",
    emptyCard: isDark
      ? "border-white/10 bg-[#171F30]"
      : "border-slate-200 bg-white",
  };

  return (
    <section className="relative isolate overflow-hidden py-14 transition-colors duration-300 sm:py-20">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${theme.sectionLabel}`}
            >
              <Compass size={14} />
              <span className="text-[10px] font-extrabold tracking-[1.5px] sm:text-xs">
                EXPLORE OUR COLLECTION
              </span>
            </div>

            <h2
              className={`text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl ${theme.heading}`}
            >
              Explore Popular <span className="gradient-text">Categories</span>
            </h2>

            <p
              className={`mt-3 max-w-xl text-sm leading-7 ${theme.description}`}
            >
              Discover premium digital products, AI tools and subscriptions in
              one convenient marketplace.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700"
          >
            Browse All Products
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Category Grid */}
        {activeCategories.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {activeCategories.map((category) => {
              const style = categoryStyles[category.name] || defaultStyle;
              const Icon = style.icon;
              const isAiCategory = category.name === "AI Tools";
              const productCount = getProductCount(category, products);

              return (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className={`group relative isolate flex min-h-[190px] flex-col overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-950/10 sm:min-h-[220px] sm:rounded-3xl sm:p-5 ${
                    theme.card
                  } ${isAiCategory ? "ring-1 ring-violet-500/20" : ""}`}
                >
                  {/* Card Gradient */}
                  <div
                    className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${style.gradient}`}
                  />

                  {/* Decorative Glow */}
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 -z-10 h-36 w-36 rounded-full ${style.glow} opacity-40 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70`}
                  />

                  {/* Popular Label */}
                  {isAiCategory && (
                    <div className="mb-3 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[9px] font-extrabold tracking-wide text-violet-500">
                        <Star size={10} fill="currentColor" />
                        FEATURED
                      </span>
                    </div>
                  )}

                  {/* Icon and Arrow */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.iconBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-14 sm:w-14`}
                    >
                      <Icon
                        size={25}
                        strokeWidth={1.8}
                        className={style.accent}
                      />
                    </div>

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-violet-500/30 group-hover:bg-violet-500/10 group-hover:text-violet-500 group-hover:opacity-100 ${theme.cardBorder} ${theme.cardMuted}`}
                    >
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Category Details */}
                  <div className="mt-auto pt-6">
                    <h3
                      className={`text-sm font-extrabold transition-colors duration-300 group-hover:text-violet-500 sm:text-base ${theme.cardText}`}
                    >
                      {category.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-medium sm:text-xs ${theme.cardMuted}`}
                      >
                        <Package size={13} />
                        {productCount}{" "}
                        {productCount === 1 ? "Product" : "Products"}
                      </span>

                      <span className="text-[10px] font-bold text-violet-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:text-xs">
                        Explore
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div
            className={`rounded-3xl border px-5 py-14 text-center ${theme.emptyCard}`}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
              <Layers size={30} />
            </div>

            <h3 className={`mt-5 text-lg font-extrabold ${theme.heading}`}>
              No Categories Available
            </h3>

            <p
              className={`mx-auto mt-2 max-w-sm text-sm leading-6 ${theme.description}`}
            >
              Categories will appear here when they are added and activated from
              the Admin Panel.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              Browse Products
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default CategorySection;
