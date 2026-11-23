import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gamepad2,
  Sparkles,
  Crown,
  Gift,
  Monitor,
  Film,
  Layers,
  Package,
} from "lucide-react";

import useCategoryStore from "../../store/useCategoryStore";
import useProductStore from "../../store/useProductStore";
import { useTheme } from "../../context/ThemeContext";

const categoryIcons = {
  Gaming: Gamepad2,
  "AI Tools": Sparkles,
  Subscriptions: Crown,
  "Gift Cards": Gift,
  Software: Monitor,
  Entertainment: Film,
};

const categoryColors = {
  Gaming: "text-rose-400 bg-rose-500/10",
  "AI Tools": "text-green-400 bg-green-500/10",
  Subscriptions: "text-amber-400 bg-amber-500/10",
  "Gift Cards": "text-pink-400 bg-pink-500/10",
  Software: "text-sky-400 bg-sky-500/10",
  Entertainment: "text-orange-400 bg-orange-500/10",
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
    muted: isDark ? "text-slate-400" : "text-slate-500",
    card: isDark
      ? "border-white/10 bg-[#141A15] hover:border-green-500/40 hover:bg-[#19221B]"
      : "border-slate-200 bg-white hover:border-green-300 hover:bg-green-50/30",
    icon: isDark ? "bg-white/[0.05]" : "bg-slate-50",
  };

  return (
    <section className="py-7 sm:py-10">
      <div className="container-custom">
        {/* Heading */}
        <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-5 rounded-full bg-[#E11D48]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E11D48]">
                Explore Collections
              </span>
            </div>

            <h2
              className={`text-lg font-extrabold tracking-tight sm:text-2xl ${theme.heading}`}
            >
              Shop by Category
            </h2>

            <p className={`mt-1 text-xs sm:text-sm ${theme.muted}`}>
              Find your favorite digital products.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-green-500 transition hover:text-green-400 sm:text-sm"
          >
            View All
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Categories */}
        {activeCategories.length > 0 ? (
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
            {activeCategories.map((category) => {
              const Icon = categoryIcons[category.name] || Layers;

              const color =
                categoryColors[category.name] ||
                "text-green-400 bg-green-500/10";

              const productCount = getProductCount(category, products);

              return (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className={`group flex min-w-[145px] snap-start items-center gap-3 rounded-xl border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:min-w-0 sm:rounded-2xl sm:p-4 ${theme.card}`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}
                  >
                    <Icon size={21} strokeWidth={1.9} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={`truncate text-xs font-bold sm:text-sm ${theme.heading}`}
                    >
                      {category.name}
                    </h3>

                    <p className={`mt-1 text-[10px] sm:text-xs ${theme.muted}`}>
                      <Package
                        size={11}
                        className="mr-1 inline-block align-middle"
                      />
                      {productCount} Products
                    </p>
                  </div>

                  <ArrowRight
                    size={15}
                    className="shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-[#E11D48]"
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={`rounded-xl border p-6 text-center ${theme.card}`}>
            <Layers size={25} className={`mx-auto ${theme.muted}`} />

            <p className={`mt-3 text-sm font-semibold ${theme.heading}`}>
              No Categories Available
            </p>

            <p className={`mt-1 text-xs ${theme.muted}`}>
              Categories will appear here when activated.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CategorySection;
