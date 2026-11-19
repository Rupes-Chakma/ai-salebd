import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  PackageOpen,
  ArrowLeft,
  SlidersHorizontal,
} from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import useProductStore from "../store/useProductStore";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("featured");

  // Get live products from Zustand store
  const products = useProductStore((state) => state.products);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    // Hide inactive products
    let result = products.filter((product) => {
      if (product.status === "Inactive") return false;

      return (
        product.name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query)
      );
    });

    // Sorting
    if (sortBy === "low-high") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "high-low") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "name") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return result;
  }, [products, search, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    setSearchParams(query ? { q: query } : {});
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#AAA3C1]">
          <Link to="/" className="hover:text-white">
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
            Find your favorite digital products at NEXORA.
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full rounded-xl border border-white/10 bg-[#211B3B] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-[#77718D] focus:border-[#8B5CF6]"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Search
          </button>
        </form>

        {/* Results Header */}
        {search.trim() && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">Search Results</h2>

              <p className="mt-1 text-xs text-[#AAA3C1]">
                {filteredProducts.length} products found for "{search}"
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#211B3B] px-3">
              <SlidersHorizontal size={17} className="text-[#B99AFF]" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent py-3 text-sm text-white outline-none"
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
              {search.trim() ? "No Products Found" : "Start Searching"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#AAA3C1]">
              {search.trim()
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
