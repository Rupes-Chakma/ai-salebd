import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Eye, Package } from "lucide-react";
import toast from "react-hot-toast";
import useProductStore from "../../store/useProductStore";

function Products() {
  // Get data from Product Store
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const toggleProductStatus = useProductStore(
    (state) => state.toggleProductStatus,
  );

  // Ensure products is an array
  const safeProducts = Array.isArray(products) ? products : [];

  const [search, setSearch] = useState("");

  // Search Products
  const filteredProducts = safeProducts.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase()),
  );

  // Delete Product
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    deleteProduct(id);
    toast.success("Product deleted successfully");
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="mt-1 text-sm text-[#AAA3C1]">
            Manage your NEXORA marketplace products.
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 text-sm font-semibold transition hover:opacity-90"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#211B3B] px-4 py-3">
        <Search size={19} className="text-[#AAA3C1]" />

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-[#AAA3C1]"
        />
      </div>

      {/* Product Count */}
      <div className="flex items-center justify-between text-sm text-[#AAA3C1]">
        <span>Total Products: {safeProducts.length}</span>
        <span>Showing: {filteredProducts.length}</span>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#211B3B]">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-[#AAA3C1]">
            <tr>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-white/5 last:border-0"
              >
                {/* Product Name & Image */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name || "Product"}
                        className="h-11 w-11 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5">
                        <Package size={20} />
                      </div>
                    )}

                    <span className="font-medium">
                      {product.name || "Unnamed Product"}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-5 py-4 text-[#AAA3C1]">
                  {product.category || "Uncategorized"}
                </td>

                {/* Price */}
                <td className="px-5 py-4 font-semibold">
                  ৳{product.price ?? 0}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => toggleProductStatus(product.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.status === "Active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {product.status || "Active"}
                  </button>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      target="_blank"
                      className="rounded-lg bg-white/5 p-2 text-[#AAA3C1] hover:text-white"
                      title="View Product"
                    >
                      <Eye size={17} />
                    </Link>

                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="rounded-lg bg-blue-500/10 p-2 text-blue-400 hover:bg-blue-500/20"
                      title="Edit Product"
                    >
                      <Pencil size={17} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"
                      title="Delete Product"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">
            <Package size={35} className="mx-auto text-[#AAA3C1]" />

            <p className="mt-3 font-semibold">No products found</p>

            <p className="mt-1 text-sm text-[#AAA3C1]">
              Try another search or add a new product.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
