import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  PackageOpen,
  ArrowLeft,
  SlidersHorizontal,
  X,
} from "lucide-react";

import ProductCard from "../components/products/ProductCard";
import useProductStore from "../store/useProductStore";

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

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get("q") || "";

  const [search, setSearch] = useState(queryFromUrl);
  const [sortBy, setSortBy] = useState("featured");

  const products = useProductStore((state) => state.products);

  // Keep search input synchronized with URL changes
  useEffect(() => {
    setSearch(queryFromUrl);
  }, [queryFromUrl]);

  const filteredProducts = useMemo(() => {
    const query = normalize(queryFromUrl);

    if (!query || !Array.isArray(products)) {
      return [];
    }

    const result = products.filter((product) => {
      if (!product) return false;

      // Hide inactive products
      if (product.status && product.status !== "Active") {
        return false;
      }

      const searchableFields = [
        product.name,
        product.brand,
        getCategoryName(product.category),
        product.description,
        product.slug,
      ];

      return searchableFields.some((field) => normalize(field).includes(query));
    });

    // Sort without mutating the original products array
    switch (sortBy) {
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

      default:
        break;
    }

    return result;
  }, [products, queryFromUrl, sortBy]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    setSearchParams(query ? { q: query } : {});
  };

  const clearSearch = () => {
    setSearch("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#AAA3C1]">
          <Link to="/" className="transition hover:text-white">
            Home
          </Link>

          <span>/</span>

          <span className="text-[#B99AFF]">Search Results</span>
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Search Products
          </h1>

          <p className="mt-2 text-sm text-[#AAA3C1]">
            Find your favorite digital products at AI-SaleBD.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="mb-7 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA3C1]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products, brands, categories..."
              aria-label="Search products"
              className="w-full rounded-xl border border-white/10 bg-[#211B3B] py-3.5 pl-11 pr-11 text-sm text-white outline-none placeholder:text-[#77718D] focus:border-[#8B5CF6]"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAA3C1] transition hover:text-white"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Search
          </button>
        </form>

        {/* Results Header */}
        {queryFromUrl.trim() && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">Search Results</h2>

              <p className="mt-1 text-xs text-[#AAA3C1]">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
                for "{queryFromUrl}"
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#211B3B] px-3">
              <SlidersHorizontal size={17} className="text-[#B99AFF]" />

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort search results"
                className="max-w-[190px] bg-transparent py-3 text-sm text-white outline-none"
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
        )}

        {/* Product Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#211B3B] px-5 py-14 text-center">
            <PackageOpen size={48} className="mx-auto mb-4 text-[#8B5CF6]" />

            <h3 className="text-lg font-bold text-white">
              {queryFromUrl.trim() ? "No Products Found" : "Start Searching"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#AAA3C1]">
              {queryFromUrl.trim()
                ? "We couldn't find any products matching your search. Try another keyword."
                : "Enter a product name or category in the search box to discover digital products."}
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <ArrowLeft size={17} />
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
